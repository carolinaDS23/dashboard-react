import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
    navigate("/login"); 
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

