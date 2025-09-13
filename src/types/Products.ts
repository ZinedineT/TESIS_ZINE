// src/types/product.ts
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  images: string[];
  category: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: {
    colors: string[];
    tags: string[];
  };
}
