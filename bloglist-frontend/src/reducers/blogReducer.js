import { useResource } from "../hooks/index";
import { setNotification } from "./notificationReducer";

const blogService = useResource("http://localhost:3003/api/blogs");

const blogReducer = (state = [], action) => {
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

    case "LIKE_BLOG": {
      const id = action.data.id;
      const likedBlog = state.find((n) => n.id === id);

      const changedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1,
      };

      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
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
      await blogService.remove(id, token);

      dispatch({
        type: "DELETE_BLOG",
        data: { id },
      });

      dispatch(setNotification("Delete successful"));
    } catch (e) {
      console.log(e);
      dispatch(setNotification(`Delete failed: ${e.message}`));
    }
  };
};

export const likeBlog = (id, objectToUpdate) => {
  return async (dispatch) => {
    try {
      const updatedObject = {
        ...objectToUpdate,
        likes: objectToUpdate.likes + 1,
      };

      console.log(id, updatedObject);

      await blogService.update(id, updatedObject);

      dispatch({
        type: "LIKE_BLOG",
        data: { id },
      });

      dispatch(setNotification("Update successful"));
    } catch (e) {
      console.log(e);
      dispatch(setNotification(`Update failed: ${e.message}`));
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
