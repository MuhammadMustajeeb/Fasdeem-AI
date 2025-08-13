"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import posthog from "posthog-js";
import { Upload, Copy, RefreshCw, FileDown, MessageCircle } from "lucide-react";
import {
  hasGeneratedBefore,
  markReferralAsConverted,
} from "@/lib/referralUtils"; // Adjust import based on your project structure
import { supabase } from "@/lib/supabaseClient";

type ResultType = { title: string; description: string; tags: string[] };
const HISTORY_KEY = "fasdeem_history";

function saveToHistory(entry: ResultType) {
  if (typeof window === "undefined") return;
  const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const updated = [entry, ...existing].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

function loadHistory(): ResultType[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

export default function UploadForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [length, setLength] = useState("Medium");
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("Beauty");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [lastPromptData, setLastPromptData] = useState<any>(null);

  // ---- Handlers (same logic as your original) ----
  const handleGenerate = async (customData?: any) => {
    posthog.capture("gpt_generate_clicked");
    const data = customData ?? {
      name: productName,
      price,
      tone,
      length,
      language,
      category,
    };
    if (!data.name || !data.price)
      return toast.error("⚠️ Please fill in both fields");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || json.error)
        throw new Error(json.error || "Something went wrong");
      setResult(json);
      saveToHistory(json);
      setLastPromptData(data);
      toast.success("✅ Product content generated!");

      // 🆕 Trigger referral conversion if this is the first generation
      const alreadyGenerated = await hasGeneratedBefore();
      if (!alreadyGenerated) {
        const { data: userData } = await supabase.auth.getUser();
        const currentUserId = userData?.user?.id;
        if (currentUserId) {
          await markReferralAsConverted(currentUserId);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    posthog.capture("copy_to_clipboard");
    if (!result) return;
    const text = `${result.title}\n\n${
      result.description
    }\n\nTags: ${result.tags.join(", ")}`;
    navigator.clipboard.writeText(text.trim());
    toast.success("📋 Copied to clipboard!");
  };

  const handleWhatsAppExport = () => {
    if (!result) return;
    const msg = `🛍️ *${result.title}*\n\n${
      result.description
    }\n\nTags: ${result.tags.join(", ")}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleExportCSV = () => {
    if (!result) return;
    const csv = `Title,Description,Tags\n"${result.title}","${
      result.description
    }","${result.tags.join(" ")}"`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product.csv";
    link.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    posthog.capture("upload_clicked");
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-8">
      {/* 🖼 Image Upload */}
      <label className="border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all rounded-xl flex flex-col items-center justify-center text-center p-8 cursor-pointer">
        <Upload className="w-8 h-8 text-gray-500 mb-2" />
        <span className="text-gray-700 font-medium">
          📤 Drag & drop or click to upload
        </span>
        <span className="text-gray-400 text-sm">JPG or PNG, max 10MB</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* 🔤 Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="✨ Product Name"
          className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="💰 Price"
          className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* 🔽 Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            val: tone,
            setter: setTone,
            opts: ["Friendly", "Professional", "Persuasive"],
          },
          { val: length, setter: setLength, opts: ["Short", "Medium", "Long"] },
          { val: language, setter: setLanguage, opts: ["English", "Urdu"] },
          {
            val: category,
            setter: setCategory,
            opts: ["Beauty", "Clothing", "Electronics", "Home & Kitchen"],
          },
        ].map(({ val, setter, opts }, idx) => (
          <select
            key={idx}
            value={val}
            onChange={(e) => setter(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            {opts.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ))}
      </div>

      {/* ⚡ Generate Button */}
      <button
        onClick={() => handleGenerate()}
        className="w-full bg-gradient-to-br from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-lg transition-all"
      >
        {loading ? "⏳ Generating..." : "⚡ Generate AI Content"}
      </button>

      {/* 🖥 Result */}
      {loading && (
        <div className="text-gray-500 text-center text-lg">Thinking... 🚀</div>
      )}
      {!loading && !result && (
        <p className="text-gray-400 text-center text-sm">
          👇 Your AI-generated content will appear here.
        </p>
      )}

      {result && (
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-4">
          <div className="flex gap-4 items-start">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-lg border"
              />
            )}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">
                {result.title}
              </h2>
              <p className="text-gray-700">{result.description}</p>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              <Copy size={16} /> Copy
            </button>
            <button
              onClick={handleWhatsAppExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              <MessageCircle size={16} /> WhatsApp
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <FileDown size={16} /> Export CSV
            </button>
            <button
              onClick={() => handleGenerate(lastPromptData)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
            >
              <RefreshCw size={16} /> Re-generate
            </button>
          </div>
        </div>
      )}

      {/* 🕘 Recent Generations */}
      {!loading && loadHistory().length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="text-gray-700 text-sm font-semibold">
            🕘 Recent Generations
          </h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
            {loadHistory().map((item, idx) => (
              <div
                key={idx}
                className="min-w-[280px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
              >
                <h4 className="font-semibold text-gray-900 truncate">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
