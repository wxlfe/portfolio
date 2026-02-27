'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker so the site is installable and can work offline.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      } catch {
        // Swallow registration failures to avoid affecting app runtime.
      }
    };

    if (document.readyState === 'complete') {
      void register();
      return;
    }

    window.addEventListener('load', register, { once: true });
    return () => {
      window.removeEventListener('load', register);
    };
  }, []);

  return null;
}
