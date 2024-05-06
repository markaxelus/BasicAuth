import React from 'react'
import { Link } from 'react-router-dom'
import NavbarCSS from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className="flex justify-end pr-20 pt-2 pb-2 text-base text-white w-full">
        <Link to='/'></Link>
        <Link to='/users/login' className='border-2 rounded-full p-4 bg-charcoal-1 hover:text-black
        transition duration-500 ease-in-out border-none' >Log In</Link>
        <Link to='/users/register'></Link>
    </nav>
  )
}

export default Navbar 