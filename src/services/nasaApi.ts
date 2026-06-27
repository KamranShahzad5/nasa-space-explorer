import axios from 'axios';
import { NASASearchResponse, APODResponse } from '../types';
import { NASA_IMAGES_BASE, NASA_APOD_BASE, NASA_API_KEY, PAGE_SIZE } from '../utils/constants';

// ─── Search NASA Images ───────────────────────────────────────────────────────
// Calls NASA Image Library — no API key needed
export async function searchNASAImages(
  query: string,
  page: number = 1
): Promise<NASASearchResponse> {
  const response = await axios.get<NASASearchResponse>(`${NASA_IMAGES_BASE}/search`, {
    params: {
      q: query,
      media_type: 'image',   // only images, not videos or audio
      page,
      page_size: PAGE_SIZE,
    },
  });
  return response.data;
}

// ─── Get Astronomy Picture of the Day ────────────────────────────────────────
// Needs your own NASA API key (set in .env.local as REACT_APP_NASA_API_KEY)
export async function fetchAPOD(): Promise<APODResponse> {
  if (!NASA_API_KEY) {
    throw new Error(
      'Missing NASA API key. Add REACT_APP_NASA_API_KEY to your .env.local file, then restart the app.'
    );
  }

  const response = await axios.get<APODResponse>(NASA_APOD_BASE, {
    params: { api_key: NASA_API_KEY },
  });
  return response.data;
}
