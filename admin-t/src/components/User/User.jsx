import { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { getAdministratorsPaged, deleteUserAsAdmin, updateUser } from "../../service/userService";
import "./User.css";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAdministratorsPaged(currentPage, usersPerPage);
        if (response) {
          console.log("📊 Datos de usuarios recibidos:", response);
          setUsers(response.data.users ?? []);
          setTotalPages(Math.max(1, Math.ceil((response.data.totalRecords ?? 1) / usersPerPage)));
        }
      } catch (error) {
        console.error("⚠️ Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, [currentPage, usersPerPage]);

  useEffect(() => {
    console.log("📢 Cambio detectado en showModal:", showModal);
  }, [showModal]);

  // ✅ Nuevo useEffect para detectar cambios en selectedUser
  useEffect(() => {
    console.log("🔄 selectedUser actualizado:", selectedUser);
  }, [selectedUser]);

  const handleDeleteUser = async (userId) => {
    try {

      const result = await deleteUserAsAdmin(userId);
      if (result.success) {
        console.log("🗑 Usuario eliminado correctamente:", result.message);
        setUsers((prevUsers) => prevUsers.filter((user) => user.idUser !== userId));
      } else {
        console.error("❌ Error al eliminar usuario:", result.message);
      }
    } catch (error) {
      console.error("⚠️ Excepción en handleDeleteUser:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      console.log("🚀 selectedUser antes de actualizar:", selectedUser);
  
      if (!selectedUser || !selectedUser.idUser) {
        console.error("❌ Error: idUser es undefined o null", selectedUser);
        return;
      }
  
      console.log("📌 Intentando actualizar usuario:", selectedUser);
  
      // Validar si birthDate es válido antes de convertirlo
      let formattedBirthDate = "";
      if (selectedUser.birthDate) {
        const parsedDate = new Date(selectedUser.birthDate);
        if (!isNaN(parsedDate.getTime())) {
          formattedBirthDate = parsedDate.toISOString().split("T")[0]; // Solo fecha sin hora
        }
      }
  
      // Datos actualizados
      const updatedData = {
        idUser: selectedUser.idUser,
        name: selectedUser.name?.trim() || "Nuevo Nombre",
        lastName: selectedUser.lastName?.trim() || "Nuevo Apellido",
        email: selectedUser.email?.trim() || "ejemplo@email.com",
        birthDate: formattedBirthDate || null, // Enviar `null` si no hay fecha válida
        nationality: selectedUser.nationality || "Argentina",
        province: selectedUser.province || "Córdoba",
      };
  
      console.log("📡 Enviando datos corregidos:", JSON.stringify(updatedData, null, 2));
  
      // Llamada a la API
      const response = await updateUser(selectedUser.idUser, updatedData);
      console.log("✅ Usuario actualizado con éxito:", response.data);
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error.response?.data || error.message);
    }
  };
  

  const handleEditClick = (user) => {
    console.log("📝 Usuario seleccionado para editar:", user);
    setSelectedUser({ ...user }); // Clonar el objeto para evitar mutaciones
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Lista de Usuarios</h2>

      {/* ✅ MODAL USANDO REACT-BOOTSTRAP */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.lastName}
                  onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleUpdateUser}>Actualizar</Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ TABLA DE USUARIOS */}
      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.idUser || `no-id-${index}`}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.entityStatus}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEditClick(user)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDeleteUser(user.idUser)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ✅ BOTONES DE PAGINACIÓN */}
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button variant="secondary" disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            ⬅ Anterior
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
            Siguiente ➡
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default User;

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 3;
  //const [ setUserRole] = useState(null);

  // useEffect(() => {
  //   const storedRole = localStorage.getItem("userRole");
  //   console.log("📂 userRole en User.jsx (localStorage):", storedRole);
  //   setUserRole(storedRole);
  // }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await getAdministratorsPaged(currentPage, usersPerPage);
  //     if (response?.data) {
  //       console.log("📊 Datos de usuarios recibidos:", response.data);
  //       setUsers(response.data.users ?? []);
  //       setTotalPages(Math.ceil((response.data.totalRecords ?? 1) / usersPerPage));
  //     }
  //   };
    
  //   fetchUsers();
  // }, [currentPage, usersPerPage]); // Asegurar que usersPerPage es una dependencia si cambia

  // ✅ Mueve la función dentro del componente
  // const changeStatus = async (userId, action) => {
  //   const userRole = localStorage.getItem("userRole");
  //   console.log("🔍 userRole en localStorage:", userRole);
  
  //   if (String(userRole).trim() !== "Administrator") {
  //     console.error("❌ No tienes permisos para modificar usuarios.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axiosConfigs.put(`/Administrator/${action}/${userId}`);
  //     console.log(`✅ Estado actualizado:`, response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("❌ Error al actualizar estado:", error);
  //     throw new Error(error.response?.data?.message || "Error desconocido.");
  //   }
  // };



