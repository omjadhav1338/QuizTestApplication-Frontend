import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import QuizList from './Components/Quizlist';
import AddQuiz from './Components/AddQuiz';
import Home from './Components/Home';
import './App.css';
import UpdateQuiz from './Components/UpdateQuiz';
import AdminNavbar from './Components/AdminNavbar';
import AdminLogin from './Components/AdminLogin';
import About from './Components/About';
import AdminPage from './Components/AdminPage';
import StudentPage from './Components/StudentPage';
import StudentNavbar from './Components/StudentNavbar';
import SignupForm from './Components/SignupForm'
import Profile from './Components/Profile';
import StartQuiz from './Components/StartQuiz';
import QuizTest from './Components/QuizTest';
import ResultDetail from './Components/ResultDetail';
import ResultNavbar from './Components/ResultNavbar';
import StudentList from './Components/StudentList';
import SendEmail from './Components/SendEmail';
import ResetPassword from './Components/ResetPassword';
import AddNotes from './Components/AddNotes';
import NotesList from './Components/NotesList';
import UpdateNotes from './Components/UpdateNotes';
import ProfileOnAdmin from './Components/ProfileOnAdmin';
import NotesForStudents from './Components/NotesForStudents';


function App() {
  return (
    <Router>
      <div className="App"> 
      <Routes>
        <Route path="/admin/*" element={<AdminNavbar />} />
        <Route path="/*" element={<Navbar />} />
        <Route path="/student/*" element={<StudentNavbar/>}/>
        <Route path='/results/*' element={<ResultNavbar/>}/>
      </Routes>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/admin/add-quiz" element={<AddQuiz />} />
            <Route path="/admin/all-quizzes" element={<QuizList />} />
            <Route path="/admin/update-quiz/:id" element={<UpdateQuiz/>}/>
            <Route path="/admin/home" element={<AdminPage />} />
            <Route path='/student-signin' element={<StudentPage/>}/>
            <Route path='/student-signup' element={<SignupForm/>}/>
            <Route path='/student/profile' element={<Profile/>}/>
            <Route path='/student/start-quiz' element={<StartQuiz/>}/>
            <Route path='/student/quiz-test' element={<QuizTest/>}/>
            <Route path='/results/detail/:resultId' element={<ResultDetail/>}/>
            <Route path='/student/sendmail' element={<SendEmail/>}/>
            <Route path="/admin/student-list" element={<StudentList/>}/>
            <Route path='/student/reset-password/:email' element={<ResetPassword/>}/>
            <Route path="/admin/add-notes" element={<AddNotes />} />
            <Route path="/admin/all-notes" element={<NotesList />} />
            <Route path="/admin/update-notes/:id" element={<UpdateNotes />} />
            <Route path="/admin/student-list" element={<StudentList />} />
            <Route path="/admin/view-student-profile/:id" element={<ProfileOnAdmin />} />
            <Route path="/student/notes" element={<NotesForStudents />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;