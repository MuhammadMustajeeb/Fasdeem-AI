"use client";

import { useState } from "react";

export default function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  async function trackUpgrade(plan: string) {
    try {
      setLoading(plan);
      await fetch("/api/track-upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      alert(`✅ Click tracked for ${plan} plan`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to track upgrade click");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h2>
      <p className="text-center text-gray-600 mb-12">
        Start free and upgrade as your store grows. No hidden fees. Cancel anytime.
      </p>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Free</h3>
          <p className="text-gray-600 mb-4">$0 / forever</p>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>✅ 20 AI generations / month</li>
            <li>✅ WhatsApp + CSV export (with watermark)</li>
            <li>✅ Basic analytics</li>
          </ul>
          <button
            onClick={() => trackUpgrade("Free")}
            disabled={loading === "Free"}
            className="mt-auto w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
          >
            {loading === "Free" ? "Processing..." : "Get Started"}
          </button>
        </div>

        {/* Starter Plan */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-purple-600 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Starter</h3>
          <p className="text-gray-600 mb-4">$5 / month</p>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>🚀 200 AI generations / month</li>
            <li>🚀 WhatsApp + CSV export (no watermark)</li>
            <li>🚀 Priority support</li>
          </ul>
          <button
            onClick={() => trackUpgrade("Starter")}
            disabled={loading === "Starter"}
            className="mt-auto w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            {loading === "Starter" ? "Processing..." : "Upgrade to Starter"}
          </button>
        </div>

        {/* Growth Plan */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Growth</h3>
          <p className="text-gray-600 mb-4">$15 / month</p>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>🔥 Unlimited AI generations</li>
            <li>🔥 Advanced analytics & insights</li>
            <li>🔥 Save history + favorites</li>
            <li>🔥 Referral rewards</li>
          </ul>
          <button
            onClick={() => trackUpgrade("Growth")}
            disabled={loading === "Growth"}
            className="mt-auto w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            {loading === "Growth" ? "Processing..." : "Upgrade to Growth"}
          </button>
        </div>

        {/* Business Plan */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Business</h3>
          <p className="text-gray-600 mb-4">$49 / month</p>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>🏢 Team collaboration (5 seats)</li>
            <li>🏢 API access</li>
            <li>🏢 Custom integrations</li>
            <li>🏢 Dedicated account manager</li>
          </ul>
          <button
            onClick={() => trackUpgrade("Business")}
            disabled={loading === "Business"}
            className="mt-auto w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
          >
            {loading === "Business" ? "Processing..." : "Contact Sales"}
          </button>
        </div>
      </div>
    </div>
  );
}
