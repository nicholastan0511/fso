const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Builder Lyfe',
    author: 'Bob',
    url: 'testiefwoi',
    likes: 1239
  },
  {
    title: 'Dancing in the moonlight',
    author: 'Rocky',
    url: 'fweoihew',
    likes: 12
  },
  {
    title: 'The Boys',
    author: 'Carmelo',
    url: 'dasufhe',
    likes: 4124
  },
  {
    title: 'How To Break an Egg',
    author: 'HowToBasic',
    url: 'asiudhas',
    likes: 3214
  },
]

const initialUsers = [
  {
    username: 'nicholastan0511',
    name: 'Nicholas Tan',
    password: 'test'
  }
]

const getData = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, getData, initialUsers
}