"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useFavourites } from "../../context/FavouriteContext";

/* ---------- Types ---------- */
type LinkItem = {
  href: string;
  label: string;
  icon?: string;
  badge?: number;
};

/* ---------- Badge ---------- */
const Badge = ({ count }: { count: number }) => {
  if (count <= 0) return null;
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white">
      {count}
    </span>
  );
};

/* ---------- MenuLinks ---------- */
const MenuLinks = ({
  links,
  pathname,
  onClick,
}: {
  links: LinkItem[];
  pathname: string;
  onClick?: () => void;
}) => (
  <>
    {links.map((link) => {
      const isActive = pathname === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className="relative group px-2 py-1 flex items-center gap-2 transition-all text-[#22202E]"
        >
          {/* Icon + badge */}
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
                <Badge count={link.badge ?? 0} />
              </div>
            </div>
          )}

          <span>{link.label}</span>

          {/* underline */}
          <span
            className={`absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-[#2A254B]
            transform transition-transform duration-300 ease-out origin-left
            ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
          ></span>
        </Link>
      );
    })}
  </>
);

/* ---------- Header ---------- */
export default function HeaderV2() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cart va Favourites context
  const { cart } = useCart();
  const { favorites } = useFavourites();

  // Safe badges with default 0
  const desktopLinks: LinkItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/products", label: "All Products" },
    {
      href: "/cart",
      label: "Basket",
      icon: "/shopping.png",
      badge: cart?.length ?? 0,
    },
    {
      href: "/favorites",
      label: "Favorites",
      icon: "/favorite.png",
      badge: favorites?.length ?? 0,
    },
  ];

  return (
    <header className="border-b border-black/20 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl text-[#22202E] font-bold">
          Avion
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8 cursor-pointer">
          <MenuLinks links={desktopLinks} pathname={pathname} />
        </ul>

        {/* Mobile icons + menu toggle */}
        <div className="flex items-center md:hidden gap-4">
          {desktopLinks
            .filter(
              (link) => link.href === "/cart" || link.href === "/favorites"
            )
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
                    <Badge count={link.badge ?? 0} />
                  </div>
                </Link>
              );
            })}

          {/* Mobile menu button */}
          <button
            className="text-xl border bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden mt-2 flex flex-col items-end gap-2 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <MenuLinks
            links={desktopLinks}
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
