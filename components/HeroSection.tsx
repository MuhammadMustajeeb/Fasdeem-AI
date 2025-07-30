"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative text-center px-4 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      {/* Badge Row */}
      <div className="flex justify-center gap-2 mb-5 relative z-10">
        {["For Etsy Sellers", "Shopify Stores", "WhatsApp Businesses"].map((text) => (
          <span
            key={text}
            className="bg-white/70 backdrop-blur-md text-purple-700 text-xs md:text-sm px-4 py-1.5 rounded-full border border-purple-100 shadow-sm"
          >
            {text}
          </span>
        ))}
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
        Instantly Turn Your Products Into <br />
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Scroll-Stopping Descriptions
        </span>
      </h1>

      {/* Subheading */}
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto relative z-10">
        Fasdeem AI writes emotional, high-converting product descriptions — in seconds. No writing skills needed.
      </p>

      {/* Proof */}
      <p className="mt-3 text-sm text-gray-500 relative z-10">
        Trusted by <span className="font-semibold text-gray-900">1,200+</span> small shops, resellers, and solo entrepreneurs.
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center relative z-10">
        <Link href="/dashboard">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform">
            <Sparkles size={18} />
            Try Fasdeem AI — It’s Free
          </button>
        </Link>
      </div>

      {/* Mock Preview */}
      <div className="mt-12 relative z-10">
        <img
          src="/mock-dashboard-preview.webp"
          alt="Fasdeem AI Dashboard Preview"
          className="rounded-2xl border border-gray-200 shadow-xl w-full max-w-4xl mx-auto hover:shadow-2xl transition"
        />
      </div>
    </section>
  );
}
