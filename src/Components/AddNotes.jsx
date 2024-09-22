import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../Styles/AddNotes.css';

const AddNotes = () => {
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmation = await Swal.fire({
      title: 'Confirm Submission',
      text: "Are you sure you want to add this note?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel'
    });

    if (confirmation.isConfirmed) {
      const newNote = { subject, image, drive_link: driveLink };
      await axios.post('http://localhost:8080/api/notes/save-notes', newNote);
      Swal.fire('Success!', 'Note added successfully.', 'success'); 
      navigate('/admin/all-notes');
    }
  };

  return (
    <div className="add-note-container">
      <h2 className="form-title">Add New Note</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="driveLink">Drive Link:</label>
          <input
            id="driveLink"
            type="text"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Note</button>
      </form>
    </div>
  );
};

export default AddNotes;
