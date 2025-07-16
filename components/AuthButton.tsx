"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const [session, setSession] = useState<any>(null);

  // Check session and subscribe to auth changes
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Error getting session:", error.message);
      }

      setSession(data.session);
      console.log("🧪 Initial session:", data.session);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("🔁 Auth change:", event);
        console.log("✅ Session:", session);
        setSession(session);
      }
    );

    getSession();

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    const email = prompt("📩 Enter your email to receive magic link:");
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });
      if (error) {
        console.error("❌ Login error:", error.message);
        alert("Login failed!");
      } else {
        alert("✅ Magic link sent to your email!");
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Logout error:", error.message);
    } else {
      alert("👋 Logged out");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {session ? (
        <>
          <span className="text-sm text-gray-600">👤 {session.user.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          Login
        </button>
      )}
    </div>
  );
}
