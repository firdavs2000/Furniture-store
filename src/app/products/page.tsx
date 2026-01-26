"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


import api from "../services/api";
import Sort from "../components/sort/sort";
import Qidiruv from "../components/search/search";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader/Loader";
import Paginate from "../components/Paginate/Pagination";
import { useFavourites } from "../context/FavouriteContext";
import { useCart } from "../context/CartContext";

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
}

export default function AllProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const limit = 12;
  const router = useRouter();
  const { favourites, toggleFavourite } = useFavourites();
  const { addToCart } = useCart();

  /* FETCH */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get<ProductsResponse>("/products?limit=1000");
        setAllProducts(res.data.products);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  /* FILTER */
  const filtered = useMemo(() => {
    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [allProducts, search]);

  /* SORT + PAGINATION */
  const paginated = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

    const start = currentPage * limit;
    return sorted.slice(start, start + limit);
  }, [filtered, sort, currentPage]);

  return (
    <div className="w-full min-h-screen bg-white">
      {loading && <Loader />}

      <div className="max-w-7xl mx-auto px-4">
        {/* SORT + SEARCH */}
        <div className="flex justify-between my-8 gap-4">
          <Sort setSort={setSort} />
          <Qidiruv search={search} setSearch={setSearch} />
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {paginated.map((p) => {
            const isFavourite = favourites.includes(p.id);

            return (
              <div
                key={p.id}
                className="relative bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                {/* IMAGE */}
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
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* INFO */}
                <div className="p-6 bg-[#2A254B] rounded-b-2xl">
                  <p className="text-xs text-white pb-2">
                    {p.rating ?? 4.5} ★
                  </p>

                  <p className="text-xs uppercase tracking-widest text-white/70 pb-2">
                    {p.category ?? "General"}
                  </p>

                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl text-white line-clamp-1">{p.title}</h2>
                    <span className=" text-white">${p.price}</span>
                  </div>

                  {/* QUANTITY + FAV */}
                  <div className="mt-4 flex justify-between bg-[#1F1B3A] rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity === 1}
                        className={`w-6 h-6 rounded-lg text-xl ${quantity === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-white"
                          }`}
                      >
                        −
                      </button>

                      <span className="text-white">{quantity}</span>

                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-6 h-6 rounded-lg bg-white text-xl"
                      >
                        +
                      </button>
                    </div>

                    {/* FAVOURITE */}
                    <button
                      onClick={() => {
                        toggleFavourite(p.id);
                        router.push("/favorites");
                      }}
                      className="p-2"
                    >
                      <img
                        src={


                          "/favorite.png"
                        }
                        alt="favourite"
                        className="w-6 h-6 hover:scale-125 transition-transform"
                      />
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        addToCart({
                          id: p.id,
                          title: p.title,
                          price: p.price,
                          thumbnail: p.thumbnail,
                          quantity,
                        });
                        router.push("/cart");
                      }}
                      className="w-full bg-white text-[#2A254B] h-11 rounded-xl border hover:bg-[#2A254B] hover:text-white transition"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        <Paginate
          totalItems={filtered.length}
          currentPage={currentPage}
          setParamPage={setCurrentPage}
          itemsPerPage={limit}
        />
      </div>

      <Newsletter />
    </div>
  );
}
