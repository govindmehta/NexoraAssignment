# Nexora E-Commerce Store

Full-stack shopping cart application built with MERN stack.

## Features

- Product browsing with grid layout
- Cart management (add/remove/update quantities)
- Mock checkout with order receipt
- Responsive design with animations
- Loading states and toast notifications

## Screenshots

### Product Listing Page
![Product Listing](screenshots/products.png)

### Shopping Cart
![Shopping Cart](screenshots/cart.png)

### Checkout Form
![Checkout](screenshots/checkout.png)

### Order Receipt
![Receipt](screenshots/receipt.png)

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose

## Project Structure

```
frontend/src/
├── components/     # UI components
├── hooks/          # useProducts, useCart
├── services/       # API calls
└── types/          # TypeScript types

backend/src/
├── models/         # Product, Cart, Order
├── controllers/    # Business logic
├── routes/         # API routes
└── config/         # DB connection
```

## Setup

**Backend:**
```bash
cd backend
npm install
# Create .env: MONGODB_URI=your_uri, PORT=5000
npm run seed
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## API Endpoints

**Products:** `GET /api/products`, `GET /api/products/:id`

**Cart:** `GET /api/cart`, `POST /api/cart`, `PUT /api/cart/:itemId`, `DELETE /api/cart/:itemId`, `DELETE /api/cart`

**Orders:** `POST /api/checkout`, `GET /api/orders`

