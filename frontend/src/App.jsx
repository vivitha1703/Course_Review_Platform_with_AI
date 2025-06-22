import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from "./pages/Home";
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard'
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/CourseList"  element={<CourseList />} />
      <Route path="/CourseDetail" element={<CourseDetail />} />
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/InstructorDashboard" element={<InstructorDashboard />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />}/>
    </Routes>
  );
}

export default App;