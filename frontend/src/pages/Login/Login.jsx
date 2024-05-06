import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [ data, setData] = useState({
    email: '',
    password: ''
  })

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('http://localhost:3000/users/login', { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('User login successful');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={userLogin}>
        <label>Email</label>
        <input type='email' placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}></input>
        <label>Password</label>
        <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}></input>
        <button type='submit'>Log In</button>
      </form>
      <Link to='/users/register'>Sign Up</Link>
      </div>
  )
}

export default Login