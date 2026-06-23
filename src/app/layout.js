import "./globals.css";
import { CartProvider } from "../context/CartContext"; // Context ka import
import Navbar from "@/components/Navbar"; // Agar navbar chahiye toh

export const metadata = {
  title: "Nexus Gaming Store",
  description: "Your ultimate gaming store",
  icons:{
    icon:"/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0f] text-[#f5f5f7]">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}