"use client";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import { Heart, X, ShoppingCart, Star, Cpu } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="min-h-screen bg-[#0d0d0f] py-12 px-6 text-[#f5f5f7]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black tracking-wider uppercase border-b border-[#242429] pb-4 mb-8">
          Your item <span className="text-[#ff3b30]">({wishlist.length})</span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-[#121215] rounded-xl border border-[#242429]">
            <Heart className="h-16 w-16 text-[#ff3b30]/40 mx-auto mb-4 filter drop-shadow-[0_0_8px_rgba(255,59,48,0.1)]" />
            <p className="text-[#a1a1aa] text-lg mb-6">Your wishlist is empty. Drop some loot here!</p>
            <Link href="/" className="inline-block rounded-lg bg-[#ff3b30] px-6 py-3 text-sm font-bold text-white hover:bg-[#ff453a] transition-all shadow-[0_4px_15px_rgba(255,59,48,0.2)]">
              go to home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenDetails={(prod) => setSelectedProduct(prod)} // <-- Ye missing tha bhai!
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS MODAL FOR WISHLIST PAGE */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="relative w-full max-w-3xl bg-[#121215] border border-[#ff3b30]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,59,48,0.15)] flex flex-col md:flex-row max-h-[90vh] md:max-h-none transform scale-100 transition-transform duration-300">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1c1f] text-[#a1a1aa] hover:text-[#ff3b30] z-10 border border-[#242429] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#1c1c1f] relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/30 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded">
                {selectedProduct.category}
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#121215] to-[#1c1c1f]">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#e5a93c] mb-2">
                  <div className="flex items-center gap-1 font-bold">
                    <Star className="h-3.5 w-3.5 fill-[#e5a93c]" />
                    <span>{selectedProduct.rating} Verified Rating</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-[#f5f5f7] uppercase tracking-wide border-b border-[#242429] pb-3 mb-4">
                  {selectedProduct.name}
                </h2>

                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#ff3b30] mb-3 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" /> Specifications
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

              <div className="border-t border-[#242429] pt-4 mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa]">Price</p>
                  <p className="text-2xl font-black text-[#e5a93c]">₹{selectedProduct.price.toLocaleString("en-IN")}</p>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#ff3b30] py-3 text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all shadow-[0_4px_20px_rgba(255,59,48,0.3)] active:scale-[0.98]"
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}