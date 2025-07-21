import Link from "next/link";

export default function ReferralCTA() {
  return (
    <section className="bg-purple-950 text-white py-12 text-center px-6">
      <h3 className="text-2xl font-bold mb-3">🎁 Share & Earn</h3>
      <p className="mb-4 opacity-80">
        Love Fasdeem? Share with 3 friends & unlock bonus credits.
      </p>
      <Link href="/referral">
        <button className="bg-white text-purple-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
          🔗 Get Referral Link
        </button>
      </Link>
    </section>
  );
}
