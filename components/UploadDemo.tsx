"use client";

import { motion } from "framer-motion";
import { UploadCloud, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function UploadDemo() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-[#0b0b0b] to-[#121212] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">See It In Action</h2>
        <p className="text-gray-400 mb-14 max-w-2xl mx-auto">
          Instantly generate scroll-stopping product listings. Just upload and go!
        </p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl"
        >
          {/* Upload Box */}
          <div className="border-dashed border-2 border-purple-600 py-10 rounded-xl mb-10 cursor-pointer hover:bg-purple-950/20 transition">
            <UploadCloud className="mx-auto mb-4 w-10 h-10 text-purple-400" />
            <p className="text-lg font-medium">Drag & Drop Product Image</p>
            <p className="text-sm text-gray-400">or click to select</p>
          </div>

          {/* Preview Mock */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <Image
              src="/mock-product.webp"
              alt="Product Preview"
              width={400}
              height={400}
              className="mx-auto rounded-xl border border-white/10 shadow-lg"
            />
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-2">Generated Listing:</h3>
              <p className="text-gray-300 mb-4">
                Introducing our elegant black wireless headphones — 30-hour battery, noise cancellation, and ergonomic design. Perfect for travel or work.
              </p>
              <CheckCircle className="text-green-400 inline w-5 h-5 mr-1" />
              <span className="text-sm">Tone: Professional</span><br />
              <CheckCircle className="text-green-400 inline w-5 h-5 mr-1" />
              <span className="text-sm">Language: English</span>

              <div className="mt-6">
                <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl text-sm font-semibold">
                  Export to WhatsApp / CSV
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
