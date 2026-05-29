import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBlog as createBlogRequest,
  deleteBlog as deleteBlogRequest,
  getBlogById,
  getBlogs,
  updateBlog as updateBlogRequest
} from "../api/blogApi";

const initialState = {
  items: [],
  selected: null,
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  loading: false,
  saving: false,
  error: null
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getBlogs(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBlogById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createBlogRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateBlogRequest(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteBlogRequest(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload.data || null;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      .addCase(createBlog.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.saving = false;
        state.selected = action.payload.data || null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || action.error;
      })
      .addCase(updateBlog.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.saving = false;
        state.selected = action.payload.data || null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || action.error;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || action.error;
      });
  }
});

export const { clearSelected } = blogSlice.actions;

export default blogSlice.reducer;
