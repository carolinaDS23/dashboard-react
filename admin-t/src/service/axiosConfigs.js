import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5296/login", // Base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
