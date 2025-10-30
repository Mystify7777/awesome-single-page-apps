
import React from 'react';
import Home from './Home';
import Search from './Search';
import Library from './Library';

interface MainContentProps {
  activeSection: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'library':
        return <Library />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-purple/20 to-spotify-dark overflow-y-auto">
      <div className="min-h-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContent;
