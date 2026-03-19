import React , { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import QuestionAnswerPage from './Pages/QuestionAnswerPage.jsx';
import './App.css'
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/search/:id" element={<QuestionAnswerPage/>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="responsive-toast"
        className="toast-container Toastify__toast-container"
      />
    </div>
  )
}

export default App
