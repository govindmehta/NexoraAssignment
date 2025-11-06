import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Product from './models/Product.js';
import connectDB from './config/database.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend directory (parent of src)
dotenv.config({ path: join(__dirname, '..', '.env') });

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    stock: 50
  },
  {
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with fitness tracking and heart rate monitor",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Electronics",
    stock: 30
  },
  {
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    category: "Accessories",
    stock: 75
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard with blue switches and premium keycaps",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    category: "Electronics",
    stock: 40
  },
  {
    name: "Wireless Mouse",
    price: 39.99,
    description: "Ergonomic wireless mouse with precision tracking",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    category: "Electronics",
    stock: 100
  },
  {
    name: "USB-C Hub",
    price: 59.99,
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    category: "Accessories",
    stock: 60
  },
  {
    name: "Portable SSD",
    price: 149.99,
    description: "1TB portable SSD with fast read/write speeds",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
    category: "Storage",
    stock: 45
  },
  {
    name: "Webcam HD",
    price: 89.99,
    description: "1080p HD webcam with auto-focus and built-in microphone",
    image: "https://images.unsplash.com/photo-1567696154049-4b3e362e7c3f?w=500&h=500&fit=crop",
    category: "Electronics",
    stock: 35
  },
  {
    name: "Phone Case",
    price: 24.99,
    description: "Protective phone case with shock absorption",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
    category: "Accessories",
    stock: 150
  },
  {
    name: "Desk Lamp",
    price: 44.99,
    description: "LED desk lamp with adjustable brightness and color temperature",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    category: "Home",
    stock: 80
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${createdProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
