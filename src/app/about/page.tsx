"use client";

import { useEffect, useState } from "react";
import AboutV2 from "../components/home/AboutV2";
import FourCard from "../components/home/FourCard";
import Newsletter from "../components/Newsletter";
import  Loader  from "../components/Loader/Loader";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl max-w-3xl">
          A brand built on the love of craftsmanship, quality and outstanding
          customer service
        </h1>
      </section>

      {/* About Section */}
      <AboutV2 />
      <FourCard />
      <Newsletter />
    </main>
  );
}
