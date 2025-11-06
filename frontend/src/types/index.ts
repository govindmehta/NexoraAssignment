export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
}

export interface Order {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  timestamp: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
