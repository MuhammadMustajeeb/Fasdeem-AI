"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

import HeroSection from "@/components/HeroSection";
import WhyFasdeemWorks from "@/components/WhyFasdeemWorks";
import FeaturesSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
import UploadDemo from "@/components/UploadDemo";
import ReferralCTA from "@/components/ReferralCTA";

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
      {/* ✅ Blurred Colorful Blobs */}
      <div className="absolute top-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[120px] -top-20 -left-40"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] bottom-0 right-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-40 space-y-36">

        {/* 🔥 Hero */}
        <section id="hero" className="scroll-mt-20">
          <HeroSection />
        </section>

        {/* 📂 Upload Demo */}
        <section id="upload" className="scroll-mt-20">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-6 md:p-10">
            <UploadDemo />
          </div>
        </section>

        {/* 🧠 Why Fasdeem Works */}
        <section id="why" className="scroll-mt-20">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-6 md:p-10">
            <WhyFasdeemWorks />
          </div>
        </section>

        {/* ✨ Features */}
        <section id="features" className="scroll-mt-20">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-6 md:p-10">
            <FeaturesSection />
          </div>
        </section>

        {/* 🔄 How It Works */}
        <section id="how" className="scroll-mt-20">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-6 md:p-10">
            <HowItWorks />
          </div>
        </section>

        {/* 💰 Referral */}
        <section id="referral" className="scroll-mt-20">
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 border border-white/10 rounded-3xl shadow-xl p-6 md:p-10">
            <ReferralCTA />
          </div>
        </section>
      </div>


    </main>
  );
}
