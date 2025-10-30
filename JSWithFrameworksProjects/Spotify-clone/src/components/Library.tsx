
import React, { useState } from 'react';
import { Grid, List, Search, Plus, Play, MoreHorizontal, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Library: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedPlaylists, setLikedPlaylists] = useState<number[]>([]);

  const playlists = [
    {
      id: 1,
      title: "My Favorites",
      type: "playlist",
      description: "Your favorite tracks all in one place",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      tracks: 127,
      creator: "You",
      lastPlayed: "2 hours ago"
    },
    {
      id: 2,
      title: "Chill Vibes",
      type: "playlist",
      description: "Relaxing music for any time of day",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
      tracks: 83,
      creator: "You",
      lastPlayed: "Yesterday"
    },
    {
      id: 3,
      title: "Workout Mix",
      type: "playlist",
      description: "High energy tracks to keep you motivated",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      tracks: 94,
      creator: "You",
      lastPlayed: "3 days ago"
    },
    {
      id: 4,
      title: "Liked Songs",
      type: "liked",
      description: "All your liked songs in one place",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      tracks: 234,
      creator: "You",
      lastPlayed: "Today"
    }
  ];

  const filters = ['All', 'Playlists', 'Artists', 'Albums'];

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                         (activeFilter === 'Playlists' && playlist.type === 'playlist');
    return matchesSearch && matchesFilter;
  });

  const handleCreatePlaylist = () => {
    console.log('Creating new playlist...');
    // Future: Open create playlist modal
  };

  const handlePlayPlaylist = (playlistId: number) => {
    console.log(`Playing playlist: ${playlistId}`);
    // Future: Start playing playlist
  };

  const handleLikePlaylist = (playlistId: number) => {
    setLikedPlaylists(prev => 
      prev.includes(playlistId) 
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
    console.log(`${likedPlaylists.includes(playlistId) ? 'Unliked' : 'Liked'} playlist: ${playlistId}`);
  };

  const handleSharePlaylist = (playlistId: number) => {
    console.log(`Sharing playlist: ${playlistId}`);
    // Future: Open share modal
  };

  const handleMoreOptions = (playlistId: number) => {
    console.log(`More options for playlist: ${playlistId}`);
    // Future: Open context menu
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-spotify-white">Your Library</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreatePlaylist}
            className="text-spotify-white/70 hover:text-spotify-white"
          >
            <Plus size={20} />
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`${viewMode === 'grid' ? 'text-spotify-white' : 'text-spotify-white/70'}`}
            >
              <Grid size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`${viewMode === 'list' ? 'text-spotify-white' : 'text-spotify-white/70'}`}
            >
              <List size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-white/50" size={20} />
          <Input
            type="text"
            placeholder="Search in Your Library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 bg-spotify-lightgray border-none text-spotify-white placeholder-spotify-white/50 focus:ring-2 focus:ring-spotify-green"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={`${
              activeFilter === filter 
                ? 'bg-spotify-green text-white' 
                : 'bg-spotify-lightgray border-spotify-lightgray text-spotify-white hover:bg-spotify-white/10'
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="glass-card p-4 track-hover group"
            >
              <div className="relative mb-4">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full aspect-square rounded-lg"
                />
                <Button
                  size="sm"
                  onClick={() => handlePlayPlaylist(playlist.id)}
                  className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green/80 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Play size={14} />
                </Button>
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLikePlaylist(playlist.id)}
                    className={`bg-black/20 backdrop-blur-sm hover:bg-black/40 ${
                      likedPlaylists.includes(playlist.id) ? 'text-spotify-green' : 'text-white'
                    }`}
                  >
                    <Heart size={12} fill={likedPlaylists.includes(playlist.id) ? 'currentColor' : 'none'} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSharePlaylist(playlist.id)}
                    className="bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white"
                  >
                    <Share size={12} />
                  </Button>
                </div>
              </div>
              <h3 className="font-semibold text-spotify-white mb-2 truncate">{playlist.title}</h3>
              <p className="text-sm text-spotify-white/70 line-clamp-2 mb-2">{playlist.description}</p>
              <p className="text-xs text-spotify-white/50">{playlist.tracks} songs</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="glass-card p-4 track-hover group flex items-center space-x-4"
            >
              <img
                src={playlist.image}
                alt={playlist.title}
                className="w-16 h-16 rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-spotify-white truncate">{playlist.title}</h3>
                <p className="text-sm text-spotify-white/70 truncate">{playlist.description}</p>
                <p className="text-xs text-spotify-white/50">{playlist.tracks} songs • {playlist.creator}</p>
              </div>
              <div className="text-sm text-spotify-white/70">{playlist.lastPlayed}</div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="sm" 
                  onClick={() => handlePlayPlaylist(playlist.id)}
                  className="bg-spotify-green hover:bg-spotify-green/80"
                >
                  <Play size={14} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleLikePlaylist(playlist.id)}
                  className={likedPlaylists.includes(playlist.id) ? 'text-spotify-green' : 'text-spotify-white/70'}
                >
                  <Heart size={14} fill={likedPlaylists.includes(playlist.id) ? 'currentColor' : 'none'} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleMoreOptions(playlist.id)}
                  className="text-spotify-white/70 hover:text-spotify-white"
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
