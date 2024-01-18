import { useState } from "react";
import { setNotif, resetNotifAfter } from "../reducers/notifReducer";
import { login } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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
          <TextField
            label="username"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <Button
          id="login-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
