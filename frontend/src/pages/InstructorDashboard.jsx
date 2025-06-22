import React from "react";
import "./styles/InstructorDashboard.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Link,useNavigate } from "react-router-dom";
import getDashboardPath from "../utils/getDashboardPath";

const InstructorDashboard = () => {
  const pieData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [87, 5, 17],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const courses = [
    {
      name: "Introduction to the Web Development",
      rating: "4.7",
      reviews: 214
    },
    {
      name: "UI/UX Fundamentals",
      rating: "4.5",
      reviews: 112
    },
    {
      name: "JavaScript Basics",
      rating: "4.2",
      reviews: 78
    }
  ];

  return (
    <div>
        <header className="header">
        <h1>EduView</h1>
        <nav className="nav-links">
          <Link to="/Home">Home</Link>
          <Link to="/CourseList">Explore</Link>
          <Link to={getDashboardPath}>Dashboard</Link>
          <Link to="/Login">Logout</Link>
        </nav>
      </header>
    <div className="instructor-dashboard">
      <div className="left-section">
        <h2>Welcome back, Instructor!</h2>
        <h3 className="section-title">Summary</h3>
          <p>Courses Taught: {courses.length}</p>
          <ol>
            {courses.map((course, index) => (
              <li key={index}>
                {course.name} – {course.rating} – {course.reviews} Reviews
              </li>
            ))}
          </ol>

          <h3 className="section-title">AI suggestions</h3>
          <div className="chart">
            <Pie data={pieData} />
          </div>
      </div>

      <div className="right-section">
        <h3>Add a New Course</h3>
        <form className="course-form">
          <label>Course Title</label>
          <input type="text" placeholder="Enter course title" />

          <label>Department</label>
          <select>
            <option value="">Select department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science</option>
          </select>

          <label>Level</label>
          <div className="radio-group">
            <label><input type="radio" name="level" value="Beginner" /> Beginner</label>
            <label><input type="radio" name="level" value="Intermediate" /> Intermediate</label>
            <label><input type="radio" name="level" value="Advanced" /> Advanced</label>
          </div>

          <label>Description</label>
          <textarea placeholder="Enter course description"></textarea>

          <label>Course Image</label>
          <input type="file"></input> 

          <label>Instructor Name</label>
          <input type="text" placeholder="Instructor name" />

          <label>Instructor Details</label>
          <textarea placeholder="Details about instructor"></textarea>

          <button type="submit">Add Course</button>
        </form>
      </div>
    </div>
    </div>

  );
};

export default InstructorDashboard;
