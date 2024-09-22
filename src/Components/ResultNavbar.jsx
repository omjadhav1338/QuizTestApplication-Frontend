import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const backAction = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      window.close();
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">QuizMania</h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><button className='nav-button'><Link onClick={backAction} className='navbar-link' >Back</Link></button></li>
      </ul>
    </nav>
  );
};

export default StudentNavbar;
