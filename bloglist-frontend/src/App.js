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
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";

// reducers
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLogin } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import CreateBlogForm from "./components/CreateBlogForm";

// GO!
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const state = useSelector((state) => state);

  return (
    <Router>
      <div>
        <Header />
        <Notification />

        <Switch>
          <Route path="/users">
            <Users users={state.users} />
          </Route>
          <Route path="/user/:id">
            <User users={state.users} />
          </Route>
          <Route path="/blog/:id">
            <Blog blogs={state.blogs} loggedInUser={state.loggedInUser} />
          </Route>

          <Route
            path="/"
            render={() =>
              state.loggedInUser ? <Blogs blogs={state.blogs} /> : <LoginForm />
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
