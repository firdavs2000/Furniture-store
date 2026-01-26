"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader/Loader";

export default function CartPage() {
  const router = useRouter(); // ✅ inside component
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (loading) return <Loader />;

  // Empty cart state
  if (cart.length === 0) {
    return (
      <p className="p-10 text-center text-gray-500 text-lg">
        Korzina bo‘sh
      </p>
    );
  }

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Format price nicely
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl mb-6 text-[#2A254B]">
        Your shopping cart
      </h1>

      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b pb-4"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={109}
              height={134}
              className="rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-lg">{item.title}</p>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>

              <div className="mt-2 flex items-center gap-2">
                <span>{formatPrice(item.price)}</span>
                <span>×</span>
                <input
                  type="number"
                  min={1}
                  aria-label="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                />
              </div>
            </div>

            <div className="text-right mt-2 sm:mt-0">
              <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm mt-2 hover:underline"
              >
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xl font-semibold">
          Subtotal: {formatPrice(subtotal)}
        </p>

        <button
          className={`px-6 py-3 rounded text-white transition ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2A254B] hover:bg-[#1f1a3c]"
          }`}
          disabled={cart.length === 0}
        >
          Go to checkout
        </button>
      </div>

      <p className="mt-2 text-gray-400 text-sm">
        Taxes and shipping are calculated at checkout
      </p>
    </div>
  );
}
