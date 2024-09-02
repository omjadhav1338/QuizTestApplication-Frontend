import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

const StudentNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">QuizMania</h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
        <li className="navbar-item"><Link to="/student/profile" className='navbar-link'>Profile</Link></li>
        <li className='navbar-item'><Link to='/student/start-quiz' className='navbar-link'>Start Quiz</Link></li>
      </ul>
    </nav>
  );
};

export default StudentNavbar;
