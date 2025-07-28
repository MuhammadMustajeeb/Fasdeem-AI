"use client";
import Link from "next/link";

export default function ReferralCTA() {
  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        🚀 Invite Friends & Earn Rewards
      </h2>
      <p className="mt-2 text-white/90 max-w-md mx-auto">
        Share Fasdeem AI with other sellers and unlock premium features when they sign up!
      </p>
      <div className="mt-6">
        <Link href="/referral">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-50 transition">
            Invite Friends → 
          </button>
        </Link>
      </div>
    </div>
  );
}
