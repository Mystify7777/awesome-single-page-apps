import React, { useState } from 'react';
import { X, GitCompare, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ComparisonToolProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart
}) => {
  const [compareList, setCompareList] = useState<Product[]>(products.slice(0, 3));

  const removeFromComparison = (productId: string) => {
    setCompareList(compareList.filter(p => p.id !== productId));
  };

  const addToComparison = (product: Product) => {
    if (compareList.length < 3) {
      setCompareList([...compareList, product]);
    }
  };

  const availableProducts = products.filter(p => !compareList.find(cp => cp.id === p.id));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            Product Comparison
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {compareList.map((product, index) => (
            <Card key={product.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => removeFromComparison(product.id)}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-primary">${product.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="font-medium">{product.rating}/5</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviews:</span>
                    <span className="font-medium">{product.reviews}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {compareList.length < 3 && (
            <Card className="border-dashed border-2 border-muted-foreground/20">
              <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center mb-4">Add another product to compare</p>
                
                <select
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const product = availableProducts.find(p => p.id === e.target.value);
                    if (product) addToComparison(product);
                  }}
                  value=""
                >
                  <option value="">Select a product...</option>
                  {availableProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};