import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Styles/NotesList.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8080/api/notes/all-notes');
    setNotes(response.data);
  };

  const deleteNote = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this note?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    });

    if (confirmation.isConfirmed) {
      await axios.delete(`http://localhost:8080/api/notes/delete-notes?id=${id}`);
      Swal.fire('Deleted!', 'The note has been deleted.', 'success');
      fetchNotes();
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update-notes/${id}`);
  };

  const viewNote = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      <h2>All Notes</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <img src={note.image} alt={note.subject} />
            <h3>{note.subject}</h3>
            <button onClick={() => deleteNote(note.id)} className="delete-btn">Delete</button>
            <button onClick={() => handleUpdate(note.id)} className="update-btn">Update</button>
            <button onClick={() => viewNote(note.drive_link)} className="view-btn">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
