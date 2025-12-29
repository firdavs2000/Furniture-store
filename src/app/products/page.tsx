"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "../services/api";
import Sort from "../components/sort/sort";
import Qidiruv from "../components/search/search";
import Newsletter from "../components/Newsletter";
import { Loader } from "../components/Loader/Loader";
import Paginate from "../components/Paginate/Pagination";

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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for ReactPaginate
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState("");
  const limit = 12;
  const router = useRouter();

  // 🔹 Barcha mahsulotlarni olish
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

  // 🔹 Search o‘zgarganda sahifani 0 ga qaytarish
  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  // 🔹 Filter + Sort + Pagination
  const paginatedProducts = useMemo(() => {
    const filtered = search
      ? allProducts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      : allProducts;

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

    const start = currentPage * limit;
    const end = start + limit;
    return sorted.slice(start, end);
  }, [allProducts, search, sort, currentPage]);

  // 🔹 Sahifa soni (pagination)
  const totalPages = useMemo(() => {
    const filtered = search
      ? allProducts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      : allProducts;
    return Math.ceil(filtered.length / limit) || 1;
  }, [allProducts, search]);

  // 🔹 Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 🔹 Filterlangan mahsulotlar soni Paginate uchun
  const totalItems = search
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      ).length
    : allProducts.length;

  return (
    <div className="w-full min-h-screen bg-white">
      {loading && <Loader />}

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

        {error ? (
          <p className="text-red-500 text-center mt-10">{error}</p>
        ) : (
          <>
            {/* Products Grid */}
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
                    priority
                  />
                  <h3 className="text-base text-[#2A254B] pt-3">{p.title}</h3>
                  <p className="text-[#2A254B] mt-2">{p.price} $</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Paginate
              totalItems={totalItems}
              currentPage={currentPage}
              setParamPage={handlePageChange}
              itemsPerPage={limit}
            />
          </>
        )}
      </div>

      <Newsletter />
    </div>
  );
}
