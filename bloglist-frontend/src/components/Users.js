import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
// init users with user reducer

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  return (
    <div id="users">
      <h2>Users</h2>
      <table class>
        <th>User</th>
        <th>Blogs created</th>
        {users.map((user) => (
          <User id={user.id} user={user} />
        ))}
      </table>
    </div>
  );
};

const User = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
);

export default Users;
