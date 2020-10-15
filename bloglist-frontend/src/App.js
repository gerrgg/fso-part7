import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

// components
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

// reducers
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLogin } from "./reducers/loginReducer";

// services
import blogService from "./services/blogs";

// GO!
function App() {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };

    try {
      await blogService.update(blog.id, updatedBlog);
      const blogs = await blogService.getAll();

      setBlogs(blogs);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setNotification({
        message: "blog deleted",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const Logo = () => (
    <h2>
      Free Speech
      <span role="img" aria-label="parrot">
        🤐
      </span>
    </h2>
  );

  return (
    <div>
      <Logo />
      <Notification notification={notification} />

      {user === null ? <LoginForm /> : <Blogs />}
    </div>
  );
}

export default App;
