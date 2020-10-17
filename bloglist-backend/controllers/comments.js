const commentsRouter = require("express").Router();

const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.get("/", async (request, response) => {
  // populate with the blog the comment is on
  const comments = await Comment.find({}).populate("blog", {
    title: 1,
    url: 1,
    likes: 1,
  });

  response.status(200).json(comments);
});

commentsRouter.post("/", async (request, response) => {
  const body = request.body;

  // get the blog object from the ID passed in the body
  const blog = await Blog.findById(body.blog).exec();

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
    date: new Date(),
  });

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(comment._id);

  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
