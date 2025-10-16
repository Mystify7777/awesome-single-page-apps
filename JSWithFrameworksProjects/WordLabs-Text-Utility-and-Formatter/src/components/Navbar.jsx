// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState } from 'react';
import logo from "../assets/logo-wp.png";

function Navbar({ title, aboutText, mode, toggleMode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-[#010409] shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Title */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-black dark:text-white"
                >
                    <div className='flex gap-2 justify-center items-center'>

                        {title}
                        <img src={logo} className='w-6'>
                        </img>
                    </div>
          
                 
                </Link>
          

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Menu Links */}
                <div
                    className={`${menuOpen ? 'flex' : 'hidden'
                        } md:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-white dark:bg-[#010409] md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none transition-colors duration-300`}
                >
                    <Link
                        to="/"
                        className="text-black dark:text-white hover:text-blue-500 transition-colors duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-black dark:text-white hover:text-blue-500 transition-colors duration-300"
                        onClick={() => setMenuOpen(false)}
                    >
                        {aboutText}
                    </Link>

                    {/* Toggle Button */}
                    <button
                        onClick={() => {
                            toggleMode();
                            setMenuOpen(false);
                        }}
                        className="relative w-14 h-8 flex items-center rounded-full p-1 bg-gray-300 dark:bg-[#01040994] focus:outline-none"
                    >
                        {/* Knob */}
                        <div
                            className={` transition-colors duration-300 absolute left-1 top-1 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform ${mode === 'dark' ? 'translate-x-6'  : ''
                                }`}
                        ></div>

                        {/* Icons */}
                        <FaSun
                            className={`absolute left-2 text-yellow-400 text-sm ${mode === 'dark' ? 'hidden' : 'block'
                                }`}
                        />
                        <FaMoon
                            className={`absolute right-2 text-blue-300 text-sm ${mode === 'dark' ? 'block' : 'hidden'
                                }`}
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
