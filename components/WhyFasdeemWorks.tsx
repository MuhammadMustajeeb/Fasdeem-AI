"use client";
import { Brain, Zap, Heart, ShoppingBag } from "lucide-react";

export default function WhyFasdeemWorks() {
  const reasons = [
    { icon: <Brain className="text-purple-500" size={28} />, title: "Psychology-Driven AI", desc: "Our AI writes using persuasion techniques proven to convert browsers into buyers." },
    { icon: <Zap className="text-pink-500" size={28} />, title: "Lightning Fast", desc: "Generate descriptions in under 10 seconds — faster than hiring a freelancer." },
    { icon: <Heart className="text-red-500" size={28} />, title: "Emotional Copywriting", desc: "Hook your customers emotionally, so they can’t resist buying." },
    { icon: <ShoppingBag className="text-green-500" size={28} />, title: "Built for Small Sellers", desc: "Designed for Etsy, Shopify, and WhatsApp sellers who don’t have time for marketing." },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Fasdeem Works <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Better</span>
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        We combine AI + sales psychology to give you copy that actually sells.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {reasons.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition text-left flex gap-4">
            <div className="flex-shrink-0">{r.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{r.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
