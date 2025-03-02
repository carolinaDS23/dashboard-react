//---login modificado ultimo----
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
//import axiosConfigs from "../../service/axiosConfigs";
import { login } from "../../service/authService"; 


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
      console.log("📡 Respuesta de la API:", responseData);
  
      if (!responseData?.data?.token) {
        throw new Error("La API no devolvió los datos esperados");
      }
  
      const { token } = responseData.data;
  
      // Guardar el token en localStorage
      localStorage.setItem("token", token);
  
      // Decodificar el token para extraer el rol del usuario
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el token
console.log("🔍 Payload decodificado:", JSON.stringify(payload, null, 2));

  
      // Extraer el rol del usuario y guardarlo en localStorage
const userRole = payload.role || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "SinRol";
localStorage.setItem("userRole", userRole);
console.log("✅ Rol guardado en localStorage:", userRole);

  
      console.log("✅ Login exitoso:", { token, userRole });
  
      // Redirigir al Dashboard
      console.log("🔄 Redirigiendo al Dashboard...");
      navigate("/dashboard");
  
    } catch (error) {
      console.error("❌ Error en el login:", error);
      setError(error.message || "Error al iniciar sesión");
    }
  };
  
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Limpia el mensaje de error antes de hacer la solicitud

  //   try {
  //     console.log("credenciales", credentials); // email, password
  //     const response = await axiosConfigs.post("/login", credentials); // ✅ Usa axios directamente
  //     const { token, role } = response.data; 
  //     // Guardar en localStorage
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", role);

  //     console.log("Login exitoso:", response.data);
  //     if (role === "admin") {
  //       navigate("/admin"); // Redirige al panel de administrador tras iniciar sesión
  //     } else {
  //       navigate("/dashboard"); // Redirige al dashboard tras iniciar sesión si no es administrador
  //     }

  //   } catch (error) {
  //     console.error("Error al iniciar sesión:", error);
  //     setError("Credenciales incorrectas. Inténtalo de nuevo.");
  //   }
  // };

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






// import React, { useState } from "react";
// import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import api from "../../service/axiosConfigs";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       localStorage.removeItem("user");
//       console.log("📤 Enviando datos de login:", formData); // Verifica qué datos se envían al backend

//       const response = await api.post("/Login", formData);
      
//       console.log("🔍 Respuesta del backend:", response.data); // Verifica la respuesta del backend
      
//       if (!response.data || !response.data.data) {
//         throw new Error("Respuesta inválida del servidor");
//       }

//       const { token } = response.data.data;
//       if (!token) throw new Error("No se recibió un token");

//       console.log("🔑 Token recibido:", token); // Verifica que el token se está recibiendo

//       const decodedToken = jwtDecode(token);
//       console.log("🔍 Token decodificado:", decodedToken); // Muestra el token decodificado

//       const userId = decodedToken.UserId ? parseInt(decodedToken.UserId, 10) : null;
//       console.log("🆔 UserId extraído:", userId); // Verifica el userId

//       const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
//       const role = decodedToken[roleClaim];

//       console.log("🎭 Role extraído del token:", role); // Verifica qué valor de role se obtiene

//       const userTypeMapping = { Administrator: 1, User: 2 };
//       console.log("📌 Mapeo de roles disponible:", userTypeMapping); // Muestra las claves disponibles en el mapeo

//       const userType = userTypeMapping[role] || null;
//       console.log("🔍 userType asignado:", userType); // Verifica el userType asignado

//       if (!userType) throw new Error("❌ Rol no válido. Verifica el mapeo.");

//       // Guarda el token por separado
//       localStorage.setItem("token", token);

//       // Guarda la información del usuario sin el token
//       localStorage.setItem("user", JSON.stringify({ userId, userType }));

//       console.log("✅ Usuario guardado en localStorage:", JSON.parse(localStorage.getItem("user"))); // Verifica lo que se guarda en localStorage

//       navigate(userType === 1 ? "/dashboard" : "/user", { replace: true });

//     } catch (err) {
//       console.error("❌ Error en login:", err.message); // Muestra el error en la consola
//       setError("Credenciales incorrectas. Verifique su email y contraseña.");
//       localStorage.removeItem("user");
//     }
//   };


//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card style={{ width: "25rem", padding: "20px" }}>
//         <Card.Title className="text-center mb-3">Iniciar Sesión</Card.Title>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Ingrese su email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword" className="mt-3">
//             <Form.Label>Contraseña</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Ingrese su contraseña"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Row className="mt-3">
//             <Col>
//               <Button variant="primary" type="submit" className="w-100">
//                 Iniciar Sesión
//               </Button>
//             </Col>
//             <Col>
//               <Button variant="secondary" className="w-100" onClick={() => navigate("/register")}>
//                 Registrarse
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;


//-----------------//

// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { login } from "../../service/login"; // Asegúrate de la ruta correcta

// import "./Login.css";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   // ✅ Manejo de registro
  

// const handleRegister = async () => {
//   try {
//     const response = await axios.post("http://localhost:5296/api/User", credentials);
//     console.log("Usuario registrado:", response.data);
//     alert("Registro exitoso, ahora inicia sesión.");

//     navigate("/register"); // 🔹 Redirige a la página de registro
//   } catch (error) {
//     console.error("Error en el registro:", error);
//     alert("Error al registrarse.");
//   }
// };

//   // ✅ Manejo de login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("Iniciando sesión...", credentials);
//     setError(""); // Limpia mensajes previos

//     try {
//       console.log("Credenciales enviadas:", credentials);
      
//       // Llamada a la API de login
//       const response = await login(credentials);
//       const { token, role } = response.data; // Suponiendo que la API devuelve { token, role }

//       // Guardar en localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       console.log("Login exitoso:", response.data);
//       if (role === "admin") {
//         navigate("/admin"); // Redirige al panel de administrador tras iniciar sesión
//       } else {
//         navigate("/dashboard"); // Redirige al dashboard tras iniciar sesión si no es administrador
//       }
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//       setError("Credenciales incorrectas. Inténtalo de nuevo.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Iniciar Sesión</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form onSubmit={handleLogin}>
//         <Form.Group>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={credentials.email}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Contraseña</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Button type="submit" className="mt-3">Ingresar</Button>
//         <Button variant="secondary" className="mt-3 ms-2" onClick={handleRegister}>
//           Registrarse
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;
