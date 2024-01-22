import { useParams, useNavigate } from "react-router-dom"
import { SET_BIRTH } from "../queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS } from "../queries"

const Author = ({ authors }) => {
  const [ editAuthor ] = useMutation(SET_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const navigate = useNavigate()
  const [born, setBorn] = useState('')

  const id = useParams().id
  const author = authors.find(a => a.id === id)

  const submit = async (e) => {
    e.preventDefault()
    editAuthor( { variables: { name: author.name, setBornTo: Number(born) } } )
    setBorn('')
    navigate('/authors')
  }

  return (
    <div>
      <h1>Edit Author</h1>
      <form onSubmit={submit}>
        <div>
          <h3>{author.name}</h3>
        </div>
        <div>
          set birth
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Author