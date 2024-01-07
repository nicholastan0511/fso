import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notifReducer'
import anecService from '../services/anec'

const AnecForm = () => {
  const dispatch = useDispatch()
  const createHandler = async (e) => {
    e.preventDefault()
    const content = e.target.anec.value
    const newAnec = await anecService.createNew(content)
    dispatch(createNew(newAnec))
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



