// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import { FiHeart, FiMoon, FiSun } from 'react-icons/fi';
import Modal from './Modal'; // Importa el componente Modal

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); // Estado para mostrar el mensaje de bienvenida
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ username, password });
      setToken(token);
      setShowModal(true); // Muestra el modal con el video
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, revisa tus credenciales.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
    setShowWelcomeMessage(true); // Muestra el mensaje de bienvenida
  };

  const handleWelcomeMessageClick = () => {
    setShowWelcomeMessage(false); // Oculta el mensaje de bienvenida
    navigate('/gallery'); // Redirige a la vista de la galería
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
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="text"
              placeholder="example@email.com"
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
              placeholder="********"
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
            Login
          </button>
        </form>
        <button
          onClick={() => navigate('/register')}
          className={`w-full py-2 rounded-lg mt-4 hover:underline ${darkMode ? 'text-pink-400' : 'text-pink-500'}`}
        >
          Registrar
        </button>

        {showModal && (
          <Modal onClose={handleCloseModal} />
        )}

        {showWelcomeMessage && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
            onClick={handleWelcomeMessageClick}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              onClick={(e) => e.stopPropagation()} // Evita que el click dentro del mensaje cierre el mensaje
            >
              <h2 className="text-2xl font-bold text-green-500">Welcome Dani!</h2>
              <p className="mt-2 text-gray-700">Este pequeño detalle Lo hice porque quiero que tengas un espacio donde puedas compartir y conservar todos esos momentos que son importantes para ti. Aunque no siempre estoy a tu lado, quiero que sepas cuánto te quiero y que estoy aquí para ti.

Cada foto y cada lugar en esta galería me hacen pensar en ti y en lo mucho que significas para mí. Mi deseo es estar a tu lado, compartir estos momentos y ser parte de tus recuerdos.

Espero que este pequeño regalo lo aceptes con mucho cariño y lo tengas como un recuerdo de mi. No sabes cuanto te extraño Dani ojala pueda lleganar esta galeria junto ati Te quiero con cariño Juancho !</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
