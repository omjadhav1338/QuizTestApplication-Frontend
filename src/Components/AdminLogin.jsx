import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnshComponents/Signin.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'oj740453@gmail.com' && password === '123') {
      alert('Login successful!');
      navigate('/admin/all-quizzes');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="background">
  <div className="container">
    <div className="form-wrapper">
      <h2 className="form-title">Admin Login</h2>
      <div className="form-container">
        <div className="form-box">
          <form onSubmit={handleLogin} className="form">
            <div className="input-group">
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default AdminLogin;
