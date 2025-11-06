import api from './api';
import type { Product, Cart, CheckoutData, Order, ApiResponse } from '../types';

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>('/products');
    return response.data.data || [];
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data!;
  },
};

export const cartService = {
  // Get cart
  getCart: async (): Promise<Cart> => {
    const response = await api.get<ApiResponse<Cart>>('/cart');
    return response.data.data || { items: [], total: 0, itemCount: 0 };
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number = 1): Promise<void> => {
    await api.post('/cart', { productId, quantity });
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number): Promise<void> => {
    await api.put(`/cart/${itemId}`, { quantity });
  },

  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<void> => {
    await api.delete(`/cart/${itemId}`);
  },

  // Clear cart
  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
};

export const checkoutService = {
  // Process checkout
  checkout: async (data: CheckoutData): Promise<Order> => {
    const response = await api.post<ApiResponse<Order>>('/checkout', data);
    return response.data.data!;
  },

  // Get order history
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<ApiResponse<Order[]>>('/checkout/orders');
    return response.data.data || [];
  },

  // Get specific order
  getOrder: async (orderNumber: string): Promise<Order> => {
    const response = await api.get<ApiResponse<Order>>(`/checkout/orders/${orderNumber}`);
    return response.data.data!;
  },
};
