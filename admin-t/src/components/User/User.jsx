import { useState, useEffect, useCallback } from "react";
import { Container, Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { getAdministratorsPaged, deleteUserAsAdmin, updateUser, blockUser, activateUser } from "../../service/userService";
import "./User.css";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Obtener usuarios con paginación y filtro
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getAdministratorsPaged(currentPage, usersPerPage, searchTerm); // 🔹 Se incluye searchTerm
      if (response) {
        setUsers(response.data.users ?? []);
        setTotalPages(Math.max(1, Math.ceil((response.data.totalRecords ?? 1) / usersPerPage)));
      }
    } catch (error) {
      console.error("⚠️ Error al obtener usuarios:", error);
    }
  }, [currentPage, usersPerPage, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Manejar la búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reiniciar a la primera página cuando se busca
  };

  const handleBlockUser = async (idUser) => {
    try {
      const response = await blockUser(idUser);
      if (response.success) {
        alert("Usuario bloqueado con éxito");
        fetchUsers();
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("❌ Error al bloquear usuario:", error);
    }
  };

  const handleActivateUser = async (idUser) => {
    try {
      const response = await activateUser(idUser);
      if (response.success) {
        alert("Usuario activado con éxito");
        fetchUsers();
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("❌ Error al activar usuario:", error);
    }
  };

  const handleDeleteUser = async (idUser) => {
    try {
      const result = await deleteUserAsAdmin(idUser);
      if (result?.success) {
        alert("Usuario eliminado con éxito");
        fetchUsers();
      } else {
        alert(`Error al eliminar usuario: ${result?.message}`);
      }
    } catch (error) {
      console.error("⚠️ Error al eliminar usuario:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Lista de Usuarios</h2>

      {/* Barra de búsqueda */}
      <Row className="mb-3">
        <Col xs={8}>
          <Form.Control
            type="text"
            placeholder="Buscar usuario por nombre, apellido o correo"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => setCurrentPage(1)}>Buscar</Button>
        </Col>
      </Row>

      {/* Tabla de Usuarios */}
      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.idUser}>
                <td>{user.idUser}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.entityStatus === 0 && "Eliminado"}
                  {user.entityStatus === 1 && "Activado"}
                  {user.entityStatus === 2 && "Bloqueado"}
                </td>
                <td>
                  <Button variant="warning" onClick={() => setSelectedUser(user) || setShowModal(true)}>Editar</Button>
                  {user.entityStatus !== 1 && <Button variant="success" onClick={() => handleActivateUser(user.idUser)}>Activar</Button>}
                  {user.entityStatus === 1 && <Button variant="secondary" onClick={() => handleBlockUser(user.idUser)}>Bloquear</Button>}
                  {user.entityStatus !== 0 && <Button variant="danger" onClick={() => handleDeleteUser(user.idUser)}>Eliminar</Button>}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-center">No hay usuarios disponibles.</td></tr>
          )}
        </tbody>
      </Table>

      {/* Paginación */}
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button variant="secondary" disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Anterior
          </Button>
          <span className="mx-2">{currentPage} de {totalPages}</span>
          <Button variant="secondary" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Siguiente
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default User;