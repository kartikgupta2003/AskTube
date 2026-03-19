import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Header from './Pages/Header.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Header></Header>
     <App />
  </BrowserRouter>
)
