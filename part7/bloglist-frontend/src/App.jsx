import Users from "./components/Users";
import { initBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import { setUser } from "./reducers/userReducer";
import blogService from "./services/blogs";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { logout } from "./reducers/userReducer";
import User from "./components/User";
import { initUsers } from "./reducers/usersReducer";
import Blog from "./components/Blog";
import { 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material' 

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);
  const blogs = useSelector((state) => state.blogs);

  //get blogs and users from server
  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());

    //retrieving user information from local storage and save user's token to the frontend
    //everytime the page gets reloaded
    const userJSON = window.localStorage.getItem("loggedBlogUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }

    setLoading(false);
  }, []);

  //set user when logged in
  useEffect(() => {
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
  }, [user]);

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(logout());
    console.log("logged out");
  };

  console.log("current user:", user);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      {user !== "" && (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
              </IconButton>
              <Button color="inherit">
                <Link to='/'>Home</Link>
              </Button>
              <Button color="inherit">
                <Link to='/users'>users</Link>
              </Button>
              <Button color="inherit">
                <em>{user.username} logged in</em>
              </Button>        
              <Button color='inherit' onClick={logOut}>
                logout
              </Button>        
            </Toolbar>
          </AppBar>
          <h2>Blog List</h2>
        </div>
      )}
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate replace to="/" />}
        />
        <Route
          path="/"
          element={user ? <BlogList /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={
            user ? <User users={users} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <Blog blogs={blogs} user={user} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
