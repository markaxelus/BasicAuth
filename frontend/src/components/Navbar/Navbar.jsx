import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center pt-2 pb-2 text-base pr-20 mx-10 text-white border-b border-black">
        <Link to='/' className='text-4xl p-4 text-black font-bold'>
          BasicAuth.
        </Link>

        <div>
          <Link to='/users/register' className='hidden'>Register</Link>
          <Link to='/users/login' className='border-2 rounded-full p-4 bg-custom-1 hover:text-black transition duration-500 ease-in-out border-none font-bold'>
            Log In
          </Link>
        </div>
    </nav>
  );
}

export default Navbar;
