import { useState } from 'react';

export interface ItunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  previewUrl: string;
  trackTimeMillis: number;
  collectionId: number;
}

export const useItunesApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTracks = async (query: string, limit: number = 20): Promise<ItunesTrack[]> => {
    if (!query.trim()) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('iTunes API error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTopTracks = async (genre: string = 'pop', limit: number = 20): Promise<ItunesTrack[]> => {
    return searchTracks(genre, limit);
  };

  const formatDuration = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    searchTracks,
    getTopTracks,
    formatDuration,
    loading,
    error
  };
};
