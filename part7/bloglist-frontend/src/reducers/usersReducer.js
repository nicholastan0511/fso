import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(setUsers(users));
  };
};
