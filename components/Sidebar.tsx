'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="sm:hidden p-4">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 flex items-center gap-2"
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
        </button>
      </div>

      {/* Sidebar (mobile: absolute, desktop: static) */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } sm:block sm:w-64 w-full sm:relative absolute top-0 left-0 z-30 bg-gray-100 border-r h-screen sm:h-auto p-4`}
      >
        <nav className="space-y-4">
          <Link
            href="/"
            className={`block ${path === "/" ? "font-bold text-black" : "text-gray-600"}`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`block ${path === "/dashboard" ? "font-bold text-black" : "text-gray-600"}`}
          >
            Dashboard
          </Link>
        </nav>
      </aside>
    </>
  );
}
