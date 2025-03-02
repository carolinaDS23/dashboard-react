import api from "./axiosConfigs"; // 👈 Importamos la configuración de Axios

export const getUsersPaged = async (page, pageSize) => {
  try {
    const response = await api.get(`/api/User/paginado`, {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return null;
  }
};

export const updateUser = async (id, userData) => {
  if (!id) {
    console.error("🚨 Error en updateUser: ID es undefined o null.");
    return null;
  }

  try {
    console.log(`🟢 Enviando PUT a /api/User/modificar/${id} con:`, userData);
    const response = await api.put(`/api/User/modificar/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Error actualizando usuario:", error.response?.data || error);
    throw error;
  }
};


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5296",
//   headers: { "Content-Type": "application/json" }
// });

// export const getUsersPaged = async (page, limit) => {
//   try {
//     const response = await api.get(`/api/User/paginado?page=${page}&limit=${limit}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error obteniendo usuarios:", error);
//     return null;
//   }
// };

// export const updateUser = async (userId, data) => {
//   try {
//     const response = await api.put(`/api/User/modificar/${userId}`, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error actualizando usuario:", error);
//     return null;
//   }
// };

// export const deleteUser = async (userId) => {
//   try {
//     const response = await api.delete(`/api/User/eliminar/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error eliminando usuario:", error);
//     return null;
//   }
// };

// export const changeUserStatus = async (userId, action) => {
//   const endpoint = action === "activar" ? "activar" : "bloquear";
//   try {
//     const response = await api.put(`/api/User/${endpoint}/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error cambiando estado del usuario:", error);
//     return null;
//   }
// };

