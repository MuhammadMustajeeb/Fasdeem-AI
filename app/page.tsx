"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";

// 🌀 Lazy Load Sections with placeholder fallback
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  loading: () => <div className="h-[300px] animate-pulse bg-white/10 rounded-xl" />,
});
const UploadDemo = dynamic(() => import("@/components/UploadDemo"), {
  loading: () => <div className="h-[300px] animate-pulse bg-white/10 rounded-xl" />,
});
const WhyFasdeemWorks = dynamic(() => import("@/components/WhyFasdeemWorks"), {
  loading: () => <div className="h-[300px] animate-pulse bg-white/10 rounded-xl" />,
});
const FeaturesSection = dynamic(() => import("@/components/FeatureSection"), {
  loading: () => <div className="h-[300px] animate-pulse bg-white/10 rounded-xl" />,
});
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <div className="h-[300px] animate-pulse bg-white/10 rounded-xl" />,
});
const ReferralCTA = dynamic(() => import("@/components/ReferralCTA"), {
  loading: () => <div className="h-[300px] animate-pulse bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 rounded-xl" />,
});

export default function Home() {
  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase.from("users").select("*");
      console.log("✅ Supabase data:", data);
      if (error) console.error("❌ Supabase error:", error);
    };
    testSupabase();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* 🌈 Background Blobs */}
      <div className="absolute top-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[160px] -top-32 -left-40 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] bottom-20 right-10 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-40 space-y-36">

        {/* 🔥 Hero Section */}
        <section id="hero" className="scroll-mt-24 animate-fade-in-up">
          <HeroSection />
        </section>

        {/* 📤 Upload Section */}
        <section id="upload" className="scroll-mt-24 animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 hover:scale-[1.01] transition duration-300 ease-in-out">
            <UploadDemo />
          </div>
        </section>

        {/* 🧠 Why Fasdeem Works */}
        <section id="why" className="scroll-mt-24 animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 hover:scale-[1.01] transition duration-300 ease-in-out">
            <WhyFasdeemWorks />
          </div>
        </section>

        {/* ✨ Features */}
        <section id="features" className="scroll-mt-24 animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 hover:scale-[1.01] transition duration-300 ease-in-out">
            <FeaturesSection />
          </div>
        </section>

        {/* 🔄 How It Works */}
        <section id="how" className="scroll-mt-24 animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 hover:scale-[1.01] transition duration-300 ease-in-out">
            <HowItWorks />
          </div>
        </section>

        {/* 💰 Referral CTA */}
        <section id="referral" className="scroll-mt-24 animate-fade-in-up">
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10 hover:scale-[1.01] transition duration-300 ease-in-out">
            <ReferralCTA />
          </div>
        </section>
      </div>
    </main>
  );
}
