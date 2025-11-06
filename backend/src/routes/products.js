import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get single product
router.get('/:id', getSingleProduct);

export default router;
