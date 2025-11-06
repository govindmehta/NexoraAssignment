import { Router } from "express";
import productsRoutes from './products.js';
import cartRoutes from './cart.js';
import checkoutRoutes from './checkout.js';

const mainRouter = Router();


//API Routes
mainRouter.use('/products', productsRoutes);
mainRouter.use('/cart', cartRoutes);
mainRouter.use('/checkout', checkoutRoutes);

export default mainRouter;