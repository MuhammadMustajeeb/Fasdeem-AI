// components/Testimonials.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Star } from "lucide-react";
import { useEffect } from "react";

const testimonials = [
  {
    name: "Logic Tech Solutions",
    role: "Amazon Seller",
    feedback: "All Is good..",
    rating: 5,
  },
  {
    name: "Nashmiya Zainab",
    role: "",
    feedback:
      "This AI tool greatly enhance productivity by creating quality content quickly and easily. They are user-friendly, versatile and helping businesses and creators save time and effort.",
    rating: 5,
  },
  {
    name: "ABC",
    role: "Whatsapp/Direct Seller",
    feedback: "Better Features",
    rating: 4,
  },
  {
    name: "Usman Niazi",
    role: "Shopify Seller",
    feedback:
      "Fasdeem AI has transformed the way I work. What used to take hours now takes minutes.",
    rating: 5,
  },
  {
    name: "Syed Muneeb Abbas Zaidi",
    role: "Shopify Seller",
    feedback:
      "This software is a real time-saver. Simple, accurate, and extremely useful for Shopify sellers.",
    rating: 5,
  },
  {
    name: "Touseef Haider",
    role: "Etsy Seller",
    feedback:
      "Fasdeem AI made my work so much easier. I uploaded my Etsy products on it and instantly received all the details I needed. This software saved me valuable time and boosted my productivity. Truly an amazing and user-friendly tool.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });

  // Autoplay
  useEffect(() => {
    if (!instanceRef.current) return;
    let timer: any;
    function autoplay() {
      timer = setInterval(() => {
        instanceRef.current?.next();
      }, 3000); // 3 sec
    }
    autoplay();
    return () => clearInterval(timer);
  }, [instanceRef]);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Early Users Say
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="keen-slider__slide bg-white rounded-2xl shadow-md border p-6 flex flex-col justify-between hover:shadow-lg transition"
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
