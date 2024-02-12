import { useState } from "react"
import { REGISTER } from "../queries"
import { useMutation } from "@apollo/client"

const RegisForm = () => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setFav] = useState('')
  const [ register, result ] = useMutation(REGISTER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
  const reg = (e) => {
    e.preventDefault()
    register({ variables: { username, favoriteGenre } })
    
  }

  return (
    <div>
      <form onSubmit={reg}>
        <div>
            username:
          <input value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          fav genre
          <input value={favoriteGenre} onChange={({ target }) => setFav(target.value)} />
        </div>
        <div>
          <button type="submit">register</button>
        </div>

      </form>
    </div>
  )
}

export default RegisForm