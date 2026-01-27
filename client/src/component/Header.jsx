import React from 'react'
import { useState ,useEffect} from 'react';

import {useNavigate,Link} from "react-router-dom"
import { logout } from '../services/authService';
function Header() {
   const navigate = useNavigate();
   const token = localStorage.getItem("token"); 
   const [isOpen, setIsOpen] = useState(false);
   const [showNavbar, setShowNavbar] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);


   const handleLogout = () => {
       logout();
       navigate("/login");
     };

    useEffect(() => {
    const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Top pe hamesha show
    if (currentScrollY < 20) {
      setShowNavbar(true);
      setLastScrollY(currentScrollY);
      return;
    }

    if (currentScrollY < lastScrollY) {
      
      setShowNavbar(true);
    } else {
      
      setShowNavbar(false);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);

 }, [lastScrollY]);



  return (
<header
  className={`fixed   mx-auto w-full rounded z-50 bg-gray-100 shadow-xl transition-transform duration-300  ${showNavbar ? "translate-y-0" : "-translate-y-32"} `}>
         <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
            <Link to="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <Link
                to="/"
                className="flex items-center gap-2 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 13l2-5a3 3 0 012.8-2h8.4a3 3 0 012.8 2l2 5M5 13h14M6.5 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm14 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 10h8"
                />
                </svg>

                </div>

                <span>CarBazaar</span>
           </Link>

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
                        <Link 
                            to="/carsform"
                            className="text-gray-700 hover:text-gray-900 font-bold text-xl">
                            Add Car   
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
                <Link to="/carsform" onClick={() => setIsOpen(false)} className="px-3 py-2 hover:bg-gray-100 rounded-md font-bold">Add Car</Link>
                <button onClick={() => {handleLogout(); setIsOpen(false)}} className="  hover:bg-gray-100 rounded-md font-bold">Logout</button>
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