import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { likeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const BlogTitle = ({ blog }) => (
  <div className="blogTitle">
    {blog.title} by {blog.author}
  </div>
);

const BlogInfo = ({ blog, user, handleRemove }) => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const likes = useSelector(
    (state) => state.blogs.find((n) => n.id === blog.id).likes,
  );

  useEffect(() => {
    const getUser = async () => {
      const response = await blogService.getUser(blog.user);
      return response.username;
    };

    const fetchUsername = async () => {
      try {
        if (!blog.user.username) {
          const res = await getUser();
          setUsername(res);
        } else setUsername(blog.user.username);
      } catch (error) {
        setUsername("");
      }
    };

    fetchUsername();
  }, [blog]);

  const handleLike = async (newObj) => {
    try {
      dispatch(likeBlog(newObj));
    } catch (error) {
      console.log(error.message);
    }
  };

  //react won't jump to catch even though an error has occurred when a
  //new blog is added

  const showRemove = username === user.username ? true : false;

  return (
    <div>
      <div className="blogUrl">{blog.url}</div>
      <div className="blogLikes">
        {likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{username}</div>
      {showRemove ? (
        <div>
          <button onClick={() => handleRemove(blog)} id="rmvButton">
            remove
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { BlogTitle, BlogInfo };
