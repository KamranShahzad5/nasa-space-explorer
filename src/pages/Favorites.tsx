import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';
import { SpaceImage } from '../types';
import './Favorites.css';

// Favorites Page
// Shows all images the user has saved (stored in localStorage via FavoritesContext)

function Favorites() {
  const { favorites } = useFavorites();
  const [selectedImage, setSelectedImage] = useState<SpaceImage | null>(null);

  // Convert favorites object (id → image) into an array for rendering
  const favoriteList = Object.values(favorites);

  return (
    <div className="favorites-page">
      <div className="container">

        <div className="favorites-page__header">
          <h1 className="favorites-page__title">❤️ Your Favorites</h1>
          {favoriteList.length > 0 && (
            <p className="favorites-page__count">
              {favoriteList.length} image{favoriteList.length !== 1 ? 's' : ''} saved
            </p>
          )}
        </div>

        {/* Empty state */}
        {favoriteList.length === 0 && (
          <div className="favorites-page__empty">
            <p className="favorites-page__empty-icon">🌌</p>
            <h3>No favorites yet</h3>
            <p>Search for space images and click ❤️ to save them here.</p>
            <a href="/search" className="favorites-page__cta">
              Start Exploring →
            </a>
          </div>
        )}

        {/* Grid of saved images */}
        {favoriteList.length > 0 && (
          <div className="image-grid">
            {favoriteList.map((img) => (
              <ImageCard
                key={img.id}
                image={img}
                onClick={setSelectedImage}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default Favorites;
