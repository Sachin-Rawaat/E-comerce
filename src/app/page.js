"use client";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { X, ShoppingCart, Star, Cpu } from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-[#0d0d0f] pb-20 relative text-[#f5f5f7]">
      {/* HERO BANNER */}
      <HeroSection />

      {/* FEATURED PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-8 border-b border-[#242429] pb-4">
          <h2 className="text-xl font-black tracking-wider uppercase text-[#f5f5f7]">
            Tactical Hardware Vault
          </h2>
          <span className="text-xs font-bold text-[#e5a93c] tracking-widest uppercase animate-pulse">
            Live Inventory
          </span>
        </div>

        {/* RESPONSIVE CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOpenDetails={(prod) => setSelectedProduct(prod)} 
            />
          ))}
        </div>
      </div>

      {/* PREMIUM PRODUCT DETAILS SLIDE OVER MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="relative w-full max-w-3xl bg-[#121215] border border-[#ff3b30]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,59,48,0.15)] flex flex-col md:flex-row max-h-[90vh] md:max-h-none transform scale-100 transition-transform duration-300">
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1c1f] text-[#a1a1aa] hover:text-[#ff3b30] z-10 border border-[#242429] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* MODAL IMAGE VIEW */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#1c1c1f] relative">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4 bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/30 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded">
                {selectedProduct.category}
              </div>
            </div>

            {/* MODAL DETAILS CONTENT */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#121215] to-[#1c1c1f]">
              <div>
                {/* TITLE & RATING */}
                <div className="flex items-center gap-3 text-xs text-[#e5a93c] mb-2">
                  <div className="flex items-center gap-1 font-bold">
                    <Star className="h-3.5 w-3.5 fill-[#e5a93c]" />
                    <span>{selectedProduct.rating} Verified Intel</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-[#f5f5f7] uppercase tracking-wide border-b border-[#242429] pb-3 mb-4">
                  {selectedProduct.name}
                </h2>

                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                {/* TECH SPECS */}
                <div className="mb-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#ff3b30] mb-3 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" /> Core Specifications
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedProduct.specs?.map((spec, index) => (
                      <li key={index} className="text-xs text-[#d1d1d6] flex items-center gap-2 bg-[#1c1c1f] border border-[#242429] px-3 py-2 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] shadow-[0_0_8px_#ff3b30]"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BUYING ACTION BLOCK */}
              <div className="border-t border-[#242429] pt-4 mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa]">Strategic Value</p>
                  <p className="text-2xl font-black text-[#e5a93c]">₹{selectedProduct.price ? selectedProduct.price.toLocaleString("en-IN") : "0"}</p>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all shadow-[0_4px_20px_rgba(255,59,48,0.3)] hover:shadow-[0_4px_25px_rgba(255,59,48,0.5)] active:scale-[0.98]"
                >
                  <ShoppingCart className="h-4 w-4" /> Deploy to Cart
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </main>
  );
}