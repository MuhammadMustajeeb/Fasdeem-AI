"use client";

import { useState } from "react";
import { templates } from "@/lib/templates";

export default function TemplatesSection() {
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  async function handleGenerate(templateId: string) {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    setLoading(templateId);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(template.data),
      });

      const data = await res.json();
      setResult({ template, data });
    } catch (err) {
      console.error(err);
      alert("Error generating content.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">🔥 Pre-made Templates</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            className="p-6 border rounded-2xl shadow-md hover:shadow-xl transition bg-white"
          >
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{t.description}</p>
            <button
              onClick={() => handleGenerate(t.id)}
              disabled={loading === t.id}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              {loading === t.id ? "Generating..." : "Use Template"}
            </button>
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-12 p-6 border rounded-xl bg-gray-50">
          <h3 className="text-2xl font-bold mb-2">✨ Generated Copy</h3>
          <p className="text-lg font-semibold">Title: {result.data.title}</p>
          <p className="mt-2">Description: {result.data.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            Tags: {result.data.tags?.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
