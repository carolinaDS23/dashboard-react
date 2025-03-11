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
import Comments from './components/Comments/Comments.jsx';
const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin-panel" element={<AdminPanel />} />

        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="users" element={<Users />} /> 
          <Route path="posts" element={<Posts />} /> 
          <Route path="courses" element={<Courses />} /> 
          <Route path="comments/:id" element={<Comments />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;





