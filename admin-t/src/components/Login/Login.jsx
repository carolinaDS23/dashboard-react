

import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axiosConfigs from '../../service/axiosConfigs';



import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfigs.post('/login', credentials);

       // Guardar el rol en localStorage o en el estado global (Redux, Context)
    //localStorage.setItem("role", response.data.role);

      console.log('Login successful:', response.data);
      // Maneja la respuesta de la API aquí
    } catch (error) {
      console.error('Error logging in:', error);
      // Maneja el error aquí
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={credentials.email} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Button type="submit">Ingresar</Button>
      </Form>
    </div>
  );
};

export default Login;






// import { useState } from "react";
// import { login } from "../../services/api";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Ambos campos son obligatorios");
//       return;
//     }

//     try {
//       await login({ email, password });
//       navigate("/dashboard");
//     } catch (error) {
//       setError("Error al iniciar sesión. Por favor, verifica tus credenciales");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Administrador TALKING</h2>
//       <form onSubmit={handleLogin}>
//         {error && <p className="error">{error}</p>}
//         <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Iniciar sesión</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

