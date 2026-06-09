"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { ShoppingCart, Heart, Search, Gamepad2 } from "lucide-react";

export default function Navbar() {
  const { cartCount, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#242429] bg-[#0d0d0f]/90 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-2 group">
          <Gamepad2 className="h-7 w-7 text-[#ff3b30] transition-transform duration-300 group-hover:rotate-12 filter drop-shadow-[0_0_8px_rgba(255,59,48,0.5)]" />
          <span className="text-xl font-black tracking-wider text-white uppercase group-hover:text-[#ff3b30] transition-colors">
            Nexus <span className="text-[#ff3b30]">Gaming</span>
          </span>
        </Link>

        {/* MODERN SEARCH BAR */}
        <div ref={dropdownRef} className="hidden md:flex flex-1 max-w-md relative items-center">
          <div className="w-full relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 0 && setShowDropdown(true)}
              placeholder="Search premium hardware..."
              className="w-full bg-[#1c1c1f] border border-[#242429] rounded-lg px-4 py-2 pr-10 text-sm text-[#f5f5f7] placeholder-[#a1a1aa]/50 outline-none focus:border-[#ff3b30] transition-all"
            />
            <Search className="absolute right-3 h-4 w-4 text-[#a1a1aa]" />
          </div>

          {/* SUGGESTIONS DROPDOWN */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#121215] border border-[#242429] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden z-50 divide-y divide-[#242429]">
              <div className="px-3 py-1.5 bg-[#1c1c1f] text-[10px] font-bold tracking-widest text-[#ff3b30] uppercase">
                Products Found
              </div>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSearchQuery("");
                    setShowDropdown(false);
                    router.push("/");
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1c1c1f] cursor-pointer transition-colors group"
                >
                  <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded border border-[#242429]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#f5f5f7] truncate group-hover:text-[#ff3b30] transition-colors">
                      {product.name}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#e5a93c]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-5">
          <Link href="/wishlist" className="relative p-2 text-[#a1a1aa] hover:text-[#ff3b30] transition-colors">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#ff3b30] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_#ff3b30]">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-2 text-[#a1a1aa] hover:text-[#ff3b30] transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#e5a93c] text-black font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_#e5a93c]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* NORMAL USER LOGIN BUTTON */}
          <Link href="/auth" className="rounded-lg bg-[#ff3b30] px-4 py-2 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all shadow-[0_0_15px_rgba(255,59,48,0.3)]">
            Login / Signup
          </Link>
        </div>

      </div>
    </nav>
  );
}