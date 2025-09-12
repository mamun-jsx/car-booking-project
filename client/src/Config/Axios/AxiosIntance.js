import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://car-server-7u32.onrender.com/",
  // baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
