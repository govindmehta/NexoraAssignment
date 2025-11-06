import express from 'express';
import { addItemToCart, clearCart, getCart, removeItem, updateQtyCart } from '../controllers/cartController.js';

const router = express.Router();

// GET /api/cart - Get cart with populated product details
router.get('/', getCart);

// POST /api/cart - Add item to cart
router.post('/', addItemToCart);

// PUT /api/cart/:itemId - Update cart item quantity
router.put('/:itemId', updateQtyCart);

// DELETE /api/cart/:itemId - Remove item from cart
router.delete('/:itemId', removeItem);

// DELETE /api/cart - Clear cart
router.delete('/', clearCart);

export default router;
