import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/QuizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzesAndSubjects = async () => {
      try {
        const [quizzesResponse, subjectsResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/quizzes/all-quizzes'),
          axios.get('http://localhost:8080/api/subjects/all-subjects')
        ]);
        setQuizzes(quizzesResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };
    fetchQuizzesAndSubjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/quizzes/delete-quiz/${id}`);
      alert('Quiz deleted successfully!');
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error('There was an error deleting the quiz!', error);
      alert('There was an error deleting the quiz!');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-quiz/${id}`);
  };


  const subjectNameById = (id) => {
    const subject = subjects.find((subject) => subject.id === id);
    return subject ? subject.name : 'Uknown';
  };

  return (
    <div className="quizzes-container">
      <h2 className="quizzes-title">All Quizzes</h2>
      <ul className="quizzes-list">
        {quizzes.map((quiz) => (
          <li className="quiz-item" key={quiz.id}>
            <h3 className="quiz-question">{quiz.question}</h3>
            <p className="quiz-detail"><strong>Subject:</strong> {Number.isNaN(parseInt(quiz.subject, 10)) ? quiz.subject : subjectNameById(parseInt(quiz.subject))}</p>
            <p className="quiz-detail"><strong>Type:</strong> {quiz.questionType}</p>
            <p className="quiz-detail"><strong>Choices:</strong> {quiz.choices.join(', ')}</p>
            <p className="quiz-detail"><strong>Correct Answer:</strong> {quiz.correctChoice.join(', ')}</p>
            <button className="btn delete" onClick={() => handleDelete(quiz.id)}>Delete</button>
            <button className="btn update" onClick={() => handleUpdate(quiz.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
