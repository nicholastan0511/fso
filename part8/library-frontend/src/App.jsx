import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const authors_results = useQuery(ALL_AUTHORS)
  const books_results = useQuery(ALL_BOOKS)

  if (authors_results.loading || books_results.loading) 
    return <div>fetching data...</div>

  console.log(authors_results)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'}  authors={authors_results.data.allAuthors} />

      <Books show={page === 'books'} books={books_results.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App