import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:5296/api/Course';

const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9kcmlAcm9kcmkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiVXNlcklkIjoiMSIsImV4cCI6MTc0MTIzMDM5NSwiaXNzIjoiYXBpLnRhbGtpbmciLCJhdWQiOiJhcGkudGFsa2luZy51c2VycyJ9.tQ5Q2kX_at0j2wzgNtnDhTHZfNkg41KPEhXlgnGOqsc"

// Configuración de los headers con el token de autenticación
const getHeaders = () => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

// Verificar que el token se envía correctamente
console.log("Headers enviados:", getHeaders());

// Obtener los cursos con paginación
export const getCoursesPaged = async (page, pageSize) => {
  try {
    const response = await axios.get(`${API_URL}/paginado-admin`, {
      params: { page, pageSize },
      ...getHeaders()
    });
    
    console.log("Datos recibidos de la API:", response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los cursos paginados:', error);
    throw new Error('Error al obtener cursos paginados');
  }
};

// Obtener un curso por su ID
export const getCourseById = async (idCourse, entityStatus = 'Active') => {
  try {
    const response = await axios.get(`${API_URL}/${idCourse}`, {
      params: { entityStatus },
      ...getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el curso por ID:', error);
    throw new Error('Error al obtener el curso');
  }
};

// Crear un nuevo curso
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al crear el curso:', error);
    throw new Error('Error al crear el curso');
  }
};

// Actualizar un curso existente
export const updateCourse = async (idCourse, courseData) => {
  console.log(">>>>>>>>>>",courseData)
  try {
    const response = await axios.put(`${API_URL}/modificar/${idCourse}`, courseData, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    throw new Error('Error al actualizar el curso');
  }
};

// Activar un curso
export const activateCourse = async (idCourse) => {
  try {
    const response = await axios.put(`${API_URL}/activar/${idCourse}`, {}, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al activar el curso:', error);
    throw new Error('Error al activar el curso');
  }
};

// Bloquear un curso
export const blockCourse = async (idCourse) => {
  try {
    const response = await axios.put(`${API_URL}/bloquear/${idCourse}`, {}, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al bloquear el curso:', error);
    throw new Error('Error al bloquear el curso');
  }
};

// Eliminar un curso
export const deleteCourse = async (idCourse) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminar/${idCourse}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    throw new Error('Error al eliminar el curso');
  }
};
