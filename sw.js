/* Service Worker - Semáforo AVISO (C-TPAT) */
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `semaforo-ctpat-v2-${CACHE_VERSION}`;

const ASSETS = [
  './', './index.html', './styles.css', './script.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  './assets/logo-left.png', './assets/logo-right.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const network = await fetch(request);
      const url = new URL(request.url);
      const isSameOrigin = self.location.origin === url.origin;
      if (isSameOrigin && (/\.(css|js|html|png|json)$/).test(url.pathname)) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, network.clone());
      }
      return network;
    } catch (err) {
      const isDocument = request.destination === 'document' || request.headers.get('accept')?.includes('text/html');
      if (isDocument) {
        return new Response(`<!doctype html><html lang=\"es\"><head><meta charset=\"utf-8\"><title>Offline</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" /><style>body{font-family:system-ui;background:#101322;color:#e6e6e6;padding:24px} .badge{display:inline-block;padding:8px 12px;border-radius:999px;background:#422a2a;color:#ffbdbd;border:1px solid #5e3b3b}</style></head><body><h1>Sin conexión</h1><p>Estás offline. El contenido básico fue cacheado y seguirá funcionando.</p><span class=\"badge\">Offline</span></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 200 });
      }
      return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
    }
  })());
});
