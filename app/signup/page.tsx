"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) return toast.error(signUpError.message);

    const inviteeId = signUpData.user?.id;
    if (inviteeId && referralCode) {
      // Save referral record in Supabase
      await supabase.from("referrals").insert({
        inviter_id: referralCode,
        invitee_id: inviteeId,
        referral_code: referralCode,
      });
      localStorage.removeItem("referral_code");
    }

    toast.success("Signed up successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
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
      {referralCode && (
        <p className="text-sm text-gray-500">Referral applied ✅</p>
      )}
      <button
        onClick={handleSignup}
        className="w-full bg-purple-600 text-white py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}
