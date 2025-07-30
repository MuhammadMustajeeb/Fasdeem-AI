"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X, User, Settings, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/signin"); // ✅ Replace router.refresh() with redirect
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Fasdeem <span className=" text-purple-500">AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm ${isActive("/dashboard") ? "text-purple-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin"
            className={`text-sm ${isActive("/admin") ? "text-purple-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
          >
            Admin
          </Link>

          {/* Upgrade CTA */}
          <Link href="/pricing" className="hidden md:block">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition shadow">
              🚀 Upgrade
            </button>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600 dark:text-gray-300" />}
          </button>

          {/* Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2">
                <span className="hidden lg:block text-sm text-gray-700 dark:text-gray-200">
                  Hi, {user.user_metadata?.full_name?.split(" ")[0] || "User"} 👋
                </span>
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="rounded-full border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 z-50">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <User size={14} /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Settings size={14} /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900" onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* ✅ Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[998] md:hidden">
          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 z-[999]">
            <button onClick={() => setMenuOpen(false)} className="self-end text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>

            <nav className="mt-6 flex flex-col gap-4 mx-2 text-gray-700 dark:text-gray-200">
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
