import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../Styles/QuizTest.css";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function QuizTest() {
    const location = useLocation();
    const navigate = useNavigate();
    const { subject, numQuestions } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(numQuestions * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(`http://localhost:8080/api/quizzes?subject=${subject}&limit=${numQuestions}&random=true`);
            const questionCount = response.data;
            setTimeLeft(questionCount.length * 60);
            setQuestions(questionCount);
        };
        fetchQuestions();
    }, [subject, numQuestions]);

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitting) {
            const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearInterval(timerId);
        }
    }, [timeLeft, isSubmitting]);

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

    const handleSubmit = async () => {
        const confirmation = await Swal.fire({
            title: 'Confirm Submission',
            text: "Do you want to submit the test?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!',
            cancelButtonText: 'No, cancel'
        });

        if (confirmation.isConfirmed) {
            setIsSubmitting(true);
            clearInterval(); // Stop the timer

            const score = calculateScore();
            const answerDetails = questions.map(question => ({
                questionText: question.question,
                choices: question.choices,
                userAnswer: answers[question.id] || '',
                correctAnswer: question.correctChoice[0]
            }));

            const result = {
                studentEmail: sessionStorage.getItem("studentEmail"),
                subject: subject,
                questionCount: questions.length,
                answerDetails: JSON.stringify(answerDetails),
                score: score
            };

            try {
                const response = await axios.post('http://localhost:8080/student/result/save-quiz-result', result);

                const subject1 = "To inform test completed and show result";
                const body = `Congratulation!! You have completed the test. Information is as follows:
                            \nSubject: ${subject}
                            \nNumber of questions: ${questions.length}
                            \nScore: ${score}/${questions.length}
                            \nYou can see the details of your test by clicking on the following link:
                            \nhttp://localhost:5173/results/detail/${response.data.id}`;

                await axios.post('http://localhost:8080/api/sendsignupmail', {
                    mail: sessionStorage.getItem("studentEmail"),
                    subject: subject1,
                    body
                });

                // Show success message
                await Swal.fire({
                    title: 'Success!',
                    text: 'Test submitted successfully!',
                    icon: 'success'
                });

                navigate('/student/profile');
            } catch (error) {
                toast.error('Error submitting test. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
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
                            <button className="btn submit-button" onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit Test'}
                            </button>
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
