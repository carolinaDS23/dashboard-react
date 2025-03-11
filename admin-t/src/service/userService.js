import axios from "axios"; 
export const login = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5296/api/Login",
      credentials,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );

    if (response.data.success) {
      localStorage.setItem("token", response.data.token); // Guarda el token
      alert(response.data.message || "Inicio de sesión exitoso");
      return response.data;
    } else {
      alert(response.data.message || "Error al iniciar sesión.");
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("❌ Error en login:", error.response?.data);
    alert(error.response?.data?.message || "Error en el inicio de sesión.");
  }
};

export const getAdministratorsPaged = async (page, pageSize,searchTerm) => {
  try {
    const response = await axios.get("http://localhost:5296/api/User/paginado", { 
      params: { page, pageSize,searchTerm  },
       headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`, 
       },
    });    
    return response.data;
  } catch (error) {
    console.error("❌ Error en getAdministratorsPaged:", error);
    throw error.response?.data?.message || "Error al obtener usuarios.";
  }
};
export const deleteUserAsAdmin = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5296/api/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("✅ Usuario eliminado:", response.data);

    return {
      success: response.data.success ?? false, 
      message: response.data.message || "Usuario eliminado correctamente.",
    };
  } catch (error) {
    console.error("❌ Error en deleteUserAsAdmin:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error al eliminar usuario.",
    };
  }
};


 export const updateUser = async (idUser, updatedData) => {
  try {
        const response = await axios.put(`http://localhost:5296/api/User/modificar/${idUser}`,
        updatedData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );
if (response.data.success) { 
  alert(response.data.message );
  return response.data;
} else {
  alert(response.data.message || "Ocurrió un error al actualizar el usuario.");
  console.log (response.data.message)
}

  } catch (error) {
    console.error("❌ Error en updateUser:", error.response?.data);
  }
};


export const blockUser = async (idUser) => {
  try {
    const response = await axios.put(
      `http://localhost:5296/api/User/bloquear/${idUser}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert(response.data.message);
      return response.data;
    } else {
      alert(response.data.message || "Ocurrió un error al bloquear el usuario.");
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("❌ Error en blockUser:", error.response?.data || error.message);
  }
};

export const activateUser = async (idUser) => {
  try {
    console.log(`🔵 Intentando activar usuario con ID: ${idUser}`);

    const response = await axios.put(
      `http://localhost:5296/api/User/activar/${idUser}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert(response.data.message);
      return response.data;
    } else {
      alert(response.data.message || "Ocurrió un error al activar el usuario.");
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("❌ Error en activateUser:", error.response?.data || error.message);
  }
};


export const getUserById = async (idUser) => {
  try {
    const response = await axios.get(`http://localhost:5296/api/User/${idUser}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("Respuesta de getUserById:", response.data);  // Log para ver el usuario obtenido

    if (response.data) {
      return response.data; // Devuelve el usuario obtenido
    } else {
      alert("No se encontró el usuario.");
    }
  } catch (error) {
    console.error("❌ Error en getUserById:", error.response?.data);
    alert("Ocurrió un error al obtener el usuario.");
  }
};








