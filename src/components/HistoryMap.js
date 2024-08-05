// src/components/PhotoMap.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa Leaflet
import 'leaflet/dist/leaflet.css';
import { getAllPhotos } from '../service/api'; // Asegúrate de que esta ruta es correcta

const PhotoMap = ({ token }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([0, 0]); // Default center

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getAllPhotos(token);
        setPhotos(data);
        if (data.length > 0) {
          // Centra el mapa en la primera foto disponible
          const firstPhoto = data[0];
          setCenter([firstPhoto.location.coordinates[1], firstPhoto.location.coordinates[0]]);
        }
      } catch (error) {
        console.error('Error fetching photos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [token]);

  // Configura el ícono del marcador
  const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  if (loading) {
    return <p className="text-center text-xl mt-4">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Photo Locations</h2>
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {photos.map((photo) => (
          <Marker
            key={photo._id}
            position={[photo.location.coordinates[1], photo.location.coordinates[0]]}
            icon={markerIcon} // Usa el ícono personalizado aquí
          >
            <Popup>
              <img
                src={`http://localhost:3001/uploads/${photo.filename}`}
                alt={photo.description}
                className="w-32 h-32 object-cover"
              />
              <p>{photo.description}</p>
              <p>{photo.date}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PhotoMap;
