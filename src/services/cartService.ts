import api from './api';

export interface CartItem {
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

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number): Promise<Cart> => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data.cart;
  },

  removeFromCart: async (productId: string): Promise<Cart> => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data.cart;
  },

  updateCartItem: async (productId: string, quantity: number): Promise<Cart> => {
    // Implementar según tu API
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response.data.cart;
  }
};
