import { useState, useEffect, useCallback } from 'react';
import { cartService } from '../services';
import type { Cart } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cartService.getCart();
      setCart(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      await cartService.addToCart(productId, quantity);
      await fetchCart();
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to add item to cart');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await cartService.updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await cartService.removeFromCart(itemId);
      await fetchCart();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      await fetchCart();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to clear cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refetch: fetchCart,
  };
};
