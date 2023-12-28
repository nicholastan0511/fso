import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Create from './components/Create'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const blogList = () => {
    return (
      <div>
        <h2>Blog List</h2>
        <Create handleBlog={handleBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} blogs={blogs} setBlogs={setBlogs} />
        <div>{user.name} logged in 
          <button onClick={logout}>logout</button>
        </div>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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

  const handleBlog = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(response))
      setErrorMes(`${title} added`)
      setTimeout(() => {
        setErrorMes(null)
      }, 5000)
      setAuthor('')
      setUrl('')
      setTitle('')
    } catch (error) {
      setErrorMes('Please fill in all the fields')
      setTimeout(() => {
        setErrorMes(null)
      }, 5000 )
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