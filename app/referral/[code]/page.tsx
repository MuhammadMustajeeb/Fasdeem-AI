// app/referral/[code]/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralLanding({ params }: { params: { code: string } }) {
  const { code } = params;
  const router = useRouter();

  useEffect(() => {
    // Save referral code in localStorage
    localStorage.setItem("referral_code", code);

    // Redirect to signup page
    router.push("/signup");
  }, [code, router]);

  return <p className="text-center mt-10">Redirecting to signup...</p>;
}
