
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap"; 
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    nationality: "",
    province: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const userToRegister = { 
        ...user, 
        birthDate: new Date(user.birthDate).toISOString().split("T")[0], 
        userType: 1 
      };

      console.log("📤 Enviando datos:", userToRegister);

      const response = await axios.post("http://localhost:5296/api/Administrator", userToRegister);
      console.log("✅ Usuario registrado:", response.data);

      setSuccess("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("❌ Error al registrar:", error);

      const errorMessage =
        error.response?.data?.message || "Error en el registro.";
      setError(errorMessage);
    }
};

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center">Registro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleRegister}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={user.birthDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Nacionalidad</Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={user.nationality}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  name="province"
                  value={user.province}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Botones con Bootstrap */}
              <div className="mt-4 d-flex gap-2">
                <Button variant="primary" type="submit" className="w-100 btn-lg">
                  Registrarse
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/login")}
                  className="w-100 btn-lg"
                >
                  Volver al Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;




