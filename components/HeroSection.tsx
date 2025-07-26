"use client";
import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-32 pt-36 bg-[#0f0f0f] text-white">
      {/* Soft Gradient Glows */}
      <div className="absolute top-[-25%] left-[-20%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px] opacity-20 z-[-1]" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px] opacity-20 z-[-1]" />

      <div className="container mx-auto px-4 text-center max-w-screen-xl">
        {/* Niches Badge Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["For Etsy Sellers", "Shopify Stores", "WhatsApp Businesses"].map((text, i) => (
            <span
              key={i}
              className="text-xs md:text-sm px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/90"
            >
              {text}
            </span>
          ))}
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Instantly Turn Your Products Into <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Scroll-Stopping Descriptions
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Fasdeem AI writes emotional, high-converting product descriptions — in seconds. No writing skills or marketing background needed.
        </p>

        {/* Proof */}
        <p className="mt-4 text-sm text-gray-500">
          Trusted by <span className="text-white font-semibold">1,200+</span> small shops, resellers, and solo entrepreneurs.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/dashboard">
            <button className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl font-medium shadow-lg hover:scale-105 transition-all">
              <Sparkles size={18} />
              Try Fasdeem AI — It’s Free
            </button>
          </Link>
        </div>

        {/* Mock Preview Image */}
        <div className="mt-14">
          <img
            src="/mock-dashboard-preview.webp"
            alt="Fasdeem AI Dashboard Preview"
            loading="lazy"
            className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-3xl mx-auto transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>

        {/* FOMO Note */}
        <p className="mt-6 text-sm text-gray-500 italic">
          💡 Top sellers are already using Fasdeem to boost conversions — don’t get left behind.
        </p>
      </div>

      {/* Sticky CTA for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Link href="/dashboard">
          <button className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-xl hover:bg-gray-100 transition-all">
            Start Free — Write Better in Seconds
          </button>
        </Link>
      </div>
    </section>
  );
}
