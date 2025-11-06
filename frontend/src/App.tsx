import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { X, ShoppingBag, Package, Trash2 } from 'lucide-react';
import { useProducts, useCart } from './hooks';
import { checkoutService } from './services';
import {
  Header,
  ProductCard,
  CartItem,
  CheckoutForm,
  ReceiptModal,
  LoadingSpinner,
  ErrorMessage,
} from './components';
import type { CheckoutData, Order } from './types';

function App() {
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { cart, loading: cartLoading, addToCart, updateQuantity, removeItem, clearCart, refetch: refetchCart } = useCart();
  
  const [showCart, setShowCart] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleOpenCart = () => {
    setShowCart(true);
    setTimeout(() => setIsCartAnimating(true), 10);
  };

  const handleCloseCart = () => {
    setIsCartAnimating(false);
    setTimeout(() => {
      setShowCart(false);
    }, 300);
  };

  const handleAddToCart = async (productId: string, quantity: number = 1) => {
    try {
      await addToCart(productId, quantity);
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`, {
        duration: 2000,
        position: 'bottom-right',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart', {
        duration: 3000,
        position: 'bottom-right',
      });
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateQuantity(itemId, quantity);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update quantity', {
        duration: 3000,
        position: 'bottom-right',
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem(itemId);
      toast.success('Item removed from cart', {
        duration: 2000,
        position: 'bottom-right',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove item', {
        duration: 3000,
        position: 'bottom-right',
      });
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
        toast.success('Cart cleared successfully', {
          duration: 2000,
          position: 'bottom-right',
        });
      } catch (error: any) {
        toast.error(error.message || 'Failed to clear cart', {
          duration: 3000,
          position: 'bottom-right',
        });
      }
    }
  };

  const handleCheckout = async (data: CheckoutData) => {
    setCheckoutLoading(true);
    try {
      const order = await checkoutService.checkout(data);
      setCurrentOrder(order);
      setShowCheckout(false);
      setShowCart(false);
      setShowReceipt(true);
      await refetchCart();
      toast.success('Order placed successfully!', {
        duration: 3000,
        position: 'bottom-right',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Checkout failed', {
        duration: 3000,
        position: 'bottom-right',
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setCurrentOrder(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF2EF]">
      <Toaster />
      
      <Header cartItemCount={cart.itemCount} onCartClick={handleOpenCart} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Products Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-[#1A2A4F]" size={32} />
            <h2 className="text-3xl font-bold text-[#1A2A4F]">Our Products</h2>
          </div>

          {productsLoading && <LoadingSpinner />}
          
          {productsError && (
            <ErrorMessage message={productsError} onRetry={refetchProducts} />
          )}
          
          {!productsLoading && !productsError && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products available</p>
            </div>
          )}

          {!productsLoading && !productsError && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  loading={cartLoading}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          {/* Backdrop - click to close */}
          <div
            className={`fixed inset-0 z-40 backdrop-blur-[2px] bg-white/30 transition-all duration-300 ease-in-out ${
              isCartAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleCloseCart}
          ></div>

          {/* Sidebar */}
          <div className={`fixed inset-y-0 right-0 w-full max-w-md z-50 transform transition-all duration-300 ease-in-out ${
            isCartAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="h-full flex flex-col bg-white shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className="px-4 py-6 bg-[#1A2A4F] sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShoppingBag size={24} />
                    Shopping Cart
                  </h2>
                  <button
                    onClick={handleCloseCart}
                    className="text-white hover:bg-opacity-90 hover:bg-[#2A3A5F] p-2 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="mt-1 text-sm text-[#FFDBB6]">
                  {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 bg-[#FFF2EF]">
                {cart.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag size={64} className="text-gray-300 mb-4" />
                    <p className="text-gray-600 text-lg font-medium">Your cart is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Add some products to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        loading={cartLoading}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.items.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-white">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p className="text-lg">Subtotal</p>
                    <p className="text-2xl font-bold text-[#1A2A4F]">${cart.total.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <button
                    onClick={() => {
                      handleCloseCart();
                      setTimeout(() => setShowCheckout(true), 300);
                    }}
                    className="w-full bg-[#1A2A4F] border border-transparent rounded-lg shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-opacity-90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={handleCloseCart}
                      className="flex-1 text-[#1A2A4F] hover:text-opacity-80 font-medium text-sm py-2"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={handleClearCart}
                      disabled={cartLoading}
                      className="flex-1 flex items-center justify-center gap-1 text-[#F7A5A5] hover:text-red-700 hover:bg-red-50 font-medium text-sm py-2 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutForm
          onSubmit={handleCheckout}
          onClose={() => setShowCheckout(false)}
          loading={checkoutLoading}
          total={cart.total}
        />
      )}

      {/* Receipt Modal */}
      {showReceipt && currentOrder && (
        <ReceiptModal order={currentOrder} onClose={handleCloseReceipt} />
      )}
    </div>
  );
}

export default App;
