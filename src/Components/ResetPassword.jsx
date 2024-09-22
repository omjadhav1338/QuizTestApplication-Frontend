import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Styles/ResetPassword.css';

function ResetPassword() {
  const { email } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setError('Invalid email');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/reset-password`, {
        email,
        newPassword
      });
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Password reset successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.close();
        });
      } else {
        setError('Error resetting password');
      }
    } catch (err) {
      setError('Error resetting password');
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-header">Reset Password</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="reset-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email || ''} className="form-input" readOnly />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
