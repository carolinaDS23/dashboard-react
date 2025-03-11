import axios from "axios";

const API_URL = "http://localhost:5296/api/Comment"; 

const commentService = {
  getComments: async (page, pageSize, orden = "desc", idPost) => {
    try {
      const response = await axios.get(`${API_URL}/paginado-admin`, {
        params: { page, pageSize, orden, idPost},
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo los comentarios:", error);
      throw error;
    }
  },

  blockComment: async (idComment) => {
    try {
      const response = await axios.put(`${API_URL}/bloquear/${idComment}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error bloqueando el Comment:", error);
      throw error;
    }
  },

  activateComment: async (idComment) => {
    try {
      const response = await axios.put(`${API_URL}/activar/${idComment}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.data.success){
        console.error("Error activando el Comment:", response.data.message);
        alert(response.data.message)
      }
      return response.data;
    } catch (error) {
      console.error("Error activando el Comment:", error);
      throw error;
    }
  },

  deleteComment: async (idComment) => {
    try {
      const response = await axios.delete(`${API_URL}/${idComment}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.data.success){
        console.error("Error eliminando el Comment:", response.data.message);
        alert(response.data.message)
      }
      return response.data;
    } catch (error) {
      console.error("Error eliminando el Comment:", error);
      throw error;
    }
  }

}

  export default commentService