import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const [ data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const userRegister = async (e) => {
    
    e.preventDefault();
    
    const { name, email, password } = data;
    try {
      
      const { data } = await axios.post('http://localhost:3000/users/register', { name, email, password });
      
      if (data.error) {
        toast.error(data.error);
      } else {  
        setData({})
        toast.success('User registration successful');
        navigate('/users/login');
      }

    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={userRegister}>
        <label>Name</label>
        <input type='text' placeholder='Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}></input>
        <label>Email</label>
        <input type='email' placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}></input>
        <label>Password</label>
        <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}></input>
        <button type='submit'>Log In  </button>
      </form>
      <Link to='/' >Home</Link>
    </div>
  )
}

export default Register