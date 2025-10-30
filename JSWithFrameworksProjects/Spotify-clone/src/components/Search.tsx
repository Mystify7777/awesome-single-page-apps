import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic, Play, Heart, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useItunesApi, ItunesTrack } from '@/hooks/useItunesApi';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [likedTracks, setLikedTracks] = useState<number[]>([]);
  const [searchResults, setSearchResults] = useState<ItunesTrack[]>([]);
  
  const { searchTracks, formatDuration, loading } = useItunesApi();
  const { playTrack } = useMusicPlayer();

  const genres = [
    { name: 'Pop', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' },
    { name: 'Hip-Hop', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop' },
    { name: 'Rock', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=200&h=200&fit=crop' },
    { name: 'Electronic', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop' },
    { name: 'R&B', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop' },
    { name: 'Country', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop' },
    { name: 'Jazz', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' },
    { name: 'Classical', color: 'bg-indigo-500', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop' },
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim()) {
        const results = await searchTracks(searchQuery);
        setSearchResults(results);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    console.log('Voice search toggled:', !isListening);
    // Future: Implement voice search functionality
  };

  const handleGenreClick = async (genre: string) => {
    setSearchQuery(genre);
    const results = await searchTracks(genre, 30);
    setSearchResults(results);
  };

  const handlePlayTrack = (track: ItunesTrack) => {
    playTrack(track);
  };

  const handleLikeTrack = (trackId: number) => {
    setLikedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
    console.log(`${likedTracks.includes(trackId) ? 'Unliked' : 'Liked'} track: ${trackId}`);
  };

  const handleAddToPlaylist = (trackId: number) => {
    console.log(`Adding track ${trackId} to playlist...`);
    // Future: Open add to playlist modal
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = await searchTracks(searchQuery);
      setSearchResults(results);
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-white/50" size={20} />
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 py-3 bg-spotify-lightgray border-none text-spotify-white placeholder-spotify-white/50 focus:ring-2 focus:ring-spotify-green"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleVoiceSearch}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
              isListening ? 'text-spotify-green animate-pulse' : 'text-spotify-white/50'
            } hover:text-spotify-white`}
          >
            <Mic size={18} />
          </Button>
        </form>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-spotify-white mb-6">
            {loading ? 'Searching...' : `Search Results for "${searchQuery}"`}
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spotify-green mx-auto"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((track) => (
                <div
                  key={track.trackId}
                  className="glass-card p-4 track-hover group flex items-center space-x-4"
                >
                  <img
                    src={track.artworkUrl60}
                    alt={track.trackName}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-spotify-white truncate">{track.trackName}</h3>
                    <p className="text-sm text-spotify-white/70 truncate">{track.artistName}</p>
                  </div>
                  <div className="text-sm text-spotify-white/70 hidden md:block truncate max-w-xs">{track.collectionName}</div>
                  <div className="text-sm text-spotify-white/70">{formatDuration(track.trackTimeMillis)}</div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      onClick={() => handlePlayTrack(track)}
                      className="bg-spotify-green hover:bg-spotify-green/80"
                    >
                      <Play size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLikeTrack(track.trackId)}
                      className={likedTracks.includes(track.trackId) ? 'text-spotify-green' : 'text-spotify-white/70'}
                    >
                      <Heart size={14} fill={likedTracks.includes(track.trackId) ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAddToPlaylist(track.trackId)}
                      className="text-spotify-white/70 hover:text-spotify-white"
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-spotify-white/70 py-12">No results found</p>
          )}
        </section>
      )}

      {/* Browse by Genre */}
      <section>
        <h2 className="text-2xl font-semibold text-spotify-white mb-6">
          {searchQuery ? 'Browse All' : 'Browse by Genre'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.name}
              onClick={() => handleGenreClick(genre.name)}
              className={`relative h-32 rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 ${genre.color}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
              <div className="p-4 h-full flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white">{genre.name}</h3>
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-16 h-16 rounded-lg self-end transform rotate-12 opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
