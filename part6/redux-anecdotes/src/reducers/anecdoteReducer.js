import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecSlice = createSlice({
  name: 'anecs',
  initialState: [],
  reducers: {
    createNew (state, action) {
      state.push(action.payload)
    },
    vote (state, action) {
      const id = action.payload
      const toChange = state.find(n => n.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(n => 
        n.id !== id ? n : changed  
      )
    },
    setAnecs(state, action) {
      return action.payload
    }
  }
})

export const { createNew, vote, setAnecs } = anecSlice.actions
export default anecSlice.reducer