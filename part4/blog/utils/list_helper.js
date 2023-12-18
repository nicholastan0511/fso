const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((sum, cur) => sum + cur.likes, 0)

  return result
}

const favoriteBlog = (blogs) => {

  const reducer = (acc, item) => {
    if (item.likes > acc.likes) 
      return item
    else
      return acc
  }

  const result = blogs.reduce(reducer, {likes: 0})

  return result
}

const mostBlogs = (authors) => {
  const reducer = (acc, item) => {
    if (item.blogs > acc.blogs)    
      return item
    else
      return acc
  }

  const result = authors.reduce(reducer, {blogs: 0}).author

  return result
}

const mostLikes = (authors) => {
    const reducer = (acc, item) => {
      if (item.likes > acc.likes) 
        return item
      else
        return acc
    }

    const result = authors.reduce(reducer, {likes: 0}).author

    return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}