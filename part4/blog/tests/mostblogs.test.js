const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const authors = [
    {
        author: "Robert C. Martin",
        blogs: 3,
        likes: 10
    },
    {
        author: "Gordon Ramsay",
        blogs: 48,
        likes: 1643
    },
    {
        author: "J'Quellin",
        blogs: 1,
        likes: 15
    },
    {
        author: "O'Shack Hennessey",
        blogs: 10,
        likes: 10
    }
]


describe('author who has' , () => {
    test('the most blogs', () => {
      expect(mostBlogs(authors)).toBe('Gordon Ramsay')
    })

    test('the most likes', () => {
      expect(mostBlogs(authors)).toBe('Gordon Ramsay')
    })

})