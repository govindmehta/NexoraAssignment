# Nexora E-Commerce Cart

A modern, full-stack shopping cart application built for Vibe Commerce. This project demonstrates a complete e-commerce flow with product browsing, cart management, and checkout functionality.

## 📚 Documentation Navigation

**Quick Links:**
- ⚡ **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- 📖 **[SETUP.md](SETUP.md)** - Detailed setup instructions
- 🧪 **[API_TESTING.md](API_TESTING.md)** - API endpoint reference
- ✅ **[CHECKLIST.md](CHECKLIST.md)** - Testing checklist
- 🎨 **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - UI/UX guide
- 📁 **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** - Project structure
- 🎯 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Completion summary

## 🚀 Features

- **Product Catalog**: Browse 10 mock products with images, prices, and descriptions
- **Shopping Cart**: Add/remove items, update quantities with real-time total calculation
- **Checkout Process**: Simple form validation and mock order processing
- **Order Receipt**: Detailed order confirmation with order number and timestamp
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React** (v19.1.1) - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** (v4.1.16) - Styling
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📁 Project Structure

```
Nexora/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   └── checkout.js
│   │   ├── server.js
│   │   └── seed.js
│   ├── package.json
│   └── .env
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - Or update the `MONGODB_URI` in `backend/.env` to use MongoDB Atlas

4. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   cd ..
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. **Start the Frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Open your browser and visit** http://localhost:5173

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart with items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Checkout
- `POST /api/checkout` - Process checkout
- `GET /api/checkout/orders` - Get order history
- `GET /api/checkout/orders/:orderNumber` - Get specific order

## 🎨 Features Implementation

✅ Product catalog with grid layout
✅ Real-time cart management
✅ Form validation
✅ Mock checkout process
✅ Order confirmation receipt
✅ Responsive design (mobile, tablet, desktop)
✅ Error handling & loading states
✅ Toast notifications
✅ MongoDB persistence
✅ REST API integration

## 🎯 Bonus Features

- ✅ MongoDB persistence for all data
- ✅ Error handling throughout the application
- ✅ Order history tracking
- ✅ Professional UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Toast notifications

## 📝 Notes

- This is a mock e-commerce application for demonstration purposes
- No real payments are processed
- Uses a single mock user for cart persistence

## 👨‍💻 Author

Built for Vibe Commerce Internship Assignment

---

**Happy Shopping! 🛒**
