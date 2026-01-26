"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFavourites } from "../context/FavouriteContext";
import api from "../services/api";
import  Loader  from "../components/Loader/Loader";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description?: string;
}

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavourites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFavs() {
      try {
        const res = await api.get("/products?limit=1000");

        const favProducts = res.data.products.filter(
          (p: Product) => favourites.includes(p.id)
        );

        setProducts(favProducts);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }

    fetchFavs();
  }, [favourites]);

  if (loading) return <Loader />;

  if (products.length === 0) {
    return (
      <p className="p-10 text-center text-gray-500">
        Sevimli mahsulotlar yo‘q ❤️
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl mb-6 text-[#2A254B]">
        Your favourites
      </h1>
         <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border-b pb-4"
          >
            <div
              onClick={() => router.push(`/products/${item.id}`)}
              className="cursor-pointer"
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={109}
                height={134}
                className="rounded object-cover "
              />
            </div>

            <div className="flex-1">
              <p
                onClick={() => router.push(`/products/${item.id}`)}
                className="font-medium text-lg cursor-pointer hover:underline"
              >
                {item.title}
              </p>

              {item.description && (
                <p className="text-gray-500 text-sm">
                  {item.description}
                </p>
              )}

              <p className="mt-2 font-semibold">
                £{item.price}
              </p>
            </div>

            <button
              onClick={() => toggleFavourite(item.id)}
              className="text-red-600 text-sm hover:underline"
            >
              O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
