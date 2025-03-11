import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="users">Usuarios</Link></li> 
        </ul>
      </nav>
      <Outlet /> 
    </div>
  );
};

export default Dashboard;

  