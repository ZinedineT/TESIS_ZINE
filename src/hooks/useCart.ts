// src/hooks/useCart.ts
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from './useAuth';

interface CartItem {
  productId: {
    _id: string;
    title: string;
    price: number;
    images: string[];
  };
  quantity: number;
  priceAtMoment: number;
  _id: string;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getCart();
      setCart(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const data = await apiService.addToCart(productId, quantity);
      setCart(data.cart);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const data = await apiService.removeFromCart(productId);
      setCart(data.cart);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    refetch: fetchCart,
  };
};
