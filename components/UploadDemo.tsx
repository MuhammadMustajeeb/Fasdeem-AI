"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function UploadDemo() {
  const [product, setProduct] = useState("");
  const [generated, setGenerated] = useState("");

  const handleGenerate = () => {
    if (!product.trim()) return;
    setGenerated(
      `✨ ${product} — Turn heads with this amazing item! Perfect for anyone looking to add style, comfort, and value to their life. Order now and experience the difference.`
    );
  };

  return (
    <div className="text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Try Fasdeem Right Here 🎯
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Type a product name and see how Fasdeem instantly creates a scroll-stopping description.
      </p>

      {/* Input Box */}
      <div className="max-w-md mx-auto flex items-center gap-2">
        <input
          type="text"
          placeholder="e.g. Handmade Leather Wallet"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition flex items-center gap-2"
        >
          Generate <ArrowRight size={16} />
        </button>
      </div>

      {/* Result Preview */}
      {generated && (
        <div className="mt-6 max-w-xl mx-auto text-left bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
          <p className="text-gray-700 text-sm whitespace-pre-line">{generated}</p>
        </div>
      )}

      {/* Placeholder Image Preview */}
      {!generated && (
        <div className="mt-6 max-w-xl mx-auto">
          <img
            src="/placeholder-preview.webp"
            alt="Product demo placeholder"
            className="rounded-xl border border-gray-200 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
