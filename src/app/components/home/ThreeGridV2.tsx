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
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-normal text-[#2A254B] mb-10">
        You might also love these
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <article
            key={p.id}
            className="rounded-md overflow-hidden shadow-sm bg-white"
          >
            <div className="relative bg-[#FFFFFF]" style={{ paddingTop: "140%" }}>
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover"
                loading="eager" // для LCP
                priority
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg text-gray-800">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button />
      </div>
    </section>


  );
}



