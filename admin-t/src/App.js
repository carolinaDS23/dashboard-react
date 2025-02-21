
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Post from './components/Post/Posts';
import Reactions from './components/Reactions/Reactions';
import User from "./components/User/User"; 
import Course from "./components/Course/Course";



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/reaction" element={<Reactions />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </Router>
  );
}

export default App;





// import { Link } from "react-router-dom";
// import './components/NavBar/NavBar.css';
 


// function NavBar() {
//   return (
//     <nav className="navbar">
//       <Link className="nav-link" to="/">Home</Link>
//       <Link className="nav-link" to="/login">Login</Link>
//       <Link className="nav-link" to="/users">Users</Link>
//       <Link className="nav-link" to="/reactions">Reactions</Link>
//       <Link className="nav-link" to="/posts">Posts</Link>
//       <Link className="nav-link" to="/page-not-found">Cerrar sesión</Link>
//     </nav>
//   );
// }

// export default NavBar;




