import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='w-full p-5 flex justify-between px-28'>
        <div className="con text-2xl font-bold">
            <span>Job</span><span className='text-red-500'> Portal</span>
        </div>
        <ul className='flex text-lg gap-4'>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/'}><li>About Us</li></Link>
            <Link to={'/login'}><li>Login</li></Link>
        </ul>
    </nav>
  )
}

export default Navbar
