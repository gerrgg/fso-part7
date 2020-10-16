import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.loggedInUser);

  return (
    <div id="logoutButton">
      <strong>{user.name} is logged in</strong>
      <br />
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};

export default LogoutButton;
