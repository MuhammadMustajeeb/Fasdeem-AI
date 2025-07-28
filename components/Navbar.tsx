"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X, User, Settings } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Fasdeem <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
          <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">Admin</Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                {/* Greeting */}
                <span className="hidden lg:block text-sm text-gray-700">
                  Hi, {user.user_metadata?.full_name?.split(" ")[0] || "User"} 👋
                </span>
                {/* Avatar */}
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={14} /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={14} /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-white border-l border-gray-200 shadow-xl p-6 flex flex-col">
            <button onClick={() => setMenuOpen(false)} className="self-end text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>

            <nav className="mt-6 flex flex-col gap-4 text-gray-700">
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {user.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        width={36}
                        height={36}
                        className="rounded-full border border-gray-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                        <User size={18} />
                      </div>
                    )}
                    <span className="text-sm text-gray-700">{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
