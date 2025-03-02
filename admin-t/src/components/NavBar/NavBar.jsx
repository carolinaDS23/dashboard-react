//-------------navbar modificado ulltimoo-----
import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // ✅ Verifica si hay un token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Borra el token
    setIsAuthenticated(false);
    navigate("/login"); // ✅ Redirige a login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {/* <Nav.Link as={Link} to="/admin-panel">Admin Panel</Nav.Link>  ✅ Panel de admin */}
          <Nav.Link as={Link} to="/dashboard/users">Users</Nav.Link> {/* ✅ Grilla de usuarios */}
          <Nav.Link as={Link} to="/dashboard/posts">Posts</Nav.Link> {/* ✅ Página de Posts */}
          <Nav.Link as={Link} to="/dashboard/courses">Courses</Nav.Link> {/* ✅ Página de Courses */}

          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button as={Link} to="/login" variant="outline-light">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;



// // import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";

// const NavBar = () => {
//   //const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const userType = user?.userType ? Number(user.userType) : null;

//   // const handleLogout = () => {
//   //   localStorage.removeItem("user"); // Eliminar usuario del localStorage
//   //   setUser(null); // Resetear estado
//   //   navigate("/login"); // Redirigir al login
//   // };

//   console.log("Renderizando NavBar... UserType:", userType);


//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
            
//               <>
//                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                
//                 <Nav.Link as={Link} to="/posts">Posteos</Nav.Link>
//                 <Nav.Link as={Link} to="/reaction">Reacciones</Nav.Link>
//                 <Nav.Link as={Link} to="/course">Cursos</Nav.Link>
                
//               </>
            
//           </Nav>
//           {/* {user ? (
//             <Button variant="outline-light" onClick={handleLogout}>
//               Cerrar Sesión
//             </Button>
//           ) : (
//             <Button variant="outline-light" onClick={() => navigate("/login")}>
//               Iniciar Sesión
//             </Button>
//           )} */}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;





//este implementa para entrar como admin sino te logeas no puedes acceder a las pestañas pos user reactions 

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   const [role, setRole] = useState(null);

//   // useEffect(() => {
//   //   // Obtener el rol del usuario desde localStorage
//   //   const storedRole = localStorage.getItem("role");
//   //   setRole(storedRole);
//   // }, []);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/login">Login</Nav.Link>
//             {role === "admin" && (
//               <>
//                 <Nav.Link as={Link} to="/user">User</Nav.Link>
//                 <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
//                 <Nav.Link as={Link} to="/reaction">Reaction</Nav.Link>
//                 <Nav.Link as={Link} to="/course"> Course</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;



//-----------------este es el anteultimo agragado 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { Link } from "react-router-dom";


// const NavBar = () => {
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {/* <Nav.Link as={Link} to="/login">Login</Nav.Link> */}
//             <Nav.Link as={Link} to="/user">User</Nav.Link>
//             <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
//             <Nav.Link as={Link} to="/reaction">Reaction</Nav.Link>
//             <Nav.Link as={Link} to="/course"> Course</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;


