import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest-user'
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: {
    type: Number,
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'completed'
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
