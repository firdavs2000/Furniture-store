"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import api from "@/app/services/api";
import ThreeGridV2 from "@/app/components/home/ThreeGridV2";
import FourCard from "@/app/components/home/FourCard";
import Newsletter from "@/app/components/Newsletter";
import { useCart } from "@/app/context/CartContext";
import { Loader } from "@/app/components/Loader/Loader";



interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await api.get<Product>(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Mahsulot topilmadi");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  return (
    <>
      
      {loading && <Loader/>}

      
      {error && (
        <p className="p-10 text-center text-red-500">{error}</p>
      )}

      
      {!loading && product && (
        <>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Button onClick={() => router.back()} className="mb-6">
              ← Orqaga
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image */}
              <Image
                loader={() => product.thumbnail}
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                unoptimized
                className="w-full h-[400px] object-cover rounded"
                priority
              />

            
              <div>
                <h1 className="text-3xl text-[#2A254B]">{product.title}</h1>
                <p className="text-xl mt-4 text-[#2A254B]">{product.price} $</p>

                <p className="mt-6 text-[#2A254B] leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-6 space-y-2 text-sm text-[#2A254B]">
                  <p><span className="font-medium">Brand:</span> {product.brand}</p>
                  <p><span className="font-medium">Category:</span> {product.category}</p>
                </div>

                
                <div className="mt-10 flex gap-4">
                  <button
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        quantity: 1,
                      });
                      router.push("/cart");
                    }}
                    className="flex-1 bg-[#2A254B] text-white px-6 py-3 h-12 rounded-md hover:bg-[#1f203a] transition"
                  >
                    Add to cart
                  </button>

                  <button
                    onClick={() => alert("Coming soon ❤️")}
                    className="flex-1 border border-[#2A254B] text-[#2A254B] px-6 py-3 h-12 rounded-md hover:bg-[#2A254B] hover:text-white transition"
                  >
                    Save to favorites
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <ThreeGridV2 />
          <FourCard />
          <Newsletter />
        </>
      )}
    </>
  );
}

