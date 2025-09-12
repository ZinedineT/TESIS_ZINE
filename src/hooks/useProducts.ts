// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import apiService from '../services/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const useProducts = (page = 1, limit = 12, category = '', search = '') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, [page, category, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProducts(page, limit, category, search);
      setProducts(data.products);
      setPagination(data.pagination);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, pagination, refetch: fetchProducts };
};
