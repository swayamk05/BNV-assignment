import api from "./axios";
import { buildQueryParams } from "../utils/query";

export const getBlogs = (params = {}) =>
  api.get(`/blogs${buildQueryParams(params)}`);

export const getBlogById = (id) => api.get(`/blogs/${id}`);

export const createBlog = (payload) => api.post("/blogs", payload);

export const updateBlog = (id, payload) => api.put(`/blogs/${id}`, payload);

export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export const exportBlogsCsv = (params = {}) =>
  api.get(`/blogs/export/csv${buildQueryParams(params)}`, {
    responseType: "blob"
  });
