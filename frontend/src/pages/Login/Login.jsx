import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      const { data } = response;
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: '', password: '' }); // Clear the form
        toast.success('Login successful');
        toggleModal();
        setTimeout(() => {
          navigate('/');
        }, 200); 
      }
    } catch (error) {
      toast.error('Email or password is incorrect. Please try again.');
    }
  }

  return (
    <div className=" w-full h-auto mt-20 flex flex-col justify-center items-center">
      <form onSubmit={userLogin} className="bg-white size-128 shadow-xl rounded px-8 pt-6 pb-8 mb-4">

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
            Log In
          </button>
          <Link to='/users/register' className="inline-block align-baseline font-bold text-sm text-custom-1 hover:text-custom-2">
            Sign Up
          </Link>
        </div>

      </form>

    </div>
  );
};

export default Login;
