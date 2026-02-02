"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import MiniLoader from "../components/MiniLoader/MiniLoader";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center gap-4 min-h-[200px]">
        <MiniLoader />
      </div>
    );

  if (cart.length === 0)
    return (
      <div className="flex items-center justify-center gap-4 min-h-[200px]">
        <p className="text-gray-500 text-2xl">🛒 Savat bo‘sh</p>
        <MiniLoader />
      </div>
    );

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl mb-6 text-[#2A254B]">Your Shopping Cart</h1>

      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-xl">
            <Image
              src={item.thumbnail}
              width={120}
              height={120}
              alt={item.title}
              className="rounded"
            />
            <div className="flex-1">
              <p>{item.title}</p>
              <p>
                Quantity: {item.quantity} × ${item.price.toFixed(2)} = $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600">
              Remove
            </button>
          </div>
        ))}

      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xl font-semibold">Subtotal: {formatPrice(subtotal)}</p>
        <button
          className={`px-6 py-3 rounded text-white transition ${cart.length === 0
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
