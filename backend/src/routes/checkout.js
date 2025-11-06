import express from 'express';
import { getSpecificOrder, processCheckout } from '../controllers/checkoutController.js';

const router = express.Router();


// POST /api/checkout - Process checkout
router.post('/', processCheckout);

// GET /api/checkout/orders/:orderNumber - Get specific order
router.get('/orders/:orderNumber', getSpecificOrder);

export default router;
