import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/login";
import axiosConfigs from "../../service/axiosConfigs";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpia el mensaje de error antes de hacer la solicitud

    try {
      // const response = await axiosConfigs.post("/login", credentials);
      console.log("credenciales", credentials) // email, password
      const response = await login(credentials)
      const { token, role } = response.data; // Suponiendo que la API devuelve { token, role }

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      console.log("Login exitoso:", response.data);
      if (role === "admin") {
        navigate("/admin"); // Redirige al panel de administrador tras iniciar sesión
      } else {
        navigate("/dashboard"); // Redirige al dashboard tras iniciar sesión si no es administrador
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={credentials.email} 
            onChange={handleChange} 
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Ingresar</Button>
      </Form>
    </div>
  );
};

export default Login;

