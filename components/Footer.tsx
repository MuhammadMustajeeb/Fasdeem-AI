"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        
        {/* Left: Copyright */}
        <span className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-900">
            Fasdeem AI
          </span>
          . All rights reserved.
        </span>

        {/* Center: Links */}
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gray-900 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-900 transition">
            Terms
          </Link>
          <Link href="/referral" className="hover:text-gray-900 transition">
            Referral
          </Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <Link
            href="https://x.com/mustajeeb77"
            target="_blank"
            className="hover:text-indigo-500 transition"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/muhammad-mustajeeb/"
            target="_blank"
            className="hover:text-indigo-500 transition"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="https://github.com/MuhammadMustajeeb"
            target="_blank"
            className="hover:text-indigo-500 transition"
          >
            <Github size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
