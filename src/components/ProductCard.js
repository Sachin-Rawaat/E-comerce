"use client";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";

export default function ProductCard({ product, onOpenDetails }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isLiked = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group relative rounded-xl bg-[#121215] border border-[#242429] overflow-hidden hover:border-[#ff3b30]/40 hover:shadow-[0_0_30px_rgba(255,59,48,0.1)] transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      
      {/* IMAGE CONTEXT */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#1c1c1f] cursor-pointer" onClick={() => onOpenDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-1.5 rounded-lg bg-[#0d0d0f] border border-[#ff3b30]/40 px-3 py-1.5 text-xs font-black text-white uppercase tracking-wider shadow-lg">
            <Eye className="h-3.5 w-3.5 text-[#ff3b30]" /> View Details
          </span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        className="absolute top-3 right-3 p-2 rounded-full bg-[#0d0d0f]/80 backdrop-blur-sm border border-[#242429] text-[#a1a1aa] hover:text-[#ff3b30] z-10 transition-colors"
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-[#ff3b30] text-[#ff3b30]" : ""}`} />
      </button>

      {/* BODY CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => onOpenDetails(product)}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[9px] font-black tracking-widest text-[#ff3b30] uppercase">
               {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#e5a93c]">
              <Star className="h-3 w-3 fill-[#e5a93c]" />
              <span className="font-bold">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-[#f5f5f7] line-clamp-1 group-hover:text-[#ff3b30] transition-colors duration-200">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-[#a1a1aa] line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* PRICE & TRIGGER ACTION */}
        <div className="mt-5 flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
          <span className="text-lg font-black text-[#e5a93c]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 rounded-lg bg-[#ff3b30] px-3 py-2 text-xs font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all active:scale-95 shadow-[0_0_10px_rgba(255,59,48,0.2)]"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}