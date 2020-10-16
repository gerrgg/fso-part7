import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// components
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Header from "./components/Header";
import Users from "./components/Users";

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

  const user = useSelector((state) => state.loggedInUser);

  return (
    <Router>
      <div>
        <Header />
        <Notification />

        <Switch>
          <Route path="/users">
            <Users />
          </Route>

          <Route
            path="/"
            render={() => (user ? <BlogForm /> : <LoginForm />)}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
