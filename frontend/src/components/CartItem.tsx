import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  loading?: boolean;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove, loading }: CartItemProps) => {
  const handleIncrement = () => {
    onUpdateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item._id, item.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow border border-[#FFDBB6]">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md shrink-0 border border-[#FFDBB6]"
      />
      
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-semibold text-[#1A2A4F] text-sm sm:text-base truncate">
            {item.name}
          </h3>
          <p className="text-[#1A2A4F] font-semibold text-sm sm:text-base mt-1">
            ${item.price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-[#FFF2EF] rounded-lg p-1 border border-[#FFDBB6]">
            <button
              onClick={handleDecrement}
              disabled={loading || item.quantity <= 1}
              className="p-1 hover:bg-[#FFDBB6] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center font-semibold text-sm text-[#1A2A4F]">
              {item.quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              disabled={loading}
              className="p-1 hover:bg-[#FFDBB6] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1A2A4F] text-sm sm:text-base">
              ${item.subtotal.toFixed(2)}
            </span>
            
            <button
              onClick={() => onRemove(item._id)}
              disabled={loading}
              className="p-2 text-[#F7A5A5] hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
