import React from "react";
import "./styles/StudentDashboard.css";
import analyticsImg from "../assets/analytics.jpeg"; 
import cloudImg from "../assets/cloud.jpeg"; 
import { Link,useNavigate } from "react-router-dom";
import getDashboardPath from "../utils/getDashboardPath";            

const reviews = [
  {
    course: "Introduction to web development",
    rating: "⭐⭐⭐⭐⭐",
    feedback: "Perfect for beginners",
  },
  {
    course: "Data Structures",
    rating: "⭐⭐⭐☆☆",
    feedback: "Tough but very useful",
  },
  {
    course: "Python for Data Science",
    rating: "⭐⭐⭐⭐☆",
    feedback: "Very well structured",
  },
];

const Dashboard = () => {
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

      <div className="dashboard-container">
        <div className="left-panel">
          <h2>Welcome back, Vivitha!</h2>
          <h3 className="summary-title">Review Summary</h3>
          <p><strong>Total review :</strong> {reviews.length}</p>

          {reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <p><strong>{review.course}:</strong></p>
              <p>{review.rating}</p>
              <p>{review.feedback}</p>
            </div>
          ))}
        </div>

        <div className="right-panel">
          <h3 className="recommend-title">Recommended courses for you</h3>
          <div className="recommend-card">
            <img src={analyticsImg} alt="Data Analytics" />
            <p>A practical introduction on Data Analytics</p>
          </div>

          <div className="recommend-card">
            <img src={cloudImg} alt="Cloud Computing" />
            <p>Cloud computing resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
