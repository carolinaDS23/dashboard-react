
import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const User = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: "", name: "", email: "" });

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setCurrentUser(user);
    setShow(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>
      <Button variant="primary" onClick={() => handleShow({ id: "", name: "", email: "" })}>
        Agregar Usuario
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(user)}>Editar</Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser.id ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
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

export default User;







// import { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import axios from "../../service/axiosConfigs";  // ✅ Esto es correcto
//  // Archivo donde centralizaremos las peticiones

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("/users")  // Endpoint de la API
//       .then(response => setUsers(response.data))
//       .catch(error => console.error("Error al cargar usuarios:", error));
//   }, []);

//   const deleteUser = (id) => {
//     axios.delete(`/users/${id}`)
//       .then(() => setUsers(users.filter(user => user.id !== id)))
//       .catch(error => console.error("Error al eliminar usuario:", error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Usuarios</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Email</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <Button variant="danger" onClick={() => deleteUser(user.id)}>Eliminar</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Users;



// import { useState, useEffect } from 'react';
// import { Table, Button, Form, Modal } from 'react-bootstrap';
// import axios from "../../service/axiosConfigs";

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [newUser, setNewUser] = useState({ name: '', email: '' });

//   // Cargar usuarios desde la API
//   useEffect(() => {
//     axios.get("/users")
//       .then(response => setUsers(response.data))
//       .catch(error => console.error("Error fetching users:", error));
//   }, []);

//   // Manejar eliminación de usuario
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/users/${id}`);
//       setUsers(users.filter(user => user.id !== id));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   // Manejar edición de usuario
//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setNewUser({ name: user.name, email: user.email });
//     setShowModal(true);
//   };

//   // Manejar creación de usuario
//   const handleCreate = () => {
//     setEditingUser(null);
//     setNewUser({ name: '', email: '' });
//     setShowModal(true);
//   };

//   // Guardar usuario (nuevo o editado)
//   const handleSave = async () => {
//     try {
//       if (editingUser) {
//         const response = await axios.put(`/users/${editingUser.id}`, newUser);
//         setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
//       } else {
//         const response = await axios.post("/users", newUser);
//         setUsers([...users, response.data]);
//       }
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error saving user:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Users</h2>
//       <Button variant="primary" onClick={handleCreate} className="mb-3">Add User</Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">Edit</Button>
//                 <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal para agregar/editar usuario */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 value={newUser.name} 
//                 onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control 
//                 type="email" 
//                 value={newUser.email} 
//                 onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//           <Button variant="success" onClick={handleSave}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default User;







// import { useState } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import axios from "../../service/axiosConfigs";


// const User = () => {
//   const [users, setUser] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
//   ]);

//   const handleDelete = (id) => {
//     setUser(users.filter(user => user.id !== id));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Users</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default User;





