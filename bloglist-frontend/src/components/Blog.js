import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

const Blog = ({ blogs, loggedInUser }) => {
  // get id from url parameter
  const id = useParams().id;

  // find the blog by finding the blog with the same id as the param
  const blog = blogs.find((n) => n.id === id);

  // do nothing without a blog
  if (!blog) return null;

  return (
    <div className="blog">
      <BlogHeader blog={blog} />
      <BlogUrl url={blog.url} />
      <BlogLikes blog={blog} />
      <BlogUser user={blog.user} />
      <BlogDeleteButton
        blogID={blog.id}
        user={blog.user}
        loggedInUser={loggedInUser}
      />
      <CreateCommentForm />
      <BlogComments comments={blog.comments} />
    </div>
  );
};

const BlogHeader = ({ blog }) => (
  <h2 className="header">
    {blog.title} - {blog.author ? blog.author : "No Author"}
  </h2>
);

const BlogUrl = ({ url }) => (
  <p className="url">
    URL: <a href={url}>{url}</a>
  </p>
);

const BlogLikes = ({ blog }) => {
  const dispatch = useDispatch();

  // copy of the blog to pass to update
  const updatedBlog = { ...blog, user: blog.user.id };

  return (
    <div className="likes">
      <p>Likes: {blog.likes}</p>
      <button
        className="likesButton"
        onClick={() => dispatch(likeBlog(blog.id, updatedBlog))} // PASS USER PROP AS JUST USER.ID
      >
        Like
      </button>
    </div>
  );
};

const BlogUser = ({ user }) => (
  <p className="user">
    User: {user ? <Link to={`/user/${user.id}`}>{user.username}</Link> : null}
  </p>
);

const BlogDeleteButton = ({ blogID, user, loggedInUser }) => {
  const dispatch = useDispatch();

  return (
    <div className="deleteButton">
      {user.id === loggedInUser.id ? (
        <button
          className="delete"
          onClick={() => dispatch(deleteBlog(blogID, loggedInUser.token))}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
};

const BlogComments = ({ comments }) => {
  if (comments.length === 0) return null;

  return (
    <div className="comments">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Blog;
