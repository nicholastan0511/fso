import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER } from './queries'
import { Routes, Link, Route } from 'react-router-dom'
import Author from './components/Author'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient } from '@apollo/client'

export const updateCache = (cache, query, bookAdded) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(bookAdded))
    }
  }) 
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors_results = useQuery(ALL_AUTHORS)
  const books_results = useQuery(ALL_BOOKS)
  const user = useQuery(USER)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      window.alert(`${bookAdded.title} added by ${user.data.me.username}`)
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded )
    }
  })

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

  if (authors_results.loading || books_results.loading || user.loading) 
    return <div>fetching data...</div>


  
  
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
        <Route path='/' element={<Books books={books_results.data.allBooks} user={user.data.me} />} />
        <Route path='/authors' element={<Authors authors={authors_results.data.allAuthors}/>} />
        <Route path='/add' element={<NewBook setError={notify} />} />
        <Route path='/authors/:id' element={<Author authors={authors_results.data.allAuthors}/>} />
      </Routes>
    </div>
  )
}

export default App