import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../Components/AnshComponents/Signin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'oj740453@gmail.com' && password === '123') {
      toast.success("Welcome Admin, Logged in successfully", {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/admin/all-quizzes');
      }, 3000);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid email or password!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
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
                  <label htmlFor="email" className="form-label">Email address</label>
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
                  <label htmlFor="password" className="form-label">Password</label>
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
      <ToastContainer /> 
    </div>
  );
};

export default AdminLogin;
