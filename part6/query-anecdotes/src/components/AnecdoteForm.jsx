import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from '../requests'
import { useNotifDispatch } from "./NotifContext"

const AnecdoteForm = () => {

  const notifDispatch = useNotifDispatch()

  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecs.concat(newAnec))
    },
    onError: () => {
      notifDispatch({ type: 'ERROR', payload: 'anecdote too short, must have length 5 or more' })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0 })
    notifDispatch({ type: 'CREATE', payload: content })
    setTimeout(() => {
      notifDispatch({ type: 'RESET' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
