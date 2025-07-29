"use client";
import { useState, useEffect } from "react";

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);

  // Track usage count from localStorage
  useEffect(() => {
    const usage = parseInt(localStorage.getItem("fasdeem_usage") || "0") + 1;
    localStorage.setItem("fasdeem_usage", usage.toString());

    // Auto-open modal after 3 uses (only once)
    if (usage === 3 && !localStorage.getItem("feedback_shown")) {
      setTimeout(() => setOpen(true), 2000); // Open after 2s delay
      localStorage.setItem("feedback_shown", "true");
    }
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        💬 Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <iframe
              src="https://tally.so/embed/woLveO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1source=fasdeem_dashboard"
              width="100%"
              height="400"
              frameBorder="0"
              title="Fasdeem Feedback"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
