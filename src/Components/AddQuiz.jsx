import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AddQuiz.css';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';

const AddQuiz = () => {
    const MySwal = withReactContent(Swal);
    const {id} = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState({
    question: '',
    subject: '',
    choices: [''],
    correctChoice: ['']
    });
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/subjects/all-subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('There was an error fetching the subjects!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });

    if (name === 'subject' && value === 'add-new') {
      setShowNewSubjectInput(true);
    } else {
      setShowNewSubjectInput(false);
    }

    if (name === 'questionType' && value === 'Single Answer') {
      setQuiz({ ...quiz, correctChoice: [quiz.correctChoice[0]] });
    }
  };

  const handleChoicesChange = (index, value) => {
    const newChoices = [...quiz.choices];
    newChoices[index] = value;
    setQuiz({ ...quiz, choices: newChoices });
  };

  const handleCorrectChoicesChange = (index, value) => {
    const newCorrectChoices = [...quiz.correctChoice];
    newCorrectChoices[index] = value;
    setQuiz({ ...quiz, correctChoice: newCorrectChoices });
  };

  const addChoiceField = () => {
    setQuiz({ ...quiz, choices: [...quiz.choices, ''] });
  };

  const addCorrectChoiceField = () => {
    setQuiz({ ...quiz, correctChoice: [...quiz.correctChoice, ''] });
  };

  const removeChoiceField = (index) => {
    const newChoices = quiz.choices.filter((_, i) => i !== index);
    setQuiz({ ...quiz, choices: newChoices });
  };

  const removeCorrectChoiceField = (index) => {
    const newCorrectChoices = quiz.correctChoice.filter((_, i) => i !== index);
    setQuiz({ ...quiz, correctChoice: newCorrectChoices });
  };

  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };

  const addNewSubject = async () => {
    if (newSubject) {
      try {
        const response = await axios.post('http://localhost:8080/api/subjects/add-new-subject', { name: newSubject });
        setSubjects([...subjects, response.data]);
        setQuiz({ ...quiz, subject: response.data.name });
        setNewSubject('');
        setShowNewSubjectInput(false);
      } catch (error) {
        console.error('There was an error adding the new subject!', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/quizzes/add-new-quiz', quiz);
  
      MySwal.fire({
        title: 'Quiz Created!',
        text: 'Your quiz has been created successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/admin/all-quizzes');
      });
  
    } catch (error) {
      console.error('There was an error adding the quiz!', error);
  
      MySwal.fire({
        title: 'Error!',
        text: 'There was an issue creating the quiz. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  

  return (
    <div className="add-quiz-container">
      <h2 className="add-quiz-title">Add New Quiz</h2>
      <form className="add-quiz-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Question:</label>
          <input
            type="text"
            name="question"
            className="form-input"
            value={quiz.question}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Subject:</label>
          <select
            name="subject"
            className="form-select"
            value={quiz.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select a Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
            <option value="add-new">Add New Subject</option>
          </select>
        </div>
        {showNewSubjectInput && (
          <div className="form-group">
            <label className="form-label">New Subject:</label>
            <input
              type="text"
              className="form-input"
              value={newSubject}
              onChange={handleNewSubjectChange}
              placeholder="Enter new subject"
            />
            <button type="button" className="btn btn-primary" onClick={addNewSubject}>
              Add Subject
            </button>
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Choices:</label>
          {quiz.choices.map((choice, index) => (
            <div className="choice-item" key={index}>
              <input
                type="text"
                className="form-input"
                value={choice}
                onChange={(e) => handleChoicesChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-remove"
                onClick={() => removeChoiceField(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addChoiceField}>
            Add Choice
          </button>
        </div>
        <div className="form-group">
          <label className="form-label">Correct Choice:</label>
          {quiz.correctChoice.map((choice, index) => (
            <div className="choice-item" key={index}>
              <input
                type="text"
                className="form-input"
                value={choice}
                onChange={(e) => handleCorrectChoicesChange(index, e.target.value)}
                required
              />
              {quiz.questionType === 'Multiple Answer' && quiz.correctChoice.length > 1 && (
                <button
                  type="button"
                  className="btn btn-remove"
                  onClick={() => removeCorrectChoiceField(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {quiz.questionType === 'Multiple Answer' && (
            <button type="button" className="btn btn-secondary" onClick={addCorrectChoiceField}>
              Add Correct Choice
            </button>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Add Quiz</button>
      </form>
    </div>
  );
};

export default AddQuiz;
