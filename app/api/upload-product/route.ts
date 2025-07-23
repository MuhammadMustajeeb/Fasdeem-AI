import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, image, description, user_id } = body;

    console.log("Received user_id:", user_id);

    if (!user_id || typeof user_id !== "string") {
      return NextResponse.json({ success: false, error: "Missing or invalid user ID" }, { status: 400 });
    }

    const { data: userExists, error } = await supabaseAdmin.auth.admin.getUserById(user_id);
    console.log("Auth Check Result:", userExists);

    if (error || !userExists) {
      console.error("Supabase Admin Error:", error);
      return NextResponse.json({ success: false, error: "Invalid user ID" }, { status: 400 });
    }

    const { data, error: insertError } = await supabaseAdmin.from("products").insert([
      { name, price, image, description, user_id },
    ]);

    if (insertError) {
      console.error("Insert Error:", insertError);
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json({ success: false, error: err.message ?? "Unknown error" }, { status: 500 });
  }
}
