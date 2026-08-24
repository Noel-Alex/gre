// GRE Atlas service worker: cache-first for the app shell so the site keeps working
// offline / on flaky connections. Remote vocabulary sources are fetched live when
// online and gracefully fall back to the built-in Atlas Core when not.
const CACHE = 'gre-atlas-v1';
const SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App shell + navigations: cache-first, refresh in background (stale-while-revalidate)
  if (req.mode === 'navigate' || url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(hit => {
        const fresh = fetch(req).then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        }).catch(() => hit);
        return hit || fresh;
      })
    );
    return;
  }

  // Cross-origin (fonts, vocab CSVs, dictionary JSON): network-first with cache fallback
  e.respondWith(
    fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        caches.open(CACHE).then(c => c.put(req, res.clone()));
      }
      return res;
    }).catch(() => caches.match(req))
  );
});
