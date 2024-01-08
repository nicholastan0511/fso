import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anec'

const anecSlice = createSlice({
  name: 'anecs',
  initialState: [],
  reducers: {
    createNew (state, action) {
      state.push(action.payload)
    },
    vote (state, action) {
      const id = action.payload.id
      const toChange = state.find(n => n.id === id)
      console.log(toChange)
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

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(setAnecs(anecs))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(createNew(newAnec))
  }
}

export const voteAnec = (anecVoted) => {
  return async dispatch => {
    const updatedAnec = await anecService.vote(anecVoted)
    dispatch(vote(updatedAnec))
  }
}

export default anecSlice.reducer