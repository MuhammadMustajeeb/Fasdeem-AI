"use client";
import { CheckCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    "AI-Powered Emotional Copywriting",
    "One-Click WhatsApp Export",
    "Supports English & Urdu",
    "Save History & Re-Generate Instantly",
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Powerful Features, <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Built for You</span>
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        Fasdeem combines simplicity with powerful AI to help small business owners create sales-driven product descriptions in seconds.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
        {features.map((feature) => (
          <div key={feature} className="flex gap-3 items-start p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <CheckCircle className="text-purple-500 mt-1" size={22} />
            <span className="text-gray-800 font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
