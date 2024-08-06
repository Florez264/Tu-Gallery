// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/api';
import { FiHeart, FiMoon, FiSun } from 'react-icons/fi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      navigate('/login');
    } catch (err) {
      setError('Error al registrar. Por favor, intenta nuevamente.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-pink-200 to-red-200'}`}>
      <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between mb-4">
          <div className="flex justify-center">
            <FiHeart className="h-10 w-10 text-pink-500" />
          </div>
          <button
            onClick={toggleDarkMode}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {darkMode ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-pink-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-pink-500'}`}
            />
          </div>
          <div className="mb-6">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-pink-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-pink-500'}`}
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition duration-200 ${darkMode ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
          >
            Register
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className={`w-full py-2 rounded-lg mt-4 hover:underline ${darkMode ? 'text-pink-400' : 'text-pink-500'}`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
