//--------ultimo modificado -//
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/authService"; // Importamos la función
import { Form, Button, Alert } from "react-bootstrap"; // Importamos React Bootstrap

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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const responseData = await register(user);
      console.log("Usuario registrado:", responseData);

      setSuccess("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error al registrar:", error);
      setError("Error en el registro. Verifica los datos e intenta de nuevo.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
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

        <div className="mt-3 d-flex gap-2">
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Volver al Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;



// import React, { useState } from "react";
// import { Form, Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     lastName: "",
//     email: "",
//     password: "",
//     birthDate: "",
//     nationality: "",
//     province: "",
//     userType: 2, // 1 para admin, 2 para usuario normal
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response =  await fetch("http://localhost:5296/api/Administrator", { 
//         // 🚨 Asegúrate de que esta ruta sea la correcta en tu backend
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json(); 

//       if (response.ok) {
//         if (data.token) {
//           localStorage.setItem("token", data.token); // ✅ Guarda el token si lo envía la API
//           alert("Usuario registrado y autenticado correctamente");
//           navigate("/dashboard"); // ✅ Redirige al dashboard o home
//         } else {
//           alert("Registro exitoso, pero no se recibió un token.");
//           navigate("/login"); // En caso de que no devuelva token, redirige al login
//         }
//       } else {
//         alert(`Error: ${data.message || "No autorizado"}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("No se pudo conectar con el servidor");
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2>Registro</h2>
//       <Form onSubmit={handleRegister}>
//         <Form.Group controlId="formName">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             placeholder="Ingrese su nombre"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formLastName">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="text"
//             name="lastName"
//             placeholder="Ingrese su apellido"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formEmail">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Ingrese su email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formPassword">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             placeholder="Ingrese su contraseña"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formBirthDate">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="date"
//             name="birthDate"
//             value={formData.birthDate}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formNationality">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="text"
//             name="nationality"
//             placeholder="Ingrese su nacionalidad"
//             value={formData.nationality}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formProvince">
//           <Form.Label></Form.Label>
//           <Form.Control
//             type="text"
//             name="province"
//             placeholder="Ingrese su provincia"
//             value={formData.province}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formUserType">
//           <Form.Label></Form.Label>
//           <Form.Select
//             name="userType"
//             value={formData.userType}
//             onChange={handleChange}
//           >
//             {/* <option value={2}>Usuario Normal</option> */}
//             <option value={1}>Administrador</option>
//           </Form.Select>
//         </Form.Group>

//         <Button variant="primary" type="submit" className="mt-3">
//           Registrarse
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default Register;




// import React, { useState } from "react";
// import { Form, Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState(2); // 1 para admin, 2 para usuario normal
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5000/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, userType }),
//     });

//     if (response.ok) {
//       alert("Usuario registrado correctamente");
//       navigate("/"); // Redirige al login
//     } else {
//       alert("Error al registrar usuario");
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2>Registro</h2>
//       <Form onSubmit={handleRegister}>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Ingrese su email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formPassword">
//           <Form.Label>Contraseña</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Ingrese su contraseña"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formUserType">
//           <Form.Label>Tipo de Usuario</Form.Label>
//           <Form.Select value={userType} onChange={(e) => setUserType(Number(e.target.value))}>
//             <option value={2}>Usuario Normal</option>
//             <option value={1}>Administrador</option>
//           </Form.Select>
//         </Form.Group>

//         <Button variant="primary" type="submit" className="mt-3">
//           Registrarse
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default Register;
