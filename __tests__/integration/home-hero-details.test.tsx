import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { HomeHeroDetails } from '@/components/home-hero-details';

function mockMatchMedia(matchesDark = false) {
  const implementation = (query: string): MediaQueryList =>
    ({
      matches: query === '(prefers-color-scheme: dark)' ? matchesDark : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }) as unknown as MediaQueryList;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: implementation,
  });
}

describe('HomeHeroDetails', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
    mockMatchMedia(true);

    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: 'https://www.google.com/search?q=portfolio',
    });

    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    });

    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'MacIntel',
    });

    Object.defineProperty(navigator, 'userAgentData', {
      configurable: true,
      value: {
        mobile: false,
        brands: [{ brand: 'Google Chrome' }],
        platform: 'macOS',
      },
    });

    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: {
        effectiveType: '4g',
        saveData: false,
      },
    });

    Object.defineProperty(performance, 'getEntriesByType', {
      configurable: true,
      value: jest.fn(() => [{ duration: 321 }]),
    });

    window.history.pushState({}, '', '/?utm_source=google&utm_location=austin');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders placeholder first, then hydrates with visitor details without shifting line count', async () => {
    const { container } = render(<HomeHeroDetails />);

    expect(container.querySelectorAll('p.hero_line')).toHaveLength(1);

    await act(async () => {
      jest.advanceTimersByTime(1300);
    });

    await waitFor(() => {
      expect(screen.getByText(/You're using a/i)).toBeTruthy();
    });

    expect(screen.getByText(/You're a/i).textContent ?? '').toContain('first-time');
    expect(screen.getByText(/You're a/i).textContent ?? '').toContain('Austin');
    expect(screen.getByText(/You came here from/i).textContent ?? '').toContain('Google');
    expect(screen.getByText(/This page loaded for you in/i).textContent ?? '').toContain('321ms');
  });
});
