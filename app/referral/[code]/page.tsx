"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralLanding({ params }: { params: { code: string } }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("referral_code", params.code); // save inviter ID
    router.push("/signup"); // redirect to signup page
  }, [params.code, router]);

  return <p className="text-center mt-10">Redirecting to signup...</p>;
}
