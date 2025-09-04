import axios from "axios";
import axiosPublic from "../utils/axiosPublic";

const apiConfig = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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
apiConfig.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
apiConfig.interceptors.response.use(
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
        }).then(() => apiConfig(originalRequest));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await axiosPublic.post("/auth/refresh-access-token");
        processQueue(null);
        return apiConfig(originalRequest);
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

const useAxiosSecure = () => apiConfig;

export default useAxiosSecure;
