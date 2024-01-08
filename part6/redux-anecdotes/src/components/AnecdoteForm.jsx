import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecForm = () => {
  const dispatch = useDispatch()
  const createHandler = async (e) => {
    e.preventDefault()
    const content = e.target.anec.value
    dispatch(createAnec(content))
    dispatch(setNotification(`${content} added`, 5))
    e.target.anec.value = ''
  }  

  return (
    <form onSubmit={createHandler}>
      <div><input name='anec'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecForm



