import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/ResultDetail.css';

// export default function ResultDetail() {
//     const { resultId } = useParams();
//     const [result, setResult] = useState(null);

//     useEffect(() => {
//         const fetchResult = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/quizzes/results/${resultId}`);
//                 setResult(response.data);
//             } catch (error) {
//                 console.error('Error fetching result:', error);
//             }
//         };
//         fetchResult();
//     }, [resultId]);

//     if (!result) return <p>Loading...</p>;

//     const { subject, testDate, score, questionCount, answerDetails } = result;
//     const percentage = (score / questionCount) * 100;

//     return (
//         <div className="test-result-container">
//             <h1>Test Result</h1>
//             <p>Subject: {subject}</p>
//             <p>Date: {new Date(testDate).toLocaleDateString()}</p>
//             <p>Score: {score} / {questionCount} ({percentage.toFixed(2)}%)</p>
//             <div className="details">
//                 <h2>Details:</h2>
//                 {answerDetails.map((detail, index) => (
//                     <div key={index} className="question-detail">
//                         <p><strong>Q.{index + 1}: {detail.questionText}</strong></p>
//                         {detail.choices.map((choice, idx) => {
//                             let className = 'choice';
//                             if (choice === detail.correctAnswer) {
//                                 className += ' correct';
//                             } else if (choice === detail.userAnswer) {
//                                 className += ' incorrect';
//                             }
//                             return (
//                                 <p key={idx} className={className}>
//                                     {choice}
//                                 </p>
//                             );
//                         })}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TestResult.css';

const ResultDetail = ({ resultId }) => {
    const [resultDetails, setResultDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching test result details using resultId
        const fetchResultDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/results/${resultId}`);
                setResultDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching result details', error);
                setLoading(false);
            }
        };

        fetchResultDetails();
    }, [resultId]);

    if (loading) {
        return <p>Loading result details...</p>;
    }

    if (!resultDetails) {
        return <p>No result details found!</p>;
    }

    return (
        <div className="test-result-container">
            <h2>Test Result Details</h2>
            {resultDetails.questions.map((question, qIndex) => (
                <div key={qIndex} className="question-item">
                    <h3>{`Question ${qIndex + 1}: ${question.text}`}</h3>
                    <ul className="choices-list">
                        {question.choices.map((choice, cIndex) => (
                            <li
                                key={cIndex}
                                className={`choice-item ${getChoiceClass(
                                    choice,
                                    question.correctAnswer,
                                    question.selectedAnswer
                                )}`}
                            >
                                {choice}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

// Helper function to assign classes based on the correctness of choices
const getChoiceClass = (choice, correctAnswer, selectedAnswer) => {
    if (choice === correctAnswer) {
        return 'correct-choice';
    }
    if (choice === selectedAnswer) {
        return 'incorrect-choice';
    }
    return '';
};

export default ResultDetail;
