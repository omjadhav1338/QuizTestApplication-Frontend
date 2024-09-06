import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../Styles/QuizTest.css";

function QuizTest() {
    const location = useLocation();
    const navigate = useNavigate();
    const { subject, numQuestions } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(numQuestions * 60);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(`http://localhost:8080/api/quizzes?subject=${subject}&limit=${numQuestions}&random=true`);
            setQuestions(response.data);
        };
        fetchQuestions();
    }, [subject, numQuestions]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearInterval(timerId);
        } else {
            handleSubmit();
        }
    }, [timeLeft]);

    const handleChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(question => {
            if (question.correctChoice.length === 1 && question.correctChoice[0].replace(/\s/g, '') === answers[question.id]?.replace(/\s/g, '')) {
                score += 1;
            }
        });
        return score;
    };

    const prepareResultDetails = () => {
        return questions.map(question => {
            const userAnswer = answers[question.id] || "Not Answered";
            const correctAnswer = question.correctChoice.join(', ');
            return {
                questionText: question.question,
                choices: question.choices,
                userAnswer,
                correctAnswer
            };
        });
    };

    const handleSubmit = async () => {
        const result = {
            studentEmail: localStorage.getItem('studentEmail'),
            subject: subject,
            questionCount: questions.length,
            score: calculateScore(),
            testDate: new Date(),
            answerDetails: prepareResultDetails()
        };
        await axios.post('http://localhost:8080/api/quizzes/submit', result);
        navigate('/student/profile');
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="quiz-test-container">
            <h1 className="quiz-title">Quiz Test</h1>
            <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            {questions.length > 0 ? (
                <div className="question-container">
                    <p className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    <p className="question-text">{questions[currentQuestionIndex]?.question}</p>
                    {questions[currentQuestionIndex]?.choices.map((choice, index) => (
                        <div key={index} className="choice-container">
                            <input
                                type="radio"
                                name={questions[currentQuestionIndex].id}
                                value={choice}
                                onChange={() => handleChange(questions[currentQuestionIndex].id, choice)}
                                checked={answers[questions[currentQuestionIndex].id] === choice}
                                className="choice-input"
                            />
                            <label className="choice-label">{choice}</label>
                        </div>
                    ))}
                    <div className="navigation-buttons">
                        {currentQuestionIndex !== 0 && (
                            <button className="btn nav-button" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button className="btn submit-button" onClick={handleSubmit}>Submit Test</button>
                        ) : (
                            <button className="btn nav-button" onClick={handleNext}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p className="no-questions-text">No questions available for this subject.</p>
            )}
        </div>
    );
}

export default QuizTest;
