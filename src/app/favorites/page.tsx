"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "../services/api";
import { useFavourites } from "../context/FavouriteContext";
import { useRouter } from "next/navigation";
import MiniLoader from "../components/MiniLoader/MiniLoader";

export default function FavouritePage() {
  const { favorites, removeFromFavorite } = useFavourites();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load favourite products
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products?limit=1000");
        const favProducts = res.data.products.filter((p: any) =>
          favorites.some((f) => f.id === p.id)
        );
        setProducts(favProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [favorites]);



  // Empty state
if (products.length === 0) {
  return (
      <div className="flex items-center justify-center gap-4 min-h-[200px]">
      
      <p className="text-gray-500 text-2xl">❤️ Favourite bo‘sh</p>
      <MiniLoader />
    </div>
  );
}




  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl mb-6 text-[#2A254B] ">Your Favourites</h1>

      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={120}
              height={140}
              className="rounded object-cover cursor-pointer"
              onClick={() => router.push(`/products/${item.id}`)}
              unoptimized
            />

            <div className="flex-1">
              <p
                className="font-medium text-lg cursor-pointer hover:text-[#2A254B] transition"
                onClick={() => router.push(`/products/${item.id}`)}
              >
                {item.title}
              </p>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {item.description || "No description"}
              </p>

              <p className="mt-2 font-semibold text-[#2A254B]">${item.price}</p>
            </div>

            <div className="mt-2 sm:mt-0">
              <button
                onClick={() => removeFromFavorite(item.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
