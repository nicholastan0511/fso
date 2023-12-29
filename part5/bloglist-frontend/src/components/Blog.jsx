import { useState, useEffect } from "react"
import blogService from '../services/blogs'

const BlogTitle = ({ blog }) => (
    <div>
      {blog.title}
    </div>  
)

const BlogInfo = ({ blog, user, handleRemove }) => {
  const [likes, setLikes] = useState(0)
  
  useEffect(() => {
    setLikes(blog.likes)
  }, [])

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

  let username = ''
  const defineUsername = (val) => {
    username = val;
  }

  //react won't jump to catch even though an error has occurred when a
  //new blog is added
  try {
    defineUsername(blog.user.username ? blog.user.username : user.username)
  } catch(error) {
    defineUsername(user.username)
  }

  return (
    <div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        {likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{username}</div>
      <div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}


export { BlogTitle, BlogInfo }