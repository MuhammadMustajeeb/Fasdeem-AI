"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  context?: any; // optional: { input, output } snapshot
};

export default function FeedbackButton({ open, onClose, context }: Props) {
  const [submitting, setSubmitting] = useState<"up" | "down" | null>(null);

  if (!open) return null;

  const submitVote = async (vote: "up" | "down") => {
    if (submitting) return;
    setSubmitting(vote);
    const { error } = await supabase.from("feedback").insert([
      {
        vote,
        context: context ? context : null,
      },
    ]);

    if (error) {
      toast.error(error.message || "Could not submit feedback.");
      setSubmitting(null);
      return;
    }

    toast.success("Thanks for the feedback!");
    setSubmitting(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={submitting ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative z-[101] w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Was this helpful?
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Quick feedback helps us improve Fasdeem.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-6">
          <button
            onClick={() => submitVote("up")}
            disabled={!!submitting}
            className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl transition ${
              submitting === "up"
                ? "scale-95 border-green-600"
                : "hover:scale-105 border-gray-300"
            }`}
            aria-label="Thumbs up"
            title="Thumbs up"
          >
            👍
          </button>

          <button
            onClick={() => submitVote("down")}
            disabled={!!submitting}
            className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl transition ${
              submitting === "down"
                ? "scale-95 border-red-600"
                : "hover:scale-105 border-gray-300"
            }`}
            aria-label="Thumbs down"
            title="Thumbs down"
          >
            👎
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={onClose}
            disabled={!!submitting}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
