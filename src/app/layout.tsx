import { ReactNode } from "react";
import HeaderV2 from "./components/header/HeaderV2";
import FooterV2 from "./components/footer/FooterV2";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouriteContext"; 

import "./globals.css";


export const metadata = {
  title: "Furniture Store",
  description: "Modern furniture shop website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FFFFFF] text-[#22202E] antialiased">
        <CartProvider>
          <FavouritesProvider>
            <HeaderV2 />
            <main>{children}</main>
            <FooterV2 />
          </FavouritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
