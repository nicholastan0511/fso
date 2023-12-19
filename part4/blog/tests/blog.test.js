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

test('delete a blog', async () => {
  const startingBlogs = await helper.getData()
  const blogToDelete = startingBlogs[0]

  console.log(blogToDelete)

  await api
   .delete(`/api/blogs/${blogToDelete.id}`)
   .expect(204)

  const endingBlogs = await helper.getData()
  expect(endingBlogs).toHaveLength(helper.initialBlogs.length - 1)

  const titles = endingBlogs.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog', async () => {
  const blogs = await helper.getData()
  const blogToUpdate = blogs[0]

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 2, test: 2000 })

  expect(response.body.likes).toBe(2)

})


afterAll(async () => {
  await mongoose.connection.close()
})
