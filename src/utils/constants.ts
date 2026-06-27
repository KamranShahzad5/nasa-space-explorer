// NASA Image Library base URL (no API key needed!)
export const NASA_IMAGES_BASE = 'https://images-api.nasa.gov';

// NASA APOD API — needs your own free key from https://api.nasa.gov/
// Put it in a file called .env.local (see .env.local.example)
export const NASA_APOD_BASE = 'https://api.nasa.gov/planetary/apod';
export const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

// How many images to load per page
export const PAGE_SIZE = 20;

// Popular search chips shown on the home page
export const POPULAR_SEARCHES = [
  'Mars',
  'Moon',
  'Galaxy',
  'Earth',
  'Saturn',
  'Jupiter',
];

// LocalStorage key for favorites
export const FAVORITES_KEY = 'nasa_favorites';
