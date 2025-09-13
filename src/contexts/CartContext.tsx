import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

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

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      // Redirigir a login si no está autenticado
      window.location.href = '/login';
      return;
    }

    try {
      const response = await cartAPI.addItem({ productId, quantity });
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const response = await cartAPI.removeItem(productId);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity === 0) {
        await removeFromCart(productId);
        return;
      }

      const response = await cartAPI.updateItem(productId, quantity);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

// En tu CartContext.tsx, agrega:
const clearCart = async () => {
  if (!user) return;

  try {
    // Opcional: llamar a un endpoint para limpiar el carrito en el backend
    await api.delete('/cart/clear');
    setCart(null);
  } catch (error) {
    console.error('Error clearing cart:', error);
    setCart(null);
  }
};

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const itemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
