"use client";
import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-28 pt-40 text-white bg-[#0f0f0f]">
      {/* Glowing Gradient Background Circles */}
      <div className="absolute top-[-15%] left-[-25%] w-[600px] h-[600px] bg-purple-500 rounded-full blur-[160px] opacity-20 z-[-1]" />
      <div className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[120px] opacity-20 z-[-1]" />

      <div className="container mx-auto text-center px-4">
        {/* Platform Badge */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["Built for Etsy", "Shopify", "WhatsApp Sellers"].map((text, i) => (
            <span
              key={i}
              className="backdrop-blur-sm bg-white/10 px-4 py-1.5 text-xs md:text-sm rounded-full border border-white/10 shadow-sm"
            >
              {text}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Instantly Turn Your Products Into <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Scroll-Stopping Descriptions
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
          Fasdeem AI helps small sellers write emotional, high-converting product words — in seconds, no writing skills needed.
        </p>

        {/* Trust Line */}
        <p className="mt-4 text-sm text-gray-400">
          Trusted by <span className="text-white font-medium">1,200+</span> local shops, resellers & solo entrepreneurs.
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/dashboard">
            <button className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
              <Sparkles size={18} />
              Try Fasdeem AI Free →
            </button>
          </Link>
        </div>


        {/* Preview Image */}
        <div className="mt-14">
          <img
            src="/mock-dashboard-preview.png"
            alt="Fasdeem AI Demo"
            className="rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl mx-auto transition-all duration-300 hover:scale-[1.03]"
          />
        </div>

        {/* FOMO Tagline */}
        <p className="mt-6 text-sm text-gray-400 italic">
          🚀 Join early — top sellers are already boosting sales with Fasdeem.
        </p>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <Link href="/dashboard">
          <button className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-xl">
            Try Fasdeem AI — Free
          </button>
        </Link>
      </div>
    </section>
  );
}
