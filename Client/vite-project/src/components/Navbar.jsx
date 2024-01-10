import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
const Navbar = () => {
  return (
          <nav>
              <Link className='link' to='/'>Home</Link>
              <Link className='link' to="/login">Login</Link>
              <Link className='link' to="/register">Register</Link>
          </nav>
  )
}

export default Navbar