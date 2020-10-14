import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

// components
import Blog from "./components/Blog";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogReducer";

// services
import blogService from "./services/blogs";
import loginService from "./services/login";

// GO!
function App() {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );

  const Logo = () => (
    <h2>
      Free Speech
      <span role="img" aria-label="parrot">
        🤐
      </span>
    </h2>
  );

  const Blogs = () => {
    const blogs = useSelector((state) =>
      state.blogs.sort((a, b) => a.likes < b.likes)
    );

    return (
      <div>
        <LogoutButton user={user} />
        <h3>Blogs</h3>
        <Togglable buttonLabel="Create Blog">
          <CreateBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
            user={user}
          />
        </Togglable>
        <div className="blogs">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </div>
      </div>
    );
  };

  const LogoutButton = ({ user }) => {
    const logoutUser = () => {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
    };

    return (
      <div id="logout">
        <strong>{user.name} is logged in</strong>
        <br />
        <button onClick={() => logoutUser()}>Logout</button>
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // get user
      const user = await loginService.login({
        username,
        password,
      });

      // save user to localStorage
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      // make user token accessible to blogs
      blogService.setToken(user.token);

      // reset forms
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      // show error for 5 seconds
      setNotification({
        message: "Invalid username/password combination",
        type: "error",
      });

      setTimeout(() => {
        setNotification({});
      }, 5000);
    }
  };

  return (
    <div>
      <Logo />
      <Notification notification={notification} />

      {user === null ? loginForm() : <Blogs />}
    </div>
  );
}

export default App;
