import axios from "axios";

export const register = async (user) => {
  try {
    const response = await axios.post("http://localhost:5296/api/User", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error en el registro.";
  }
};