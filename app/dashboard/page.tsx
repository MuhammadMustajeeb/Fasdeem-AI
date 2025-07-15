"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import UploadForm from "../../components/UploadForm";

export default function Dashboard() {
  
    useEffect(() => {
      console.log('🚀 useEffect is running!');

      const getUser = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          console.log('✅ Logged in user:', session.user);
        } else {
          console.log('❌ No session found');
        }
      };

      getUser();
    }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create a Product</h1>
        <UploadForm />
      </div>
    </main>
  );
}
