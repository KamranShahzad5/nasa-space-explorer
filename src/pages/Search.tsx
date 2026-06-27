import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import Skeleton from '../components/Skeleton';
import Modal from '../components/Modal';
import { useNASASearch } from '../hooks/useNASASearch';
import { SpaceImage } from '../types';
import './Search.css';

// Search Page
// - Reads ?q= from URL to know what to search
// - Shows image grid + Load More + Modal

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  // Our custom hook handles all the search logic
  const { images, loading, error, totalHits, hasMore, search, loadMore } = useNASASearch();

  // selectedImage = which image to show in the modal (null = modal closed)
  const [selectedImage, setSelectedImage] = useState<SpaceImage | null>(null);

  // Run search when the URL query changes
  useEffect(() => {
    if (queryFromUrl) {
      search(queryFromUrl);
    }
  }, [queryFromUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  // When user types a new search, update URL (this triggers the effect above)
  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="search-page">
      <div className="container">

        {/* Search bar at top */}
        <div className="search-page__bar">
          <SearchBar onSearch={handleSearch} initialValue={queryFromUrl} />
        </div>

        {/* Result count */}
        {!loading && images.length > 0 && (
          <p className="search-page__count">
            Found <strong>{totalHits.toLocaleString()}</strong> results for "{queryFromUrl}"
          </p>
        )}

        {/* Loading: show skeleton cards */}
        {loading && images.length === 0 && <Skeleton count={12} />}

        {/* Error state */}
        {error && (
          <div className="search-page__error">
            <p>😟 {error}</p>
            <button onClick={() => search(queryFromUrl)} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Empty state: search was done but nothing found */}
        {!loading && !error && images.length === 0 && queryFromUrl && (
          <div className="search-page__empty">
            <p className="search-page__empty-icon">🔭</p>
            <h3>No results found</h3>
            <p>Try searching for "Galaxy", "Mars", or "Apollo"</p>
          </div>
        )}

        {/* No search yet */}
        {!loading && !error && images.length === 0 && !queryFromUrl && (
          <div className="search-page__empty">
            <p className="search-page__empty-icon">🌌</p>
            <h3>Search the universe</h3>
            <p>Type something above to explore NASA's image library</p>
          </div>
        )}

        {/* Image grid */}
        {images.length > 0 && (
          <div className="image-grid">
            {images.map((img) => (
              <ImageCard
                key={img.id}
                image={img}
                onClick={setSelectedImage} // open modal on click
              />
            ))}
          </div>
        )}

        {/* Loading more spinner (shown when loading page 2+) */}
        {loading && images.length > 0 && (
          <div className="loading-more">
            <div className="spinner" />
            <p>Loading more...</p>
          </div>
        )}

        {/* Load More button */}
        {hasMore && !loading && (
          <div className="load-more-wrap">
            <button className="load-more-btn" onClick={loadMore}>
              Load More Images
            </button>
          </div>
        )}

      </div>

      {/* Modal — shown when an image is selected */}
      <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default Search;
