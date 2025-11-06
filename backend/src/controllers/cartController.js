import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

//dummy user
const USER_ID = 'guest-user'; 

//Controller to get cart details with items in it
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: USER_ID }).populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({ userId: USER_ID, items: [] });
    }
    
    // Format cart items with product details
    const formattedItems = cart.items.map(item => ({
      _id: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      price: item.price,
      image: item.productId.image,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    }));
    
    res.json({
      success: true,
      data: {
        items: formattedItems,
        total: cart.total,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
}

//Controller to update cart with new item
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId: USER_ID });
    if (!cart) {
      cart = await Cart.create({ userId: USER_ID, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        price: product.price
      });
    }
    
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
      error: error.message
    });
  }
}


//Controller to update cart item quantity
export const updateQtyCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }
    
    const cart = await Cart.findOne({ userId: USER_ID });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
}

//Controller for removing item from cart
export const removeItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ userId: USER_ID });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Remove item using pull
    cart.items.pull(itemId);
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart',
      error: error.message
    });
  }
}

//Controller to clear the cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: USER_ID });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
}