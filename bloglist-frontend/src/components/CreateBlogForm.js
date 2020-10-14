import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const CreateBlogForm = ({ blogs, setBlogs, setNotification, user }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url, user }));
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <p>
        Title:
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </p>
      <p>
        Author:
        <input
          type="text"
          id="author"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </p>
      <p>
        Url:
        <input
          type="text"
          id="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </p>
      <input id="submitBlog" type="submit" value="Create" />
    </form>
  );
};

export default CreateBlogForm;
