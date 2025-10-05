import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tickify-server.vercel.app/api/v1",
  // baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export default axiosPublic;
