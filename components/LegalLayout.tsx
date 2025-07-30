// components/LegalLayout.tsx
import Link from "next/link";

export default function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold py-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="mt-2 text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 space-y-6">
          {children}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
