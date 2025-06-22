import React from "react";
import "./styles/CourseDetail.css";
import webDevImg from "../assets/web.jpg";
import { Link,useNavigate } from "react-router-dom";
import getDashboardPath from "../utils/getDashboardPath";



const CourseDetail = () => {
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

      <div className="course-container">
        <div className="course-info">
          <h2>Introduction to Web Development</h2>
          <ul className="course-meta">
            <li><strong>Instructor</strong> : Dr.A. Ajay</li>
            <li><strong>Level</strong> : Beginner</li>
            <li><strong>Department</strong> : Computer Science</li>
            <li><strong>Rating</strong> : 4.6 (125 Reviews)</li>
            <li><strong>Duration</strong> : 8 weeks</li>
          </ul>
        </div>
        <div className="course-image">
          <img src={webDevImg} alt="Web Development" />
        </div>
      </div>

      <div className="course-description">
        <h3>Description</h3>
        <ul>
          <li>→ This course introduces the foundational concepts of web development.</li>
          <li>→ Students will learn how to build responsive, accessible websites using HTML, CSS, and JavaScript.</li>
          <li>→ The course also covers version control, basic SEO, and deployment techniques.</li>
        </ul>
      </div>

      <div className="instructor-section">
        <h3>Instructor</h3>
        <p>
          Prof. Maya Kapoor<br />
          - Senior Lecturer in Computer Science at BIT<br />
          - Web Developer with 10+ years of experience<br />
          - Creator of multiple open-source frontend tools
        </p>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        <div className="review-box">
          ⭐⭐⭐⭐☆ - Alice M
          <p>The pace was just right. Loved the hands-on projects.</p>
        </div>
        <div className="review-box">
          ⭐⭐⭐☆ - John R
          <p>Good content, but I wish there was more on backend development</p>
        </div>
      </div>

      <div className="summary-section">
        <h3>Summary</h3>
        <p>
          Most students praised the course for its clarity, hands-on content, and beginner focus.
          Some suggested adding backend development modules.
        </p>
      </div>

      <div className="feedback-section">
        <h3>Add Your Review</h3>
          <form className="feedback-form">
            <label htmlFor="rating">Your Rating:</label>
            <select id="rating" name="rating" required>
              <option value="">Select rating</option>
              <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
              <option value="4">⭐⭐⭐⭐ - Very Good</option>
              <option value="3">⭐⭐⭐ - Good</option>
              <option value="2">⭐⭐ - Fair</option>
              <option value="1">⭐ - Poor</option>
            </select>

            <label htmlFor="comment">Your Feedback:</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              placeholder="Write your thoughts about this course..."
              required
            ></textarea>
            <button type="submit" className="submit-feedback">Submit Review</button>
          </form>
        </div>
        <div className="recommendation-section">
          <h3>Similar Courses You Might Like</h3>
          <div className="recommendation-cards">
            <div className="recommend-card">
              <img src={webDevImg} alt="React JS" />
              <p>React JS for Beginners</p>
            </div>
            <div className="recommend-card">
              <img src={webDevImg} alt="HTML & CSS" />
              <p>Mastering HTML & CSS</p>
            </div>
            <div className="recommend-card">
              <img src={webDevImg} alt="Frontend Design" />
              <p>Frontend Design Principles</p>
            </div>
          </div>   
        </div>

    </>
  );
};

export default CourseDetail;
