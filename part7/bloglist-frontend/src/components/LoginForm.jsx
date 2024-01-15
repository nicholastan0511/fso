import { useState, useEffect } from "react";
import { setNotif, resetNotifAfter } from "../reducers/notifReducer";
import { login } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  //   if (user !== '') {
  //     navigate('/')
  //   }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(login(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotif("Invalid credentials!"));
      dispatch(resetNotifAfter(5));
    }
  };

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
