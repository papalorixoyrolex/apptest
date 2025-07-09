const CACHE_NAME = 'emotions-store-v1.4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/serviceWorker.js',
  '/header_styles.css',
  '/favicon.png',
  '/habits.html',
  '/history.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(ASSETS_TO_CACHE.map(url =>
        fetch(url, { cache: 'reload' })
          .then(response => {
            if (!response.ok) throw new Error(`Не вдалося завантажити ${url}`);
            return cache.put(url, response);
          })
      ))
    )
  );
  self.skipWaiting();
});


self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
      .catch(() => new Response('', { status: 200, statusText: 'Offline fallback' }))
  );
});
