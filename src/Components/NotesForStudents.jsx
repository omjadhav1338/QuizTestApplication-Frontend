import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/NotesList.css'

const NotesForStudents = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8080/api/notes/all-notes');
    setNotes(response.data);
    console.log(notes.image);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/delete-notes?id=${id}`);
    fetchNotes(); // Refresh the list after deleting
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
                <button onClick={() => viewNote(note.drive_link)} className="view-btn-student">View</button>
            </div>
            ))}
        </div>
    </div>

  );
};

export default NotesForStudents;
