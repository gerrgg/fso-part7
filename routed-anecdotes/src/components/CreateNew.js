import React from "react";
import { useField } from "../hooks/CreateNew.js";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = (e) => {
    let inputs = [content, author, info];
    inputs.forEach((input) => input.clear());
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button
          type="reset"
          onClick={() => {
            handleReset();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
