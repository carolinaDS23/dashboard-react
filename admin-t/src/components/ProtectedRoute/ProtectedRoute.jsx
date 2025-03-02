// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // Obtener usuario del localStorage

//   if (!user) {
//     return <Navigate to="/login" replace />; // Si no está logueado, redirigir a login
//   }

//   if (!allowedRoles.includes(user.userType)) {
//     return <Navigate to="/unauthorized" replace />; // Si no tiene permiso, redirigir
//   }

//   return <Outlet />; // Si pasa todas las validaciones, renderiza la ruta protegida
// };

// export default ProtectedRoute;


// import React, { useState, useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         parsedUser.userType = parseInt(parsedUser.userType, 10);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user from localStorage:", error);
//       }
//     }
//     setLoading(false);
//   }, []);

//   if (loading) return <div>Loading...</div>; // 🟢 Evita parpadeo antes de obtener el usuario

//   if (!user) {
//     return <Navigate to="/" />; // 🛑 No autenticado → Redirige al login
//   }

//   if (!allowedRoles.includes(user.userType)) {
//     return <Navigate to="/unauthorized" />; // 🚨 No autorizado → Nueva ruta
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ redirectPath = '/login', roleRequired = 'admin' }) => {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   if (!token || role !== roleRequired) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
