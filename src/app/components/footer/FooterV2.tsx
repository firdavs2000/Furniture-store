"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#2A254B] text-[#FFFFFF] py-12 px-6 ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Menu */}
                <div>
                    <h3 className="mb-4 ">Menu</h3>
                    <ul className="space-y-3 text-sm text-[#FFFFFF] cursor-pointer">
                        <li>New arrivals</li>
                        <li>Best sellers</li>
                        <li>Recently viewed</li>
                        <li>Popular this week</li>
                        <li>All products</li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="mb-4 ">Categories</h3>
                    <ul className="space-y-3 text-sm text-[#FFFFFF]  cursor-pointer">
                        <li>Crockery</li>
                        <li>Furniture</li>
                        <li>Homeware</li>
                        <li>Plant pots</li>
                        <li>Chairs</li>
                        <li>Crockery</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="mb-4 ">Our company</h3>
                    <ul className="space-y-3 text-sm text-[#FFFF] cursor-pointer">
                        <li>About us</li>
                        <li>Vacancies</li>
                        <li>Contact us</li>
                        <li>Privacy</li>
                        <li>Returns policy</li>
                    </ul>
                </div>


                <div>
                    <h3 className="mb-6 text-[#FFFFFF]">Join our mailing list</h3>

                    <div className="flex w-[527px] h-[55px] md:w-[400px]">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-[#FFFFFF26] text-[#FFFFFF] px-4 py-3 text-sm outline-none w-full"
                        />
                        <button
                            type="submit"
                            className="bg-[#FFFFFF] text-[#2A254B] px-6 py-2 text-sm w-[118px]">
                            Sign up
                        </button>
                    </div>
                </div>


            </div>


            <div className="max-w-7xl mx-auto mt-10 border-t border-[#4E4D93] pt-5 flex flex-col md:flex-row justify-between items-center text-[#FFFFFF] text-sm">
                <p>Copyright 2022 Avion LTD</p>

                <div className="flex gap-4 mt-4">

                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF26] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF40] transition">
                        <Image src="/linkedin.png" width={20} height={20} alt="linkedin" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF26] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF40] transition">
                        <Image src="/twitter.png" width={20} height={20} alt="twitter" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF26] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF40] transition">
                        <Image src="/instagram.png" width={20} height={20} alt="instagram" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF26] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF40] transition">
                        <Image src="/skype.png" width={20} height={20} alt="skype" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF26] flex items-center justify-center cursor-pointer hover:bg-[#FFFFFF40] transition">
                        <Image src="/social.png" width={20} height={20} alt="social" />
                    </div>

                </div>
            </div>
        </footer>
    );
}