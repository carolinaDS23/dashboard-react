import axios from "axios";
import axiosConfigs from "../service/axiosConfigs";
//---------LOGIN--//
export const login = async (credentials) => {
  try {
    const response = await axiosConfigs.post("/Login", credentials);  
    console.log("✅ Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en el login:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Error al iniciar sesión";
  }
};


//---OBTENER ADMINISTRADORES PAGINADOS--//
export const getAdministratorsPaged = async (page, pageSize) => {
  try {
    const response = await axios.get("http://localhost:5296/api/User/paginado", { // ✅ Agregamos la URL completa
      params: { page, pageSize }, // ✅ Pasamos los parámetros correctamente
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Si la API requiere autenticación
      },
    });

    console.log("✅ Respuesta del backend:", response.data); // ✅ Depuración
    return response.data;
  } catch (error) {
    console.error("❌ Error en getAdministratorsPaged:", error);
    throw error.response?.data?.message || "Error al obtener usuarios.";
  }
};


//---ELIMINAR USUARIO COMO ADMIN--//
export const deleteUserAsAdmin = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5296/api/User/${userId}`, { // ✅ Agregamos la URL completa
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Incluimos el token si es requerido
      },
    });

    console.log("✅ Usuario eliminado por administrador:", response.data);
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("❌ Error en deleteUserAsAdmin:", error);
    return { success: false, message: error.response?.data?.message || "Error al eliminar usuario." };
  }
};


 //---MODIFICAR USUARIO--// 
 export const updateUser = async (userData) => {
  if (!userData?.idUser) {
    console.error("❌ Error: idUser es undefined o null");
    return {
      success: false,
      message: "Error: El ID de usuario es requerido.",
    };
  }

  try {
    console.log("📡 Datos enviados a la API:", JSON.stringify(userData, null, 2));

    const response = await axios.put(
      `http://localhost:5296/api/User/modificar/${userData.idUser}`, // ✅ Ahora el ID está validado
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en updateUser:", error.response?.status, error.response?.data);

    return {
      success: false,
      message: error.response?.data?.message || "Error al actualizar usuario.",
      errors: error.response?.data?.errors || null,
    };
  }
};
//---ACTIVAR USUARIO--//
export const activateUser = async (idUser) => {
  try {
    const response = await axios.put(`http://localhost:5296/api/User/activar/${idUser}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 📌 Se incluye el token
      },
    });

    console.log(`✅ Usuario con ID ${idUser} activado con éxito:`, response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en activateUser:", error);
    return { success: false, message: error.response?.data?.message || "Error al activar usuario." };
  }
};

 //---BLOQUEAR USUARIO--//
 export const blockUser = async (idUser) => {
  try {
    const response = await axios.put(
      `http://localhost:5296/api/User/bloquear/${idUser}`, 
      null, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(`✅ Usuario con ID ${idUser} bloqueado con éxito:`, response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en blockUser:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || "Error al bloquear usuario." 
    };
  }
};










// import axios from "axios";
// //import api from "./axiosConfigs"; // 👈 Importamos la configuración de Axios
// import axiosConfigs from "./axiosConfigs"; 
// import { deleteUser } from "../../service/apiService";



// export const getUsersPaged = async (page, pageSize) => {
//   const token = localStorage.getItem("token"); // Recuperar el token del localStorage
//   console.log("🔑 Token recuperado:", token); // Para depuración

//   if (!token) {
//     console.error("🚨 No hay token disponible. El usuario debe iniciar sesión.");
//     return null;
//   }

//   try {
//     const response = await axios.get(`http://localhost:5296/api/User/paginado`, {
//       params: { page, pageSize },
//       headers: {
//         Authorization: `Bearer ${token}`, // 🔥 Se agrega el token en la cabecera
//       },
//     });

//     console.log("✅ Respuesta del backend:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error obteniendo usuarios:", error.response?.data || error);
//     return null;
//   }
// };

// export const updateUser = async (id, userData) => {
//   if (!id) {
//     console.error("🚨 Error en updateUser: ID es undefined o null.");
//     return null;
//   }

//   try {
//     console.log(`🟢 Enviando PUT a /User/modificar/${id} con:`, userData);
//     const response = await axios.put(`/api/User/modificar/${id}`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error actualizando usuario:", error.response?.data || error);
//     throw error;
//   }
// };



// export const deleteUser = async (userId) => {
//   try {
//       const response = await axiosConfigs.delete(`/User/${userId}`);
//       return response.data; // Retorna la respuesta si es exitosa
//   } catch (error) {
//       console.error("❌ Error eliminando usuario:", error.response?.data || error);
//       return null;
//   }
// };





// export const deleteUser = async (userId) => {
//   try {
//     const response = await axios.delete(`http://localhost:5296/api/User/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // Si la API requiere autenticación
//       },
//     });

//     return response.data; // El return debe estar fuera de axios.delete
//   } catch (error) {
//     console.error("Error eliminando usuario:", error);
//     return null;
//   }
// };

// export const changeUserStatus = async (userId, action) => {
//   const endpoint = action === "activar" ? "activar" : "bloquear";
//   try {
//     const response = await axios.put(`/api/User/${endpoint}/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error cambiando estado del usuario:", error);
//     return null;
//   }
// };

// export const getUsersPaged = async (page, pageSize) => {
//   console.log("📌 Parámetros enviados:", { page, pageSize }); // Depuración

//   try {
//     const response = await axios.get(`http://localhost:5296/api/User/paginado`, {
//       params: { page, pageSize },
//     });

//     console.log("✅ Respuesta del backend:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error obteniendo usuarios:", error.response?.data || error);
//     return null;
//   }
// };

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5296",
//   headers: { "Content-Type": "application/json" }
// });

// export const getUsersPaged = async (page, limit) => {
//   try {
//     const response = await axios.get(`/api/User/paginado?page=${page}&limit=${limit}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error obteniendo usuarios:", error);
//     return null;
//   }
// };

// export const updateUser = async (userId, data) => {
//   try {
//     const response = await axios.put(`/api/User/modificar/${userId}`, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error actualizando usuario:", error);
//     return null;
//   }
// };
