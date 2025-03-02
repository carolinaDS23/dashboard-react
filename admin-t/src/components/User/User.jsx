import { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Dropdown } from "react-bootstrap";
import { getUsersPaged } from "../../service/apiService";

const usersPerPage = 3;

const User = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsersPaged(currentPage, usersPerPage);
      
      if (data) {
        console.log("📊 Datos de usuarios recibidos:", data);

        setUsers(data.users ?? []);
        setTotalPages(Math.ceil(data.totalRecords / usersPerPage));
      }
    };
    fetchUsers();
  }, [currentPage]);

  const changeStatus = (userId, action) => {
    const userType = Number(localStorage.getItem("userType")); // Convertir a número
    console.log("🔍 userType en changeStatus:", userType);
  
    if (userType !== 1) {
      console.error("❌ No tienes permisos para modificar usuarios.");
      return;
    }
  
    fetch(`http://localhost:5296/api/User/${action}/${userId}`, { method: "PUT" })
      .then(response => response.json())
      .then(data => console.log(`✅ Estado actualizado:`, data))
      .catch(error => console.error("❌ Error al actualizar estado:", error));
  };
  // const changeStatus = (userId, action) => {
  //   if (Number(localStorage.getItem("userType")) !== 1) {
  //     console.error("❌ No tienes permisos para modificar usuarios.");
  //     return;
  //   }

  //   fetch(`http://localhost:5296/api/User/${action}/${userId}`, { method: "PUT" })
  //     .then(response => response.json())
  //     .then(data => console.log(`✅ Estado actualizado:`, data))
  //     .catch(error => console.error("❌ Error al actualizar estado:", error));
  // };

  const deleteUser = (userId) => {
    console.log("🔍 userType almacenado en localStorage:", localStorage.getItem("userType"));
  
    if (Number(localStorage.getItem("userType")) !== 1) {
      console.error("❌ No tienes permisos para eliminar usuarios.");
      return;
    }
    fetch(`http://localhost:5296/api/User/${userId}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        console.log(`🗑 Usuario eliminado:`, data);
        setUsers((prevUsers) => prevUsers.filter((user) => user.idUser !== userId));
      })
      .catch(error => console.error("❌ Error al eliminar usuario:", error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Lista de Usuarios</h2>
      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Estado</th>
            <th>estado de usuario</th>
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
                  {console.log("📌 user en Dropdown:", user)}

                  <Dropdown>
                    <Dropdown.Toggle variant={user.status === "Activo" ? "success" : "danger"}>
                      {user.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => changeStatus(user.idUser, "activar")}>
                        Activar
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => changeStatus(user.idUser, "bloquear")}>
                        Bloquear
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <Button variant="warning" className="me-2">Editar</Button>
                  <Button variant="danger" onClick={() => deleteUser(user.idUser)}>Eliminar</Button>
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

      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ⬅ Anterior
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Siguiente ➡
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default User;

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






  
