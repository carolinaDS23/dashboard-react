import axios from 'axios'; 

// URL base de la API
const API_URL = 'http://localhost:5296/api/Course';

// Constante del token de autenticación
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9kcmlnb0Byb2RyaWdvIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsIlVzZXJJZCI6IjEiLCJleHAiOjE3NDE5MTQyNTEsImlzcyI6ImFwaS50YWxraW5nIiwiYXVkIjoiYXBpLnRhbGtpbmcudXNlcnMifQ.OBneIOtWdfvGTbtDUt8feI7VDzgjg2jDNZ3AY0zSpho";

// Configuración de los headers con el token de autenticación
const getHeaders = () => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
  };
};
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
    throw new Error('Error al obtener cursos paginados: ' + error.response?.data?.message || error.message);
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
    throw new Error('Error al obtener el curso: ' + error.response?.data?.message || error.message);
  }
};

// Crear un nuevo curso
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al crear el curso:', error);
    throw new Error('Error al crear el curso: ' + error.response?.data?.message || error.message);
  }
};

export const updateCourse = async (idCourse, courseData) => {
  console.log(">", courseData);  
  
  const currentCourse = await getCourseById(idCourse);  

  // Asegurarse de que los campos requeridos estén presentes
  const updatedCourseData = {
    name: courseData.name || currentCourse.name,  
    description: courseData.description || currentCourse.description,  
    url: courseData.url || currentCourse.url,  
    level: courseData.level != null ? courseData.level : currentCourse.level, 
  };

  console.log("Datos preparados para enviar:", updatedCourseData); // Ver los datos preparados para la solicitud

  try {
    const response = await axios.put(`${API_URL}/modificar/${idCourse}`, updatedCourseData, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    // Proporcionar un mensaje más detallado en el error
    throw new Error('Error al actualizar el curso: ' + (error.response?.data?.message || error.message));
  }
};

// Activar un curso
export const activateCourse = async (idCourse) => {
  try {
    const response = await axios.put(`${API_URL}/activar/${idCourse}`, {}, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al activar el curso:', error);
    throw new Error('Error al activar el curso: ' + error.response?.data?.message || error.message);
  }
};

// Bloquear un curso
export const blockCourse = async (idCourse) => {
  try {
    const response = await axios.put(`${API_URL}/bloquear/${idCourse}`, {}, getHeaders());
    return response.data;
  } catch (error) {
    console.error('Error al bloquear el curso:', error);
    throw new Error('Error al bloquear el curso: ' + error.response?.data?.message || error.message);
  }
};

// Eliminar un curso
export const deleteCourse = async (idCourse) => {
  try {
    const response = await axios.delete(`${API_URL}/${idCourse}`, getHeaders()); // Ajustar la URL aquí
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    throw new Error('Error al eliminar el curso: ' + error.response?.data?.message || error.message);
  }
};
