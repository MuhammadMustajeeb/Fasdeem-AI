// app/api/track-upgrade/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    // Get logged-in user (if any)
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    await supabase.from("upgrade_clicks").insert({
      user_id: user?.id ?? null,
      plan,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to track upgrade." }, { status: 500 });
  }
}
