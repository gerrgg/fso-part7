import loginReducer from "./loginReducer";
import deepFreeze from "deep-freeze";

describe("loginReducer", () => {
  test("returns the user object passed to it with type LOGIN_USER", () => {
    const state = {};

    const action = {
      type: "LOGIN_USER",
      data: {
        username: "greg",
        name: "greg bastianelli",
        password: "password",
        id: 12345,
        blogs: [],
      },
    };

    deepFreeze(state);
    const newState = loginReducer(state, action);
    expect(newState).toEqual(action.data);
  });

  test("returns NULL when passed 'LOGOUT_USER'", () => {
    const state = {};

    // log in
    const loginAction = {
      type: "LOGIN_USER",
      data: {
        username: "greg",
        name: "greg bastianelli",
        password: "password",
        id: 12345,
        blogs: [],
      },
    };

    deepFreeze(state);

    const loggedInState = loginReducer(state, loginAction);

    expect(loggedInState).toEqual(loginAction.data);

    // log out
    const loggedOutAction = {
      type: "LOGOUT_USER",
    };

    deepFreeze(state);

    const loggedOutState = loginReducer(loggedInState, loggedOutAction);

    expect(loggedOutState).toBeNull();
  });
});
