import blogReducer from "./blogReducer";
import deepFreeze from "deep-freeze";

describe("blogReducer", () => {
  test("returns state when initialized with blogs", () => {
    const state = [];
    const action = {
      type: "INIT_BLOGS",
      data: [
        {
          title: "If it hurts, do it more often",
          author: "greg",
          url: "greg.com",
        },
      ],
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toEqual(action.data);
  });

  test("returns a new state with action CREATE_blog with the passed object", () => {
    const state = [];

    const action = {
      type: "NEW_BLOG",
      data: {
        title: "If it hurts, do it more often",
        author: "greg",
        url: "greg.com",
      },
    };

    deepFreeze(state);

    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);

    const newestblog = newState.find((n) => n.id === action.data.id);

    expect(newestblog).toEqual(action.data);
  });
});
