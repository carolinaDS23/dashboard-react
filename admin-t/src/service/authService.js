import axiosConfigs from "./axiosConfigs"; 


export const login = async (credentials) => {
  try {
    const response = await axiosConfigs.post("/login", credentials);
    console.log("Respuesta del backend:", response.data); // Agregar esto
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || "Error al iniciar sesión";
  }
};


export const register = async (user) => {
  try {
    const response = await fetch("http://localhost:5296/api/User", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error en el registro.");

    return data; // Devuelve la respuesta del servidor si todo está bien
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUsersPaged = async (page, pageSize) => {
  try {
    const response = await fetch(`http://localhost:5296/api/User/paginado?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si la API requiere autenticación
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en getUsersPaged:", error);
    return null;
  }
};

export const deleteUser = async (userId) => {
  console.log("🔄 Intentando eliminar usuario con ID:", userId); 
  try {
    const response = await fetch(`http://localhost:5296/api/User/eliminar/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Requiere autenticación
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Error al eliminar usuario.");
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("❌ Error en deleteUser:", error);
    return { success: false, message: error.message };
  }
};

export const updateUser = async (idUser, userData) => {
  try {
    const response = await fetch(`http://localhost:5296/api/User/modificar/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si se requiere autenticación
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al actualizar usuario.");

    return data;
  } catch (error) {
    console.error("❌ Error en updateUser:", error);
    throw new Error(error.message);
  }
};

export const activateUser = async (idUser) => {
  try {
    const response = await fetch(`http://localhost:5296/api/User/activar/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si la API requiere autenticación
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al activar usuario.");

    return data;
  } catch (error) {
    console.error("❌ Error en activateUser:", error);
    throw new Error(error.message);
  }
};

export const blockUser = async (idUser) => {
  try {
    const response = await fetch(`http://localhost:5296/api/User/bloquear/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si la API requiere autenticación
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al bloquear usuario.");

    return data;
  } catch (error) {
    console.error("❌ Error en blockUser:", error);
    throw new Error(error.message);
  }
};


