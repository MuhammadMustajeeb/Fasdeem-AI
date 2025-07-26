"use client";
import Link from "next/link";

export default function ReferralCTA() {
  return (
    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-6 md:p-10 text-center space-y-4 text-white">
      <h3 className="text-3xl md:text-4xl font-extrabold text-purple-300">
        🎁 Share & Earn Rewards
      </h3>
      <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto">
        Invite 3 friends to Fasdeem and unlock bonus credits to supercharge your store.
      </p>
      <Link href="/referral">
        <button className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-semibold text-base md:text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
          🔗 Get Your Referral Link
        </button>
      </Link>
    </section>
  );
}
