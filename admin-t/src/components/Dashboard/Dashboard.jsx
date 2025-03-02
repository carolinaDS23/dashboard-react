import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="users">Usuarios</Link></li> {/* ✅ Enlace relativo */}
        </ul>
      </nav>
      <Outlet /> {/* ✅ Aquí se renderizarán las rutas anidadas */}
    </div>
  );
};

export default Dashboard;
// import React from 'react';
// import './Dashboard.css'; // Asegúrate de importar el CSS si es necesario

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Bienvenido al Dashboard</h1>
//       {/* Contenido del Dashboard */}
//     </div>
//   );
// };

// export default Dashboard;

  