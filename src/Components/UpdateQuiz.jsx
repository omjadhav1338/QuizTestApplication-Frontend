import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/AddQuiz.css';

const UpdateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    question: '',
    subject: '',
    choices: [''],
    correctChoice: ['']
  });
  const [subjects, setSubjects] = useState([]);
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('There was an error fetching the quiz!', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subjects/all-subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('There was an error fetching the subjects!', error);
      }
    };

    fetchQuiz();
    fetchSubjects();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: value
    }));

    if (name === 'subject' && value === 'add-new') {
      setShowNewSubjectInput(true);
    } else {
      setShowNewSubjectInput(false);
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
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      choices: [...prevQuiz.choices, '']
    }));
  };

  const addCorrectChoiceField = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      correctChoice: [...prevQuiz.correctChoice, '']
    }));
  };

  const removeChoiceField = (index) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      choices: prevQuiz.choices.filter((_, i) => i !== index)
    }));
  };

  const removeCorrectChoiceField = (index) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      correctChoice: prevQuiz.correctChoice.filter((_, i) => i !== index)
    }));
  };

  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };

  const addNewSubject = async () => {
    if (newSubject) {
      try {
        const response = await axios.post('http://localhost:8080/api/subjects/add-new-subject', { name: newSubject });
        setSubjects((prevSubjects) => [...prevSubjects, response.data]);
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          subject: response.data.subject
        }));
        setNewSubject('');
        setShowNewSubjectInput(false);
      } catch (error) {
        console.error('There was an error adding the new subject!', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:8080/api/quizzes/update-quiz/${id}`, quiz);
          Swal.fire('Updated!', 'Quiz has been updated successfully.', 'success');
          navigate('/admin/all-quizzes');
        } catch (error) {
          Swal.fire('Error!', 'There was an error updating the quiz.', 'error');
        }
      }
    });
  };

  return (
    <div className="add-quiz-container">
      <h2 className="add-quiz-title">Update Quiz</h2>
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
        <button type="submit" className="btn btn-primary">Update Quiz</button>
      </form>
    </div>
  );
};

export default UpdateQuiz;