import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { Routes, Link, Route } from 'react-router-dom'
import Author from './components/Author'

const App = () => {
  const authors_results = useQuery(ALL_AUTHORS)
  const books_results = useQuery(ALL_BOOKS)

  if (authors_results.loading || books_results.loading) 
    return <div>fetching data...</div>

  return (
    <div>
      <div>
        <Link to="/">Books</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/add">Add Book</Link>
      </div>

      <Routes>
        <Route path='/' element={<Books books={books_results.data.allBooks}/>} />
        <Route path='/authors' element={<Authors authors={authors_results.data.allAuthors}/>} />
        <Route path='/add' element={<NewBook/>} />
        <Route path='/authors/:id' element={<Author authors={authors_results.data.allAuthors}/>} />
      </Routes>
    </div>
  )
}

export default App