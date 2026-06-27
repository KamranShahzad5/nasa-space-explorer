import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { fetchAPOD } from '../services/nasaApi';
import { APODResponse } from '../types';
import { POPULAR_SEARCHES } from '../utils/constants';

import './Home.css';

// Home Page
// Shows: Hero + Search + Today's Astronomy Picture + Popular Search chips

function Home() {
  const navigate = useNavigate();
  const [apod, setApod] = useState<APODResponse | null>(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [apodError, setApodError] = useState(false);

  // Load APOD when page mounts
  useEffect(() => {
    fetchAPOD()
      .then(setApod)
      .catch(() => setApodError(true))
      .finally(() => setApodLoading(false));
  }, []);

  // When user searches, go to /search page with the query
  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="home">

      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="container hero__content">
          <h1 className="hero__title">Explore NASA's Universe</h1>
          <p className="hero__subtitle">
            Search millions of images from NASA.
          </p>

          {/* Search bar */}
          <div className="hero__search">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search Mars, Galaxy, Moon..."
              large
            />
          </div>

          {/* Popular search chip buttons */}
          <div className="hero__chips">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                className="hero__chip"
                onClick={() => handleSearch(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── APOD Section ── */}
      <section className="apod-section">
        <div className="container">
          <h2 className="section-title">Astronomy Picture of the Day</h2>

          {apodLoading && (
            <div className="apod-skeleton">
              <div className="apod-skeleton__img" />
              <div className="apod-skeleton__info">
                <div className="apod-skeleton__line apod-skeleton__line--title" />
                <div className="apod-skeleton__line" />
                <div className="apod-skeleton__line" />
              </div>
            </div>
          )}

          {apodError && (
            <p className="error-msg">
              Could not load today's picture. NASA API daily limit may be reached. Try again later.
            </p>
          )}

          {apod && !apodLoading && (
            <div className="apod-card">
              {/* Only show image if it's an image (not a YouTube video) */}
              {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} className="apod-card__img" />
              ) : (
                <div className="apod-card__video-note">📽 Today's APOD is a video. Visit NASA.gov to watch it.</div>
              )}

              <div className="apod-card__info">
                <h3 className="apod-card__title">{apod.title}</h3>
                <p className="apod-card__desc">
                  {apod.explanation.length > 200 ? apod.explanation.substring(0, 200) + '...' : apod.explanation}
                </p>
                <a href={apod.hdurl || apod.url} target="_blank" rel="noreferrer" className="apod-card__link">
                  Read More &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Home;
