import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      message: error.response?.data?.message || "Request failed",
      errors: error.response?.data?.errors || [],
      status: error.response?.status || 500
    };
    return Promise.reject(normalizedError);
  }
);

export default api;
