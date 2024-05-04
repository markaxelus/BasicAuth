import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/users/login'>Login</Link>
        <Link to='/users/register'>Register</Link>
    </nav>
  )
}

export default Navbar 