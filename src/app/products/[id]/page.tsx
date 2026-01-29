"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useFavourites } from "../../context/FavouriteContext";
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
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavourites();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);

  /* Fetch product */
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
  const fav = isFavorite(product.id);

  /* Quantity handlers */
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setInCart(false); // hides quantity + favorite
    } else {
      setQuantity((q) => q - 1);
    }
  };

  /* Add to cart */
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: quantity,
    });
    setInCart(true);
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
        {/* Images */}
        <div>
          {/* Thumbnails */}
          <div className="mb-4 flex gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer ${
                  img === mainImage ? "border-black" : "border-gray-200"
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

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-1">Brand: {product.brand}</p>
          <p className="text-gray-500 mb-4">Category: {product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4 text-xl font-semibold">
            Rating: {ratingValue ? ratingValue.toFixed(1) + " ★" : "N/A"}
          </p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>

          {/* Quantity + Favorite - visible only after Add to Cart */}
          {inCart && (
            <div className="flex items-center gap-3 mb-4">
              {/* Quantity controls */}
              <div className="flex items-center gap-3 bg-gradient-to-b from-[#0D1025] to-[#050714] rounded-2xl px-4 py-3 border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                <button
                  onClick={decrease}
                  className="w-9 h-9 rounded-xl bg-white cursor-pointer text-black text-xl flex items-center justify-center shadow-md active:scale-95 transition"
                >
                  −
                </button>
                <span className="text-white font-semibold text-lg min-w-[20px] text-center cursor-pointer">
                  {quantity}
                </span>
                <button
                  onClick={increase}
                  className="w-9 h-9 rounded-xl bg-white text-black text-xl cursor-pointer flex items-center justify-center shadow-md active:scale-95 transition"
                >
                  +
                </button>
              </div>

              {/* Favorite button */}
              <button
                onClick={() =>
                  fav
                    ? removeFromFavorite(product.id)
                    : addToFavorite(product.id, quantity)
                }
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

          {/* Add to cart button - only visible if not in cart */}
          {!inCart && (
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-[#0D1025] to-[#050714] text-white h-11 rounded-xl font-semibold hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
