import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

import { Link } from "react-router-dom";

const Header = () => {
  const Logo = () => (
    <a href="/" id="logo">
      Free Speech
      <span role="img" aria-label="parrot">
        🤐
      </span>
    </a>
  );

  const user = useSelector((state) => state.loggedInUser);

  return (
    <nav id="header">
      <Logo />
      <Link to="/">home</Link>
      <Link to="/users">Users</Link>
      <div className="header-right">{user ? <LogoutButton /> : null}</div>
    </nav>
  );
};

export default Header;
