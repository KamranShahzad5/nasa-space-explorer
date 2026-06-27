import { NASAImageItem, SpaceImage } from '../types';

// Convert raw NASA API item → clean SpaceImage object we use in the app
export function mapNASAItem(item: NASAImageItem): SpaceImage | null {
  const data = item.data?.[0];
  const link = item.links?.[0];

  // Skip items with no image link or no data
  if (!data || !link?.href) return null;

  return {
    id: data.nasa_id,
    title: data.title,
    description: data.description,
    imageUrl: link.href,
    date: data.date_created,
    center: data.center,
    photographer: data.photographer,
    keywords: data.keywords,
  };
}

// Format ISO date string → "January 1, 2024"
export function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

// Truncate long text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
