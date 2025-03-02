import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/User/User";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import NavBar from "./components/NavBar/NavBar";
import Posts from "./components/Post/Posts";
import Courses from "./components/Course/Course";
import Register from "./components/Register/Register";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Nueva ruta para Admin Panel */}
        <Route path="/admin-panel" element={<AdminPanel />} />

        {/* ✅ Dashboard con rutas anidadas */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="users" element={<Users />} /> {/* 🔥 Grilla de usuarios */}
          <Route path="posts" element={<Posts />} /> {/* 🔥 Página de Posts */}
          <Route path="courses" element={<Courses />} /> {/* 🔥 Página de Courses */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;





// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar/NavBar';
// import Login from './components/Login/Login';

// import Register from './components/Register/Register';

// import User from './components/User/User';
// import Posts from './components/Post/Posts';
// import Reactions from './components/Reactions/Reactions';
// import Course from './components/Course/Course';
// import Dashboard from './components/Dashboard/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // ✅ Importa el componente


// function App() {
//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} /> {/* Agregada */}
//         <Route path="/register" element={<Register />} />
       

//         {/* Rutas protegidas SOLO para administradores */}
//         <Route element={<ProtectedRoute allowedRoles={[1]} />}>  
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/posts" element={<Posts />} />
//           <Route path="/reaction" element={<Reactions />} />
//           <Route path="/course" element={<Course />} />
          
//           <Route path="/user" element={<User/>} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

