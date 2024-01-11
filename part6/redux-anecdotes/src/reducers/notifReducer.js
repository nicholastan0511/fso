import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notification (state, action) {
      return action.payload
    }
  }
})

export const { notification } = notifSlice.actions

export const setNotification = (notif, time) => {
  return async dispatch => {
    dispatch(notification(notif))
    setTimeout(() => {
      dispatch(notification(null))
    }, time * 1000)
  }
}

export default notifSlice.reducer