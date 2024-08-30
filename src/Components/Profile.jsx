import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Profile.css';

export default function Profile() {
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const email = localStorage.getItem('studentEmail');
            if (!email) {
                navigate('/student-signin');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/student', {
                    params: { email }
                });
                setStudent(response.data);
                localStorage.setItem('studentEmail',"");
            } catch (error) {
                console.error('Error fetching student data:', error);
                navigate('/student-signin');
            }
        };

        fetchStudent();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('studentEmail');
        navigate('/student-signin');
    };

    const getInitials = (fullName) => {
        if (!fullName) return '';
        const names = fullName.split(' ');
        return names.length > 1
            ? `${names[0][0]}${names[1][0]}`.toUpperCase()
            : `${names[0][0]}`.toUpperCase();
    };

    if (!student) return null;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-picture">
                    <div className="initials">{getInitials(student.fullName)}</div>
                </div>
                <div className="profile-info">
                    <h2>{student.fullName}</h2>
                    <p>{student.email}</p>
                </div>
            </div>
            <div className="profile-actions">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
                <button className="notes-btn" onClick={() => navigate('/notes')}>Notes</button>
            </div>
        </div>
    );
}
