"use client";

import { useSession } from "@supabase/auth-helpers-react";
import { useState, useMemo } from "react";

export default function ReferralPage() {
  const session = useSession();

  const referralLink = useMemo(() => {
    if (!session?.user?.id) return "";
    return `https://fasdeem.com/referral/${encodeURIComponent(session.user.id)}`;
  }, [session?.user?.id]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!session) {
    return <p className="text-center mt-10">Log in to see your referral link.</p>;
  }

  return (
    <div className="max-w-lg mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-bold">🎁 Invite & Earn</h1>
      <p>Share your referral link below and earn rewards when friends sign up.</p>
      <div className="flex gap-2">
        <input
          value={referralLink}
          readOnly
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          {copied ? "✅ Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
