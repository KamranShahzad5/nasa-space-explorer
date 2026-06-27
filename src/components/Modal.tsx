import React, { useEffect } from 'react';
import { SpaceImage } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import './Modal.css';

interface ModalProps {
  image: SpaceImage | null; // null = modal is closed
  onClose: () => void;
}

// Modal = popup that shows full image details
// Opens when user clicks an ImageCard
// Closes on backdrop click or ✕ button or Escape key

function Modal({ image, onClose }: ModalProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Close modal when user presses Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [image]);

  // Don't render anything if no image is selected
  if (!image) return null;

  const saved = isFavorite(image.id);

  function handleFavorite() {
    if (saved) {
      removeFavorite(image!.id);
      toast('Removed from favorites', { icon: '💔' });
    } else {
      addFavorite(image!);
      toast.success('Saved to favorites!');
    }
  }

  // Download the image
  function handleDownload() {
    const link = document.createElement('a');
    link.href = image!.imageUrl;
    link.download = `${image!.title}.jpg`;
    link.target = '_blank';
    link.click();
    toast.success('Opening image for download...');
  }

  return (
    // Backdrop — clicking it closes the modal
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      {/* Stop clicks inside modal from closing it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        {/* Left: Large image */}
        <div className="modal__image-side">
          <img src={image.imageUrl} alt={image.title} className="modal__img" />
        </div>

        {/* Right: Details */}
        <div className="modal__info-side">
          <h2 className="modal__title">{image.title}</h2>

          {/* Meta info */}
          <div className="modal__meta">
            {image.date && (
              <div className="modal__meta-item">
                <span className="modal__meta-label">📅 Date</span>
                <span>{formatDate(image.date)}</span>
              </div>
            )}
            {image.center && (
              <div className="modal__meta-item">
                <span className="modal__meta-label">🏛 Center</span>
                <span>{image.center}</span>
              </div>
            )}
            {image.photographer && (
              <div className="modal__meta-item">
                <span className="modal__meta-label">📸 Photographer</span>
                <span>{image.photographer}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="modal__description">
            <p className="modal__meta-label">Description</p>
            <p>{image.description}</p>
          </div>

          {/* Keywords */}
          {image.keywords && image.keywords.length > 0 && (
            <div className="modal__keywords">
              {image.keywords.slice(0, 8).map((kw) => (
                <span key={kw} className="modal__keyword">{kw}</span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="modal__actions">
            <button
              className={`modal__btn ${saved ? 'modal__btn--danger' : 'modal__btn--primary'}`}
              onClick={handleFavorite}
            >
              {saved ? '💔 Remove Favorite' : '❤️ Save Favorite'}
            </button>
            <button className="modal__btn modal__btn--secondary" onClick={handleDownload}>
              ⬇️ Download
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Modal;
