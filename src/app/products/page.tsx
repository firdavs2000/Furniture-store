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

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [inCart, setInCart] = useState<Record<number, boolean>>({});

  const limit = 12;
  const router = useRouter();

  const { addToCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavourites();

  /* FETCH PRODUCTS */
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

  /* QUANTITY HANDLERS */
  const increase = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id: number) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      if (currentQty <= 1) {
        setInCart((prevInCart) => ({ ...prevInCart, [id]: false }));
        const { [id]: _, ...rest } = prev; // remove from quantities
        return rest;
      }
      return { ...prev, [id]: currentQty - 1 };
    });
  };

  /* HANDLE ADD TO CART */
  const handleAddToCart = (p: Product) => {
    const qty = quantities[p.id] || 1;

    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      thumbnail: p.thumbnail,
      quantity: qty,
    });

    setInCart((prev) => ({
      ...prev,
      [p.id]: true,
    }));
  };

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
            const qty = quantities[p.id] || 1;
            const fav = isFavorite(p.id);

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
                <div className="p-6 cursor-pointer">
                  <p className="text-xs pb-1">{p.rating ?? 4.5} ★</p>
                  <p className="text-xs uppercase text-black/60 pb-2">
                    {p.category ?? "General"}
                  </p>

                  <h2 className="text-lg line-clamp-1">{p.title}</h2>
                  <p className="mt-1 font-semibold">${p.price}</p>

                  {/* CONDITIONAL: Add to Cart OR Quantity + Favourite */}
                  {!inCart[p.id] ? (
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="relative mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-[#0D1025] to-[#050714] text-white font-semibold tracking-wide hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition"
                    >
                      <span className="absolute inset-0 rounded-xl blur-md"></span>
                      <span className="relative z-10">Add to cart</span>
                    </button>
                  ) : (
                    <>
                      <div className="mt-4 flex justify-between items-center">
                        {/* Quantity block */}
                        <div className="flex items-center gap-3 cursor-pointer bg-gradient-to-b from-[#0D1025] to-[#050714] rounded-2xl px-4 py-3 border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                          <button
                            onClick={() => decrease(p.id)}
                            className="w-9 h-9 rounded-xl bg-white cursor-pointer text-black text-xl flex items-center justify-center shadow-md active:scale-95 transition"
                          >
                            −
                          </button>

                          <span className="text-white font-semibold text-lg min-w-[20px] text-center cursor-pointer">
                            {qty}
                          </span>

                          <button
                            onClick={() => increase(p.id)}
                            className="w-9 h-9 rounded-xl bg-white text-black text-xl cursor-pointer flex items-center justify-center shadow-md active:scale-95 transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Favorite block */}
                        <button
                          onClick={() =>
                            fav
                              ? removeFromFavorite(p.id)
                              : addToFavorite(p.id, qty)
                          }
                          className=" relative  bg-black   w-14 h-14  rounded-2xl  flex items-center justify-center  border-2 border-gray-500 active:translate-y-1 active:scale-95 active:shadow-lg transition-all duration-150
  "
                        >
                          {/* Blur background */}
                          <span className="absolute inset-0 rounded-2xl bg-gray-600 blur-lg pointer-events-none"></span>

                          {/* Heart icon */}
                          <img
                            src="/heart.png"
                            alt="fav"
                            className=" w-6 h-6  z-10  filter grayscale brightness-125  hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]  transition  "
                          />
                        </button>

                      </div>
                    </>
                  )}
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
