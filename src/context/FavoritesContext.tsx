import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpaceImage, FavoritesMap } from '../types';
import { FAVORITES_KEY } from '../utils/constants';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FavoritesContextValue {
  favorites: FavoritesMap;                      // all saved images (id → image)
  addFavorite: (image: SpaceImage) => void;     // save an image
  removeFavorite: (id: string) => void;         // remove an image
  isFavorite: (id: string) => boolean;          // check if saved
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Load favorites from localStorage on first render
  const [favorites, setFavorites] = useState<FavoritesMap>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage every time favorites changes
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(image: SpaceImage) {
    setFavorites((prev) => ({ ...prev, [image.id]: image }));
  }

  function removeFavorite(id: string) {
    setFavorites((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  function isFavorite(id: string): boolean {
    return id in favorites;
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Use this hook in any component to access favorites
export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used inside <FavoritesProvider>');
  }
  return context;
}
