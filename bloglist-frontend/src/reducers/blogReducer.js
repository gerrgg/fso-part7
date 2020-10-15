import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "NEW_BLOG": {
      return [...state, action.data];
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
