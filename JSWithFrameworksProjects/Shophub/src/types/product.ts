export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';