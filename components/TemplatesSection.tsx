"use client";

import { useState } from "react";
import { templates } from "@/lib/templates";
import { saveHistory, type ResultType } from "@/lib/history";
import { ClipboardCopy, Check, Sparkles } from "lucide-react";

type GenResult = {
  title?: string;
  description?: string;
  tags?: string[];
};

export default function TemplatesSection() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [result, setResult] = useState<{ tplId: string; data: GenResult } | null>(null);
  const [copied, setCopied] = useState<"title" | "description" | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleGenerate(templateId: string) {
    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl) return;

    setLoadingId(templateId);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tpl.data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to generate");
      }

      const json = (await res.json()) as GenResult;

      // Show on UI
      setResult({ tplId: templateId, data: json });

      // Save to history (Supabase if logged-in, else local)
      setSaving(true);
      const payload: ResultType = {
        title: json.title || "",
        description: json.description || "",
        tags: Array.isArray(json.tags) ? json.tags : [],
      };
      await saveHistory(payload);
    } catch (e) {
      console.error("Template generate error:", e);
      alert("Failed to generate content. Check console for details.");
    } finally {
      setSaving(false);
      setLoadingId(null);
    }
  }

  async function copy(text: string, field: "title" | "description") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 1600);
    } catch (e) {
      console.error("Copy failed:", e);
      alert("Copy failed");
    }
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          ⚡ Pre-made Templates
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Pick a style → we’ll auto-generate high-converting copy in seconds.
        </p>

        {/* Templates Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                </div>
                <div className="shrink-0 rounded-xl bg-purple-50 p-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => handleGenerate(t.id)}
                  disabled={loadingId === t.id}
                  className={`w-full rounded-xl py-2.5 font-medium text-white transition ${
                    loadingId === t.id
                      ? "bg-purple-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {loadingId === t.id ? "Generating..." : "Use Template"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Result Card */}
        {result && (
          <div className="mt-10">
            <div className="p-6 md:p-8 rounded-2xl border bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold break-words">
                    {result.data.title || "Untitled"}
                  </h3>

                  <p className="mt-3 text-gray-800 whitespace-pre-wrap break-words">
                    {result.data.description || "No description returned."}
                  </p>

                  {Array.isArray(result.data.tags) && result.data.tags.length > 0 && (
                    <p className="mt-3 text-sm text-gray-600 break-words">
                      <span className="font-medium">Tags:</span> {result.data.tags.join(", ")}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => copy(result.data.title || "", "title")}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied === "title" ? (
                      <span className="text-green-600 inline-flex items-center gap-1">
                        <Check className="w-4 h-4" /> Copied
                      </span>
                    ) : (
                      <span>Copy Title</span>
                    )}
                  </button>

                  <button
                    onClick={() => copy(result.data.description || "", "description")}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied === "description" ? (
                      <span className="text-green-600 inline-flex items-center gap-1">
                        <Check className="w-4 h-4" /> Copied
                      </span>
                    ) : (
                      <span>Copy Description</span>
                    )}
                  </button>

                  <div className="text-[12px] text-gray-500 mt-1 text-right">
                    {saving ? "Saving..." : "Saved to history"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
