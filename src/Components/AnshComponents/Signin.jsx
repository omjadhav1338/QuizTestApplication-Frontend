import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signin.css'

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            console.log('User logged in:', response.data);
            localStorage.setItem('studentEmail', email);
            alert("Login successful!")
            navigate('/student/profile');
        } catch (error) {
            toast.error('Invalid email or password.'.error);
        }
    };

    return (
        <div className="background">
            <div className="container">
                <div className="form-wrapper">
                <h2 className="form-title">Sign in to your account</h2>
                <p className="form-subtitle">
                    Or
                    <a href="/student-signup" className="link"> create an account</a>
                </p>
                </div>

                <div className="form-container">
                <div className="form-box">
                    <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <label htmlFor="email" className="label">Email address</label>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        placeholder="Enter your email address"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="label">Password</label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Enter your password"
                        />
                    </div>

                    <div className="options">
                        <div className="checkbox-group">
                        <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            className="checkbox"
                        />
                        <label htmlFor="remember_me" className="checkbox-label">Remember me</label>
                        </div>
                        <div className="forgot-password">
                        <a href="#" className="link">Forgot your password?</a>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Sign in</button>
                    </form>

                    <div className="divider">
                    <div className="line"></div>
                    <div className="or-text">Or continue with</div>
                    <div className="line"></div>
                    </div>

                    <div className="social-buttons">
                    <a href="#" className="social-btn">
                        <img className="social-icon" src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
                    </a>
                    <a href="#" className="social-btn">
                        <img className="social-icon" src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="Twitter" />
                    </a>
                    <a href="#" className="social-btn">
                        <img className="social-icon" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
                    </a>
                    </div>
                </div>
                </div>
            </div>
</div>

    );
}
