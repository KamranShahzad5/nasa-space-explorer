import React, { useState } from 'react';
import { SpaceImage } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { truncate, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import './ImageCard.css';

interface ImageCardProps {
  image: SpaceImage;
  onClick: (image: SpaceImage) => void; // open modal
}

// ImageCard shows a single NASA image in a grid
// Click → opens modal | Heart button → saves to favorites

function ImageCard({ image, onClick }: ImageCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [imgError, setImgError] = useState(false); // true if image failed to load

  const saved = isFavorite(image.id);

  function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation(); // don't open modal when clicking heart
    if (saved) {
      removeFavorite(image.id);
      toast('Removed from favorites', { icon: '💔' });
    } else {
      addFavorite(image);
      toast.success('Saved to favorites!');
    }
  }

  return (
    <div className="image-card fade-in" onClick={() => onClick(image)}>
      {/* Image */}
      <div className="image-card__image-wrap">
        {imgError ? (
          <div className="image-card__fallback">🌌</div>
        ) : (
          <img
            src={image.imageUrl}
            alt={image.title}
            className="image-card__img"
            loading="lazy"              // browser lazy loads — good for performance
            onError={() => setImgError(true)}
          />
        )}

        {/* Favorite button overlaid on top-right */}
        <button
          className={`image-card__fav-btn ${saved ? 'image-card__fav-btn--saved' : ''}`}
          onClick={handleFavorite}
          aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Info below image */}
      <div className="image-card__info">
        <h3 className="image-card__title">{truncate(image.title, 60)}</h3>
        <p className="image-card__date">{formatDate(image.date)}</p>
        {image.center && (
          <p className="image-card__center">{image.center}</p>
        )}
      </div>
    </div>
  );
}

export default ImageCard;
