# Nexora E-Commerce Store

A modern full-stack e-commerce shopping cart application built with React, Express, and MongoDB.

## 🎨 Features

- Browse products with responsive grid layout
- Add items to cart with quantity selection
- Real-time cart management (add, update, remove items)
- Smooth animations and transitions
- Mock checkout process
- Order receipt generation
- Modern UI with custom color palette

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.1 + TypeScript
- **Styling**: Tailwind CSS 4.1.16
- **Build Tool**: Vite 7.1.7
- **HTTP Client**: Axios 1.6.2
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Database**: MongoDB with Mongoose 8.0.0
- **Architecture**: MVC Pattern (Models, Controllers, Routes)

## 📁 Project Structure

```
Nexora/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── backend/           # Express + MongoDB backend
│   ├── src/
│   │   ├── models/        # Mongoose schemas
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   └── config/        # Database config
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create `.env` file for custom API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout and create order
- `GET /api/orders` - Get order history

## 🎯 Key Features

- **Quantity Selector**: Adjust quantity before adding to cart
- **Cart Sidebar**: Smooth slide-in/out animation with backdrop blur
- **Clear Cart**: One-click cart clearing with confirmation
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Real-time Updates**: Cart updates reflect immediately
- **Mock Checkout**: Complete checkout flow with receipt

## 📝 Scripts

### Backend
```bash
npm start       # Start server
npm run dev     # Start with nodemon
npm run seed    # Seed database
```

### Frontend
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🔧 Development

- Backend runs on port **5000**
- Frontend runs on port **5173**
- MongoDB default connection: **localhost:27017**
- CORS enabled for frontend integration
