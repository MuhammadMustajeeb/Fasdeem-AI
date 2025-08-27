"use client";
import { useEffect, useState } from "react";
import UploadForm from "@/components/UploadForm"; // Keep your generator logic
import { loadHistory, ResultType } from "@/lib/history";
import { UserCircle } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModel";
import Testimonials from "@/components/Testimonials";
import TemplatesSection from "@/components/TemplatesSection";

export default function Dashboard() {
  const [user] = useState({ name: "User" }); // Replace with session user later
  const [history, setHistory] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await loadHistory(10);
      setHistory(items);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <main className="min-h-screen bg-gray-50">
      {/* 🔝 Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Fasdeem Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <UserCircle size={32} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* 📦 Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name} 👋</h2>
            <p className="text-sm text-purple-100 mt-1">
              Ready to generate high-converting product descriptions?
            </p>
          </div>
          <img src="/illustration-ai.webp" alt="AI Illustration" className="h-20 hidden sm:block" />
        </div>

        {/* Upload Generator */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Generate Product Descriptions</h3>
          <UploadForm /> {/* Your existing generator form */}
        </div>

        {/* History Section */}
        {history.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🕘 Recent Generations
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
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
                <button
                  className="mt-3 text-purple-600 text-sm font-medium hover:underline"
                  onClick={() => navigator.clipboard.writeText(item.description)}
                >
                  Copy to Clipboard
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No generations yet. Try creating one!</p>
      )}
      </div>
      <Testimonials />
      <TemplatesSection />
    </main>
    <FeedbackModal />
    </>
  );
}
