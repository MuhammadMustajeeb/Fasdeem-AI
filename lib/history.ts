// utils/history.ts
import { supabase } from "@/lib/supabaseClient";

export type ResultType = {
  title: string;
  description: string;
  tags: string[];
  createdAt?: string; // optional when coming from localStorage
};

const HISTORY_KEY = "fasdeem_history";

// ----- Local fallback -----
function saveHistoryLocal(entry: ResultType) {
  if (typeof window === "undefined") return;
  const existing: ResultType[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const withTime = { ...entry, createdAt: new Date().toISOString() };
  const updated = [withTime, ...existing].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

function loadHistoryLocal(limit = 10): ResultType[] {
  if (typeof window === "undefined") return [];
  const arr: ResultType[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  return arr.slice(0, limit);
}

export async function saveHistory(entry: ResultType) {
  // If logged in, write to Supabase; else write to local
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    saveHistoryLocal(entry);
    return;
  }

  await supabase.from("generations").insert({
    user_id: user.id,
    title: entry.title,
    description: entry.description,
    tags: entry.tags ?? [],
  });
}

export async function loadHistory(limit = 10): Promise<ResultType[]> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    return loadHistoryLocal(limit);
  }

  const { data, error } = await supabase
    .from("generations")
    .select("title, description, tags, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map((r) => ({
    title: r.title,
    description: r.description,
    tags: r.tags || [],
    createdAt: r.created_at ?? undefined,
  }));
}

/**
 * Call this once after the user logs in (or on the Dashboard)
 * to migrate any pre-login local history to Supabase.
 */
export async function syncLocalHistoryToSupabase() {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return;

  const local = loadHistoryLocal(50);
  if (local.length === 0) return;

  // Bulk insert (best-effort). Duplicates are okay for now.
  const payload = local.map((h) => ({
    user_id: user.id,
    title: h.title,
    description: h.description,
    tags: h.tags ?? [],
    // created_at: h.createdAt ? new Date(h.createdAt).toISOString() : undefined, // optional
  }));

  await supabase.from("generations").insert(payload);

  // Clear local history once synced
  if (typeof window !== "undefined") {
    localStorage.removeItem(HISTORY_KEY);
  }
}
