import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Modal, Form } from "react-bootstrap";
import { getCoursesPaged, createCourse, updateCourse, activateCourse, blockCourse, deleteCourse } from '../../service/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // Modal para crear curso
  const [selectedCourse, setSelectedCourse] = useState({ id: "", name: "", description: "", url: "", level: 0 });
  const [newCourse, setNewCourse] = useState({ name: "", description: "", url: "", level: 0 }); // Estado para el nuevo curso

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const fetchCourses = async (page) => {
    try {
      const response = await getCoursesPaged(page, pageSize);
      const totalPagesCalc = Math.ceil(response.totalRecords / pageSize);
      setCourses(response.courses);
      setTotalPages(totalPagesCalc);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  const toggleCourseStatus = async (id, currentStatus) => {
    try {
      if (currentStatus === 1) {
        await blockCourse(id); // Si está activo, lo bloqueamos
      } else {
        await activateCourse(id); // Si está bloqueado, lo activamos
      }
      fetchCourses(currentPage); // Refrescamos la lista de cursos
    } catch (error) {
      console.error("Error al cambiar el estado del curso:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      console.log("Eliminando curso con ID:", id);  
      await deleteCourse(id);

      setCourses(courses.filter(course => course.id !== id));
  
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      if (!selectedCourse.name || !selectedCourse.description || !selectedCourse.url) {
        console.error("Error: Todos los campos deben estar completos.");
        return;
      }
      await updateCourse(selectedCourse.id, { // Actualizamos el curso con los cambios
        name: selectedCourse.name,
        description: selectedCourse.description,
        url: selectedCourse.url,
        level: selectedCourse.level
      });
      setShowModal(false); // Cerramos el modal
      fetchCourses(currentPage); // Refrescamos la lista de cursos
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
      console.log("Detalles del error:", error.response?.data); // Muestra más detalles del error
    }
  };

  const handleCreateCourse = async () => {
    try {
      if (!newCourse.name || !newCourse.description || !newCourse.url) {
        console.error("Error: Todos los campos deben estar completos.");
        return;
      }
      await createCourse(newCourse); // Usamos la función para crear el nuevo curso
      setShowCreateModal(false); // Cerramos el modal de crear curso
      fetchCourses(currentPage); // Refrescamos la lista de cursos
    } catch (error) {
      console.error("Error al crear el curso:", error);
      console.log("Detalles del error:", error.response?.data); // Muestra más detalles del error
    }
  };

  // Definimos la función `getStatusText` para mostrar el texto según el estado del curso
  const getStatusText = (status) => {
    return status === 1 ? "Activo" : "Bloqueado";
  };

  return (
    <div>
      <h2>Cursos</h2>
      <Button variant="success" onClick={() => setShowCreateModal(true)}>Agregar Curso</Button> {/* Botón para abrir el modal de creación */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{getStatusText(course.entityStatus)}</td>
              <td>
                <Button
                  variant={course.entityStatus === 1 ? "warning" : "success"}
                  onClick={() => toggleCourseStatus(course.id, course.entityStatus)}
                >
                  {course.entityStatus === 1 ? "Bloquear" : "Activar"}
                </Button>{" "}
                <Button variant="primary" onClick={() => handleEditClick(course)}>
                  Editar
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDeleteCourse(course.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal para crear el curso */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.url}
                onChange={(e) => setNewCourse({ ...newCourse, url: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nivel</Form.Label>
              <Form.Control
                type="number"
                value={newCourse.level}
                onChange={(e) => setNewCourse({ ...newCourse, level: parseInt(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateCourse}>
            Crear Curso
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar el curso */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedCourse.name}
                onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={selectedCourse.description}
                onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={selectedCourse.url || ''} 
                onChange={(e) => setSelectedCourse({ ...selectedCourse, url: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nivel</Form.Label>
              <Form.Control
                type="number"
                value={selectedCourse.level || 0}
                onChange={(e) => setSelectedCourse({ ...selectedCourse, level: parseInt(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Courses;
