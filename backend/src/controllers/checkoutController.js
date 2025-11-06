import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

//dummy user id
const USER_ID = 'guest-user';

//Controller for process checkout
export const processCheckout = async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;
    
    // Validation
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Get cart
    const cart = await Cart.findOne({ userId: USER_ID }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Prepare order items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    // Create order
    const order = await Order.create({
      userId: USER_ID,
      customerName,
      customerEmail,
      items: orderItems,
      total: cart.total,
      orderNumber,
      status: 'completed'
    });
    
    // Clear cart
    cart.items = [];
    await cart.save();
    
    // Populate order details
    await order.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total,
        timestamp: order.createdAt,
        status: order.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing checkout',
      error: error.message
    });
  }
}


//Controller to get a specific order details from the database
export const getSpecificOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
}