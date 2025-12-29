import { ReactNode } from "react";
import HeaderV2 from "./components/header/HeaderV2";
import FooterV2 from "./components/footer/FooterV2";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

export const metadata = {
  title: "Furniture Store",
  description: "Modern furniture shop website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FFFFFF] text-[#22202E] antialiased">
        <HeaderV2 />
        <CartProvider>{children}</CartProvider>
        <FooterV2 />
      </body>
    </html>
  );
}
