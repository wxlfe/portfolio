'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

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

type HomeHeroProps = {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
};

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function detectBrowser(): string | undefined {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const ua = navigator.userAgent;
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean; brands?: Array<{ brand: string }> } })
    .userAgentData;
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

function detectDeviceType(): string | undefined {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const ua = navigator.userAgent;
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
  const isMobile = uaData?.mobile ?? /Mobi|iPhone|Android/i.test(ua);
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobi/i.test(ua));

  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
}

function detectOS(): string | undefined {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

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

function getLoadMs(): number | undefined {
  if (typeof performance === 'undefined') {
    return undefined;
  }

  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (!nav || !Number.isFinite(nav.duration)) {
    return undefined;
  }
  return Math.round(nav.duration);
}

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

async function ipLocation(): Promise<string | undefined> {
  try {
    const response = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
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

  const fromIp = await ipLocation();
  if (fromIp) {
    return fromIp;
  }

  return detectTimezoneLocation();
}

export function HomeHero({ imageUrl, title, subtitle }: HomeHeroProps) {
  const [data, setData] = useState<HeroData>({});
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams(window.location.search);
    const source = parseSource(params.get('utm_source') ?? undefined, document.referrer);
    const visitorStorageKey = 'portfolio-returning-visitor';
    let isReturningVisitor: boolean | undefined = undefined;

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

    const setStaticData = () => {
      if (cancelled) return;
      setData((prev) => ({
        ...prev,
        browser: detectBrowser(),
        deviceType: detectDeviceType(),
        os: detectOS(),
        prefersDark: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
        loadMs: getLoadMs(),
        connectionType: navAny.connection?.effectiveType?.toUpperCase(),
        source,
        isReturningVisitor,
      }));
    };

    const setLocationData = async () => {
      const location = await resolveLocationFromClient(params);
      if (cancelled) return;
      setData((prev) => ({
        ...prev,
        location,
      }));
    };

    setStaticData();
    void setLocationData();

    return () => {
      cancelled = true;
    };
  }, []);

  const reduced = !!prefersReducedMotion;
  const sectionStep = reduced ? 0 : 0.6;
  const detailStartDelay = reduced ? 0 : 2 * sectionStep + 0.25;
  const detailStagger = reduced ? 0 : 0.2;
  const detailDuration = reduced ? 0 : 0.4;
  const detailLineTransition = (index: number) =>
    reduced
      ? { duration: 0 }
      : { duration: detailDuration, ease: 'easeOut' as const, delay: detailStartDelay + index * detailStagger };
  const sectionTransition = (order: number) =>
    reduced
      ? { duration: 0 }
      : { duration: 0.48, ease: 'easeOut' as const, delay: order * sectionStep };
  const finalSectionTransition = (detailCount: number) => {
    if (reduced) {
      return { duration: 0 };
    }

    const lastDetailIndex = Math.max(detailCount - 1, 0);
    const lastDetailEnterTime = detailStartDelay + lastDetailIndex * detailStagger + detailDuration;
    return { duration: 0.48, ease: 'easeOut' as const, delay: lastDetailEnterTime + 0.55 };
  };
  const niceToMeetYouTransition = (detailCount: number) => {
    if (reduced) {
      return { duration: 0 };
    }
    const base = finalSectionTransition(detailCount);
    return { ...base, delay: (base.delay as number) + 0.55 };
  };
  const underlineTransition = (order: number) =>
    reduced
      ? { duration: 0 }
      : { duration: 0.7, ease: 'easeOut' as const, delay: order * sectionStep + 0.12 };
  const itemInitial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, filter: 'blur(4px)' };
  const itemAnimate = { opacity: 1, y: 0, filter: 'blur(0px)' };
  const itemExit = prefersReducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -8, filter: 'blur(2px)' };
  const itemTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' as const };

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

  if (data.browser || data.deviceType || data.os) {
    detailLines.push({
      key: 'browser-device-os',
      content: (
        <>
          {data.browser && data.deviceType && data.os ? (
            <>
              You&apos;re using a <span className="user_data">{data.browser}</span> browser on a{' '}
              <span className="user_data">{data.deviceType}</span> running <span className="user_data">{data.os}</span>.
            </>
          ) : null}
          {data.browser && data.deviceType && !data.os ? (
            <>
              You&apos;re using a <span className="user_data">{data.browser}</span> browser on a{' '}
              <span className="user_data">{data.deviceType}</span>.
            </>
          ) : null}
          {data.browser && !data.deviceType && data.os ? (
            <>
              You&apos;re using a <span className="user_data">{data.browser}</span> browser running{' '}
              <span className="user_data">{data.os}</span>.
            </>
          ) : null}
          {!data.browser && data.deviceType && data.os ? (
            <>
              You&apos;re using a <span className="user_data">{data.deviceType}</span> running{' '}
              <span className="user_data">{data.os}</span>.
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
        </>
      ),
    });
  }

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
    <motion.section
      className="hero_panel"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div className="hero_copy">
        <motion.div className="hero_section hero_section_intro" initial={itemInitial} animate={itemAnimate} transition={sectionTransition(0)}>
          {imageUrl ? (
            <motion.div
              className="hero_image_wrap"
              initial={itemInitial}
              animate={itemAnimate}
              transition={itemTransition}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            >
              <motion.img
                className="hero_image"
                src={imageUrl}
                alt="Nate profile"
                initial={prefersReducedMotion ? undefined : { scale: 0.96, rotate: -1 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' }}
              />
              <motion.div
                className="hero_image_glow"
                aria-hidden="true"
                initial={prefersReducedMotion ? undefined : { opacity: 0.45, scale: 0.96 }}
                animate={prefersReducedMotion ? undefined : { opacity: 0.85, scale: 1.04 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                }
              />
            </motion.div>
          ) : null}
          <div className="hero_intro_text">
            <motion.p className="hero_lead hero_line" initial={itemInitial} animate={itemAnimate} transition={sectionTransition(0)}>
              <span className="hero_lead_primary">{title}</span>
              <span className="hero_lead_secondary">{subtitle}</span>
            </motion.p>
            <motion.div
              className="hero_contact_links"
              initial={itemInitial}
              animate={itemAnimate}
              transition={sectionTransition(0)}
            >
              <a className="hero_contact_link" href="https://linkedin.com/in/wxlfe" target="_blank" rel="noreferrer" aria-label="Nate on LinkedIn">
                <Linkedin />
              </a>
              <a className="hero_contact_link" href="https://github.com/wxlfe" target="_blank" rel="noreferrer" aria-label="Nate on GitHub">
                <Github />
              </a>
              <a className="hero_contact_link" href="mailto:nate@wxlfe.dev" aria-label="Email Nate">
                <Mail />
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="hero_section hero_section_pivot" initial={itemInitial} animate={itemAnimate} transition={sectionTransition(1)}>
          <motion.p className="hero_pivot" initial={itemInitial} animate={itemAnimate} transition={sectionTransition(1)}>
            <span className="hero_pivot_text">But enough about me.</span>
            <motion.span
              className="hero_pivot_underline"
              aria-hidden="true"
              initial={reduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={underlineTransition(1)}
            />
          </motion.p>
        </motion.div>

        <motion.div className="hero_section hero_section_details" initial={itemInitial} animate={itemAnimate} transition={sectionTransition(2)}>
          <AnimatePresence mode="popLayout">
            {detailLines.map((line, index) => (
              <motion.p
                key={line.key}
                className="hero_line"
                initial={itemInitial}
                animate={itemAnimate}
                exit={itemExit}
                transition={detailLineTransition(index)}
              >
                {line.content}
              </motion.p>
            ))}
          </AnimatePresence>

        </motion.div>

        <motion.div
          className="hero_section hero_section_outro"
          initial={itemInitial}
          animate={itemAnimate}
          transition={finalSectionTransition(detailLines.length)}
        >
          <motion.p
            className="hero_close hero_outro"
            initial={itemInitial}
            animate={itemAnimate}
            transition={niceToMeetYouTransition(detailLines.length)}
          >
            <span className="hero_outro_text">Nice to meet you.</span>
            <motion.span
              className="hero_outro_underline"
              aria-hidden="true"
              initial={reduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.7, ease: 'easeOut', delay: (niceToMeetYouTransition(detailLines.length).delay as number) + 0.12 }
              }
            />
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
