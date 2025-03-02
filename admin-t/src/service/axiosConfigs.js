//----ultimo modificado --//
import axios from "axios";

const axiosConfigs = axios.create({
  baseURL: "http://localhost:5296", // Base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token automáticamente
axiosConfigs.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfigs;




// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5296",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor para agregar token a cada petición
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role"); // Obtiene el rol del usuario

//     if (!token) {
//       console.warn("❌ No hay token disponible. Redirigiendo a login...");
//       window.location.href = "/login"; // Redirige al login si no hay token
//       return Promise.reject("No hay token disponible");
//     }

//     // Agrega el token a la cabecera
//     config.headers.Authorization = `Bearer ${token}`;

//     // Verifica si la ruta requiere permisos de administrador
//     const adminOnlyRoutes = ["/api/User/modificar", "/api/User/activar", "/api/User/eliminar"];
//     if (adminOnlyRoutes.some((route) => config.url.includes(route)) && role !== "Administrator") {
//       console.error("❌ No tienes permisos de administrador para esta acción.");
//       return Promise.reject("No autorizado: Se requieren permisos de administrador");
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Interceptor para manejar respuestas de error
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("🔒 Sesión expirada o token inválido. Redirigiendo a login...");
//       localStorage.clear(); // Limpia el almacenamiento local
//       window.location.href = "/login"; // Redirige al login
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;





// import axios from "axios";

// // Configurar la instancia de Axios
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5296", // Ajusta la URL según tu backend en .NET
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor para agregar token si existe
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Suponiendo que guardas el token en localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

//export default axiosInstance;

//---------------este anda 
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5296",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor para agregar token a cada petición
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("No hay token disponible");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
//---------------------------------


//  import axios from "axios"; 

//  const api = axios.create({
//      baseURL: "http://localhost:5296",
//      headers: {
//          "Content-Type": "application/json",
//      },
//  });

//  export default api; // ✅ Ahora exportamos 'api'

