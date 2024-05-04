import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL= 'http://localhost:3000'
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster position='bottom-left' toastOptions={{ duration: 5000 }}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
      </Routes> 
    </>
  )
}

export default App
