"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";

// 🌀 Lazy Load Sections
const HeroSection = dynamic(() => import("@/components/HeroSection"), { loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" /> });
const UploadDemo = dynamic(() => import("@/components/UploadDemo"), { loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" /> });
const WhyFasdeemWorks = dynamic(() => import("@/components/WhyFasdeemWorks"), { loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" /> });
const FeaturesSection = dynamic(() => import("@/components/FeatureSection"), { loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" /> });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { loading: () => <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" /> });
const ReferralCTA = dynamic(() => import("@/components/ReferralCTA"), { loading: () => <div className="h-[300px] animate-pulse bg-gray-200 rounded-xl" /> });

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
    <main className="relative min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-28 space-y-28">
        
        {/* 🔥 Hero Section */}
        <section id="hero" className="relative text-center animate-fade-in-up">
          <HeroSection />
          <div className="mt-4 flex justify-center gap-3">
            <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm border border-purple-200">
              🎁 Free for First 100 Users
            </span>
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm border border-green-200">
              🛡 7-Day Launch Guarantee
            </span>
          </div>
        </section>

        {/* Sections with Light UI */}
        {[
          { id: "upload", Component: UploadDemo },
          { id: "why", Component: WhyFasdeemWorks },
          { id: "features", Component: FeaturesSection },
          { id: "how", Component: HowItWorks },
        ].map(({ id, Component }) => (
          <section key={id} id={id} className="scroll-mt-24 animate-fade-in-up">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-12 hover:shadow-lg transition">
              <Component />
            </div>
          </section>
        ))}

        {/* 💰 Referral CTA */}
        <section id="referral" className="scroll-mt-24 animate-fade-in-up">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white p-8 md:p-12 shadow-md hover:scale-[1.01] transition">
            <ReferralCTA />
          </div>
        </section>
      </div>
    </main>
  );
}
