import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Styles/StartQuiz.css';

const StartQuiz = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subjects/all-subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('There was an error fetching the subjects!', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleStartTest = () => {
    Swal.fire({
      title: 'Confirm Test Start',
      text: "Do you want to start the test?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, start it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/student/quiz-test`, {
          state: {
            subject: selectedSubject,
            numQuestions: numberOfQuestions
          }
        });
      }
    });
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Select Quiz</h2>
      <div className="form-group">
        <label className="form-label">Subject:</label>
        <select
          className="form-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select a Subject</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.name}>{subject.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Number of Questions:</label>
        <input
          className="form-input"
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          min="10"
          step="10"
        />
      </div>
      <button className="start-test-button" onClick={handleStartTest}>Start Test</button>
    </div>
  );
};

export default StartQuiz;
