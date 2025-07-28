"use client";
import { Upload, Type, Share } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: <Upload size={28} className="text-purple-500" />, title: "1. Upload Product", desc: "Add your product name, price, and image in seconds." },
    { icon: <Type size={28} className="text-pink-500" />, title: "2. AI Writes Copy", desc: "Fasdeem instantly generates emotional, scroll-stopping descriptions." },
    { icon: <Share size={28} className="text-green-500" />, title: "3. Share & Sell", desc: "Export to WhatsApp, CSV, or copy directly into your store." },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        How It Works in <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">3 Simple Steps</span>
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        No writing, no guesswork — just upload, generate, and share.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-50 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{step.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
