'use client';

import { type ReactNode, useEffect, useState } from 'react';

/**
 * Client-derived visitor details shown in the personalized hero copy.
 */
type HeroData = {
  location?: string;
  browser?: string;
  deviceType?: string;
  os?: string;
  prefersDark?: boolean;
  loadMs?: number;
  connectionType?: string;
  source?: string;
  isReturningVisitor?: boolean;
};

/**
 * Normalizes a tokenized string into human-readable title case.
 */
function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Detects browser name and prefixes it with `mobile` when applicable.
 */
function detectBrowser(): string | undefined {
  const ua = navigator.userAgent;
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean; brands?: Array<{ brand: string }> } }).userAgentData;
  const isMobile = uaData?.mobile ?? /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const devicePrefix = isMobile ? 'mobile ' : '';

  const brands = (uaData?.brands ?? []).map((b) => b.brand.toLowerCase());
  const hasBrand = (needle: string) => brands.some((b) => b.includes(needle));

  if (hasBrand('microsoft edge') || /EdgA?|EdgiOS\//.test(ua)) return `${devicePrefix}Edge`;
  if (hasBrand('opera') || /OPR\/|OPiOS\//.test(ua)) return `${devicePrefix}Opera`;
  if (hasBrand('firefox') || /Firefox\/|FxiOS\//.test(ua)) return `${devicePrefix}Firefox`;
  if (hasBrand('samsung internet') || /SamsungBrowser\//.test(ua)) return `${devicePrefix}Samsung Internet`;
  if (hasBrand('chrome') || /Chrome\/|CriOS\//.test(ua)) return `${devicePrefix}Chrome`;
  if (hasBrand('safari') || (/Safari\//.test(ua) && !/Chrome\/|CriOS\/|EdgA?|EdgiOS\/|OPR\/|OPiOS\//.test(ua))) {
    return `${devicePrefix}Safari`;
  }

  return `${devicePrefix}browser`.trim();
}

/**
 * Infers high-level device class from user agent hints.
 */
function detectDeviceType(): string | undefined {
  const ua = navigator.userAgent;
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
  const isMobile = uaData?.mobile ?? /Mobi|iPhone|Android/i.test(ua);
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobi/i.test(ua));

  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
}

/**
 * Detects the visitor operating system from platform and user agent data.
 */
function detectOS(): string | undefined {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const ua = navigator.userAgent;
  const platform = nav.userAgentData?.platform || navigator.platform || '';

  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'Windows';
  if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return 'macOS';
  if (/CrOS/i.test(ua)) return 'ChromeOS';
  if (/Linux/i.test(platform) || /Linux/i.test(ua)) return 'Linux';
  return undefined;
}

/**
 * Resolves visitor source from UTM parameters or document referrer.
 */
function parseSource(utmSource?: string, referrer?: string): string | undefined {
  if (utmSource) {
    return titleCase(utmSource);
  }
  if (!referrer) {
    return undefined;
  }

  const lower = referrer.toLowerCase();
  if (lower.includes('linkedin.')) return 'LinkedIn';
  if (lower.includes('google.')) return 'Google';
  if (lower.includes('twitter.') || lower.includes('x.com')) return 'X';
  if (lower.includes('github.')) return 'GitHub';

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    return host;
  } catch {
    return undefined;
  }
}

/**
 * Reads page navigation timing duration in milliseconds.
 */
function getLoadMs(): number | undefined {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (!nav || !Number.isFinite(nav.duration)) {
    return undefined;
  }
  return Math.round(nav.duration);
}

/**
 * Extracts a readable location hint from the browser timezone identifier.
 */
function detectTimezoneLocation(): string | undefined {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz || !tz.includes('/')) {
      return undefined;
    }
    const maybePlace = tz.split('/').pop();
    if (!maybePlace) {
      return undefined;
    }
    return titleCase(maybePlace);
  } catch {
    return undefined;
  }
}

/**
 * Optionally fetches approximate location information from an IP endpoint.
 */
async function ipLocation(signal: AbortSignal): Promise<string | undefined> {
  try {
    const response = await fetch('https://ipapi.co/json/', { cache: 'no-store', signal });
    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as {
      city?: string;
      region?: string;
      country_name?: string;
    };

    if (data.city && data.region) return `${data.city}, ${data.region}`;
    if (data.city) return data.city;
    if (data.region && data.country_name) return `${data.region}, ${data.country_name}`;
    return data.region || data.country_name;
  } catch {
    return undefined;
  }
}

/**
 * Decides whether a best-effort IP location fetch should run.
 */
function shouldFetchIpLocation(): boolean {
  const navAny = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  if (navAny.connection?.saveData) {
    return false;
  }

  const effectiveType = navAny.connection?.effectiveType;
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return false;
  }

  return true;
}

/**
 * Resolves best-effort visitor location from UTM params, optional IP lookup, then timezone.
 */
async function resolveLocationFromClient(params: URLSearchParams): Promise<string | undefined> {
  const utmLocation =
    params.get('utm_location') ??
    params.get('utm_region') ??
    params.get('utm_state') ??
    params.get('utm_geo') ??
    undefined;
  if (utmLocation) {
    return titleCase(utmLocation);
  }

  if (shouldFetchIpLocation()) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 1800);
    const fromIp = await ipLocation(controller.signal);
    window.clearTimeout(timeoutId);

    if (fromIp) {
      return fromIp;
    }
  }

  return detectTimezoneLocation();
}

