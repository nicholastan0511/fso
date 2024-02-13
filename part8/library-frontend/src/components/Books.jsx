import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const bookGenres = []
  let books = props.books

  props.books.forEach(book => {
    bookGenres.push(...book.genres)
  })

  const genres = bookGenres.filter((val, i, self) => self.indexOf(val) === i)

  if (genre !== '') {
    books = books.filter(book => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button onClick={() => setGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('')}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books