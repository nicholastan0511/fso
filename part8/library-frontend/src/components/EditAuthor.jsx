import { SET_BIRTH } from "../queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS } from "../queries"

const EditAuthor = ({ authors }) => {
  const [ editAuthor ] = useMutation(SET_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    editAuthor( { variables: { name: selected, setBornTo: Number(born) } } )
    setBorn('')
  }

  return (
    <div>
      <h1>Set Birth</h1>
      <form onSubmit={submit}>
        <div>
          <select name="author" value={selected} onChange={({ target }) => setSelected(target.value)}>
            <option value="">--Please choose an option--</option>
            {authors.map(a => 
              <option key={a.id} value={a.name}>{a.name}</option>    
            )}
          </select>
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

export default EditAuthor