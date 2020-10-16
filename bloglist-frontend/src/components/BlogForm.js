import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => a.likes < b.likes).filter((blog) => blog.user)
  );

  return (
    <div>
      <LogoutButton />
      <h3>Blogs</h3>
      <Togglable buttonLabel="Create Blog">
        <CreateBlogForm />
      </Togglable>
      <div className="blogs">
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
};

const Blogs = ({ blogs }) => (
  <div className="blogs">
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="blog">
      <span>
        {blog.title} - {blog.author ? blog.author : "No Author"}
      </span>
      {show ? (
        <div className="details">
          <p className="url">URL: {blog.url}</p>
          <p className="likes">Likes: {blog.likes}</p>
          <button
            className="likesButton"
            onClick={() => dispatch(likeBlog(blog.id, { ...blog }))} // PASS USER PROP AS JUST USER.ID
          >
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
      ) : (
        <button onClick={() => setShow(!show)} style={{ marginLeft: 5 }}>
          View
        </button>
      )}
    </div>
  );
};

export default BlogForm;
