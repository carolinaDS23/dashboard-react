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




import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/login">Login</Nav.Link> */}
            <Nav.Link as={Link} to="/user">User</Nav.Link>
            <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
            <Nav.Link as={Link} to="/reaction">Reaction</Nav.Link>
            <Nav.Link as={Link} to="/course"> Course</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


