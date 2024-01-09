import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAll, vote } from './requests'
import { useNotifDispatch } from './components/NotifContext'
   
const App = () => {

  const queryClient = useQueryClient()
  const notifDispatch = useNotifDispatch()

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (updatedAnec) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecs.map(anec => 
        anec.id !== updatedAnec.id ? anec : updatedAnec
      ))
    }
  })

  const results = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  console.log(JSON.parse(JSON.stringify(results)))

  if ( results.isLoading ) {
    return <div>loading data...</div>
  } else if (results.isError) {
    return <div>error fetching data from the server</div>
  }

  const anecdotes = results.data

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notifDispatch('VOTE', anecdote.content, 5)
    console.log('voted for ' + anecdote.content)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
