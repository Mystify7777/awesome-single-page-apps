
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

const MusicPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume,
    togglePlayPause,
    skipNext,
    skipPrevious,
    setVolume,
    seek
  } = useMusicPlayer();

  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-gray/95 backdrop-blur-md border-t border-spotify-lightgray player-shadow">
      <div className="flex items-center justify-between p-4">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img
            src={currentTrack.artworkUrl100}
            alt={currentTrack.trackName}
            className="w-14 h-14 rounded-lg"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-spotify-white truncate">{currentTrack.trackName}</h4>
            <p className="text-sm text-spotify-white/70 truncate">{currentTrack.artistName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`${isLiked ? 'text-spotify-green' : 'text-spotify-white/70'} hover:text-spotify-green`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={`${isShuffled ? 'text-spotify-green' : 'text-spotify-white/70'} hover:text-spotify-white`}
            >
              <Shuffle size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipPrevious}
              className="text-spotify-white/70 hover:text-spotify-white"
            >
              <SkipBack size={20} />
            </Button>
            <Button
              onClick={togglePlayPause}
              className="bg-spotify-white text-spotify-dark hover:bg-spotify-white/90 w-10 h-10 rounded-full flex items-center justify-center"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipNext}
              className="text-spotify-white/70 hover:text-spotify-white"
            >
              <SkipForward size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
              className={`${repeatMode > 0 ? 'text-spotify-green' : 'text-spotify-white/70'} hover:text-spotify-white`}
            >
              <Repeat size={20} />
              {repeatMode === 2 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-spotify-green rounded-full"></span>}
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-spotify-white/70 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              onValueChange={handleProgressChange}
              max={duration}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-spotify-white/70 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <Volume2 size={20} className="text-spotify-white/70" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
