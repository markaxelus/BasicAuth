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
        toast.success('Registration successful');
        navigate('/users/login');
      }

    } catch(error) {
      toast.error("Insert all required fields.");
    }
  };

  return (
    <div className=" w-full h-auto mt-20 flex flex-col justify-center items-center">
      <form onSubmit={userRegister} className="bg-white size-128 shadow-xl rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' placeholder='Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}></input>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='email' placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type='password' placeholder='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-custom-1 hover:text-black transition duration-500 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
            Sign Up
          </button>
        </div>

      </form>

    </div>
  )
}

export default Register
