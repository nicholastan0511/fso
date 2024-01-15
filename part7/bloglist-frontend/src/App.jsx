import Error from "./components/Error";
import { initBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { setUser } from "./reducers/userReducer";
import blogService from "./services/blogs"

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //get blogs from server
  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  //retrieving user information from local storage and save user's token to the frontend
  //everytime the page gets reloaded
  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Error />
      {user === "" && <LoginForm />}
      {user !== "" && <BlogList />}
    </div>
  );
};

export default App;
