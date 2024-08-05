// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhotoVideo, FaUpload, FaMapMarkedAlt, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ setToken }) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Cargar la preferencia del modo oscuro desde el localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return (
    <nav className={`bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center shadow-lg ${darkMode ? 'dark' : ''}`}>
      <ul className="flex space-x-8">
        <li className="group">
          <Link to="/gallery" className="flex items-center text-white font-bold hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110">
            <FaPhotoVideo className="mr-2 group-hover:animate-bounce" />
            Photo Gallery
          </Link>
        </li>
        <li className="group">
          <Link to="/upload" className="flex items-center text-white font-bold hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110">
            <FaUpload className="mr-2 group-hover:animate-bounce" />
            Upload Photo
          </Link>
        </li>
        <li className="group">
          <Link to="/map" className="flex items-center text-white font-bold hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-110">
            <FaMapMarkedAlt className="mr-2 group-hover:animate-bounce" />
            Memories Map
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="flex items-center text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-110"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110"
        >
          <FaSignOutAlt className="mr-2" />
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
