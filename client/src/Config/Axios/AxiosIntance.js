import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://car-server-7u32.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
