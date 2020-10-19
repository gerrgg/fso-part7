import React from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  const commentDate = () => {
    const date = comment.date.substring(0, 10);
    return moment(date, "YYYY-MM-DD").fromNow();
  };

  return (
    <div className="comment">
      <small className="posted-on">{commentDate()}</small>
      <p className="content">{comment.content}</p>
    </div>
  );
};

export default Comment;
