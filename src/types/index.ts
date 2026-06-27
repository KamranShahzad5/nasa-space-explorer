// ─── NASA API Types ───────────────────────────────────────────────────────────

// Each image item returned by NASA Image Library API
export interface NASAImageItem {
  href: string; // link to image assets
  data: NASAImageData[];
  links?: NASAImageLink[];
}

export interface NASAImageData {
  nasa_id: string;
  title: string;
  description: string;
  date_created: string;
  center?: string;
  photographer?: string;
  keywords?: string[];
  media_type: string;
}

export interface NASAImageLink {
  href: string;
  rel: string;
  render?: string;
}

// Full search response from NASA
export interface NASASearchResponse {
  collection: {
    items: NASAImageItem[];
    metadata: {
      total_hits: number;
    };
    links?: {
      rel: string;
      href: string;
    }[];
  };
}

// APOD (Astronomy Picture of the Day) response
export interface APODResponse {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: string;
  copyright?: string;
}

// ─── App Types ────────────────────────────────────────────────────────────────

// A simplified image object we use inside the app
export interface SpaceImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  center?: string;
  photographer?: string;
  keywords?: string[];
}

// Favorites stored in localStorage
export type FavoritesMap = Record<string, SpaceImage>;
