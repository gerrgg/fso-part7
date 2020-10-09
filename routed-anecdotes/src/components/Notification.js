import React from "react";

const Notification = ({ notification }) => {
  if (notification === "") return null;

  setTimeout(() => {
    notification = "";
  }, 10000);

  return <div className="notification">{notification}</div>;
};

export default Notification;
