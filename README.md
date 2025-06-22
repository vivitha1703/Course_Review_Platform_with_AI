
# 🎓 EduView – Course Review Platform with AI

EduView is a full-stack web application where students can explore, review, and rate courses. It supports AI-powered recommendations, role-based dashboards for students, instructors, and admins, and integrates user authentication and course management features.

---

## 📌 Description

EduView provides a centralized platform for:
- Browsing and reviewing academic courses
- Personalized course suggestions using AI
- Role-based dashboards (Student, Instructor, Admin)
- Course analytics and user insights
- Secure login & registration

Whether you're a student looking for the best course or an instructor managing your teaching insights — EduView simplifies and enhances the learning experience.

---

## ✨ Features

-  **JWT Authentication** with role-based access
-  **Course Catalog** with filtering and sorting
-  **Student Reviews & Ratings**
-  **Instructor Dashboard** with pie chart analysis
-  **Admin Dashboard** for user and course management
-  **AI-based Course Recommendations** 
-  **MongoDB** backend integration with Mongoose

---

## 🧠 AI Integration

EduView includes optional AI support:
- Recommendation system based on student reviews and interests
- Course similarity analysis
- Sentiment analysis based on the feedback

AI Endpoints:
- /sentiment --> Accepts feedback text and returns a sentiment score to understand user emotions and course perception
- /similar-courses --> Accepts a course description and returns a list of courses that are semantically similar using cosine similarity.
- /recommendations --> Provides personalized course recommendations based on the user's review history using collaborative filtering.

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- CSS3
- React Router
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

### AI Tools:
- Natural Language Processing (NLP) for course suggestions (planned/optional)
- Basic ML logic for recommendation (extendable)

---


## 🚀 Setup Instructions

###  Prerequisites:
- Node.js and npm
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

###  Frontend Setup:
- npm install
- npm run dev

###  Backend Setup:
- npm install
- npm run dev
- uvicorn main:app —reload —port 8000
- Your backend will be running at http://localhost:5000/.

### AI steps:
- pip install -r requirements.txt
- python main.py
- AI endpoints are serving at 'http://localhost:5001/'.
  
---
