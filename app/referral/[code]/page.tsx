// app/referral/[code]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

interface ReferralPageProps {
  params: { code: string }; // ✅ Correct typing
}

export default async function ReferralPage({ params }: ReferralPageProps) {
  const { code } = params;

  // ✅ Check if referral code exists (optional validation)
  const { data: inviter, error } = await supabase
    .from("auth.users")
    .select("id")
    .eq("id", code)
    .single();

  if (!inviter || error) {
    // If invalid code → redirect or show error page
    redirect("/signup?error=invalid-referral");
  }

  // ✅ Redirect user to signup page with referral code in query params
  redirect(`/signup?ref=${code}`);
}
