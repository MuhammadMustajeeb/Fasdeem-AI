"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import posthog from 'posthog-js';


type ResultType = {
  title: string;
  description: string;
  tags: string[];
};

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

  const handleGenerate = async (customData?: any) => {
      posthog.capture('gpt_generate_clicked');

    const data = customData ?? { name: productName, price, tone, length, language, category };
    if (!data.name || !data.price) return toast.error("Please fill in both fields");

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Something went wrong");
      setResult(json);
      saveToHistory(json);
      setLastPromptData(data);
      toast.success("✅ Product content generated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
      posthog.capture('copy_to_clipboard');

    if (!result) return;
    const fullText = `${result.title}\n\n${result.description}\n\nTags: ${result.tags.join(", ")}`;
    navigator.clipboard.writeText(fullText.trim());
    toast.success("📋 Copied to clipboard!");
  };

  const handleWhatsAppExport = () => {
    if (!result) return;
    const msg = `🛍️ *${result.title}*\n\n${result.description}\n\nTags: ${result.tags.join(", ")}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleExportCSV = () => {
    if (!result) return;
    const csv = `Title,Description,Tags\n"${result.title}","${result.description}","${result.tags.join(" ")}"`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product.csv";
    link.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      posthog.capture('upload_clicked');

    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-10">
      {/* 🖼️ Upload Box */}
      <label className="border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm flex flex-col items-center justify-center rounded-xl p-6 text-center text-sm cursor-pointer shadow-inner">
        <span className="text-indigo-200 font-semibold group-hover:text-indigo-100">📤 Drag & drop or click to upload</span>
        <span className="text-white/50">JPG or PNG, max 10MB</span>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </label>

      {/* 🧾 Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="bg-white/10 border border-white/10 p-3 rounded-xl text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"

          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="bg-white/10 border border-white/10 p-3 rounded-xl text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"

          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* 🎛️ Select Fields */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ val: tone, setter: setTone, opts: ["Friendly", "Professional", "Persuasive"] },
          { val: length, setter: setLength, opts: ["Short", "Medium", "Long"] },
          { val: language, setter: setLanguage, opts: ["English", "Urdu"] },
          { val: category, setter: setCategory, opts: ["Beauty", "Clothing", "Electronics", "Home & Kitchen"] }
        ].map(({ val, setter, opts }, idx) => (
          <select
            key={idx}
            value={val}
            onChange={(e) => setter(e.target.value)}
            className="bg-white/10 text-white/80 p-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"

          >
            {opts.map(opt => <option key={opt} className="text-black">{opt}</option>)}
          </select>
        ))}
      </div>

      {/* 🚀 Generate Button */}
      <button
        onClick={() => handleGenerate()}
        className="w-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
      >
        {loading ? "⏳ Generating..." : "⚡ Generate Product Content"}
      </button>


      {/* 🧠 Result Display */}
      {loading && <div className="text-white/70 text-sm">Thinking... Just a sec 🚀</div>}
      {!loading && !result && (
        <p className="text-white/50 text-sm text-center">👇 Your product content will appear here after generation.</p>
      )}

      {result && (
        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-4 text-white shadow-inner">
          <div className="flex gap-4 items-start">
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-24 h-24 object-cover rounded-lg border shadow" />}
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{result.title}</h2>
              <p>{result.description}</p>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, i) => (
                  <span key={i} className="bg-indigo-500/30 text-indigo-100 px-2 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleCopy} className="px-4 py-2 bg-black/80 hover:bg-black text-white rounded">📋 Copy</button>
            <button onClick={handleWhatsAppExport} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">📤 WhatsApp</button>
            <button onClick={handleExportCSV} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">📄 Export CSV</button>
            <button onClick={() => handleGenerate(lastPromptData)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded">🔁 Re-generate</button>
          </div>
        </div>
      )}

      {/* 🕘 History */}
      {!loading && loadHistory().length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="text-white/80 text-sm font-medium">Recent Generations</h3>
          <div className="grid gap-3">
            {loadHistory().map((item, idx) => (
              <div key={idx} className="p-4 bg-white/10 border border-white/10 rounded-xl space-y-1 text-white">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-white/70 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 text-xs text-white/50">
                  {item.tags.map((t, i) => (
                    <span key={i} className="bg-white/10 px-2 py-0.5 rounded">#{t}</span>
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
