const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('list has four blogs', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body).toHaveLength(helper.initialBlogs.length) 
})

test('unique identifier prop is named correctly', async () => {
  const blogs = await helper.getData()

  for (let blog of blogs) {
    expect(blog.id).toBeDefined()
  }
})

test('a blog is posted', async () => {
  const newBlog = new Blog({
    title: 'A new man',
    author: 'Don',
    url: 'iroirwe',
    likes: 213
  })

  await newBlog.save()
  const updatedList = await helper.getData()
  expect(updatedList).toHaveLength(helper.initialBlogs.length + 1)
})

test('default likes to 0 when not provided', async () => {
  const newBlog = {
    title: 'A new man',
    author: 'Don',
    url: 'iroirwe'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  expect(response.body.likes).toBe(0)
})

test('blog comes with valid title and url', async () => {
  const newBlog = {
    author: 'Don',
    likes: 0
  }

  await api
   .post('/api/blogs')
   .send(newBlog)
   .expect(400)
})