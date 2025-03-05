//----ultimo modificado --//
import axios from "axios"; 

const axiosConfigs = axios.create({ // ✅ Usa axios.create()
  baseURL: "http://localhost:5296/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token automáticamente 
axiosConfigs.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("✅ Token agregado al header:", config.headers.Authorization);
    } else {
      console.warn("⚠️ No hay token en localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 📌 Interceptor para manejar respuestas y errores globalmente
axiosConfigs.interceptors.response.use(
  (response) => response, // Devolvemos la respuesta si no hay error
  (error) => {
    console.error("❌ Error en la respuesta de la API:", error.response);

    // 📌 Si la respuesta tiene un código 401 (No autorizado), limpiar el token y redirigir a login
    if (error.response?.status === 401) {
      console.warn("⚠️ Token inválido o expirado. Cerrando sesión...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirige a la página de inicio de sesión
    }

    return Promise.reject(
      error.response?.data?.message || "Error en la comunicación con el servidor."
    );
  }
);

export default axiosConfigs;

