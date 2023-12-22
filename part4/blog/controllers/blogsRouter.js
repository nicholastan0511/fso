const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: 1})
  response.json(blogs)
})

blogsRouter.post('', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: body.user
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  res.json(blog)
}) 

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id)

  if (!req.user.id.toString() === blogToDelete.user.toString())
    return res.status(401).json({ error: 'invalid user' })

  await Blog.deleteOne({ _id: blogToDelete._id })

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const response = await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes }, { new: true })
  res.json(response)
})

module.exports = blogsRouter