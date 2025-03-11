import axios from "axios";

const API_URL = "http://localhost:5296/api/Post"; 

const postService = {
  getPosts: async (page, pageSize, orden = "desc") => {
    try {
      const response = await axios.get(`${API_URL}/paginado-admin`, {
        params: { page, pageSize, orden },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo los posteos:", error);
      throw error;
    }
  },

  getPostById: async (idPost) => {
    try {
      const response = await axios.get(`${API_URL}/${idPost}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //ACA PEGO EL localStorage.getItem("token") GENERADO POR EL LOGIN
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo el post:", error);
      throw error;
    }
  },

  


  updatePost: async (idPost, postData) => {
    try {
      const response = await axios.put(`${API_URL}/modificar/${idPost}`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error actualizando el post:", error);
      throw error;
    }
  },
  


  blockPost: async (idPost) => {
    try {
      const response = await axios.put(`${API_URL}/bloquear/${idPost}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error bloqueando el post:", error);
      throw error;
    }
  },

  activatePost: async (idPost) => {
    try {
      const response = await axios.put(`${API_URL}/activar/${idPost}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.data.success){
        console.error("Error activando el post:", response.data.message);
        alert(response.data.message)
      }
      return response.data;
    } catch (error) {
      console.error("Error activando el post:", error);
      throw error;
    }
  },

  deletePost: async (idPost) => {
    try {
      const response = await axios.delete(`${API_URL}/${idPost}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.data.success){
        console.error("Error eliminando el post:", response.data.message);
        alert(response.data.message)
      }
      return response.data;
    } catch (error) {
      console.error("Error eliminando el post:", error);
      throw error;
    }
  },
};

export default postService;
