import { CheckCircle, X } from "lucide-react";
import type { Order } from "../types";

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export const ReceiptModal = ({ order, onClose }: ReceiptModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#FFF2EF] bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-[#FFDBB6] max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1A2A4F] border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Order Receipt</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-opacity-80 hover:bg-[#2A3A5F] rounded-lg transition-colors text-white cursor-pointer"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Success Icon */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#FFDBB6] bg-opacity-30 rounded-full p-4 mb-4">
              <CheckCircle size={48} className="text-[#1A2A4F]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A2A4F] mb-2">
              Order Successful!
            </h3>
            <p className="text-gray-600 text-center">
              Thank you for your order. A confirmation email has been sent.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-[#FFF2EF] rounded-lg p-4 mb-6 border border-[#FFDBB6]">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold text-[#1A2A4F]">
                  {order.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-[#1A2A4F]">
                  {new Date(order.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-semibold text-[#1A2A4F]">
                  {order.customerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-[#1A2A4F] truncate">
                  {order.customerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#1A2A4F] mb-3">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-[#FFDBB6] pb-3 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[#1A2A4F]">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold text-[#1A2A4F]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-[#FFF2EF] border-2 border-[#FFDBB6] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[#1A2A4F]">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-[#1A2A4F]">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2 bg-[#FFDBB6] bg-opacity-40 text-[#1A2A4F] px-4 py-2 rounded-full border border-[#FFDBB6]">
              <CheckCircle size={20} />
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-[#1A2A4F] text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
