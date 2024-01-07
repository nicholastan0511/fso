import AnecForm from './components/AnecdoteForm'
import AnecList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification.jsx'
import { useEffect } from 'react' 
import anecService from './services/anec.js'
import { setAnecs } from './reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecService.getAll().then(anecs => dispatch(setAnecs(anecs)))
  })

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      filter: 
      <VisibilityFilter />
      <AnecList />
      <h2>create new</h2>
      <AnecForm />
     
    </div>
  )
}

export default App