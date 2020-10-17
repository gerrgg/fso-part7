import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

const Blog = ({ blogs, loggedInUser }) => {
  // for dispatching actions to state
  const dispatch = useDispatch();

  // get id from url parameter
  const id = useParams().id;

  // find the blog by finding the blog with the same id as the param
  const blog = blogs.find((n) => {
    console.log(n.id, id, n.id === id);
    return n.id === id;
  });

  // do nothing without a blog
  if (!blog) return null;

  // copy of the blog to pass to update
  const updatedBlog = { ...blog, user: blog.user.id };

  return (
    <div className="blog">
      <span>
        {blog.title} - {blog.author ? blog.author : "No Author"}
      </span>
      <div className="details">
        <p className="url">
          URL: <a href={blog.url}>{blog.url}</a>
        </p>
        <p className="likes">Likes: {blog.likes}</p>
        <button
          className="likesButton"
          onClick={() => dispatch(likeBlog(blog.id, updatedBlog))} // PASS USER PROP AS JUST USER.ID
        >
          Like
        </button>
        <p className="user">
          User:{" "}
          {blog.user ? (
            <Link to={`/user/${blog.user.id}`}>{blog.user.username}</Link>
          ) : null}
        </p>
        {blog.user.id === loggedInUser.id ? (
          <button
            className="delete"
            onClick={() => dispatch(deleteBlog(blog.id, loggedInUser.token))}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
