import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart } from '@/components/ShoppingCart';
import { CheckoutPage } from '@/components/CheckoutPage';
import { ComparisonTool } from '@/components/ComparisonTool';
import { QuickViewModal } from '@/components/QuickViewModal';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { ViewMode, SortOption, Product } from '@/types/product';
import { products, getProductsByCategory, searchProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { GitCompare, Eye } from 'lucide-react';

type PageView = 'store' | 'checkout' | 'success';

export const Store: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('store');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    let result = searchQuery 
      ? searchProducts(searchQuery)
      : getProductsByCategory(selectedCategory);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        // For demo purposes, we'll sort by id (assuming higher id = newer)
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
  };

  const handleShopNow = () => {
    const productsSection = document.getElementById('products-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handlePayment = () => {
    setCurrentView('success');
  };

  if (currentView === 'checkout') {
    return (
      <CheckoutPage
        onBack={() => {
          setCurrentView('store');
          setIsCartOpen(true);
        }}
        onPayment={handlePayment}
      />
    );
  }

  if (currentView === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center p-8 bg-white rounded-2xl shadow-elegant max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-primary mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <button
            onClick={() => {
              setCurrentView('store');
              window.location.reload(); // Reset cart and state
            }}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection onShopNow={handleShopNow} />
        
        <div id="products-section" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Our Products'}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>

          <ProductFilters
            viewMode={viewMode}
            sortBy={sortBy}
            selectedCategory={selectedCategory}
            onViewModeChange={setViewMode}
            onSortChange={setSortBy}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              setSearchQuery('');
            }}
          />

          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};