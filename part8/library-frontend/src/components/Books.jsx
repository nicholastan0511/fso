import { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const bookGenres = []

  props.books.forEach(book => {
    bookGenres.push(...book.genres)
  })

  //filter duplicated genres
  const genres = bookGenres.filter((val, i, self) => self.indexOf(val) === i)

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      genre
    }
  })

  if (loading) return <div>fetching data...</div>
  if (error)
    console.log(error.message)

  console.log(data)


  return (
    <div>
      <h2>books</h2>
      {genre ? `current genre: ${genre}`
        : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {props.books.map((book) => (
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
        <button onClick={() => setGenre(props.user.favoriteGenre)}>
          show favorite
        </button>
        <button onClick={() => setGenre('')}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books