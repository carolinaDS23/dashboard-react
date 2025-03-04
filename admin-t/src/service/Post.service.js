import axios from "axios";
// const token = localStorage.getItem("token");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2lsbGlhbUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiVXNlcklkIjoiMSIsImV4cCI6MTc0MTEwODM3NSwiaXNzIjoiYXBpLnRhbGtpbmciLCJhdWQiOiJhcGkudGFsa2luZy51c2VycyJ9.AM_6nh350nl_MJ6zqzw-D9OyQWToDkG8e0b_RmpIhFY"

const API_URL = "http://localhost:5296/api/Post"; 

const postService = {
  getPosts: async (page, pageSize, orden = "desc") => {
    try {
      const response = await axios.get(`${API_URL}/paginado-admin`, {
        params: { page, pageSize, orden },
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }, //ACA PEGO EL TOKEN GENERADO POR EL LOGIN
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
          Authorization: `Bearer ${token}`,
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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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
