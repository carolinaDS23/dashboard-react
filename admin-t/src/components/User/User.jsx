import { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { getAdministratorsPaged, deleteUserAsAdmin, updateUser } from "../../service/userService";
import "./User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { blockUser, activateUser } from '../../service/userService';  



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

  
  const updateUserStateLocally = (idUser, newState) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.idUser === idUser ? { ...user, entityStatus: newState } : user
      )
    );
  };
  
  const onUserUpdated = async () => {
    try {
      const response = await getAdministratorsPaged(currentPage, usersPerPage);
      if (response) {
        setUsers(response.data.users ?? []);
      }
    } catch (error) {
      console.error("⚠️ Error al actualizar usuarios:", error);
    }
  };

  // const handleActivateUser = async (idUser) => {
  //   try {
  //     const response = { success: true, message: "Usuario activado" }; // Ejemplo de respuesta
  //     if (response.success) {
  //       alert("Usuario activado con éxito");
  //       updateUserStateLocally(idUser, 1); // Esta función también debe estar definida
  //     } else {
  //       alert(`Error: ${response.message}`);
  //     }
  //   } catch (error) {
  //     console.error("⚠️ Error al activar usuario:", error);
  //   }
  // };
  

  const handleBlockUser = async (idUser) => {
    try {
      if (!idUser) {
        console.error("❌ Error: idUser es undefined o null");
        return;
      }
  
      console.log(`🔵 Intentando bloquear usuario con ID: ${idUser}`);
  
      // Llamada a la API para bloquear usuario
      const response = await blockUser(idUser);
  
      console.log("✅ Usuario bloqueado con éxito:", response.data);
  
      if (response.success) {
        alert("Usuario bloqueado con éxito");
        updateUserStateLocally(idUser, 2); // Estado 2 = Bloqueado
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("❌ Error al bloquear usuario:", error.response?.data || error.message);
    }
  };
  
  const handleActivateUser = async (idUser) => {
    try {
      if (!idUser) {
        console.error("❌ Error: idUser es undefined o null");
        return;
      }
  
      console.log(`🔵 Intentando activar usuario con ID: ${idUser}`);
  
      // Llamada a la API para activar usuario
      const response = await activateUser(idUser);
  
      console.log("✅ Usuario activado con éxito:", response.data);
  
      if (response.success) {
        alert("Usuario activado con éxito");
        updateUserStateLocally(idUser, 1); // Estado 1 = Activado
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("❌ Error al activar usuario:", error.response?.data || error.message);
    }
  };
  


  const handleDeleteUser = async (idUser) => {
    try {
      const result = await deleteUserAsAdmin(idUser);
      if (result?.success) {
        alert("Usuario eliminado con éxito");
      updateUserStateLocally(idUser, 0);
    } else {
      alert(`Error al eliminar usuario: ${result?.message}`);
    }
  } catch (error) {
    console.error("⚠️ Error al eliminar usuario:", error);
  }
};

  const handleUpdateUser = async () => {
    try {
      if (!selectedUser || !selectedUser.idUser) {
        console.error("❌ Error: idUser es undefined o null", selectedUser);
        return;
      }

      const updatedData = {
        idUser: selectedUser.idUser,
        name: selectedUser.name?.trim() || "",
        lastName: selectedUser.lastName?.trim() || "",
        password: selectedUser.password?.trim() || "",
        email: selectedUser.email?.trim() || "",
        birthDate: "",
        nationality: selectedUser.nationality?.trim() || "",
        province: selectedUser.province?.trim() || "",
      };

      
      const response = await updateUser(updatedData.idUser, updatedData);
      console.log("✅ Usuario actualizado con éxito:", response.data);
      onUserUpdated();
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error.response?.data || error.message);
    }
  };

  const handleEditClick = (user) => {
        
    setSelectedUser({
      idUser: user.idUser ?? user.id,  
      name: user.name || "",
      lastName: user.lastName || "",
      //password: password || "",
      email: user.email || "",
      birthDate: user.birthDate || "",
      nationality: user.nationality || "",
      province: user.province || ""
    });
  
    setShowModal(true);
  };
 
  const handleCloseModal = () => {
    setSelectedUser(null);
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
                   value={selectedUser?.name}
                   onChange={(e) => setSelectedUser(prev => ({ ...prev, name: e.target.value }))}
                 />
               </Form.Group>
               <Form.Group>
                 <Form.Label>Apellido</Form.Label>
                 <Form.Control
                   type="text"
                   value={selectedUser?.lastName}
                   onChange={(e) => setSelectedUser(prev => ({ ...prev, lastName: e.target.value }))}

                 />
               </Form.Group>
               <Form.Group>
                 <Form.Label>Email</Form.Label>
                 <Form.Control
                   type="email"
                   value={selectedUser?.email}
                   onChange={(e) => setSelectedUser(prev => ({ ...prev, email: e.target.value }))}
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
             <th>ID</th> {/* Nueva columna para ID */}
             <th>Nombre</th>
             <th>Apellido</th>
             <th>Email</th>
             <th>Estado</th>
             <th>Acciones</th>
           </tr>
         </thead>
         <tbody>
           {users.length > 0 ? (
             users.map((user, index) => (               <tr key={user.idUser || `no-id-${index}`}>
                 <td>{user.idUser}</td> {/* Mostrar el ID de cada usuario */}
                 <td>{user.name}</td>
                 <td>{user.lastName}</td>
                 <td>{user.email}</td>
                 <td>
                   {user.entityStatus === 0 && "Eliminado"}
                   {user.entityStatus === 1 && "Activado"}
                   {user.entityStatus === 2 && "Bloqueado"}
                 </td>
                 <td>
                   {/* 🔧 BOTÓN EDITAR */}
                   <Button variant="warning" className="me-2" onClick={() => handleEditClick(user)}>Editar</Button>

                   {/* ✅ BOTONES SEGÚN ESTADO DEL USUARIO */}
                   {user.entityStatus !== 1 && (
                     <Button 
                       variant="success" 
                       className="me-2"
                       onClick={() => handleActivateUser(user.idUser)}
                     >
                       Activar
                     </Button>
                   )}
                  
                   {user.entityStatus === 1 && (
                     <Button 
                       variant="secondary" 
                       className="me-2"
                       onClick={() => handleBlockUser(user.idUser)}
                     >
                       Bloquear
                     </Button>
                   )}

                   {/* 🚨 BOTÓN ELIMINAR SI EL USUARIO NO ESTÁ YA ELIMINADO */}
                   {user.entityStatus !== 0 && (
                     <Button 
                       variant="danger"
                       onClick={() => handleDeleteUser(user.idUser)}
                     >
                       Eliminar
                     </Button>
                   )}
                 </td>
               </tr>
             ))
           ) : (
             <tr>
               <td colSpan="5" className="text-center">No hay usuarios disponibles.</td>
             </tr>
           )}
         </tbody>       </Table>

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

  
























