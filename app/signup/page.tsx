// app/signup/page.tsx
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const code = localStorage.getItem("referral_code");
    if (code) setReferralCode(code);
  }, []);

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
      return;
    }

    // If referral code exists, save in referrals table
    if (referralCode && data.user) {
      const { error: refErr } = await supabase.from("referrals").insert({
        inviter_id: referralCode, // referral code is inviter's ID
        invitee_id: data.user.id,
        referral_code: referralCode,
      });

      if (refErr) console.error("Referral save error:", refErr.message);
      else toast.success("Referral tracked!");
    }

    toast.success("Signup successful! Check your email to confirm.");
    localStorage.removeItem("referral_code");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSignup}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Sign Up
      </button>
      {referralCode && (
        <p className="text-sm text-gray-500 text-center">
          🎁 Referral applied!
        </p>
      )}
    </div>
  );
}
