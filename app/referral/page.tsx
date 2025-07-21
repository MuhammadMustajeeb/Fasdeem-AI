// app/referral/page.tsx
"use client";

import { useState } from "react";
import { Facebook, Share2, UserPlus } from "lucide-react";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://fasdeem.com/signup?ref=mustajeeb123"; // Replace with user ID/token from session
  const signupCount = 2; // Replace with real Supabase fetch
  const target = 3;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-black to-purple-900 text-white flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-3xl font-bold mb-4 text-center">🎁 Invite & Earn</h1>
      <p className="mb-6 text-center max-w-md opacity-80">
        Share your unique link with friends. When <strong>3 people sign up</strong>, you unlock bonus credits!
      </p>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl w-full max-w-xl">
        <p className="mb-2 font-semibold">Your invite link:</p>
        <div className="flex items-center bg-white/20 px-4 py-2 rounded-xl overflow-hidden">
          <span className="truncate">{inviteLink}</span>
          <button onClick={copyToClipboard} className="ml-4 text-sm text-white bg-purple-700 px-3 py-1 rounded-md">
            {copied ? "✅ Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-6">
          <p className="font-semibold mb-2">Share instantly:</p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/?text=🔥 Try Fasdeem AI for free: ${inviteLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white flex items-center gap-2"
            >
              <Share2 size={16} /> WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
            >
              <Facebook size={16} /> Facebook
            </a>
          </div>
        </div>

        <div className="mt-6 text-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <UserPlus size={18} />
            {signupCount} / {target} friends signed up
          </div>
          {signupCount >= target ? (
            <p className="text-green-400 font-semibold">🎉 Bonus Unlocked!</p>
          ) : (
            <p className="text-yellow-400">Invite {target - signupCount} more to unlock your reward</p>
          )}
        </div>
      </div>
    </div>
  );
}
