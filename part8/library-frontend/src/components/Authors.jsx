import { Link } from "react-router-dom"
import EditAuthor from "./EditAuthor"

const Authors = (props) => {

    console.log(props.authors, props.authors[0].id)
  
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {props.authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
                <td>
                  <button>
                    <Link to={`/authors/${a.id}`}>edit</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditAuthor authors={props.authors} />
      </div>
    )
  }
  
  export default Authors