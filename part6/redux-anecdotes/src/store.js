import anecReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifReducer from './reducers/notifReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecs: anecReducer,
    filter: filterReducer,
    notification: notifReducer
  }
})

export default store