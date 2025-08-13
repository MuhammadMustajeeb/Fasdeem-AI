import { supabase } from "@/lib/supabaseClient";

export async function markReferralAsConverted(currentUserId: string) {
  // Find referral for this user
  const { data: referral, error } = await supabase
    .from("referrals")
    .select("inviter_id, status")
    .eq("invitee_id", currentUserId)
    .single();

  if (error || !referral || referral.status === "converted") return;

  const inviterId = referral.inviter_id;

  // Mark as converted
  await supabase
    .from("referrals")
    .update({ 
      status: "converted", 
      converted_at: new Date() 
    })
    .eq("invitee_id", currentUserId);

  // Reward inviter
  const { data: inviterProfile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", inviterId)
    .single();

  const newCredits = (inviterProfile?.credits || 0) + 50; // reward amount

  await supabase
    .from("profiles")
    .update({ credits: newCredits })
    .eq("id", inviterId);
}

export async function hasGeneratedBefore() {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) return false;

  const { data, error } = await supabase
    .from("generations")
    .select("id")
    .eq("user_id", user.user.id)
    .limit(1);

  if (error) {
    console.error("Error checking generation history:", error.message);
    return false;
  }
  
  return data && data.length > 0;
}

