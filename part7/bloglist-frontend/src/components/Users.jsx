import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
