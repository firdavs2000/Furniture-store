"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Image from "next/image";

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
  rating?: { rate: number; count: number } | number;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);



  // Fetch product by ID
  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) setSelectedImage(data.images[0]);
        else setSelectedImage(data.thumbnail);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Product not found
      </div>
    );

  const ratingValue =
    typeof product.rating === "number"
      ? product.rating
      : product.rating?.rate || 0;

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const mainImage = selectedImage || images[0];



  // Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    });
    router.push("/cart");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div>
          {/* Thumbnails */}
          <div className="mb-4 flex gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer ${img === mainImage ? "border-black" : "border-gray-200"
                  }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  width={80}
                  height={80}
                  className="object-cover"

                />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div className="relative w-full h-[300px] rounded-xl">
            <Image
              src={mainImage}
              alt={product.title}
              fill
              unoptimized
              className="object-contain rounded-xl"
              loading="eager"
            />

          </div>
        </div>

        {/* Right: Product info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-1">Brand: {product.brand}</p>
          <p className="text-gray-500 mb-4">Category: {product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4 text-xl font-semibold">
            Rating: {ratingValue ? ratingValue.toFixed(1) + " ★" : "N/A"}
          </p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>

          {/* Quantity + Favourite */}
          <div className="flex items-center gap-3 mb-4">
            {/* Quantity decrement */}
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity === 1}
              className={`w-10 h-10 rounded-lg text-xl border flex justify-center items-center ${quantity === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
              −
            </button>

            {/* Quantity display */}
            <span className="text-lg font-medium">{quantity}</span>

            {/* Quantity increment */}
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded-lg border flex justify-center items-center text-xl"
            >
              +
            </button>


        

          </div>

          {/* Add to cart */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-[#2A254B] h-11 rounded-xl border hover:bg-[#2A254B] hover:text-white transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
