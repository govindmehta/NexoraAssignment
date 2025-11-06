# Nexora E-Commerce Backend

Backend API for Nexora E-Commerce Cart application.

## Features

- RESTful API for products, cart, and checkout
- MongoDB database with Mongoose ODM
- Mock user system for cart persistence
- Complete CRUD operations for cart management
- Order history tracking
- MVC architecture (Models, Controllers, Routes)
- Centralized route management

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- ES6 Modules

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexora-ecommerce
NODE_ENV=development
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── productController.js # Product logic
│   │   ├── cartController.js    # Cart logic
│   │   └── checkoutController.js# Checkout logic
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── products.js          # Product routes
│   │   ├── cart.js              # Cart routes
│   │   └── checkout.js          # Checkout routes
│   ├── server.js                # Express server setup
│   └── seed.js                  # Database seeder
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

## Database Setup

Make sure MongoDB is running on your system, then seed the database:

```bash
npm run seed
```

This will create 10 sample products in the database.

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart with items
- `POST /api/cart` - Add item to cart
  - Body: `{ productId, quantity }`
- `PUT /api/cart/:itemId` - Update cart item quantity
  - Body: `{ quantity }`
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout
  - Body: `{ customerName, customerEmail }`
- `GET /api/checkout/orders` - Get order history
- `GET /api/checkout/orders/:orderNumber` - Get specific order

### Health
- `GET /api/health` - Check server status

## Architecture

### MVC Pattern
The backend follows the Model-View-Controller (MVC) pattern:

- **Models** (`src/models/`): Define database schemas and data structure
- **Controllers** (`src/controllers/`): Handle business logic and data processing
- **Routes** (`src/routes/`): Define API endpoints and route handling

### Route Management
All routes are centralized through `src/routes/index.js` which imports and organizes:
- Product routes
- Cart routes  
- Checkout routes

### Key Features
- **Modular Structure**: Separated concerns for maintainability
- **Error Handling**: Consistent error responses across all endpoints
- **Mock User System**: Uses `guest-user` ID for cart persistence
- **Auto-calculated Totals**: Cart totals calculated via Mongoose pre-save hooks

## Response Format

All responses follow this format:

```json
{
  "success": true/false,
  "message": "Description",
  "data": { ... }
}
```

## Error Responses

Errors return appropriate HTTP status codes:
- `400` - Bad Request (invalid/missing data)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error (database/server issues)

Example error response:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Notes

- Uses ES6 module syntax (`import/export`)
- Environment variables loaded from parent directory
- CORS enabled for frontend integration
- Mock user ID: `guest-user` for all cart operations
- Order numbers auto-generated with timestamp
