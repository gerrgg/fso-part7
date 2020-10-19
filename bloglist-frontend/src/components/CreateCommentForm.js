import React from "react";

import { useParams } from "react-router-dom";
import { commentOnBlog } from "../reducers/blogReducer";

import { useDispatch } from "react-redux";
import { useField } from "../hooks";

const CreateCommentForm = () => {
  const dispatch = useDispatch();
  const blogID = useParams().id;

  const content = useField("text");

  const handleCreateComment = (event) => {
    event.preventDefault();

    const newComment = {
      content: content.value,
    };

    dispatch(commentOnBlog(blogID, newComment));

    content.onReset();
  };

  return (
    <form onSubmit={handleCreateComment}>
      <p>
        Comment:
        <input {...content} />
        <button>Comment</button>
      </p>
    </form>
  );
};

export default CreateCommentForm;
