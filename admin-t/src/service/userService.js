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
    const response = await axiosConfigs.get("User/paginado", { // ✅ Agregamos la URL completa
      params: { page, pageSize }, // ✅ Pasamos los parámetros correctamente
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Si la API requiere autenticación
      // },
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
    const response = await axiosConfigs.delete(`/User/${userId}`);
    console.log("✅ Usuario eliminado:", response.data);
    
    return {
      success: response.data.success ?? true, // 📌 Si el backend no envía `success`, asumimos `true`
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


//   const { idUser, ...updatedData } = userData; // 📌 Extraemos idUser
//   console.log("📡 Datos recibidos en updateUser:", userData);
//   if (!userData?.idUser) {
//     console.error("❌ Error: idUser es undefined o null");
//     return {
//       success: false,
//       message: "Error: El ID de usuario es requerido.",
//     };
//   }

//   try {
//     console.log("📡 Datos enviados a la API:", JSON.stringify(userData, null, 2));
//     const response = await axiosConfigs.put(`/User/modificar/${idUser}`, updatedData);
//     console.log("✅ Usuario actualizado:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error en updateUser:", error.response?.data);
//     return {
//       success: false,
//       message: error.response?.data?.message || "Error al actualizar usuario.",
//     };
//   }
// };
    
    
    //   console.log("✅ Usuario actualizado:", response.data);
  //   return response.data;
  //       // headers: {
  //       //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       //   "Content-Type": "application/json",
  //       // },
  //     }
  //   );

  //   console.log("✅ Respuesta del servidor:", response.data);
   
  // } catch (error) {
  //   console.error("❌ Error en updateUser:", error.response?.status, error.response?.data);

 
//---ACTIVAR USUARIO--//
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




