import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  loading?: boolean;
}

export const ProductCard = ({ product, onAddToCart, loading }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product._id, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-[#FFDBB6]">
      <div className="relative h-48 overflow-hidden bg-[#FFF2EF]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-[#1A2A4F] text-white px-2 py-1 rounded-md text-xs font-semibold">
          {product.category}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[#1A2A4F]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        
        {/* Quantity Selector */}
        {product.stock > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600 font-medium">Quantity:</span>
            <div className="flex items-center border border-[#FFDBB6] rounded-lg overflow-hidden">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="px-3 py-1.5 bg-[#FFF2EF] hover:bg-[#FFDBB6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1.5 bg-white font-semibold text-[#1A2A4F] min-w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                className="px-3 py-1.5 bg-[#FFF2EF] hover:bg-[#FFDBB6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
          className="w-full bg-[#1A2A4F] hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <ShoppingCart size={18} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
