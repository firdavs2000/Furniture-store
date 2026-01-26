"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function HeaderV2() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname(); 

    // Desktop menyu linklari
    const desktopLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About us" },
        { href: "/products", label: "All Products" },
        { href: "/cart", label: "Basket" },
         { href: "/favorites", label: "Favorites" },
    ];



    return (
        <header className="border-b border-black/10 bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between pl-12 pr-12">
                    <Link href="/" className="text-2xl text-[#22202E]">
                        Avion
                    </Link>

                    {/* Desktop main menu */}
                    <ul className="hidden md:flex items-center gap-8 text-[#22202E] cursor-pointer">
                        {desktopLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={
                                        pathname === link.href
                                            ? "text-red-500"
                                            : "hover:text-red-500"
                                    }
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>

            

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden mt-4 flex flex-col gap-2 text-[#22202E] text-end">
                        {desktopLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    pathname === link.href
                                        ? "text-red-500"
                                        : ""
                                }
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                            
                        ))}

                       
                    </div>
                    
                )}
            </div>
        </header>
    );
}
