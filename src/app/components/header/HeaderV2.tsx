"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useFavourites } from "../../context/FavouriteContext";

export default function HeaderV2() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const { favorites } = useFavourites();

  // Desktop & Mobile linklar
  const desktopLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/products", label: "All Products" },
    {
      href: "/cart",
      label: "Basket",
      icon: "/shopping-bag.png",
      badge: cart.length,
    },
    {
      href: "/favorites",
      label: "Favorites",
      icon: "/favorite.png",
      badge: favorites.length,
    },
  ];

  // Badge component
  const Badge = ({ count }: { count: number }) => {
    if (count <= 0) return null;
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white">
        {count}
      </span>
    );
  };

  // MenuLinks component
  const MenuLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {desktopLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={`block px-2 py-1 flex items-center gap-2 ${
              isActive ? "text-red-500 font-semibold" : "text-[#22202E] hover:text-red-500"
            }`}
          >
            {/* Icon va Badge */}
            {link.icon && (
              <div className="relative">
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                  className={isActive ? "filter brightness-125" : ""}
                />
                <div className="absolute -top-2 -right-2">
                  <Badge count={link.badge} />
                </div>
              </div>
            )}
            {/* Label */}
            <span>{link.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="border-b border-black/20 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl text-[#22202E] font-bold">
          Avion
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8 cursor-pointer">
          <MenuLinks />
        </ul>

        {/* Mobile menu button + cart/favorites badges */}
        <div className="flex items-center md:hidden gap-4">
          {desktopLinks
            .filter((link) => link.href === "/cart" || link.href === "/favorites")
            .map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative">
                  <Image
                    src={link.icon!}
                    alt={link.label}
                    width={28}
                    height={28}
                    className={isActive ? "filter brightness-125" : ""}
                  />
                  <div className="absolute -top-2 -right-2">
                    <Badge count={link.badge} />
                  </div>
                </Link>
              );
            })}

          {/* Mobile menu toggle */}
          <button
            className="text-xl border bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 flex flex-col items-end gap-2 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <MenuLinks onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
