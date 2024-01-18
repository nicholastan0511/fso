import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import Create from "./Create";
import { useRef } from "react";
import { setNotif, resetNotifAfter } from "../reducers/notifReducer";
import { createNewBlog, deleteBlog } from "../reducers/blogReducer";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

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
  const navigate = useNavigate();

  if (user === "") {
    navigate("/login");
  }

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

  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={blogListRef}>
        <Create handleBlog={handleBlog} user={user} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <TableCell>{blog.title}</TableCell>
                </Link>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
