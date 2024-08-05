import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPhoto } from '../service/api';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // Importa Leaflet
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const UploadPhoto = ({ token }) => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('lat', lat);
    formData.append('lng', lng);

    try {
      await uploadPhoto(formData, token);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Photo uploaded successfully',
        confirmButtonText: 'OK',
      });
      navigate('/gallery');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error uploading photo',
        confirmButtonText: 'OK',
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    const markerIcon = new L.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });

    return lat && lng ? <Marker position={[lat, lng]} icon={markerIcon} /> : null;
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Upload Photo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>
        {preview && <img src={preview} alt="Preview" className="w-full h-64 object-cover mt-4 rounded-md" />}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
          <div className="mt-1">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-64 rounded-md"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPhoto;
