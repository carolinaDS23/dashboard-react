import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "React Avanzado", level: "Intermedio" },
    { id: 2, name: "Node.js Básico", level: "Principiante" },
  ]);

  const [show, setShow] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({ id: "", name: "", level: "" });

  const handleClose = () => setShow(false);
  const handleShow = (course) => {
    setCurrentCourse(course);
    setShow(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Cursos</h2>
      <Button variant="primary" onClick={() => handleShow({ id: "", name: "", level: "" })}>
        Agregar Curso
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.level}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(course)}>Editar</Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(course.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCourse.id ? "Editar Curso" : "Agregar Curso"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Curso</Form.Label>
              <Form.Control
                type="text"
                value={currentCourse.name}
                onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nivel</Form.Label>
              <Form.Control
                as="select"
                value={currentCourse.level}
                onChange={(e) => setCurrentCourse({ ...currentCourse, level: e.target.value })}
              >
                <option>Principiante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleClose}>
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Courses;
