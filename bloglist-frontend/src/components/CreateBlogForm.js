import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useField } from "../hooks/index.js";

const CreateBlogForm = ({ user }) => {
  const dispatch = useDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    // The new blog object
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user,
    };

    // Call the function which creates the blog and create new state
    dispatch(createBlog(newBlog));
    // clear inputs after successful submission
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <p>
        Title:
        <input {...title} />
      </p>
      <p>
        Author:
        <input {...author} />
      </p>
      <p>
        Url:
        <input {...url} />
      </p>
      <input id="submitBlog" type="submit" value="Create" />
    </form>
  );
};

export default CreateBlogForm;
