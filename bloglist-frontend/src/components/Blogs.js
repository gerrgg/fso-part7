import React from "react";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  if (!blogs) return null;

  return (
    <div id="blogs">
      <h2>Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-xs-3">
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
