"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-4 border-t backdrop-blur-md bg-white/70 shadow-sm sticky bottom-0 z-30">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600">
        <span>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-purple-600">Fasdeem AI</span>. All rights reserved.
        </span>

        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-purple-600 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-purple-600 transition">
            Terms
          </Link>
          <Link href="/referral" className="hover:text-purple-600 transition">
            Referral
          </Link>
        </div>
      </div>
    </footer>
  );
}
