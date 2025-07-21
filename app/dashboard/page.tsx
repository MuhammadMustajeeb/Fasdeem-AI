"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import UploadForm from "../../components/UploadForm";
import DashboardCards from "@/components/DashboardCards";

export default function Dashboard() {
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        console.log("✅ Logged in user:", session.user);
      } else {
        console.log("❌ No session found");
      }
    };

    getUser();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-16">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-24">
        {/* 🚀 Hero Section */}
        <section className="relative text-center space-y-6">
          {/* 🔮 Gradient Glow Behind Title */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-[280px] h-[160px] sm:w-[400px] sm:h-[200px] bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-300 blur-3xl opacity-20 animate-pulse rounded-full -z-10" />

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            ✨ Fasdeem AI Dashboard
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Seamlessly create high-converting product content using AI. Just
            upload, customize, and export.
          </p>
        </section>

        {/* 🔄 3-Step Flow Indicator */}
        <section className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
          {["Upload Product", "Customize Output", "Generate & Export"].map(
            (step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white font-bold text-lg border-4 border-white shadow-xl">
                  {index + 1}
                </div>
                <span className="mt-2 font-medium text-sm sm:text-base text-center">
                  {step}
                </span>
              </div>
            )
          )}
        </section>

        {/* 📂 Upload Form Section */}
        <section className="relative bg-[#1f1b2e] rounded-3xl p-6 sm:p-10 shadow-[0_10px_60px_rgba(255,255,255,0.05)] border border-white/10 overflow-hidden group transition-all duration-500">
          {/* 🔮 Soft Gradient Glow */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-400 opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition duration-700"></div>

          {/* 💠 Frosted Inner Border Glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-10"></div>

          <div className="relative z-20 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white/90">
              📤 Upload Product
            </h2>

            <UploadForm />
          </div>
        </section>

        {/* 📦 Dashboard Output Cards */}
        {/* <section className="bg-white/5 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/10">
          <DashboardCards />
        </section> */}
      </div>
    </main>
  );
}
