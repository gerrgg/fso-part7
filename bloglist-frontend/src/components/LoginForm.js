import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { loginUser } from "../reducers/loginReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("password");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username.value, password.value));
  };

  return (
    <form id="loginForm" onSubmit={handleLogin}>
      <h1>Login</h1>
      <p>
        Username
        <input {...username} />
      </p>
      <p>
        Password
        <input {...password} />
      </p>
      <button id="loginButton" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
