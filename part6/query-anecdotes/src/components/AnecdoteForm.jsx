import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from '../requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecs.concat(newAnec))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0 })
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
