import React from "react";
import { useParams } from "react-router-dom";
import Blogs from "./Blogs";

const User = ({ users }) => {
  const id = useParams().id;

  const user = users.find((n) => id === n.id);

  if (!user) return null;

  return (
    <div id="user">
      <h2 className="title">
        {user.username} <span className="name">&lt;{user.name}&gt;</span>
      </h2>
      <h5>Blogs</h5>
      <ul className="blogs">
        <Blogs blogs={user.blogs} />
      </ul>
    </div>
  );
};

export default User;
