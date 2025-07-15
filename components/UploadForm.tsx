"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

type ResultType = {
  title: string;
  description: string;
  tags: string[];
};

export default function UploadForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleGenerate = async () => {
    if (!productName || !price) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous result while loading

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: productName, price }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
      toast.success("✅ Product content generated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;

    const fullText = `
${result.title}

${result.description}

Tags: ${result.tags.join(", ")}
    `;
    navigator.clipboard.writeText(fullText.trim());
    toast.success("📋 Copied to clipboard!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-0 space-y-6">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded-lg text-sm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          autoFocus
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded-lg text-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm transition"
        >
          {loading ? "⏳ Generating..." : "Generate Product Content"}
        </button>
      </div>

      {loading && (
        <div className="text-gray-500 text-sm">Thinking... Just a sec 🚀</div>
      )}

      {!result && !loading && (
        <p className="text-gray-400 text-sm text-center">
          👇 Your product content will appear here after generation.
        </p>
      )}

      {result && (
        <div className="bg-white border p-4 rounded-lg shadow space-y-4 text-sm transition-all duration-300 opacity-100">
          <h2 className="text-lg font-semibold">{result.title}</h2>
          <p className="text-gray-700 leading-relaxed">{result.description}</p>

          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
            >
              📋 Copy to Clipboard
            </button>

            <button
              onClick={() => toast("Thanks for the feedback! ❤️")}
              className="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100"
            >
              👍 Was this helpful?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
