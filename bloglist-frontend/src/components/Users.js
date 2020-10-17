import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div id="users">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const User = ({ user }) => (
  <tr>
    <td>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
);

export default Users;
