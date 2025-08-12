"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// ✅ Proper typing for Next.js App Router params
interface ReferralLandingProps {
  params: {
    code: string;
  };
}

export default function ReferralLanding({ params }: ReferralLandingProps) {
  const router = useRouter();

  useEffect(() => {
    if (params?.code) {
      // Save referral code in localStorage
      localStorage.setItem("referral_code", params.code);

      // Redirect to signup page
      router.push("/signup");
    }
  }, [params?.code, router]);

  return <p className="text-center mt-10">Redirecting to signup...</p>;
}
