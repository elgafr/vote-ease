import { BASE_URL } from "./apiPaths";
import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error! Please try again later...");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out! Please try again later...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
