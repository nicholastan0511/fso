const { GraphQLError } = require('graphql')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (!args.author && !args.genre)
          return Book.find({}).populate('author')
        else if (args.author && !args.genre) {
          return Book.find({ author: args.author })
        } else if (!args.author && args.genre) {
          return Book.find({ genres: { $elemMatch: {$eq: args.genre} } }).populate('author')
        } else {
          return Book.find({ author: args.author, genres: { $elemMatch: { $eq: args.genre } } })
        }
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      } 
    },
    Author: {
      bookCount: async (root) => {
        const books = await Book.find({}).populate('author')
        const booksByAuthor = books.filter(book => book.author.name === root.name)
        return booksByAuthor.length
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          try {
            author = await author.save();
          } catch (error) {
            throw new GraphQLError('saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            });
          }
        }
    
        let book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
        return Book.findOne({ title: args.title }).populate('author')
      },
      editAuthor: async (root, args) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        if (!args.name || !args.setBornTo) 
          return null
  
        //find author from the array based on the argument given
        const authorToUpdate = await Author.find({ name: args.name })
  
        if (!authorToUpdate)
          return null
  
        //update date of birth
        authorToUpdate.born = args.setBornTo
        //update the database
        try {
          await authorToUpdate.save()
        } catch (error) {
          throw new GraphQLError('updating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
  
    },
  }

  module.exports = resolvers