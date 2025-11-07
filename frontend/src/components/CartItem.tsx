import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  loading?: boolean;
  removing?: boolean;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove, loading, removing }: CartItemProps) => {
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
              disabled={loading || removing || item.quantity <= 1}
              className="p-1 hover:bg-[#FFDBB6] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center font-semibold text-sm text-[#1A2A4F]">
              {item.quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              disabled={loading || removing}
              className="p-1 hover:bg-[#FFDBB6] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
              disabled={loading || removing}
              className="p-2 text-[#F7A5A5] hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer relative"
              aria-label="Remove item"
            >
              {removing ? (
                <svg className="animate-spin h-[18px] w-[18px] text-[#F7A5A5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
