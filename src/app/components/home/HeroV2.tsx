"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import Loader from "../Loader/Loader";

export default function HeroV2() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full flex flex-col md:h-screen md:block">
      
      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 pt-16 md:h-full md:flex md:items-center md:justify-end">
        <div className="max-w-lg bg-transparent md:bg-white md:p-12 shadow-none md:shadow-lg md:mr-20">
          <h1 className="text-2xl text-[#22202E] pb-3">
            Luxury homeware for people who love timeless design quality
          </h1>

          <p className="text-[#5B5676] pb-6">
            Shop the new Spring 2022 collection today
          </p>

          <div className="flex justify-center md:justify-start">
            <Button />
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-full mt-4 md:mt-0 md:absolute md:inset-0">
        <Image
          src="/bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

    </section>
  );
}
