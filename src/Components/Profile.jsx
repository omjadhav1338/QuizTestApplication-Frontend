import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Profile.css';
import Swal from 'sweetalert2'; // Import SweetAlert

export default function Profile() {
    const [student, setStudent] = useState(null);
    const [results, setResults] = useState([]);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const studentEmail = sessionStorage.getItem('studentEmail');
            if (!studentEmail) {
                navigate('/student-signin');
                return;
            }

            setEmail(studentEmail); // Save email to state

            try {
                const response = await axios.get('http://localhost:8080/api/student', {
                    params: { email: studentEmail }
                });
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
                navigate('/student-signin');
            }
        };

        fetchStudent();
    }, [navigate]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!email) return; // Ensure email is available

            try {
                const response = await axios.get(`http://localhost:8080/api/quizzes/results/${email}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            }
        };

        fetchResults();
    }, [email]); // Depend on email so this effect runs when email is set

    const handleLogout = async () => {
        const confirmation = await Swal.fire({
            title: 'Confirm Logout',
            text: "Are you sure you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'No, cancel'
        });

        if (confirmation.isConfirmed) {
            sessionStorage.clear();
            navigate('/student-signin');
        }
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
                    <button className="notes-btn" onClick={() => navigate('/student/notes')}>Notes</button>
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
                            <th>Actions</th>
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
                                <td>
                                    <button
                                        onClick={() => navigate(`/results/detail/${result.id}`)}
                                        className="view-details-btn"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
