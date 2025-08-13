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
  const [loading, setLoading] = useState(false);

  // Check local storage for referral code
  useEffect(() => {
    const code = localStorage.getItem("referral_code");
    if (code) setReferralCode(code);
  }, []);

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Create user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      return toast.error(signUpError.message);
    }

    const inviteeId = signUpData.user?.id;

    if (inviteeId) {
      // Insert into profiles table
      await supabase.from("profiles").insert({ id: inviteeId });

      // Save referral record if applicable
      if (referralCode) {
        await supabase.from("referrals").insert({
          inviter_id: referralCode,
          invitee_id: inviteeId,
          referral_code: referralCode,
          status: "pending"
        });
        localStorage.removeItem("referral_code");
      }
    }

    setLoading(false);
    toast.success("Signed up successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Get started with Fasdeem in just a few seconds.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {referralCode && (
            <div className="text-sm text-green-600">
              Referral code applied ✅
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
