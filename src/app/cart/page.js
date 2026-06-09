"use client";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-[#0d0d0f] py-12 px-6 text-[#f5f5f7]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black tracking-wider uppercase border-b border-[#242429] pb-4 mb-8">
          Your Cart item
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#121215] rounded-xl border border-[#242429]">
            <ShoppingBag className="h-16 w-16 text-[#a1a1aa]/40 mx-auto mb-4" />
            <p className="text-[#a1a1aa] text-lg mb-6">Your cart is clear. Secure some inventory first!</p>
            <Link href="/" className="inline-block rounded-lg bg-[#ff3b30] px-6 py-3 text-sm font-bold text-white hover:bg-[#ff453a] transition-all">
              Fill Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121215] border border-[#242429]">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-[#242429]" />
                    <div>
                      <h3 className="font-bold text-sm sm:text-base">{item.name}</h3>
                      <p className="text-[10px] text-[#ff3b30] uppercase tracking-widest mt-0.5"> {item.category}</p>
                      <p className="font-semibold text-sm text-[#e5a93c] mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-[#242429]">
                    <div className="flex items-center gap-2 border border-[#242429] rounded-lg bg-[#0d0d0f] p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#ff3b30] text-[#a1a1aa] transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#ff3b30] text-[#a1a1aa] transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-[#a1a1aa] hover:text-[#ff3b30] transition-colors p-2">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-[#121215] border border-[#242429] p-6 h-fit sticky top-24">
              <h2 className="text-lg font-bold tracking-wider uppercase border-b border-[#242429] pb-3 mb-4">Order Summary</h2>
              <div className="flex justify-between text-sm text-[#a1a1aa] mb-3">
                <span>Subtotal Items</span>
                <span className="text-white font-semibold">{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#a1a1aa] border-b border-[#242429] pb-4 mb-4">
                <span>Shipping Fee</span>
                <span className="text-green-500 font-bold uppercase text-xs tracking-wider">Free Delivery</span>
              </div>
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-base font-bold">Total Amount</span>
                <span className="text-2xl font-black text-[#e5a93c]">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button className="w-full rounded-lg bg-[#ff3b30] py-3 text-center text-sm font-black text-white uppercase tracking-wider hover:bg-[#ff453a] transition-all shadow-[0_4px_20px_rgba(255,59,48,0.2)]">
                order
              </button>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}