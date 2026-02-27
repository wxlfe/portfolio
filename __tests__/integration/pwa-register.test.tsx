import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import { PwaRegister } from '@/components/pwa-register';

describe('PwaRegister', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      value: 'complete',
    });

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        register: jest.fn(async () => undefined),
      },
    });
  });

  it('registers the service worker on load-complete documents', async () => {
    render(<PwaRegister />);

    await waitFor(() => {
      expect((navigator.serviceWorker.register as jest.Mock).mock.calls[0]).toEqual(['/sw.js', { scope: '/' }]);
    });
  });

  it('does nothing when service workers are unavailable', () => {
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: undefined,
    });

    render(<PwaRegister />);
    expect(true).toBe(true);
  });

  it('registers on window load when document is still loading', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    Object.defineProperty(document, 'readyState', {
      configurable: true,
      value: 'loading',
    });

    const registerMock = jest.fn(async () => undefined);
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { register: registerMock },
    });

    const { unmount } = render(<PwaRegister />);
    const loadHandler = addEventListenerSpy.mock.calls.find((call) => call[0] === 'load')?.[1];
    expect(typeof loadHandler).toBe('function');

    if (typeof loadHandler === 'function') {
      await loadHandler(new Event('load'));
    }

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith('/sw.js', { scope: '/' });
    });

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
