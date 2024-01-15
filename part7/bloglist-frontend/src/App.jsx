import Users from "./components/Users";
import { initBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import { setUser } from "./reducers/userReducer";
import blogService from "./services/blogs";
import { Routes, Route, Navigate } from "react-router-dom";
import { logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true)

  //get blogs from server
  useEffect(() => {
    dispatch(initBlogs());

    //retrieving user information from local storage and save user's token to the frontend
    //everytime the page gets reloaded
    const userJSON = window.localStorage.getItem("loggedBlogUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }

    setLoading(false)
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
    return <div>loading...</div>
  }

  return (
    <div>
      {user !== "" && (
        <div>
          <h2>Blog List</h2>
          <div>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
          </div>
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
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />}/>
      </Routes>
    </div>
  );
};

export default App;
