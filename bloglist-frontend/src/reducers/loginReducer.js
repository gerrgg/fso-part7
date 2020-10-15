import blogService from "../services/blogs";
import loginService from "../services/login";

import { setNotification } from "../reducers/notificationReducer";

const loginReducer = (state = [], action) => {
  // console.log("STATE:", state);
  // console.log("ACTION:", action);

  switch (action.type) {
    case "LOGIN_USER": {
      return action.data;
    }

    case "LOGOUT_USER":
      return null;

    default:
      return state;
  }
};

// check local storage and cookes for user object on init
export const initializeLogin = () => {
  return async (dispatch) => {
    // check local storage for user object
    const loggedInUser = window.localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      // Parse JSON for user object
      const userObject = JSON.parse(loggedInUser);

      blogService.setToken(userObject.token);

      // dispatch user data to frontend
      dispatch({
        type: "LOGIN_USER",
        data: userObject,
      });
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      // set to local storage
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      // set token for blogs
      blogService.setToken(user.token);

      dispatch({ type: "LOGIN_USER", data: user });
      dispatch(setNotification("Login successful"));
    } catch (e) {
      dispatch(setNotification("Invalid password / username combo"));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch({ type: "LOGOUT_USER" });
  };
};

export default loginReducer;
