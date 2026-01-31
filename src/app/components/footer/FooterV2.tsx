"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2A254B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Categories */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Categories</h3>
          <ul className="space-y-3 text-sm text-white/90 cursor-pointer">
            <li>Crockery</li>
            <li>Furniture</li>
            <li>Homeware</li>
            <li>Plant pots</li>
            <li>Chairs</li>
            <li>Crockery</li>
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Menu</h3>
          <ul className="space-y-3 text-sm text-white/90 cursor-pointer">
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Recently viewed</li>
            <li>Popular this week</li>
            <li>All products</li>
          </ul>
        </div>

        {/* Our company */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Our company</h3>
          <ul className="space-y-3 text-sm text-white/90 cursor-pointer\">
            <li>About us</li>
            <li>Vacancies</li>
            <li>Contact us</li>
            <li>Privacy</li>
            <li>Returns policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 md:col-span-1 cursor-pointer">
          <h3 className="mb-6 text-lg font-medium">Join our mailing list</h3>

          <div className="flex w-full h-[55px] cursor-pointer">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white/20 text-white px-4 text-sm outline-none w-full"
            />
            <button
              className="bg-white text-[#2A254B] px-6 text-sm font-medium cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="cursor-pointer max-w-7xl mx-auto mt-10 border-t border-[#4E4D93] pt-5 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>Copyright 2022 Avion LTD</p>

        <div className="flex gap-4 mt-4 md:mt-0 cursor-pointer">
          {["linkedin", "twitter", "instagram", "skype", "social"].map((icon) => (
            <div
              key={icon}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
            >
              <Image src={`/${icon}.png`} width={20} height={20} alt={icon} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
