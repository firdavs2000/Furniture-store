import { ReactNode } from "react";
import HeaderV2 from "./components/header/HeaderV2";
import FooterV2 from "./components/footer/FooterV2";
import { CartProvider } from "./context/CartContext";
import { FavouriteProvider } from "./context/FavouriteContext"; 

import "./globals.css";


export const metadata = {
  title: "Furniture Store",
  description: "Modern furniture shop website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FFFFFF] text-[#22202E] antialiased min-h-screen flex flex-col">
        <CartProvider>
          <FavouriteProvider>
            <HeaderV2 />

            {/* Bu joy hamisha bo‘sh joyni to‘ldiradi */}
            <main className="flex-1">
              {children}
            </main>

            <FooterV2 />
          </FavouriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}

