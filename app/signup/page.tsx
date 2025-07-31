"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref"); // ✅ Capture referral code from query

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      toast.error(signupError.message);
      return;
    }

    const invitee_id = signupData.user?.id;

    // ✅ If referral code present, log referral
    if (referralCode && invitee_id) {
      const { error: refError } = await supabase.from("referrals").insert([
        {
          inviter_id: referralCode,
          invitee_id,
          referral_code: referralCode,
        },
      ]);
      if (refError) console.error(refError);
    }

    toast.success("✅ Signed up successfully!");
    router.push("/dashboard"); // Redirect after signup
  };

  return (
    <div className="max-w-md mx-auto mt-16 space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="w-full bg-purple-600 text-white p-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}
