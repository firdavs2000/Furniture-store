"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "../components/ui/Button";
import api from "../services/api";
import { useRouter } from "next/navigation";
import Sort from "../components/sort/sort";
import Qidiruv from "../components/search/search";
import Newsletter from "../components/Newsletter";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function AllProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // barcha mahsulotlar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState("");
  const limit = 12;
  const router = useRouter();

  // 🔹 BARCHA MAHSULOTLARNI OLISH (SEARCH uchun)
  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<ProductsResponse>(`/products?limit=1000&skip=0`);
        setAllProducts(res.data.products);
      } catch (err) {
        console.error(err);
        setError("Mahsulotlarni olishda xato yuz berdi");
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  // 🔹 PAGINATION, SEARCH va SORT bilan mahsulotlarni tayyorlash
  const paginatedProducts = useMemo(() => {
    // search bo‘lsa filter qilamiz
    const filtered = search
      ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
      : allProducts;

    // sortlash
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    const start = page * limit;
    const end = start + limit;
    return sorted.slice(start, end);
  }, [allProducts, search, sort, page]);

  // 🔹 Sahifa soni (pagination)
  const totalPages = useMemo(() => {
    const filtered = search
      ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
      : allProducts;
    return Math.ceil(filtered.length / limit);
  }, [allProducts, search]);

  return (
    <div className="w-full min-h-screen bg-white">

      {/* Banner */}
      <div
        className="w-full h-56 bg-cover bg-center"
        style={{ backgroundImage: "url('/products.png')" }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Filters va Search */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 mt-8 gap-4">
          <Sort setSort={setSort} />
          <Qidiruv search={search} setSearch={setSearch} />
        </div>

        {/* Products Grid */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {paginatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.push(`/products/${p.id}`)}
                  className="cursor-pointer p-2 rounded shadow hover:shadow-lg transition"
                >
                  <Image
                    loader={() => p.thumbnail}
                    src={p.thumbnail}
                    alt={p.title}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover mb-3 rounded"
                    loading="eager" // для LCP
                    priority
                  />
                  <h3 className="text-base text-[#2A254B] pt-3">{p.title}</h3>
                  <p className="text-[#2A254B] mt-2">{p.price} $</p>
                </div>
              ))}
            </div>



            {/* Pagination */}
            <div className="w-full flex justify-center my-12 gap-4">
              <Button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
              >
                Back
              </Button>
              <Button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          </>
        )}

      </div>
      <Newsletter />
    </div>

  );
}
