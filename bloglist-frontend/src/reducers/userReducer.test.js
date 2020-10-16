import userReducer from "./userReducer";
import deepFreeze from "deep-freeze";

describe("userReducer", () => {
  test("returns state when initialized with INIT_USERS", () => {
    const state = [];
    const action = {
      type: "INIT_USERS",
      data: [
        {
          username: "greg",
          name: "greg b",
          id: "5f624fabfb797256d9e4151a",
        },
      ],
    };

    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toEqual(action.data);
  });
});
