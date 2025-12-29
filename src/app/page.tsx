
import About from "./components/home/AboutV2";
import FourCard from "./components/home/FourCard";
import Hero from "./components/home/HeroV2";
import Newsletter from "./components/home/Newsletter";
import PopularV2 from "./components/home/ProductGridV2";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FourCard />
      <PopularV2 />
      <About />
      <Newsletter />
    </>

  );
}


