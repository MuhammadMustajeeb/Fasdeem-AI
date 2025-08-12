"use client";

import LegalLayout from "@/components/LegalLayout";
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useMemo, useCallback } from "react";

export default function InvitePage() {
  const session = useSession();
  const [copied, setCopied] = useState(false);

  // Generate referral link only when user is logged in
  const referralLink = useMemo(() => {
    if (typeof window === "undefined" || !session?.user?.id) return "";
    return `${window.location.origin}/referral/${encodeURIComponent(
      session.user.id
    )}`;
  }, [session?.user?.id]);

  // Copy to clipboard handler
  const handleCopy = useCallback(async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy referral link:", error);
    }
  }, [referralLink]);

  // If user is not logged in
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500">
          Log in to see your referral link.
        </p>
      </div>
    );
  }

  return (
    <LegalLayout title="Invite Friends">
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">🎁 Invite & Earn</h1>
        <p className="text-gray-600 mb-6">
          Share your unique link and earn rewards when your friends sign up and
          start using Fasdeem.
        </p>

        {/* Referral Link Box */}
        <div className="flex gap-2">
          <input
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${
              copied
                ? "bg-green-600 hover:bg-green-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {copied ? "✅ Copied!" : "Copy"}
          </button>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">💡 Tips to Earn More:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Send your link to friends on WhatsApp or Messenger.</li>
            <li>Post it on Instagram stories with your shop or products.</li>
            <li>Share in seller or entrepreneur groups you’re part of.</li>
          </ul>
        </div>
      </div>
    </div>
    </LegalLayout>
  );
}
