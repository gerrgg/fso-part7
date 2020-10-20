import React from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <CommentDate date={comment.date} />
      <p className="content">{comment.content}</p>
    </div>
  );
};

const CommentDate = ({ date }) => (
  <small className="posted-on">
    {moment(date, "YYYY-MM-DD hh:mm:ss A Z").fromNow()}
  </small>
);

export default Comment;
