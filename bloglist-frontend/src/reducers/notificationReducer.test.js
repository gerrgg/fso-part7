import notificationReducer from "./notificationReducer";
import deepFreeze from "deep-freeze";

describe("notificationReducer", () => {
  jest.useFakeTimers();

  test("SET_NOTIFICATION changes the state.notification", () => {
    const state = {};

    const action = {
      type: "SET_NOTIFICATION",
      data: {
        notification: "Setting notifications should be easy",
        timeout: 10,
      },
    };

    deepFreeze(state);

    const notification = notificationReducer(state, action);

    expect(notification).toMatch(action.data.notification);
  });
});
