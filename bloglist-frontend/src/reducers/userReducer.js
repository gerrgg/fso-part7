import { useResource } from "../hooks/index";

const userService = useResource("http://localhost:3003/api/users");

const userReducer = (state = [], action) => {
  console.log("STATE:", state);
  console.log("ACTION:", action);

  switch (action.type) {
    case "INIT_USERS":
      return action.data;

    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};

export default userReducer;
