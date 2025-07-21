"use client";
import { Sparkles, Wand2, Smile } from "lucide-react";

export default function WhyFasdeemWorks() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: "Emotion-Driven Copy",
      desc: "Your product becomes desirable with powerful psychological triggers that speak to buyers.",
    },
    {
      icon: <Wand2 className="h-6 w-6 text-pink-500" />,
      title: "Instant, Done-for-You",
      desc: "Upload image, select tone, and get scroll-stopping copy — no writing or thinking needed.",
    },
    {
      icon: <Smile className="h-6 w-6 text-indigo-500" />,
      title: "Works in Urdu & English",
      desc: "Reach your customers in their native language, with culturally relevant and human-friendly tone.",
    },
  ];

  return (
    <section className="py-20 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Why Fasdeem Works
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12">
          From first click to final sale — Fasdeem boosts your conversions by turning products into emotions.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 text-left"
            >
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}