/* Service worker — cho phép dùng offline sau lần mở đầu tiên.
   Đổi CACHE khi sửa nội dung để buộc tải bản mới. */
const CACHE = 'gentsuki-v6';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/app.js',
  './data/signs.js',
  './data/questions.js',
  './data/q2.js',
  './data/q3.js',
  './data/q4.js',
  './data/q5.js',
  './data/vocab.js',
  './data/vocab2.js',
  './data/traps.js',
  './data/author.js',
  './data/quotes.js',
  './assets/avatar.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') { return; }

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) { return hit; }
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
