// components/homepage/HowItWorks.tsx
"use client";

import { UploadCloud, SlidersHorizontal, Send } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload Your Product Image",
    description: "Just drag & drop or select your product image — no logins needed.",
    icon: <UploadCloud className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Customize Style & Tone",
    description: "Select tone, length, language — preview real-time results.",
    icon: <SlidersHorizontal className="w-8 h-8 text-yellow-400" />,
  },
  {
    title: "Export or Share Instantly",
    description: "Copy to WhatsApp, download CSV, or publish to your store.",
    icon: <Send className="w-8 h-8 text-green-400" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#090909] text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">How Fasdeem AI Works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
