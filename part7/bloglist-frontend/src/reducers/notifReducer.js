import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
    resetNotif(state, action) {
      return "";
    },
  },
});

export const { setNotif, resetNotif } = notifSlice.actions;
export default notifSlice.reducer;

export const resetNotifAfter = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(resetNotif());
    }, time * 1000);
  };
};
