// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UploadPhoto from './components/UploadPhoto';
import PhotoGallery from './components/PhotoGallery';
import Navbar from './components/Navbar';
import PhotoMap from './components/HistoryMap';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div>
      {token && <Navbar setToken={setToken} />}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={token ? <UploadPhoto token={token} /> : <Navigate to="/login" />} />
          <Route path="/gallery" element={token ? <PhotoGallery token={token} /> : <Navigate to="/login" />} />
          <Route path="/map" element={token ? <PhotoMap token={token} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
