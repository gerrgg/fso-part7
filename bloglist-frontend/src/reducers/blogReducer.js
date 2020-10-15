import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogReducer = (state = [], action) => {
  console.log("STATE:", state);
  console.log("ACTION:", action);

  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "NEW_BLOG": {
      return [...state, action.data];
    }

    case "DELETE_BLOG": {
      const id = action.data.id;
      return state.filter((blog) => blog.id !== id);
    }

    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);

      dispatch({
        type: "NEW_BLOG",
        data: createdBlog,
      });

      dispatch(
        setNotification(
          `${createdBlog.title} by ${createdBlog.author} created!`
        )
      );
    } catch (e) {
      dispatch(setNotification(`Creating blog failed: ${e.message}`));
    }
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    try {
      // DO NOT USE SELECTORS IN THE REDUCER
      const deletedBlog = await blogService.remove(id, token);

      dispatch({
        type: "DELETE_BLOG",
        data: { id: id },
      });

      dispatch(setNotification("Delete successful"));
    } catch (e) {
      console.log(e);
      dispatch(setNotification(`Delete failed: ${e.message}`));
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export default blogReducer;
