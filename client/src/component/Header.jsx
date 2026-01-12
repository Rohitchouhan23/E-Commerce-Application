import React from 'react'
import { useState } from 'react';

import {useNavigate,Link} from "react-router-dom"
import { logout } from '../services/authService';
function Header() {
   const navigate = useNavigate();
   const token = localStorage.getItem("token"); 
   const [isOpen, setIsOpen] = useState(false);

   const handleLogout = () => {
       logout();
       navigate("/login");
     };
  return (
    <header className=" sticky top-0 z-50 shadow  bg-gray-100">
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <Link to="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            CarBazaar
            </Link>
            {/* Hamburger menu for mobile */}
                <button 
                className="lg:hidden flex flex-col justify-between w-6 h-6" 
                onClick={() => setIsOpen(!isOpen)}
                >
                <span className="block h-0.5 w-full bg-gray-700"></span>
                <span className="block h-0.5 w-full bg-gray-700"></span>
                <span className="block h-0.5 w-full bg-gray-700"></span>
                </button>

            <nav className="hidden lg:flex items-center gap-4">
                <Link to="/" className="text-gray-700 hover:text-gray-900 font-bold text-xl">
                Home
                </Link>
                {token? (
                    <>
                        <Link 
                            to="/dashboard"
                            className="text-gray-700 hover:text-gray-900 font-bold text-xl">
                            Dashboard   
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="text-gray-700 hover:text-gray-900 font-bold text-xl">
                            Logout
                        </button>
                    </>
                ):(
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-gray-900 font-bold text-xl">
                            Login
                        </Link>
                        <Link to="/register" className="text-gray-700 hover:text-gray-900 font-bold text-xl">
                            Register
                        </Link>
                    </>
                )
                }
            </nav>
        </div>
          {/* Mobile Menu */}
        {isOpen && (
        <div className={`absolute  right-0 w-35  bg-gray-300 shadow-lg rounded-lg flex flex-col gap-2 p-2 lg:hidde`}>
            <Link to="/" onClick={() => setIsOpen(false)} className="px-3 py-2 hover:bg-gray-100 rounded-md font-bold">
            Home
            </Link>
            {token ? (
            <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-3 py-2 hover:bg-gray-100 rounded-md font-bold">Dashboard</Link>
                <button onClick={() => {handleLogout(); setIsOpen(false)}} className="px-3 py-2 hover:bg-gray-100 rounded-md font-bold">Logout</button>
            </>
            ) : (
            <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="px-3 py-2 hover:bg-gray-100 rounded-md font-bold">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="px-3 py-2 hover:bg-gray-100 rounded-md font-bold">Register</Link>
            </>
            )}
        </div>
        )}
    </header>
  )
}

export default Header; 