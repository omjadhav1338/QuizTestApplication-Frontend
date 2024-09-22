import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../Styles/StudentList.css';

const MySwal = withReactContent(Swal);

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:8080/api/get-students');
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/delete-student?id=${id}`)
          .then(() => {
            setStudents(students.filter(student => student.id !== id));
            MySwal.fire(
              'Deleted!',
              'The student has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error("There was an error deleting the student!", error);
            MySwal.fire(
              'Error!',
              'There was an error deleting the student.',
              'error'
            );
          });
      }
    });
  };

  const viewProfile = (id) => {
    navigate(`/admin/view-student-profile/${id}`);
  };

  return (
    <div className="student-list-container">
      <h1 className="student-list-title">Student List</h1>
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id} className="student-list-item">
            <span className="student-name">{student.fullName}</span>
            <div className="student-actions">
              <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
              <Link to={`/admin/view-student-profile/${student.id}`}>
                <button className="view-btn">View Profile</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
