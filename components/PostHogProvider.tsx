// components/PostHogProvider.tsx
'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function PostHogProvider() {
  useEffect(() => {
    console.log("📦 Initializing PostHog...");
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
      api_host: 'https://app.posthog.com',
    });

    posthog.capture('pageview');
  }, []);

  return null;
}
