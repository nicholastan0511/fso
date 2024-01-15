import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch(setUser(user));
  };
};
