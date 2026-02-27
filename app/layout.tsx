import type { Metadata } from 'next';
import Script from 'next/script';
import { SiteHeader } from '@/components/site-header';
import { LifeBackground } from '@/components/life-background';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nate Wolfe',
  description: 'Portfolio',
  icons: {
    icon: '/assets/images/favicon.ico',
  },
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

        <Script
          src="https://cdn.counter.dev/script.js"
          data-id="5be3ecca-bb57-45ad-99ef-25b498308626"
          data-utcoffset="-5"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5FXEL17TZ7"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-5FXEL17TZ7');`}
        </Script>
      </body>
    </html>
  );
}
