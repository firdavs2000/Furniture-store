import Image from "next/image";
import AboutV2 from "../components/home/AboutV2"; // adjust the path as needed
import FourCard from "../components/home/FourCard";
import Newsletter from "../components/home/Newsletter";

export default function AboutPage() {
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
      <FourCard/>
      <Newsletter/>
    </main>
  );
}
