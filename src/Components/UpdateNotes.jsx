import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../Styles/UpdateNotes.css';

const UpdateNotes = () => {
  const { id } = useParams();
  const [note, setNote] = useState({
    subject: '',
    image: '',
    drive_link: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchNoteById();
  }, [id]);

  const fetchNoteById = async () => {
    const response1 = await axios.get(`http://localhost:8080/api/notes/get-subject-by-id?id=${id}`);
    const subject = response1.data;
    const response = await axios.get(`http://localhost:8080/api/notes/fetch-by-subject?subject=${subject}`);
    setNote(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    const confirmation = await Swal.fire({
      title: 'Confirm Update',
      text: "Are you sure you want to update this note?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel'
    });

    if (confirmation.isConfirmed) {
      await axios.put('http://localhost:8080/api/notes/update-notes', note);
      Swal.fire('Updated!', 'The note has been updated.', 'success');
      navigate('/admin/all-notes');
    }
  };

  return (
    <div className="update-note-container">
      <h2 className="form-title">Update Note</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={note.subject}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            type="text"
            name="image"
            value={note.image}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="drive_link">Drive Link:</label>
          <input
            id="drive_link"
            type="text"
            name="drive_link"
            value={note.drive_link}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNotes;
