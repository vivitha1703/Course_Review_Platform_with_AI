import React from "react";
import { Link,useNavigate } from "react-router-dom";
import getDashboardPath from "../utils/getDashboardPath";
import "./styles/Home.css";
import girlImg from "../assets/girl.jpg"; 

const Home = () => {
  const navigate = useNavigate();
  const handleExplore = () =>{
    navigate('/CourseList');
  }


  return (
    <>
      <div className="header">
        <h1>EduView</h1>
        <nav className="nav-links">
          <Link to="/Home">Home</Link>
          <Link to="/CourseList">Explore</Link>
          <Link to={getDashboardPath}>Dashboard</Link>
          <Link to="/Login">Logout</Link>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>EduView</h1>
          <h3>Explore Smarter, Learn Better</h3>
          <p>
            Discover the best courses for your academic path. Read honest student reviews,
            analyze ratings, and receive personalized course recommendations with the
            help of AI-powered suggestions.
          </p>
          <button className="hero-btn" onClick={handleExplore}>Explore Courses</button>
        </div>
        <div className="hero-img">
          <img src={girlImg} alt="Girl studying" />
        </div>
      </div>

      {/* Features Section */}
      <section className="features">
        <h2>Why EduView?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>📚 Honest Reviews</h3>
            <p>Get real student insights on course quality, teaching, and outcomes.</p>
          </div>
          <div className="feature">
            <h3>🎯 Personalized Suggestions</h3>
            <p>AI suggests courses based on your skills, goals, and interests.</p>
          </div>
          <div className="feature">
            <h3>⭐ Course Ratings</h3>
            <p>View ratings based on relevance, difficulty, and career impact.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <div className="testimonial-card">
          <p>"EduView helped me find the perfect Data Science course that aligned with my interests!"</p>
          <h4>- Priya, Computer Science Student</h4>
        </div>
        <div className="testimonial-card">
          <p>"I loved the review system. I avoided a few courses that had poor teaching quality."</p>
          <h4>- Ramesh, Engineering Graduate</h4>
        </div>
      </section>
    </>
  );
};

export default Home;
