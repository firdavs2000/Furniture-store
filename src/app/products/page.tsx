"use client";

import { useEffect, useState, useMemo } from "react";
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

  const { cart, addToCart, removeFromCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavourites();

  const limit = 12;

  // --- Stabilize params to prevent multiple fetches ---
  const page = useMemo(() => Number(searchParams.get("page") || 1), [searchParams]);
  const search = useMemo(() => searchParams.get("search") || "", [searchParams]);
  const sortParam = useMemo(() => searchParams.get("sort") || "", [searchParams]);

  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [inCart, setInCart] = useState<Record<number, boolean>>({});

  // --- Update URL params ---
  const setParam = (params: Record<string, string>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));

    // push only if URL really changes
    if (sp.toString() !== searchParams.toString()) {
      router.push(`?${sp.toString()}`);
    }
  };

  // --- Fetch products ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
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
  }, [search, page, sortParam]); // only runs when these really change

  // --- Sync quantities & inCart with cart state ---
  useEffect(() => {
    if (!data) return;

    const initialQty: Record<number, number> = {};
    const initialInCart: Record<number, boolean> = {};

    data.products.forEach((p) => {
      const cItem = cart.find((c) => c.id === p.id);
      if (cItem) {
        initialQty[p.id] = cItem.quantity;
        initialInCart[p.id] = true;
      } else {
        initialQty[p.id] = 1;
        initialInCart[p.id] = false;
      }
    });

    setQuantities(initialQty);
    setInCart(initialInCart);
  }, [cart, data]);

  // --- Pagination handler ---
  const handleSelectPage = (value: number) => setParam({ page: value.toString() });

  // --- Cart handlers ---
  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart({ ...product, quantity: qty });
    setInCart((c) => ({ ...c, [product.id]: true }));
  };

  const increase = (id: number) => {
    const newQty = (quantities[id] || 1) + 1;
    setQuantities((prev) => ({ ...prev, [id]: newQty }));

    const product = data?.products.find((p) => p.id === id);
    if (product) addToCart({ ...product, quantity: newQty });
    setInCart((c) => ({ ...c, [id]: true }));
  };

  const decrease = (id: number) => {
    const q = quantities[id] || 1;
    const newQty = q - 1;

    if (newQty <= 0) {
      removeFromCart(id);
      setInCart((c) => ({ ...c, [id]: false }));
      setQuantities((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setQuantities((prev) => ({ ...prev, [id]: newQty }));
      const product = data?.products.find((p) => p.id === id);
      if (product) addToCart({ ...product, quantity: newQty });
    }
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
              <div
                key={p.id}
                className="relative bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
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

                  {/* Add to cart + Quantity + Favorite */}
                  <div className="mt-6 flex items-center gap-3">
                    {/* LEFT SIDE: Add to cart / Quantity */}
                    <div className="flex-1">
                      {!inCart[p.id] ? (
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="relative w-full h-12 rounded-xl bg-gradient-to-r from-[#0D1025] to-[#050714] text-white font-semibold tracking-wide hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition"
                        >
                          <span className="absolute inset-0 rounded-xl blur-md"></span>
                          <span className="relative z-10">Add to cart</span>
                        </button>
                      ) : (
                        <div className="h-12 flex items-center justify-between bg-[#2A254B] rounded-2xl px-4 border border-white/10">
                          <button
                            onClick={() => decrease(p.id)}
                            className="w-9 h-9 rounded-xl bg-white text-[#2A254B] text-xl flex items-center justify-center shadow-md active:scale-95 transition"
                          >
                            −
                          </button>

                          <span className="text-white font-semibold text-lg min-w-[20px] text-center">
                            {qty}
                          </span>

                          <button
                            onClick={() => increase(p.id)}
                            className="w-9 h-9 rounded-xl bg-white text-[#2A254B] text-xl flex items-center justify-center shadow-md active:scale-95 transition"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>

                    {/* RIGHT SIDE: Favorite */}
                    <button
                      onClick={() =>
                        fav ? removeFromFavorite(p.id) : addToFavorite(p.id, qty)
                      }
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition
                      ${fav ? "border-red-500" : "border-gray-300"}`}
                    >
                      <img
                        src={fav ? "/favorite.png" : "/heart.png"}
                        alt="fav"
                        className={`w-6 h-6 transition duration-300
                        ${fav ? "" : "grayscale opacity-60"} `}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {data && data.total > 0 && (
          <Paginate
            totalPages={Math.ceil(data.total / limit)}
            currentPage={page}
            setParamPage={handleSelectPage}
          />
        )}
      </div>

      <Newsletter />
    </div>
  );
}  