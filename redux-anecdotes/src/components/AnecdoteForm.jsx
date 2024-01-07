import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notifReducer'

const AnecForm = () => {
  const dispatch = useDispatch()
  const createHandler = (e) => {
    e.preventDefault()
    dispatch(createNew(e.target.anec.value))
    dispatch(notification(`${e.target.anec.value} added`))
    e.target.anec.value = ''
    setTimeout(() => {
      dispatch(notification(null))
    }, 5000)
  }  

  return (
    <form onSubmit={createHandler}>
      <div><input name='anec'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecForm



