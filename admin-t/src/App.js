import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Post from './components/Post/Posts';
import Reactions from './components/Reactions/Reactions';
import User from './components/User/User'; 
import Course from './components/Course/Course';
import AdminPanel from './components/AdminPanel/AdminPanel'; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';  

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
        <Route path="/course" element={<Course />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;





