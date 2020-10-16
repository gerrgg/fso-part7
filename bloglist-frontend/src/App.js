import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

// components
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

// reducers
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLogin } from "./reducers/loginReducer";

// GO!
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

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
      <Notification />

      {user === null ? <LoginForm /> : <BlogForm />}
    </div>
  );
}

export default App;
