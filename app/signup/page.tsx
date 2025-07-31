"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const code = localStorage.getItem("referral_code");
    if (code) setReferralCode(code);
  }, []);

  const handleSignup = async () => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    const inviteeId = authData.user?.id;

    // ✅ Save referral if referral code exists
    if (referralCode && inviteeId) {
      await supabase.from("referrals").insert({
        inviter_id: referralCode, // inviter is referral link owner
        invitee_id: inviteeId, // new user
        referral_code: referralCode,
      });
      localStorage.removeItem("referral_code"); // clear after use
    }

    router.push("/dashboard"); // redirect after signup
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="w-full bg-purple-600 text-white py-2 rounded"
      >
        Sign Up
      </button>
      {referralCode && (
        <p className="text-sm text-gray-500 mt-2">
          ✅ Referral applied from user: {referralCode}
        </p>
      )}
    </div>
  );
}
