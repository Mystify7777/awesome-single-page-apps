import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import MusicPlayer from '../components/MusicPlayer';
import NotificationSystem from '../components/NotificationSystem';
import { MusicPlayerProvider } from '@/contexts/MusicPlayerContext';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    const newNotification: Notification = { id, type, message, duration: 3000 };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(id);
    }, newNotification.duration);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Example of how notifications can be triggered (for testing)
  React.useEffect(() => {
    // Show welcome notification on load
    const timer = setTimeout(() => {
      addNotification('info', 'Welcome to Spotify 2.0! 🎵');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MusicPlayerProvider>
      <div className="h-screen flex flex-col bg-spotify-dark">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <MainContent activeSection={activeSection} />
        </div>
        <MusicPlayer />
        <NotificationSystem 
          notifications={notifications} 
          onRemoveNotification={removeNotification} 
        />
      </div>
    </MusicPlayerProvider>
  );
};

export default Index;
