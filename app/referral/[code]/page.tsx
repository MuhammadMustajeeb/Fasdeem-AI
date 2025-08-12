"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ReferralLanding() {
  const router = useRouter();
  const params = useParams();
  const code = params?.code as string;

  useEffect(() => {
    if (code) {
      // Save referral code in localStorage
      localStorage.setItem("referral_code", decodeURIComponent(code));

      // Redirect to signup page
      router.push("/signup");
    }
  }, [code, router]);

  return <p className="text-center mt-10">Redirecting to signup...</p>;
}
