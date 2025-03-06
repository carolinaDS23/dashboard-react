import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../service/userService"; 



const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        console.log("📩 Enviando credenciales:", credentials);
      
        const responseData = await login(credentials);
        console.log("📡 Respuesta completa de la API:", responseData);
  
        if (!responseData?.data?.token) {
            throw new Error("La API no devolvió los datos esperados");
        }

        const { token } = responseData.data;

        
        localStorage.setItem("token", token);

        
        const payloadBase64 = token.split(".")[1];
        const payloadJSON = atob(payloadBase64);
        const payload = JSON.parse(payloadJSON);

        console.log("🔍 Payload decodificado:", payload);

        const userRole =
            payload.role || 
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 
            "SinRol";

        localStorage.setItem("userRole", userRole);
        console.log("✅ Rol guardado en localStorage:", userRole);

       
        console.log("📂 Verificando localStorage: userRole =", localStorage.getItem("userRole"));

        console.log("✅ Login exitoso:", { token, userRole });

       
        console.log("🔄 Redirigiendo al Dashboard...");
        navigate("/dashboard");

    } catch (error) {
        console.error("❌ Error en el login:", error);
        setError(error.message || "Error al iniciar sesión");
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
        <div className="mt-3 d-flex gap-2">
          <Button type="submit">Ingresar</Button>
          <Button variant="secondary" onClick={() => navigate('/register')}>
            Registrarse
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;






