import React, { useState, useEffect } from "react";
import "./styles/CourseList.css";
import { Link } from "react-router-dom";
import getDashboardPath from "../utils/getDashboardPath";

import analyticsImg from "../assets/analytics.jpeg";
import webDevImg from "../assets/web.jpg";
import cloudImg from "../assets/cloud.jpeg";
import reactImg from "../assets/react.jpg";

// Static data for now
const allCourses = [
  {
    title: "Data Analytics",
    department: "IT",
    level: "Beginner",
    instructor: "John",
    reviews: 120,
    rating: 4.8,
    image: analyticsImg,
  },
  {
    title: "Web Development",
    department: "CSE",
    level: "Intermediate",
    instructor: "Jane",
    reviews: 200,
    rating: 4.5,
    image: webDevImg,
  },
  {
    title: "Cloud Computing",
    department: "IT",
    level: "Advanced",
    instructor: "John",
    reviews: 80,
    rating: 4.6,
    image: cloudImg,
  },
  {
    title: "React JS",
    department: "CSE",
    level: "Intermediate",
    instructor: "Jane",
    reviews: 140,
    rating: 4.7,
    image: reactImg,
  },
  {
    title: "Introduction to Python",
    department: "CSE",
    level: "Beginner",
    instructor: "John",
    reviews: 95,
    rating: 4.9,
    image: analyticsImg,
  },
];

const CourseList = () => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [filters, setFilters] = useState({
    department: "All",
    level: "",
    instructor: "All",
    search: "",
    sortBy: "",
    order: "desc",
  });

  useEffect(() => {
    let result = [...allCourses];

    // Filter
    if (filters.department !== "All") {
      result = result.filter(course => course.department === filters.department);
    }

    if (filters.level !== "") {
      result = result.filter(course => course.level === filters.level);
    }

    if (filters.instructor !== "All") {
      result = result.filter(course => course.instructor === filters.instructor);
    }

    if (filters.search.trim() !== "") {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    if (filters.sortBy) {
      result.sort((a, b) => {
        const field = filters.sortBy;
        const order = filters.order === "asc" ? 1 : -1;

        if (typeof a[field] === "string") {
          return a[field].localeCompare(b[field]) * order;
        } else {
          return (a[field] - b[field]) * order;
        }
      });
    }

    setFilteredCourses(result);
  }, [filters]);

  return (
    <>
      <div className="header">
        <h1>EduView</h1>
        <nav className="nav-links">
          <Link to="/Home">Home</Link>
          <Link to="/CourseList">Explore</Link>
          <Link to={getDashboardPath()}>Dashboard</Link>
          <Link to="/Login">Logout</Link>
        </nav>
      </div>

      <div className="course-page">
        <aside className="sidebar">
          <input
            type="text"
            placeholder="Search Courses..."
            className="search-bar"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />

          <h3>FILTER</h3>

          <label>Department</label>
          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, department: e.target.value }))
            }
          >
            <option>All</option>
            <option>CSE</option>
            <option>IT</option>
          </select>

          <label>Level</label>
          <div className="levels">
            <label>
              <input
                type="radio"
                name="level"
                onChange={() =>
                  setFilters((prev) => ({ ...prev, level: "Beginner" }))
                }
              />{" "}
              Beginner
            </label>
            <label>
              <input
                type="radio"
                name="level"
                onChange={() =>
                  setFilters((prev) => ({ ...prev, level: "Intermediate" }))
                }
              />{" "}
              Intermediate
            </label>
            <label>
              <input
                type="radio"
                name="level"
                onChange={() =>
                  setFilters((prev) => ({ ...prev, level: "Advanced" }))
                }
              />{" "}
              Advanced
            </label>
          </div>

          <label>Instructor</label>
          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, instructor: e.target.value }))
            }
          >
            <option>All</option>
            <option>John</option>
            <option>Jane</option>
          </select>

          <h3>SORT</h3>
          <div className="sort-options">
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: "rating",
                    order: "desc",
                  }))
                }
              />{" "}
              Highest rated
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: "rating",
                    order: "asc",
                  }))
                }
              />{" "}
              Lowest rated
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: "reviews",
                    order: "desc",
                  }))
                }
              />{" "}
              Most reviewed
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: "reviews",
                    order: "asc",
                  }))
                }
              />{" "}
              Least reviewed
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: "title",
                    order: "asc",
                  }))
                }
              />{" "}
              A-Z
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: "title",
                    order: "desc",
                  }))
                }
              />{" "}
              Z-A
            </label>
          </div>
        </aside>

        <main className="courses">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div className="course-card" key={index}>
                <img
                  src={course.image || "https://via.placeholder.com/200"}
                  alt={course.title}
                />
                <p>{course.title}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No courses found</p>
          )}
        </main>
      </div>
    </>
  );
};

export default CourseList;
