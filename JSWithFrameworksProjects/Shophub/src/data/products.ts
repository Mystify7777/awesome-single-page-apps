import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  { id: "all", name: "All Products", count: 24 },
  { id: "electronics", name: "Electronics", count: 8 },
  { id: "clothing", name: "Clothing", count: 6 },
  { id: "home", name: "Home & Garden", count: 5 },
  { id: "sports", name: "Sports & Outdoors", count: 3 },
  { id: "books", name: "Books", count: 2 }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    tags: ["wireless", "premium", "noise-cancelling"],
    featured: true
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 249.99,
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and smart notifications. Water-resistant design for active lifestyles.",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    tags: ["smartwatch", "fitness", "health"],
    featured: true
  },
  {
    id: "3",
    name: "Designer Cotton T-Shirt",
    price: 29.99,
    originalPrice: 49.99,
    description: "Comfortable and stylish cotton t-shirt with modern design. Available in multiple colors and sizes.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
    category: "clothing",
    rating: 4.4,
    reviews: 356,
    inStock: true,
    tags: ["cotton", "casual", "comfortable"],
    featured: false
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    price: 599.99,
    description: "High-performance telephoto lens for professional photography. Sharp images with beautiful bokeh effect.",
    image: "https://images.unsplash.com/photo-1617005082133-3df6a870e8d4?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    tags: ["photography", "professional", "lens"],
    featured: true
  },
  {
    id: "5",
    name: "Luxury Leather Jacket",
    price: 199.99,
    originalPrice: 299.99,
    description: "Premium genuine leather jacket with classic design. Perfect for both casual and formal occasions.",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop",
    category: "clothing",
    rating: 4.7,
    reviews: 445,
    inStock: true,
    tags: ["leather", "luxury", "fashion"],
    featured: true
  },
  {
    id: "6",
    name: "Modern Table Lamp",
    price: 89.99,
    description: "Elegant modern table lamp with adjustable brightness. Perfect accent lighting for any room.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    category: "home",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    tags: ["lighting", "modern", "home"],
    featured: false
  },
  {
    id: "7",
    name: "Yoga Mat Premium",
    price: 49.99,
    description: "Non-slip premium yoga mat with excellent grip and cushioning. Eco-friendly materials.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    category: "sports",
    rating: 4.5,
    reviews: 289,
    inStock: true,
    tags: ["yoga", "fitness", "eco-friendly"],
    featured: false
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    description: "Portable Bluetooth speaker with amazing sound quality and long battery life. Perfect for outdoor activities.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.6,
    reviews: 678,
    inStock: true,
    tags: ["bluetooth", "portable", "audio"],
    featured: false
  },
  {
    id: "9",
    name: "Running Shoes",
    price: 129.99,
    description: "Comfortable running shoes with advanced cushioning technology. Designed for performance and style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "clothing",
    rating: 4.4,
    reviews: 567,
    inStock: true,
    tags: ["running", "comfortable", "athletic"],
    featured: false
  },
  {
    id: "10",
    name: "Coffee Maker Deluxe",
    price: 159.99,
    description: "Premium coffee maker with programmable features and thermal carafe. Brew perfect coffee every time.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
    category: "home",
    rating: 4.7,
    reviews: 423,
    inStock: true,
    tags: ["coffee", "kitchen", "premium"],
    featured: false
  },
  {
    id: "11",
    name: "Wireless Mouse",
    price: 39.99,
    description: "Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work and gaming.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.2,
    reviews: 234,
    inStock: true,
    tags: ["wireless", "ergonomic", "computer"],
    featured: false
  },
  {
    id: "12",
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 119.99,
    description: "Stylish and functional backpack with multiple compartments. Perfect for travel, work, or school.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "clothing",
    rating: 4.5,
    reviews: 345,
    inStock: true,
    tags: ["backpack", "travel", "designer"],
    featured: false
  }
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductsByCategory = (categoryId: string) => 
  categoryId === "all" ? products : products.filter(p => p.category === categoryId);
export const searchProducts = (query: string) =>
  products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );