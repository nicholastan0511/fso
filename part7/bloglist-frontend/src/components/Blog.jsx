import { likeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addComment } from "../reducers/blogReducer";

const Blog = ({ blogs, user }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  const [comment, setComment] = useState("");

  if (!blog) return null;

  const comments = !blog.comments ? [] : blog.comments;

  const dispatch = useDispatch();

  const handleLike = async (newObj) => {
    try {
      dispatch(likeBlog(newObj));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemove = async (blogToRemove) => {
    try {
      dispatch(deleteBlog(blogToRemove));
    } catch (error) {
      console.log(error.mesage);
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    console.log(comment);
    dispatch(addComment(comment, blog.id));
    setComment("");
  };

  //initialize username as current user if this blog does not contain a user property
  const username = blog.user ? blog.user.username : user.username;

  const showRemove = username === user.username ? true : false;

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {username}</div>
      {showRemove ? (
        <div>
          <button onClick={() => handleRemove(blog)}>remove</button>
        </div>
      ) : null}
      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <input
          type="text"
          onChange={({ target }) => setComment(target.value)}
          value={comment}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
