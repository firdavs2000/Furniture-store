"use client";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Next day as standard",
    text: "Order before 3pm and get your order the next day as standard",
    icon: "/Delivery.svg",
    alt: "Delivery",
  },
  {
    id: 2,
    title: "Made by true artisans",
    text: "Handmade crafted goods made with real passion and craftsmanship",
    icon: "/galochka.svg",
    alt: "Galochka",
  },
  {
    id: 3,
    title: "Unbeatable prices",
    text: "For our materials and quality you won’t find better prices anywhere",
    icon: "/cart.png",
    alt: "Cart",
  },
  {
    id: 4,
    title: "Recycled packaging",
    text: "We use 100% recycled to ensure our footprint is more manageable",
    icon: "/barg.svg",
    alt: "Barg",
  },
];

export default function FourCard() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-xl text-[#2A254B] mb-8 text-left sm:text-center">
        What makes our brand different
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6 sm:px-10 sm:py-12">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-full bg-[#F9F9F9] p-6 flex flex-col gap-3 border border-[#E5E5E5] rounded-sm"
          >
            <Image
              src={card.icon}
              alt={card.alt}
              width={24}
              height={24}
              priority
            />

            <h3 className="text-base font-medium text-[#2A254B]">
              {card.title}
            </h3>

            <p className="text-sm text-[#2A254B] leading-relaxed">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
