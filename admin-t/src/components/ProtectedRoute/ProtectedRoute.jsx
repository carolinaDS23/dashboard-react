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


