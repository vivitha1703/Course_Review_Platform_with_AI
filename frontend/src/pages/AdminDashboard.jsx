import React from "react";
import "./styles/AdminDashboard.css";
import { Link,useNavigate } from "react-router-dom";
import getDashboardPath from "../utils/getDashboardPath";

const platformStats = [
  { label: "Total Courses", value: 124 },
  { label: "Active Instructors", value: 18 },
  { label: "Total Students", value: 1453 },
  { label: "Reviews Collected", value: 5214 },
];

const users = [
  { name: "Vivitha M", role: "Instructor", status: "Active" },
  { name: "John Doe", role: "Student", status: "Active" },
  { name: "Ayesha K", role: "Instructor", status: "Suspended" },
];




const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>EduView Admin</h1>
        <nav className="admin-nav">
          <Link to="/Home">Home</Link>
          <Link to="/CourseList">Explore</Link>
          <Link to={getDashboardPath}>Dashboard</Link>
          <Link to="/Login">Logout</Link>
        </nav>
      </header>

      <section className="admin-section">
      <h2>Platform Overview</h2>
      <div className="overview-boxes">
        {platformStats.map((stat, index) => (
          <div className="box" key={index}>
            {stat.label} <span>{stat.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="admin-section">
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </div>
  );
};

export default AdminDashboard;
