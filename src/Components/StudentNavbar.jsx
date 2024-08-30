import React from 'react';
import '../Styles/Navbar.css';

const StudentNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">QuizMania</h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
        <li className="navbar-item"><a href="/student/profile" className='navbar-link'>Profile</a></li>
        <li className='navbar-item'><a href='/student/start-quiz' className='navbar-link'>Start Quiz</a></li>
      </ul>
    </nav>
  );
};

export default StudentNavbar;
