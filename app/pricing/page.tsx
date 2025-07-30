"use client";

import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "✅ Unlimited Product Generations",
        "✅ Export to WhatsApp & CSV",
        "✅ Basic Analytics",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "🚀 Unlimited AI Generations",
        "📊 Advanced Analytics",
        "📤 Priority Export Tools",
        "💬 Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Business",
      price: "$49",
      period: "per month",
      features: [
        "🏢 Team Collaboration (5 seats)",
        "⚡ API Access",
        "🛠 Custom Integrations",
        "🤝 Dedicated Account Manager",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-16 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          Start free and scale effortlessly with Fasdeem AI. No hidden fees. Cancel anytime.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-6 flex flex-col shadow-sm hover:shadow-lg transition ${
              plan.highlight ? "border-purple-500 shadow-md scale-105" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                plan.highlight ? "text-purple-600" : "text-gray-800"
              }`}
            >
              {plan.name}
            </h2>
            <p className="text-4xl font-bold text-gray-900">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-6">/{plan.period}</p>

            <ul className="flex-1 space-y-3 text-gray-600 text-sm">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/"
              className={`mt-8 py-3 rounded-lg text-center font-medium transition ${
                plan.highlight
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {plan.highlight ? "Upgrade to Pro" : "Get Started"}
            </Link>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-gray-400 text-xs mt-10">
        💡 *Pro and Business plans unlock advanced analytics, integrations, and dedicated support.*
      </p>
    </div>
  );
}
