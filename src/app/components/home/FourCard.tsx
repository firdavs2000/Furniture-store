import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Next day as standard",
    text: "Our products are crafted with the finest materials.",
    icon: "/Delivery.svg",
    alt: "Delivery",
  },
  {
    id: 2,
    title: "Made by true artisans",
    text: "Handmade crafted goods made with real passion and craftmanship",
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
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-2xl text-[#2A254B] mb-12 text-center">
        What makes our brand different
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-6 bg-[#F9F9F9] flex flex-col items-start gap-3 rounded-md shadow-sm"
          >
            <div>
              <Image
                src={card.icon}
                alt={card.alt}
                width={24}
                height={24}
                className=""
                 loading="eager" // для LCP
          priority
              />
            </div>
            <h3 className="text-base text-[#2A254B] pt-3">{card.title}</h3>
            <p className="text-[#2A254B] mt-2 line-clamp-3">{card.text}</p>
          </div>

        ))}
      </div>
    </section>
  );
}

