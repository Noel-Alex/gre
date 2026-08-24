// GRE Atlas service worker: cache-first for the app shell so the site keeps working
// offline / on flaky connections. Remote vocabulary sources are fetched live when
// online and gracefully fall back to the built-in Atlas Core when not.
const CACHE = 'gre-atlas-v3';
const SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      // Never let a partial first install leave a broken SW in control
      .catch(() => {})
  );
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

  // App shell + same-origin assets: network-first with cache fallback.
  // Network-first guarantees users get fresh files after a deploy; the cached
  // copy is only used when the network fails (offline / flaky).
  if (req.mode === 'navigate' || url.origin === location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        // Never cache an error page (e.g. transient 404/5xx during deploys) —
        // that would poison offline access.
        if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() =>
        caches.match(req).then(hit => hit || caches.match('./'))
      )
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
