const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach (async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const savedUser = await api.post('/api/users').send(helper.initialUsers[0])

  for (let blog of helper.initialBlogs) {
    const blogObj = new Blog(blog)
    blogObj.user = savedUser.body.id
    await blogObj.save()
  }
})

describe('token test', () => {
  
  test('user can be registered to the system', async () => {
    const newUser = {
      "username": 'testtooo',
      "name": 'aosifheiowf',
      "password": 'longerrrrr',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const endUsers = await User.find({})

    expect(endUsers).toHaveLength(helper.initialUsers.length + 1)
  })

  test('user can login', async () => {
    await api
      .post('/api/login')
      .send(helper.initialUsers[0])
      .expect(200)
  })

  test('user is authorized to post only with token', async () => {

    const response = await api
      .post('/api/login')
      .send(helper.initialUsers[0])

    const newBlog = {
      title: 'Dawg',
      author: 'Dawg',
      url: 'fewfewfew',
      likes: 100,
      user: response.id
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newBlog)
      .expect(201)
  })

  test('user is not authorized without a valid token', async () => {

    const response = await api
      .post('/api/login')
      .send(helper.initialUsers[0])

    const newBlog = {
      title: 'Dawg',
      author: 'Dawg',
      url: 'fewfewfew',
      likes: 100,
      user: response.id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'invalid')
      .send(newBlog)
      .expect(401)
  })

  test('user may delete a blog with a valid token', async () => {
    const response = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
    
    const startingBlogs = await helper.getData()
    const blogToDelete = startingBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(204)

    const endingBlogs = await helper.getData()
    expect(endingBlogs).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('user cannot delete a blog without a valid token', async () => {
    const response = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
    
    const startingBlogs = await helper.getData()
    const blogToDelete = startingBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'invalid')
      .expect(401)

    const endingBlogs = await helper.getData()
    expect(endingBlogs).toHaveLength(helper.initialBlogs.length)
  })

})

