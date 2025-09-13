import api from './api';

export interface ShippingAddress {
  name: string;
  line1: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    title: string;
  }>;
  total: number;
  currency: string;
  paymentStatus: string;
  shippingAddress: ShippingAddress;
  stripeSessionId: string;
  createdAt: string;
  updatedAt: string;
}

export const checkoutService = {
  createCheckoutSession: async (shippingAddress: ShippingAddress): Promise<CheckoutSessionResponse> => {
    const response = await api.post('/checkout/session', { shippingAddress });
    return response.data;
  },

  getOrderStatus: async (sessionId: string): Promise<{ paymentStatus: string; orderId: string }> => {
    const response = await api.get(`/checkout/order-status/${sessionId}`);
    return response.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  getUserOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  }
};
