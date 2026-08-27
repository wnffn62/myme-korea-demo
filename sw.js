const CACHE = 'myme-korea-v13';
const ASSETS = ['./index.html', './styles.css?v=13', './app.js?v=13', './manifest.webmanifest', './customer_qr.png'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => event.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
    .then(()=>self.clients.claim())
));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const fallback = event.request.mode === 'navigate' ? './index.html' : event.request;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      })
      .catch(()=>caches.match(fallback))
  );
});
