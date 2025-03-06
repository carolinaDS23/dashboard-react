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


// export const login = async (credentials) => {
//   try {
//     const response = await axios.post("/Login", credentials);  
//     console.log("✅ Respuesta del backend:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error en el login:", error.response?.data?.message || error.message);
//     throw error.response?.data?.message || "Error al iniciar sesión";
//   }
// };



export const getAdministratorsPaged = async (page, pageSize) => {
  try {
    const response = await axios.get("http://localhost:5296/api/User/paginado", { 
      params: { page, pageSize },
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


export const activateUser = async (idUser) => {
  try {
    const response = await axios.put(`http://localhost:5296/api/User/activar/${idUser}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    }
  );
    console.log(`✅ Usuario con ID ${idUser} activado con éxito:`, response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en activateUser:", error);
    return { success: false, message: error.response?.data?.message || "Error al activar usuario." };
  }
};

 
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




