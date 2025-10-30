import React, { useState, useEffect } from 'react';
import { Play, MoreHorizontal, Heart, Plus, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useItunesApi, ItunesTrack } from '@/hooks/useItunesApi';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

const Home: React.FC = () => {
  const [likedTracks, setLikedTracks] = useState<number[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<ItunesTrack[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { getTopTracks, formatDuration } = useItunesApi();
  const { playTrack } = useMusicPlayer();

  useEffect(() => {
    const loadTracks = async () => {
      const tracks = await getTopTracks('pop', 6);
      setRecentlyPlayed(tracks);
      setLoading(false);
    };
    loadTracks();
  }, []);

  const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The most played songs right now",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      tracks: 50
    },
    {
      id: 2,
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      tracks: 30
    },
    {
      id: 3,
      title: "Chill Vibes",
      description: "Relax and unwind with these mellow tracks",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
      tracks: 42
    },
    {
      id: 4,
      title: "Workout Beats",
      description: "High energy tracks to fuel your workout",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      tracks: 67
    },
    {
      id: 5,
      title: "Indie Rock Mix",
      description: "Fresh indie rock discoveries",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
      tracks: 38
    },
    {
      id: 6,
      title: "Electronic Dreams",
      description: "Ethereal electronic soundscapes",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop",
      tracks: 55
    }
  ];

  const handleShufflePlay = () => {
    console.log('Starting shuffle play...');
    // Future: Start playing random songs
  };

  const handlePlayTrack = (track: ItunesTrack) => {
    playTrack(track);
  };

  const handlePlayPlaylist = (playlistId: number) => {
    console.log(`Playing playlist: ${playlistId}`);
    // Future: Start playing playlist
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

  const handleShare = (id: number, type: 'track' | 'playlist') => {
    console.log(`Sharing ${type}: ${id}`);
    // Future: Open share modal
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-spotify-white mb-2">Good evening</h1>
          <p className="text-spotify-white/70">Ready to discover your next favorite song?</p>
        </div>
        <Button 
          onClick={handleShufflePlay}
          className="bg-spotify-green hover:bg-spotify-green/80 text-white"
        >
          <Play size={16} className="mr-2" />
          Shuffle Play
        </Button>
      </div>

      {/* Recently Played */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-spotify-white mb-6">Top Tracks</h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spotify-green mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyPlayed.map((track) => (
              <div
                key={track.trackId}
                className="glass-card p-4 track-hover group"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={track.artworkUrl100}
                    alt={track.trackName}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-spotify-white truncate">{track.trackName}</h3>
                    <p className="text-sm text-spotify-white/70 truncate">{track.artistName}</p>
                  </div>
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
                      className={likedTracks.includes(track.trackId) ? 'text-spotify-green' : ''}
                    >
                      <Heart size={14} fill={likedTracks.includes(track.trackId) ? 'currentColor' : 'none'} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleAddToPlaylist(track.trackId)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-semibold text-spotify-white mb-6">Made for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredPlaylists.map((playlist) => (
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
                <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Button
                    size="sm"
                    onClick={() => handlePlayPlaylist(playlist.id)}
                    className="bg-spotify-green hover:bg-spotify-green/80 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Play size={14} />
                  </Button>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShare(playlist.id, 'playlist')}
                    className="bg-black/20 backdrop-blur-sm hover:bg-black/40"
                  >
                    <Share size={12} />
                  </Button>
                </div>
              </div>
              <h3 className="font-semibold text-spotify-white mb-2 truncate">{playlist.title}</h3>
              <p className="text-sm text-spotify-white/70 line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
