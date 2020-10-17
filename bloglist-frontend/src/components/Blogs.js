import React from "react";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  if (!blogs) return null;

  return (
    <ul>
      {blogs.map((blog) => (
        <li>
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Blogs;
