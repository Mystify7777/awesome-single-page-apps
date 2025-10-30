import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-product transition-all duration-300 animate-fade-in bg-gradient-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
              {product.originalPrice && (
                <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground">
                  Sale
                </Badge>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-foreground truncate">{product.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 hover:text-destructive"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  variant="cart"
                  size="sm"
                  onClick={handleAddToCart}
                  className="hover:animate-cart-bounce"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-product transition-all duration-300 animate-fade-in bg-gradient-card overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {product.originalPrice && (
              <Badge className="bg-destructive text-destructive-foreground">
                Sale
              </Badge>
            )}
            {product.featured && (
              <Badge className="bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 bg-white/80 hover:bg-white hover:text-destructive"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
            <Badge variant="secondary" className="text-xs ml-auto">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2 flex-grow">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <Button
            variant="cart"
            size="lg"
            className="w-full hover:animate-cart-bounce"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};