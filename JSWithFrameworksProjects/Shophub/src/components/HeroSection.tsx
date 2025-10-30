import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-banner.jpg';

interface HeroSectionProps {
  onShopNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Shop the latest trends with unbeatable prices and exceptional quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onShopNow}
              className="text-lg px-8"
            >
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
            >
              Explore Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};