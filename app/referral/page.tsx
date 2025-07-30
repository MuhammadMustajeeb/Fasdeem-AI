"use client";

import { useState } from "react";
import LegalLayout from "@/components/LegalLayout";

export default function ReferralPage() {
  const referralLink = "https://fasdeem.com/referral/your-code";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <LegalLayout title="Referral Program">
      <section className="space-y-6">
        <p className="text-gray-600">
          Invite friends to Fasdeem and earn rewards when they sign up!
        </p>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">Your Referral Link</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 border rounded-lg bg-white shadow-sm"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              {copied ? "✅ Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 mb-2">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Share your referral link.</li>
            <li>Your friend signs up using it.</li>
            <li>You both earn rewards instantly!</li>
          </ol>
        </div>
      </section>
    </LegalLayout>
  );
}
