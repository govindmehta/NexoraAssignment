import { useState } from "react";
import { X } from "lucide-react";
import type { CheckoutData } from "../types";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  onClose: () => void;
  loading: boolean;
  total: number;
}

export const CheckoutForm = ({
  onSubmit,
  onClose,
  loading,
  total,
}: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutData>({
    customerName: "",
    customerEmail: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutData> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = "Name must be at least 2 characters";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FFF2EF] bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-[#FFDBB6] max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1A2A4F] border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-opacity-80 hover:bg-[#2A3A5F] rounded-lg transition-colors text-white cursor-pointer"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="bg-[#FFF2EF] border-2 border-[#FFDBB6] rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Order Total</p>
              <p className="text-3xl font-bold text-[#1A2A4F]">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-[#1A2A4F] focus:border-[#1A2A4F] outline-none transition-all placeholder-gray-500 ${
                errors.customerName ? "border-red-500" : "border-[#FFDBB6]"
              }`}
              placeholder="Enter Name"
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-[#1A2A4F] focus:border-[#1A2A4F] outline-none transition-all placeholder-gray-500 ${
                errors.customerEmail ? "border-red-500" : "border-[#FFDBB6]"
              }`}
              placeholder="Enter Email"
            />
            {errors.customerEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.customerEmail}
              </p>
            )}
          </div>

          <div className="bg-[#FFDBB6] bg-opacity-30 border border-[#FFDBB6] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#1A2A4F]">
              <strong>Note:</strong> This is a mock checkout. No real payment
              will be processed.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-[#FFDBB6] text-[#1A2A4F] rounded-lg font-medium hover:bg-[#FFF2EF] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-[#1A2A4F] text-white rounded-lg font-medium hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
