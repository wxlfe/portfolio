const CACHE_VERSION = 'v1';
const STATIC_CACHE = `portfolio-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `portfolio-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/projects',
  '/skills',
  '/experience',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/images/wxlfe-gold.svg',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  OFFLINE_URL,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          return offline || new Response('Offline', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
