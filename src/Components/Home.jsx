import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  const handleStudentClick = () => {
    navigate('/student-signin')
  };

  return (
    <div className="home-container">
      <div className='intro'>
        <h1 className='title'>Welcome to QuizMania</h1>
        <p>The application has been designed to streamline the quiz <br/>and examination system of Sangola College, Sangola. <br/>Students can now register an account and start taking quiz<br/> as and when available</p>
        <div className="button-container">
          <button className="btn home-btn" onClick={handleAdminClick}>
            Admin
          </button>
          <button className="btn home-btn" onClick={handleStudentClick}>
            Student
          </button>
        </div>
      </div>
      <div className='footer-part'>
        <p>Copyright © 2024 All Rights Reserved | SCS</p>
      </div>
    </div>
  );
};

export default Home;
