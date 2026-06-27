import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './Navbar.css';

// Navbar shows logo + navigation links
// Active link is highlighted based on current URL

function Navbar() {
  const location = useLocation();
  const { favorites } = useFavorites();

  // Count how many favorites are saved
  const favoriteCount = Object.keys(favorites).length;

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span>NASA Space Explorer</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar__links">
          <li>
            <Link
              to="/"
              className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`navbar__link ${location.pathname === '/search' ? 'navbar__link--active' : ''}`}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`navbar__link ${location.pathname === '/favorites' ? 'navbar__link--active' : ''}`}
            >
              Favorites
              {/* Show badge if there are saved images */}
              {favoriteCount > 0 && (
                <span className="navbar__badge">{favoriteCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
