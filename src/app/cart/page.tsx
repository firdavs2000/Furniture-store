"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { Loader } from "../components/Loader/Loader";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sahifa yuklanishini simulyatsiya qiladi
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  if (cart.length === 0) {
    return (
      <p className="p-10 text-center text-gray-500">
        Korzina bo‘sh
      </p>
    );
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl mb-6 text-[#2A254B]">
        Your shopping cart
      </h1>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border-b pb-4"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={109}
              height={134}
              className="rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-lg">
                {item.title}
              </p>

              <p className="text-gray-500 text-sm">
                {item.description}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span>£{item.price}</span>
                <span>×</span>

                <input
                  type="number"
                  min={1}
                  aria-label="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.id,
                      Math.max(1, Number(e.target.value))
                    )
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                />
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium">
                £{(item.price * item.quantity).toFixed(2)}
              </p>

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

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">
          Subtotal: £{subtotal.toFixed(2)}
        </p>

        <button className="bg-[#2A254B] text-white px-6 py-3 rounded hover:bg-[#1f1a3c] transition">
          Go to checkout
        </button>
      </div>

      <p className="mt-2 text-gray-400 text-sm">
        Taxes and shipping are calculated at checkout
      </p>
    </div>
  );
}
