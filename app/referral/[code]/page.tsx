// app/referral/[code]/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ReferralPageProps {
  params: { code: string };
}

export default function ReferralLanding({ params }: ReferralPageProps) {
  const { code } = params;
  const router = useRouter();

  useEffect(() => {
    // Save referral code to localStorage (to be used at signup)
    localStorage.setItem("referral_code", code);

    // Redirect to signup page
    router.push("/signup");
  }, [code, router]);

  return <p className="text-center mt-10">Redirecting to signup...</p>;
}
