"use client";

export default function PricingSection() {
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
          <button className="mt-auto w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
            Get Started
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
          <button className="mt-auto w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700">
            Upgrade to Starter
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
          <button className="mt-auto w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700">
            Upgrade to Growth
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
          <button className="mt-auto w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
