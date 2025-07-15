'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error('❌ Error completing sign in:', error.message);
      } else {
        console.log('✅ Session from URL:', data.session);
      }

      // redirect to dashboard or home
      router.push('/dashboard');
    };

    handleAuthRedirect();
  }, []);

  return <p className="p-6">🔄 Completing sign in...</p>;
}
