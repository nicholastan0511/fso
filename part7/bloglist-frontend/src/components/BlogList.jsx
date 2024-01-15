import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import Create from "./Create";
import { BlogTitle, BlogInfo } from "./Blog";
import { useRef } from "react";
import { setNotif, resetNotifAfter } from "../reducers/notifReducer";
import { createNewBlog, deleteBlog } from "../reducers/blogReducer";

const BlogList = (props) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blogListRef = useRef();
  const blogStyle = {
    padding: 15,
    border: "solid",
    marginBottom: 10,
  };

  const handleBlog = async (title, author, url) => {
    try {
      blogListRef.current.toggleVisibility();
      const newBlog = {
        title,
        user: user.id,
        url,
        author,
      };
      dispatch(createNewBlog(newBlog));
      dispatch(setNotif(`${title} added`));
      dispatch(resetNotifAfter(5));
    } catch (error) {
      dispatch(setNotif("Please fill in all the fields!"));
      dispatch(resetNotifAfter(5));
    }
  };

  const handleRemove = async (blogToRemove) => {
    try {
      dispatch(deleteBlog(blogToRemove));
    } catch (error) {
      console.log(error.mesage);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    console.log("logged out");
  };

  console.log(blogs[blogs.length - 1])

  console.log("im rerendered");
  return (
    <div>
      <h2>Blog List</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="Create New Blog" ref={blogListRef}>
        <Create handleBlog={handleBlog} user={user} />
      </Togglable>
      {blogs.map((blog) => (
        <div style={blogStyle} key={`${blog.id}div`} className="blog">
          <BlogTitle blog={blog} key={blog.id} />
          <Togglable buttonLabel="view" key={`${blog.id}tog`}>
            <BlogInfo
              key={blog.id}
              blog={blog}
              user={user}
              handleRemove={handleRemove}
            />
          </Togglable>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
