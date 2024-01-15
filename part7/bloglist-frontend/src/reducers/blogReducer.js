import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      return state.concat(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    like(state, action) {
      console.log(action.payload.title)
      return state.map(blog => blog.id !== action.payload.id ? blog : { ...blog, likes: blog.likes + 1 })
    }
  },
});

export const { setBlogs, createBlog, removeBlog, like } = blogSlice.actions;
export default blogSlice.reducer;

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog);
    dispatch(createBlog(createdBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(removeBlog(blog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.like({ ...blog, likes: blog.likes + 1 })
    dispatch(like(blog))
  }
}

