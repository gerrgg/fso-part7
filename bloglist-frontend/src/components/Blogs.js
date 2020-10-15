import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";

import { deleteBlog } from "../reducers/blogReducer";

const Blogs = ({ handleDelete, handleLike }) => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => a.likes < b.likes)
  );

  return (
    <div>
      <LogoutButton />
      <h3>Blogs</h3>
      <Togglable buttonLabel="Create Blog">
        <CreateBlogForm />
      </Togglable>
      <div className="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export const Blog = ({ blog, handleLike, handleDelete }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="blog">
      <span>
        {blog.title} - {blog.author ? blog.author : "No Author"}
      </span>
      {show ? (
        <BlogDetails
          blog={blog}
          setShow={setShow}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ) : (
        <button onClick={() => setShow(!show)} style={{ marginLeft: 5 }}>
          View
        </button>
      )}
    </div>
  );
};

const BlogDetails = ({ blog, setShow, handleLike }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="details">
      <p className="url">URL: {blog.url}</p>
      <p className="likes">Likes: {blog.likes}</p>
      <button className="likesButton" onClick={() => handleLike(blog)}>
        Like
      </button>
      <p className="user">User: {blog.user ? blog.user.username : null}</p>
      <button className="hide" onClick={() => setShow(false)}>
        Hide
      </button>
      {blog.user.id === user.id ? (
        <button
          className="delete"
          onClick={() => dispatch(deleteBlog(blog.id, user.token))}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default Blogs;
