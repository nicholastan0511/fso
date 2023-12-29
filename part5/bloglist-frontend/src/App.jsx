import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Create from './components/Create'
import Error from './components/Error'
import Togglable from './components/Togglable'
import { BlogTitle } from './components/Blog'
import { BlogInfo } from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMes, setErrorMes] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error) {
      setErrorMes(`invalid username or password!`)
      setTimeout(() => {
        setErrorMes(null)
      }, 5000)
    }
  }

  const blogListRef = useRef()

  const blogStyle = {
    padding: 15,
    border: 'solid',
    marginBottom: 10,
  }

  const sortByLikes = [...blogs.sort((a, b) => b.likes - a.likes)]
  
  console.log(sortByLikes)

  const blogList = () => {
    return (
      <div>
        <h2>Blog List</h2>
        <div>{user.name} logged in 
          <button onClick={logout}>logout</button>
        </div>
        <Togglable buttonLabel='Create New Blog' ref={blogListRef}>
          <Create handleBlog={handleBlog} user={user} />
        </Togglable>
          {blogs.map(blog =>
            <div style={blogStyle} key={`${blog.id}div`}>
              <BlogTitle blog={blog} key={blog.id}/>
              <Togglable buttonLabel='view' key={`${blog.id}tog`}>
                <BlogInfo key={blog.id} blog={blog} user={user} handleRemove={handleRemove}/>
              </Togglable>
            </div>
          )}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input 
            type='text' 
            value={username} 
            name='Username'
            onChange={({ target }) => {
              setUsername(target.value)
            }} />
          </div>
          <div>
            Password
            <input 
            type="password"
            value={password}
            name='Password'
            onChange={({ target }) => {
              setPassword(target.value)
            }} />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    console.log('logged out')
  }

  const handleBlog = async (title, author, url) => {
    try {
      blogListRef.current.toggleVisibility()
      const response = await blogService.create({
        title: title,
        user: user.id,
        url: url,
        author: author
      })
      setBlogs(blogs.concat(response))
      setErrorMes(`${title} added`)
      setTimeout(() => {
        setErrorMes(null)
      }, 5000)
      
    } catch (error) {
      setErrorMes('Please fill in all the fields')
      setTimeout(() => {
        setErrorMes(null)
      }, 5000 )
    }
  }

  const handleRemove = async (blogToRemove) => {
    try {
      console.log(blogToRemove)
      await blogService.remove(blogToRemove)
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    } catch (error) {
      console.log(error.mesage)
    }
  }

  return (
    <div>
      <Error mes={errorMes}/>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App