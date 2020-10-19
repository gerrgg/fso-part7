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

  test("returns a new state with action DELETE_BLOG with the passed object", () => {
    const state = [
      {
        title: "If it hurts, do it more often",
        author: "greg",
        url: "greg.com",
        id: 10,
      },
    ];

    const action = {
      type: "DELETE_BLOG",
      data: { id: 10 },
    };

    deepFreeze(state);

    expect(state).toHaveLength(1);

    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(0);
  });

  test("returns a new state with action LIKE_BLOG with the passed object", () => {
    const state = [
      {
        title: "If it hurts, do it more often",
        author: "greg",
        url: "greg.com",
        likes: 10,
        id: 10,
      },
    ];

    const action = {
      type: "LIKE_BLOG",
      data: { id: 10 },
    };

    deepFreeze(state);

    expect(state).toHaveLength(1);

    const newState = blogReducer(state, action);

    expect(newState[0].likes).toBe(state[0].likes + 1);
  });

  test("returns the new updated blog", () => {
    const state = [
      {
        title: "If it hurts, do it more often",
        author: "greg",
        url: "greg.com",
        likes: 10,
        id: "5f6ca01920701e1f7d129d7a",
        comments: ["5f8df04a8101306855c41b0a"],
      },
    ];

    const action = {
      type: "UPDATE_BLOG_COMMENTS",
      data: {
        id: "5f6ca01920701e1f7d129d7a",
        newComment: "5f8ddb387b650b662bb19ccb",
      },
    };

    deepFreeze(state);

    const newState = blogReducer(state, action);

    expect(newState[0].comments).toContain(action.data.newComment);
  });
});
