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
<img width="1918" height="932" alt="n1" src="https://github.com/user-attachments/assets/d78e0cfd-2c7e-4ada-9aad-e01138cecc91" />


### Shopping Cart
<img width="1918" height="927" alt="n2" src="https://github.com/user-attachments/assets/84aa8cbb-b214-46f3-b306-edb892f6cb18" />


### Checkout Form
<img width="786" height="926" alt="n3" src="https://github.com/user-attachments/assets/0ce2b7a4-99be-4bcf-8c9b-d9ff2d72484f" />


### Order Receipt
<img width="937" height="922" alt="n4" src="https://github.com/user-attachments/assets/7e860a08-e141-4197-919f-98f8b82985c3" />


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

