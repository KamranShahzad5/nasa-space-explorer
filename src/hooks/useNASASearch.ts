import { useState, useCallback } from 'react';
import { searchNASAImages } from '../services/nasaApi';
import { SpaceImage } from '../types';
import { mapNASAItem } from '../utils/helpers';

// ─── Hook: useNASASearch ──────────────────────────────────────────────────────
// Handles all search logic: loading state, errors, pagination, results

interface UseNASASearchReturn {
  images: SpaceImage[];         // results shown on screen
  loading: boolean;             // true while fetching
  error: string | null;         // error message if something went wrong
  totalHits: number;            // total results from NASA
  hasMore: boolean;             // can we load more?
  search: (query: string) => void;       // start a new search
  loadMore: () => void;                  // load next page
}

export function useNASASearch(): UseNASASearchReturn {
  const [images, setImages] = useState<SpaceImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');

  // Start a fresh search (resets results)
  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setImages([]);         // clear old results
    setCurrentPage(1);
    setCurrentQuery(query);

    try {
      const data = await searchNASAImages(query, 1);
      const items = data.collection.items
        .map(mapNASAItem)
        .filter((item): item is SpaceImage => item !== null); // remove nulls

      setImages(items);
      setTotalHits(data.collection.metadata.total_hits);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load next page and APPEND to existing results
  const loadMore = useCallback(async () => {
    if (!currentQuery || loading) return;

    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const data = await searchNASAImages(currentQuery, nextPage);
      const items = data.collection.items
        .map(mapNASAItem)
        .filter((item): item is SpaceImage => item !== null);

      setImages((prev) => [...prev, ...items]); // append
      setCurrentPage(nextPage);
    } catch (err) {
      setError('Failed to load more images.');
    } finally {
      setLoading(false);
    }
  }, [currentQuery, currentPage, loading]);

  // hasMore = we haven't loaded all results yet
  const hasMore = images.length < totalHits && images.length > 0;

  return { images, loading, error, totalHits, hasMore, search, loadMore };
}
