"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
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
    <header className="w-full h-16 px-6 flex items-center justify-between border-b sticky top-0 z-40 bg-white/70 backdrop-blur-md shadow-md">
      <Link href="/" className="text-xl font-bold text-gray-900">
        Fasdeem <span className="text-purple-600">AI</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/admin"
          className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
        >
          Admin
        </Link>


        {user ? (
          <>
            {user.user_metadata?.avatar_url && (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full border"
              />
            )}
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.user_metadata?.full_name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/signin"
            className="text-sm px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-500 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
