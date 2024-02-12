import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { Routes, Link, Route } from 'react-router-dom'
import Author from './components/Author'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors_results = useQuery(ALL_AUTHORS)
  const books_results = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const notify = (mes) => {
    setErrorMessage(mes)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000 )
  }

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm 
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (authors_results.loading || books_results.loading) 
    return <div>fetching data...</div>

  console.log(authors_results.data, books_results.data)

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage}/>
        <button onClick={logout}>logout</button>
        <Link to="/">Books</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/add">Add Book</Link>
      </div>

      <Routes>
        <Route path='/' element={<Books books={books_results.data.allBooks}/>} />
        <Route path='/authors' element={<Authors authors={authors_results.data.allAuthors}/>} />
        <Route path='/add' element={<NewBook setError={notify} />} />
        <Route path='/authors/:id' element={<Author authors={authors_results.data.allAuthors}/>} />
      </Routes>
    </div>
  )
}

export default App