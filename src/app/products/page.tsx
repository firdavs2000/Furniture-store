"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import Sort from "../components/sort/sort";
import Qidiruv from "../components/search/search";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader/Loader";
import Paginate from "../components/Paginate/Pagination";
import api from "../services/api";

import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouriteContext";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating?: number;
  category?: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

export default function AllProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addToCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavourites();

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "";

  const limit = 12;

  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [inCart, setInCart] = useState<Record<number, boolean>>({});

  // --- Update URL params ---
  const setParam = (params: Record<string, string>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));
    router.push(`?${sp.toString()}`);
  };

  // --- Fetch products ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products/search", {
          params: {
            q: search,
            limit,
            skip: (page - 1) * limit,
            sort: sortParam,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, page, sortParam]);

  const handleSelectPage = (value: number) => setParam({ page: value.toString() });

  const increase = (id: number) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const decrease = (id: number) =>
    setQuantities((prev) => {
      const q = prev[id] || 1;
      if (q <= 1) {
        setInCart((c) => ({ ...c, [id]: false }));
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: q - 1 };
    });

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart({ ...product, quantity: qty });
    setInCart((c) => ({ ...c, [product.id]: true }));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Sort & Search */}
        <div className="flex justify-between my-8 gap-4">
          <Sort setSort={(value) => setParam({ sort: value, page: "1" })} />
          <Qidiruv search={search} setSearch={(v) => setParam({ search: v, page: "1" })} />
        </div>

        {/* Empty state */}
        {!loading && data?.products.length === 0 && (
          <p className="text-center text-gray-500 py-10">No products found.</p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.products.map((p) => {
            const qty = quantities[p.id] || 1;
            const fav = isFavorite(p.id);

            return (
              <div key={p.id} className="relative bg-white rounded-2xl shadow hover:shadow-lg transition">
                {/* Image */}
                <div
                  onClick={() => router.push(`/products/${p.id}`)}
                  className="relative w-full h-[220px] cursor-pointer flex items-center justify-center bg-white rounded-t-2xl"
                >
                  <Image
                    loader={() => p.thumbnail}
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    unoptimized
                    className="object-contain hover:scale-105 transition-transform"
                    loading="eager"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  <p className="text-xs">{p.rating ?? 4.5} ★</p>
                  <p className="text-xs uppercase text-black/60">{p.category ?? "General"}</p>
                  <h2 className="text-lg line-clamp-1">{p.title}</h2>
                  <p className="font-semibold">${p.price}</p>

                  {/* Cart & Quantity */}
                  {!inCart[p.id] ? (
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="relative mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-[#0D1025] to-[#050714] text-white font-semibold tracking-wide hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition"
                    >
                      <span className="absolute inset-0 rounded-xl blur-md"></span>
                      <span className="relative z-10">Add to cart</span>
                    </button>
                  ) : (
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-3 cursor-pointer bg-gradient-to-b from-[#0D1025] to-[#050714] rounded-2xl px-4 py-3 border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                        <button
                          onClick={() => decrease(p.id)}
                          className="w-9 h-9 rounded-xl bg-white text-black text-xl flex items-center justify-center shadow-md active:scale-95 transition"
                        >
                          −
                        </button>
                        <span className="text-white font-semibold text-lg min-w-[20px] text-center">{qty}</span>
                        <button
                          onClick={() => increase(p.id)}
                          className="w-9 h-9 rounded-xl bg-white text-black text-xl flex items-center justify-center shadow-md active:scale-95 transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => (fav ? removeFromFavorite(p.id) : addToFavorite(p.id, qty))}
                        className="relative bg-black w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-gray-500 active:translate-y-1 active:scale-95 active:shadow-lg transition-all duration-150"
                      >
                        <span className="absolute inset-0 rounded-2xl bg-gray-600 blur-lg pointer-events-none"></span>
                        <img
                          src="/heart.png"
                          alt="fav"
                          className="w-6 h-6 z-10 filter grayscale brightness-125 hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.8)] transition"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {data && data.total > 0 && (
          <Paginate totalPages={Math.ceil(data.total / limit)} currentPage={page} setParamPage={handleSelectPage} />
        )}
      </div>

      <Newsletter />
    </div>
  );
}
