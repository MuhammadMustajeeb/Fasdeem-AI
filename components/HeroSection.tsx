"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative text-center px-4">
      {/* Badge Row */}
      <div className="flex justify-center gap-2 mb-4">
        {["For Etsy Sellers", "Shopify Stores", "WhatsApp Businesses"].map((text) => (
          <span
            key={text}
            className="bg-purple-50 text-purple-700 text-xs md:text-sm px-4 py-1.5 rounded-full border border-purple-200"
          >
            {text}
          </span>
        ))}
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
        Instantly Turn Your Products Into <br />
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Scroll-Stopping Descriptions
        </span>
      </h1>

      {/* Subheading */}
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Fasdeem AI writes emotional, high-converting product descriptions — in seconds. No writing skills needed.
      </p>

      {/* Proof */}
      <p className="mt-3 text-sm text-gray-500">
        Trusted by <span className="font-semibold text-gray-900">1,200+</span> small shops, resellers, and solo entrepreneurs.
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Link href="/dashboard">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow hover:opacity-90 transition">
            <Sparkles size={18} />
            Try Fasdeem AI — It’s Free
          </button>
        </Link>
      </div>

      {/* Mock Preview */}
      <div className="mt-12">
        <img
          src="/mock-dashboard-preview.webp"
          alt="Fasdeem AI Dashboard Preview"
          className="rounded-2xl border border-gray-200 shadow-lg w-full max-w-3xl mx-auto"
        />
      </div>
    </section>
  );
}
