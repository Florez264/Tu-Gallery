// src/components/PhotoGallery.js

import React, { useEffect, useState } from 'react';
import { getAllPhotos } from '../service/api'; // Asegúrate de que la ruta de importación sea correcta
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhotoGallery = ({ token }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomPhotos, setRandomPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getAllPhotos(token);
        setPhotos(data);
        if (data.length > 3) {
          const shuffled = data.sort(() => 0.5 - Math.random());
          setRandomPhotos(shuffled.slice(0, 3));
        } else {
          setRandomPhotos(data);
        }
      } catch (error) {
        console.error('Error fetching photos', error);
        setError('Failed to load photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [token]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <p className="text-center text-xl mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl mt-4 text-red-500">{error}</p>;
  }

  if (photos.length === 0) {
    return <p className="text-center text-xl mt-4">No photos available.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Photo Gallery</h2>

      {/* Carrusel con fotos aleatorias */}
      <div className="mb-8">
        <Slider {...settings}>
          {randomPhotos.map((photo) => (
            <div key={photo._id} className="relative p-2">
              <img
                src={photo.url}
                alt={photo.description}
                className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150'; // URL de la imagen de reemplazo
                }}
                onClick={() => window.open(photo.url, '_blank')}
              />
              <p className="text-center text-sm mt-2">{photo.description}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Galería completa */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-center">All Photos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <img
                src={photo.url}
                alt={photo.description}
                className="w-full h-32 object-cover rounded-lg cursor-pointer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150'; // URL de la imagen de reemplazo
                }}
                onClick={() => window.open(photo.url, '_blank')}
              />
              <p className="text-center text-xs mt-2">{photo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
