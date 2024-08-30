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

function App() {
  return (
    <Router>
      <div className="App"> 
      <Routes>
        <Route path="/admin/*" element={<AdminNavbar />} />
        <Route path="/*" element={<Navbar />} />
        <Route path="/student/*" element={<StudentNavbar/>}/>
      </Routes>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/admin/add-quiz" element={<AddQuiz />} />
            <Route path="/admin/all-quizzes" element={<QuizList />} />
            <Route path="/update-quiz/:id" element={<UpdateQuiz/>}/>
            <Route path="/admin/home" element={<AdminPage />} />
            <Route path='/student-signin' element={<StudentPage/>}/>
            <Route path='/student-signup' element={<SignupForm/>}/>
            <Route path='/student/profile' element={<Profile/>}/>
            <Route path='/student/start-quiz' element={<StartQuiz/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
