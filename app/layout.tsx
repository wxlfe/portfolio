import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SiteHeader } from '@/components/site-header';
import { LifeBackground } from '@/components/life-background';
import { PwaRegister } from '@/components/pwa-register';
import './globals.css';

/**
 * Global metadata used across all routes.
 */
export const metadata: Metadata = {
  title: 'Nate Wolfe',
  description: 'Portfolio',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/assets/images/favicon.ico',
    apple: '/assets/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nate Wolfe',
  },
};

/**
 * Global viewport configuration for theme color.
 */
export const viewport: Viewport = {
  themeColor: '#d1ad54',
};

/**
 * Shared Next.js root layout with global navigation, background, and analytics scripts.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site_background">
          <LifeBackground />
        </div>
        <div className="app_shell">
          <SiteHeader />
          <main>{children}</main>
        </div>

        <PwaRegister />

        <Script
          src="https://cdn.counter.dev/script.js"
          data-id="5be3ecca-bb57-45ad-99ef-25b498308626"
          data-utcoffset="-5"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5FXEL17TZ7"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-5FXEL17TZ7');`}
        </Script>
      </body>
    </html>
  );
}
