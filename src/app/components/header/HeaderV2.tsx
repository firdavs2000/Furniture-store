"use client";
import Link from "next/link";
import { useState } from "react";

export default function HeaderV2() {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-b border-black/10 bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">


                <div className="flex items-center justify-between pl-12 pr-12">


                    <Link href="/" className="text-2xl  text-[#22202E]">
                        Avion
                    </Link>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex items-center gap-8 text-[#22202E]">
                        <li><Link href="/" className="hover:text-black">Home</Link></li>
                          <li><Link href="/about" className="hover:text-black">About us</Link></li>
                        <li><Link href="/products" className="hover:text-black">All Products</Link></li>
                        <li><Link href="/cart" className="hover:text-black">Basket</Link></li>
                    </ul>


                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>

                {/* Second row navigation (Categories) */}
                <nav className="hidden md:flex justify-center items-center gap-8 mt-4 text-[#726E8D]">
                    <Link href="/">Plant pots</Link>
                    <Link href="/">Ceramics</Link>
                    <Link href="/">Tables</Link>
                    <Link href="/">Chairs</Link>
                    <Link href="/">Crockery</Link>
                    <Link href="/">Tableware</Link>
                    <Link href="/">Cutlery</Link>
                </nav>

                {/* Mobile dropdown */}
                {open && (
                    <div className="md:hidden mt-4 flex flex-col gap-4 text-[#22202E]">
                        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/products" onClick={() => setOpen(false)}>Contacts</Link>
                        <Link href="/basket" onClick={() => setOpen(false)}>Basket</Link>

                        <div className="border-t pt-4 flex flex-col gap-3 text-[#726E8D]">
                            <Link href="/">Plant pots</Link>
                            <Link href="/">Ceramics</Link>
                            <Link href="/">Tables</Link>
                            <Link href="/">Chairs</Link>
                            <Link href="/">Crockery</Link>
                            <Link href="/">Tableware</Link>
                            <Link href="/">Cutlery</Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
