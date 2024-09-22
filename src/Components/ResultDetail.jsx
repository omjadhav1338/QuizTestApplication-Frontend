import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/ResultDetail.css';

const ResultDetail = () => {
    const { resultId } = useParams();
    const [resultDetails, setResultDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResultDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/student/result/getresult/${resultId}`);
                const resultData = response.data;

                const parsedAnswerDetails = JSON.parse(resultData.answerDetails);

                setResultDetails({
                    ...resultData,
                    answerDetails: parsedAnswerDetails,
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching result details:', error);
                setLoading(false);
            }
        };

        fetchResultDetails();
    }, [resultId]);

    if (loading) {
        return <p>Loading result details...</p>;
    }

    if (!resultDetails || !resultDetails.answerDetails) {
        return <p>No result details found!</p>;
    }

    return (
        <div className="test-result-container">
            <h2>Test Result Details</h2>
            {resultDetails.answerDetails.map((question, qIndex) => (
                <div key={qIndex} className="question-item">
                    <h3 className="question-title">{`Question ${qIndex + 1}: ${question.questionText}`}</h3>
                    <ul className="choices-list">
                        {question.choices.map((choice, cIndex) => (
                            <li
                                key={cIndex}
                                className={`choice-item ${getChoiceClass(
                                    choice,
                                    question.correctAnswer,
                                    question.userAnswer
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

const getChoiceClass = (choice, correctAnswer, userAnswer) => {
    // Ensure correctAnswer and userAnswer are arrays
    const formattedCorrectAnswer = Array.isArray(correctAnswer) 
        ? correctAnswer.map(ans => ans.replace(/\s/g, '')) 
        : [correctAnswer.replace(/\s/g, '')];

    const formattedUserAnswer = Array.isArray(userAnswer) 
        ? userAnswer.map(ans => ans.replace(/\s/g, '')) 
        : [userAnswer.replace(/\s/g, '')];

    // Check if the choice is correct or incorrect
    if (formattedCorrectAnswer.includes(choice.replace(/\s/g, ''))) {
        return 'correct-choice';
    }
    if (formattedUserAnswer.includes(choice.replace(/\s/g, '')) && !formattedCorrectAnswer.includes(choice.replace(/\s/g, ''))) {
        return 'incorrect-choice';
    }
    return '';
};

export default ResultDetail;
