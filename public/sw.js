const CACHE_NAME = 'guanjian-app-v2';

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

const STATIC_SHELL = [
  scopedUrl('./manifest.json'),
  scopedUrl('./icon-192.png'),
  scopedUrl('./icon-512.png'),
  scopedUrl('./apple-touch-icon.png'),
];

async function cacheApplication() {
  const cache = await caches.open(CACHE_NAME);
  const shellUrl = scopedUrl('./');
  const shellResponse = await fetch(shellUrl, { cache: 'reload' });

  if (!shellResponse.ok) throw new Error('app-shell-unavailable');

  await cache.put(shellUrl, shellResponse.clone());
  const html = await shellResponse.text();
  const bundledAssets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)]
    .map((match) => new URL(match[1], shellUrl).toString())
    .filter((url) => new URL(url).origin === self.location.origin);

  await cache.addAll([...STATIC_SHELL, ...bundledAssets]);
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheApplication());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.includes('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(scopedUrl('./'), copy));
          }
          return response;
        })
        .catch(() => caches.match(scopedUrl('./'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    })),
  );
});
