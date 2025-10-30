
import React from 'react';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const mainNavItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Search, label: 'Search', id: 'search' },
    { icon: Library, label: 'Your Library', id: 'library' },
  ];

  const playlistItems = [
    'Create Playlist',
    'Liked Songs',
    'Recently Played',
    'Daily Mix 1',
    'Daily Mix 2',
    'Discover Weekly',
    'Release Radar',
    'Chill Hits',
    'Rock Classics',
    'Electronic Vibes'
  ];

  const handleCreatePlaylist = () => {
    console.log('Creating new playlist...');
    // Future: Open create playlist modal
  };

  const handleLikedSongs = () => {
    console.log('Opening liked songs...');
    setActiveSection('library');
  };

  const handlePlaylistClick = (playlist: string) => {
    console.log(`Opening playlist: ${playlist}`);
    setActiveSection('library');
  };

  return (
    <div className="w-64 h-full bg-spotify-darker flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-spotify-white">
          Spotify <span className="text-spotify-green">2.0</span>
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 space-y-2">
        {mainNavItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`w-full flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 ${
              activeSection === id
                ? 'bg-spotify-lightgray text-spotify-white'
                : 'text-spotify-white/70 hover:text-spotify-white hover:bg-spotify-gray'
            }`}
          >
            <Icon size={24} />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Create Playlist Button */}
      <div className="px-6 mt-8">
        <button 
          onClick={handleCreatePlaylist}
          className="w-full flex items-center space-x-4 py-3 px-4 text-spotify-white/70 hover:text-spotify-white hover:bg-spotify-gray rounded-lg transition-all duration-200"
        >
          <Plus size={24} />
          <span className="font-medium">Create Playlist</span>
        </button>
        <button 
          onClick={handleLikedSongs}
          className="w-full flex items-center space-x-4 py-3 px-4 text-spotify-white/70 hover:text-spotify-white hover:bg-spotify-gray rounded-lg transition-all duration-200"
        >
          <Heart size={24} />
          <span className="font-medium">Liked Songs</span>
        </button>
      </div>

      {/* Playlist List */}
      <div className="flex-1 px-6 mt-4 overflow-y-auto">
        <div className="space-y-1">
          {playlistItems.map((playlist, index) => (
            <button
              key={index}
              onClick={() => handlePlaylistClick(playlist)}
              className="w-full text-left py-2 px-4 text-spotify-white/70 hover:text-spotify-white hover:bg-spotify-gray rounded-lg transition-all duration-200 text-sm"
            >
              {playlist}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
