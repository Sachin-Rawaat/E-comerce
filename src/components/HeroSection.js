"use client";
import { ShieldCheck, Zap, Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1c1c1f] to-[#0d0d0f] py-20 border-b border-[#242429]">
      {/* Visual background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff3b30]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        {/* PREMIUM BADGE */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff3b30]/10 px-3 py-1 text-xs font-bold text-[#ff3b30] ring-1 ring-inset ring-[#ff3b30]/30 uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(255,59,48,0.1)]">
          <Trophy className="h-3 w-3" />  PREMIUM GAMING ACCESSORIES
        </span>

        {/* MAIN HEADLINE */}
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl max-w-4xl mx-auto uppercase leading-none">
          GEAR UP WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#ff453a] to-[#e5a93c] drop-shadow-[0_2px_10px_rgba(255,59,48,0.2)]">NEXT-GEN HARDWARE</span>
        </h1>
        
        <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#a1a1aa] max-w-2xl mx-auto">
          remium gaming hardware and accessories engineered for performance, reliability, and speed.
        </p>

        {/* TRUST ACCENTS */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[10px] font-black uppercase tracking-widest text-[#a1a1aa]/60">
          <div className="flex items-center gap-2 border border-[#242429] px-3 py-1.5 rounded-md bg-[#121215]">
            <Zap className="h-3.5 w-3.5 text-[#ff3b30]" /> Low Latency Output
          </div>
          <div className="flex items-center gap-2 border border-[#242429] px-3 py-1.5 rounded-md bg-[#121215]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#e5a93c]" /> 100% Genuine Certified
          </div>
        </div>

      </div>
    </div>
  );
}