"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { Loader } from "../Loader/Loader";

export default function HeroV2() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full h-screen">
      <Image 
        src="/bg.jpg"     
        alt="Hero Background"
        fill
        className="-z-10 object-cover"
        loading="eager" // LCP uchun
        priority
      />

      <div className="container mx-auto h-full flex items-center justify-end">
        <div className="bg-[#FFFFFF] p-12 shadow-lg max-w-lg text-left mr-20">
          <h1 className="text-2xl text-[#22202E] pb-3">
            Luxury homeware for people who love timeless design quality
          </h1>
          <p className="mt-4 text-[#5B5676] pb-25">
            Shop the new Spring 2022 collection today
          </p>
          <Button />
        </div>
      </div>
    </section>
  );
}
