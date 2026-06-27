import React, { useState, KeyboardEvent } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;   // called when user submits a search
  initialValue?: string;               // pre-fill the input (e.g. on search page)
  placeholder?: string;
  large?: boolean;                     // larger style for hero section
}

// SearchBar component
// User types a query and presses Enter or clicks the Search icon

function SearchBar({ onSearch, initialValue = '', placeholder = 'Search space images...', large = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  function handleSearch() {
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  // Allow pressing Enter to search
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className={`search-bar ${large ? 'search-bar--large' : ''}`}>
      <input
        type="text"
        className="search-bar__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search NASA images"
      />
      {/* Clear button — only shows when there's text */}
      {query && (
        <button
          className="search-bar__clear"
          onClick={() => setQuery('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <button className="search-bar__icon-btn" onClick={handleSearch} aria-label="Search">
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
