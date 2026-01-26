import Image from "next/image";
import Button from "../ui/Button";

const products = [
  { id: 1, title: "The Dandy chair", price: "£250", img: "/images/chair.svg" },
  { id: 2, title: "Rustic Vase Set", price: "£155", img: "/images/guldon.svg" },
  { id: 3, title: "The Silky Vase", price: "£125", img: "/images/vaza.svg" },
  { id: 4, title: "The Lucy Lamp", price: "£399", img: "/images/lampa.svg" },
];

export default function ProductGridV2() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <article
            key={p.id}
            className="rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div
              className="relative bg-white"
              style={{ paddingTop: "140%" }}
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* CONTENT */}
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-lg text-gray-800 font-medium">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                {p.price}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-12">
        <Button />
      </div>
    </section>
  );
}
