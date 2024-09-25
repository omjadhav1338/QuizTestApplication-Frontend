import React, { useState } from 'react';
import '../Styles/SendMail.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SendEmail() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendClick = async () => {
    if (validateEmail(email)) {
      const subject = "To reset password";
      const body = `Click the following link which will redirect you to the password resetting page:\n http://localhost:5173/student/reset-password/${email}`;
    
      setIsSending(true);
      
      try {
        const response = await axios.post('http://localhost:8080/api/sendmail', { mail: email, subject, body });
        console.log('Email sent:', response.data);
        
       
        toast.success("Mail sent successfully, please check your mailbox.", {
          autoClose: 3000,
        });

        
        Swal.fire({
          title: 'Email Sent!',
          text: 'Please check your Gmail to reset the password.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Open Gmail',
          cancelButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/student-signin')
            window.open(`https://mail.google.com/mail/u/${email}`, '_blank');
          }
        });

      } catch (error) {
        console.error('There was an error!', error);
        toast.error('Error sending mail. Please try again later.', { autoClose: 3000 });
      } finally {
        setIsSending(false);
      }
    } else {
      toast.error("Please enter a valid email address", { autoClose: 3000 });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="send-email-container">
      <h2 className="send-email-title">Send an Email</h2>
      
      <div className="email-input-container">
        <input
          type="email"
          className="email-input-field"
          placeholder="Enter email address"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="send-button-container">
        <button className="send-button" onClick={handleSendClick} disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default SendEmail;
