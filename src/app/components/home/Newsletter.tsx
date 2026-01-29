"use client";

import Image from "next/image";
import { useState } from "react";

type CheckedKeys = "offers" | "events" | "discounts";

type ItemProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

function Item({ label, checked, onClick }: ItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-white cursor-pointer select-none"
    >
      <span
        className={`w-4 h-4 border rounded-sm flex items-center justify-center
        ${checked ? "bg-white border-white" : "border-white"}`}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 text-[#2A254B]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>

      <span>{label}</span>
    </button>
  );
}

export default function Newsletter() {
  const [checked, setChecked] = useState<Record<CheckedKeys, boolean>>({
    offers: false,
    events: false,
    discounts: false,
  });

  const toggle = (key: CheckedKeys) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="relative py-24 overflow-hidden flex justify-center">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/news.png"
          alt="Newsletter Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="text-center max-w-lg w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-white">
          Join the club and get the benefits
        </h2>

        <p className="text-white mb-6">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>

        {/* Checkbox items */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 border-100%">
          <Item
            label="Exclusive offers"
            checked={checked.offers}
            onClick={() => toggle("offers")}
          />
          <Item
            label="Free events"
            checked={checked.events}
            onClick={() => toggle("events")}
          />
          <Item
            label="Large discounts"
            checked={checked.discounts}
            onClick={() => toggle("discounts")}
          />
        </div>

        {/* Form */}
        <form className="flex flex-col sm:flex-row w-full gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-4 bg-[#F9F9F9] text-[#2A254B] outline-none"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-[#2A254B] text-white"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}
