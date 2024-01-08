import { useDispatch, useSelector } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecList = () => {
  const anecdotes = useSelector(state => { 
    if (state.filter !== '') {
      const regex = new RegExp(state.filter, 'gi')
      return state.anecs.filter(anec => regex.test(anec.content))
    }
    return state.anecs
  })

  const dispatch = useDispatch()

  const voteHandler = (id) => {
    const anecVoted = anecdotes.find(a => a.id === id)
    dispatch(voteAnec(anecVoted))
    dispatch(setNotification(`You voted for ${anecVoted.content}`, 5))
  }

  const orderByLikes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {orderByLikes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

export default AnecList