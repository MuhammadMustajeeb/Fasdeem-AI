// components/Testimonials.tsx
"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Logic Tech Solutions",
    role: "Amazon Seller",
    feedback:
      "All Is good..",
    rating: 5,
  },
  {
    name: "Nashmiya Zainab",
    role: "",
    feedback:
      "This AI tool greatly enhance productivity by creating quality content quickly and easily. They are user-friendly, versatile and helping businesses and creators save time and effort. ",
    rating: 5,
  },
  {
    name: "ABC",
    role: "Whatsapp/Direct Seller",
    feedback:
      "Better Features",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Early Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              {/* Stars */}
              <div className="flex items-center mb-3">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-700 leading-relaxed mb-4">“{t.feedback}”</p>
            </div>

            {/* User Info */}
            <div className="mt-2">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
