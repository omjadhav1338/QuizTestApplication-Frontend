import React from 'react';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">QuizMania</h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
        <li className="navbar-item"><a href="/about" className="navbar-link">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
