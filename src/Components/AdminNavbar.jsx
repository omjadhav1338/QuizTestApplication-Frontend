import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">QuizMania</h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
        <li className="navbar-item"><Link to="/admin/student-list" className='navbar-link'>Students</Link></li>
        <li className="navbar-item"><Link to="/admin/add-quiz" className="navbar-link">Add Quiz</Link></li>
        <li className="navbar-item"><Link to="/admin/all-quizzes" className="navbar-link">All Quizzes</Link></li>
        <li className="navbar-item"><Link to="/admin/add-notes" className='navbar-link'>Add Notes</Link></li>
        <li className="navbar-item"><Link to="/admin/all-notes" className='navbar-link'>Notes</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
