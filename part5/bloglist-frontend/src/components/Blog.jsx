import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogTitle = ({ blog }) => (
  <div className='blogTitle'>
    {blog.title}
    {blog.author}
  </div>  
)

const BlogInfo = ({ blog, user, handleRemove }) => {
  const [likes, setLikes] = useState(0)
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    setLikes(blog.likes)

    const getUser = async () => {
      const response = await blogService.getUser(blog.user)
      return response.username
    }
  
    const fetchUsername = async () => {
      if (!blog.user.username) {
        const res = await getUser()
        console.log('i get called for', blog.title)
        setUsername(res)
      } else
        setUsername(blog.user.username)
    }

    fetchUsername()
  }, [blog])

  const handleLike = async (newObj) => {
    try {
      console.log('im called')
      await blogService.like({ ...newObj, likes: newObj.likes + 1 })
      blog.likes = likes + 1
      setLikes(likes + 1)
    } catch(error) {
      console.log(error.message)
    }
  }

  //react won't jump to catch even though an error has occurred when a
  //new blog is added

  console.log(username, blog.title)

  const showRemove = username === user.username
    ? true
    : false

  return (
    <div>
      <div className='blogUrl'>{blog.url}</div>
      <div className='blogLikes'>
        {likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{username}</div>
      {showRemove 
        ? <div>
            <button onClick={() => handleRemove(blog)} id='rmvButton'>remove</button>
          </div>
        : null
      }     
    </div>
  )
}


export { BlogTitle, BlogInfo }