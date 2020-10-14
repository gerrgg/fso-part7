const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;

    default:
      return state;
  }
};

export const setNotification = (notification, timeout = 5000) => {
  return async (dispatch) => {
    // set the notification
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification,
      },
    });

    // set a timeout for the notification
    clearTimeout();
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: {
          notification: null,
        },
      });
    }, timeout);
  };
};

export default notificationReducer;