/**
 * Schedules low-priority client work during idle time.
 */
function scheduleIdleWork(cb: () => void): () => void {
  let timeoutId = 0;
  let idleId = 0;
  const winWithIdle = window as Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  const run = () => {
    timeoutId = window.setTimeout(cb, 300);
  };

  if (typeof winWithIdle.requestIdleCallback === 'function') {
    idleId = winWithIdle.requestIdleCallback(run, { timeout: 1600 });
    return () => {
      winWithIdle.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
    };
  }

  timeoutId = window.setTimeout(run, 900);
  return () => window.clearTimeout(timeoutId);
}

/**
 * Renders personalized details after first paint to protect LCP/TBT.
 */
export function HomeHeroDetails() {
  const [data, setData] = useState<HeroData>({});

  useEffect(() => {
    let cancelled = false;

    const cleanup = scheduleIdleWork(() => {
      const params = new URLSearchParams(window.location.search);
      const source = parseSource(params.get('utm_source') ?? undefined, document.referrer);
      const visitorStorageKey = 'portfolio-returning-visitor';
      let isReturningVisitor: boolean | undefined;

      try {
        const hasVisited = window.localStorage.getItem(visitorStorageKey);
        isReturningVisitor = !!hasVisited;
        if (!hasVisited) {
          window.localStorage.setItem(visitorStorageKey, '1');
        }
      } catch {
        isReturningVisitor = undefined;
      }

      const navAny = navigator as Navigator & {
        connection?: { effectiveType?: string };
      };

      if (!cancelled) {
        setData({
          browser: detectBrowser(),
          deviceType: detectDeviceType(),
          os: detectOS(),
          prefersDark: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
          loadMs: getLoadMs(),
          connectionType: navAny.connection?.effectiveType?.toUpperCase(),
          source,
          isReturningVisitor,
        });
      }

      void resolveLocationFromClient(params).then((location) => {
        if (!cancelled) {
          setData((prev) => ({ ...prev, location }));
        }
      });
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  const detailLines: Array<{ key: string; content: ReactNode }> = [];

  if (typeof data.isReturningVisitor === 'boolean' || data.location) {
    detailLines.push({
      key: 'visitor-location',
      content: (
        <>
          You&apos;re a{' '}
          {typeof data.isReturningVisitor === 'boolean' ? (
            <span className="user_data">{data.isReturningVisitor ? 'returning' : 'first-time'}</span>
          ) : null}{' '}
          visitor
          {data.location ? (
            <>
              {' '}
              in <span className="user_data">{data.location}</span>
            </>
          ) : null}
          .
        </>
      ),
    });
  }

  const browserDeviceOsLine = (
    <>
      {data.browser && data.deviceType && data.os ? (
        <>
          You&apos;re using a <span className="user_data">{data.browser}</span> browser on a{' '}
          <span className="user_data">{data.deviceType}</span> running <span className="user_data">{data.os}</span>.
        </>
      ) : null}
      {data.browser && data.deviceType && !data.os ? (
        <>
          You&apos;re using a <span className="user_data">{data.browser}</span> browser on a <span className="user_data">{data.deviceType}</span>.
        </>
      ) : null}
      {data.browser && !data.deviceType && data.os ? (
        <>
          You&apos;re using a <span className="user_data">{data.browser}</span> browser running <span className="user_data">{data.os}</span>.
        </>
      ) : null}
      {!data.browser && data.deviceType && data.os ? (
        <>
          You&apos;re using a <span className="user_data">{data.deviceType}</span> running <span className="user_data">{data.os}</span>.
        </>
      ) : null}
      {data.browser && !data.deviceType && !data.os ? (
        <>
          You&apos;re using a <span className="user_data">{data.browser}</span> browser.
        </>
      ) : null}
      {!data.browser && data.deviceType && !data.os ? (
        <>
          You&apos;re using a <span className="user_data">{data.deviceType}</span>.
        </>
      ) : null}
      {!data.browser && !data.deviceType && data.os ? (
        <>
          You&apos;re running <span className="user_data">{data.os}</span>.
        </>
      ) : null}
      {!data.browser && !data.deviceType && !data.os ? '\u00a0' : null}
    </>
  );

  detailLines.push({
    key: 'browser-device-os',
    content: browserDeviceOsLine,
  });

  if (typeof data.prefersDark === 'boolean') {
    detailLines.push({
      key: 'prefers-mode',
      content: (
        <>
          You prefer <span className="user_data">{data.prefersDark ? 'dark' : 'light'}</span> mode.
        </>
      ),
    });
  }

  if (data.loadMs) {
    detailLines.push({
      key: 'load-time',
      content: (
        <>
          This page loaded for you in <span className="user_data">{data.loadMs}ms</span>
          {data.connectionType ? (
            <>
              {' '}
              over a <span className="user_data">{data.connectionType}</span> connection.
            </>
          ) : (
            '.'
          )}
        </>
      ),
    });
  }

  if (data.source) {
    detailLines.push({
      key: 'source',
      content: (
        <>
          You came here from <span className="user_data">{data.source}</span>.
        </>
      ),
    });
  }

  return (
    <>
      {detailLines.map((line) => (
        <p key={line.key} className="hero_line">
          {line.content}
        </p>
      ))}
    </>
  );
}
