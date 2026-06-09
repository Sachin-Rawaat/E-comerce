import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexus Gaming | Premium Gaming Store",
  description: "Get the best premium gaming peripherals and fitness gear.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0b0c10] text-[#f5f5f7]`}>
        <CartProvider>
          <Navbar />
          {children}
          
        </CartProvider>
      </body>
    </html>
  );
}