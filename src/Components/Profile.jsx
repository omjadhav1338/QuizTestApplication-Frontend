import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Profile.css';

export default function Profile() {
    const [student, setStudent] = useState(null);
    const [results, setResults] = useState([]);
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
            } catch (error) {
                console.error('Error fetching student data:', error);
                navigate('/student-signin');
            }
        };

        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/quizzes/results/${localStorage.getItem('studentEmail')}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };
        fetchStudent();
        fetchResults();
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

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (!student) return null;

    return (
        <div className="profile-container">
        <div className="profile-header-main">
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
            <hr style={{ width: "100%", border: "1px solid black" }} />
            <div>
                <h2>Quiz Results</h2>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Subject</th>
                            <th>Question Count</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={result.id}>
                                <td>{index + 1}</td>
                                <td>{formatDate(result.testDate)}</td>
                                <td>{formatTime(result.testDate)}</td>
                                <td>{result.subject}</td>
                                <td>{result.questionCount}</td>
                                <td>{result.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
