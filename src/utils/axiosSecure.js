import axios from "axios";
import axiosPublic from "./axiosPublic";

const axiosSecure = axios.create({
  baseURL: "https://tickify-server.vercel.app/api/v1",
  // baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);

    prom.resolve();
  });

  failedQueue = [];
};

// Request interceptor
axiosSecure.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosSecure.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    // If forbidden -> logout
    if (error.response?.status === 403) {
      // TODO: logout user
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosSecure(originalRequest));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await axiosPublic.post("/auth/refresh-access-token");
        processQueue(null);
        return axiosSecure(originalRequest);
      } catch (err) {
        processQueue(err);
        // TODO: logout user
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
