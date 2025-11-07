import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40 border-b-2 border-[#FFDBB6]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#1A2A4F] p-2 rounded-lg">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-[#1A2A4F]">Nexora Store</h1>
          </div>
          
          <button
            onClick={onCartClick}
            className="relative bg-[#1A2A4F] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F7A5A5] text-[#1A2A4F] text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