//-----url validas ------------
//const API_URL = "http://localhost:5296/api/User/paginado";
//const response = await fetch(`${API_URL}?page=${currentPage}&pageSize=${usersPerPage}`, {
//---------------//
// import { useState } from "react";
// import { Table, Button, Form, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const User = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "John", lastName: "Doe", email: "john@example.com", status: "Activo" },
//     { id: 2, name: "Jane", lastName: "Smith", email: "jane@example.com", status: "Activo" },
//     { id: 3, name: "Carlos", lastName: "Lopez", email: "carlos@example.com", status: "Activo" },
//     { id: 4, name: "Ana", lastName: "Gomez", email: "ana@example.com", status: "Activo" },
//     { id: 5, name: "Pedro", lastName: "Martinez", email: "pedro@example.com", status: "Activo" },
//     { id: 6, name: "Maria", lastName: "Fernandez", email: "maria@example.com", status: "Activo" },
//   ]);

//   const [show, setShow] = useState(false);
//   const [currentUser, setCurrentUser] = useState({ id: "", name: "", lastName: "", email: "", status: "Activo" });

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 3;
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const handleClose = () => setShow(false);
//   const handleShow = (user) => {
//     setCurrentUser(user);
//     setShow(true);
//   };

//   const handleDelete = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   const handleToggleStatus = (id) => {
//     setUsers(users.map(user => 
//       user.id === id ? { ...user, status: user.status === "Activo" ? "Bloqueado" : "Activo" } : user
//     ));
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const startIndex = (currentPage - 1) * usersPerPage;
//   const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

//   return (
//     <div className="container mt-4">
//       <h2>Usuarios</h2>
//       <Button variant="primary" onClick={() => handleShow({ id: "", name: "", lastName: "", email: "", status: "Activo" })}>
//         Agregar Usuario
//       </Button>
//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Apellido</th>
//             <th>Email</th>
//             <th>Estado</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedUsers.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.status}</td>
//               <td>
//                 <Button variant="warning" onClick={() => handleShow(user)}>Editar</Button>{" "}
//                 <Button variant={user.status === "Activo" ? "secondary" : "success"} onClick={() => handleToggleStatus(user.id)}>
//                   {user.status === "Activo" ? "Bloquear" : "Desbloquear"}
//                 </Button>{" "}
//                 <Button variant="danger" onClick={() => handleDelete(user.id)}>Eliminar</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Paginación Manual */}
//       <div className="d-flex justify-content-center mt-3">
//         <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
//           Anterior
//         </Button>
//         <span className="mx-3">Página {currentPage} de {totalPages}</span>
//         <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages}>
//           Siguiente
//         </Button>
//       </div>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{currentUser.id ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentUser.name}
//                 onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Apellido</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentUser.lastName}
//                 onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={currentUser.email}
//                 onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Estado</Form.Label>
//               <Form.Select
//                 value={currentUser.status}
//                 onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
//               >
//                 <option value="Activo">Activo</option>
//                 <option value="Bloqueado">Bloqueado</option>
//               </Form.Select>
//             </Form.Group>
//             <Button variant="primary" onClick={handleClose}>
//               Guardar
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default User;

  

// import { useState } from "react";
// import { Table, Button, Form, Modal } from "react-bootstrap";

// const User = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", email: "john@example.com" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com" },
//   ]);

//   const [show, setShow] = useState(false);
//   const [currentUser, setCurrentUser] = useState({ id: "", name: "", email: "" });

//   const handleClose = () => setShow(false);
//   const handleShow = (user) => {
//     setCurrentUser(user);
//     setShow(true);
//   };

//   const handleDelete = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Usuarios</h2>
//       <Button variant="primary" onClick={() => handleShow({ id: "", name: "", email: "" })}>
//         Agregar Usuario
//       </Button>
//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Email</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <Button variant="warning" onClick={() => handleShow(user)}>Editar</Button>{" "}
//                 <Button variant="danger" onClick={() => handleDelete(user.id)}>Eliminar</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{currentUser.id ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentUser.name}
//                 onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={currentUser.email}
//                 onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleClose}>
//               Guardar
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default User;


