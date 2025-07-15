'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase.from('users').select('*');
      console.log('✅ Supabase data:', data);
      if (error) console.error('❌ Supabase error:', error);
    };

    testSupabase();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold"> Welcome to Fasdeem Ai</h1>
    </main>
  );
}
