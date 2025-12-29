import HeaderV2 from "./components/header/HeaderV2";
import "./globals.css";
import FooterV2 from "./components/footer/FooterV2";

import { CartProvider } from "./context/CartContext";




export const metadata = {
  title: "Furniture Store",
  description: "Modern furniture shop website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FFFFFF] text-color:#22202E antialiased">
        <HeaderV2/>
       
        <CartProvider>{children}</CartProvider>
        <FooterV2/>
        
      </body>
    </html>
  );
}
