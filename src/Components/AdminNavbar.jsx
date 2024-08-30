import React from 'react';
import '../Styles/Navbar.css';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">QuizMania</h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
        <li className="navbar-item"><a href="/admin/add-quiz" className="navbar-link">Add Quiz</a></li>
        <li className="navbar-item"><a href="/admin/all-quizzes" className="navbar-link">All Quizzes</a></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
