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
export default notifSlice.reducer