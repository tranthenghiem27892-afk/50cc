/* Service worker — cho phép dùng offline sau lần mở đầu tiên.
   Đổi CACHE khi sửa nội dung để buộc tải bản mới. */
const VERSION = '75';
const CACHE = 'gentsuki-v' + VERSION;

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/fonts.css',
  './fonts/be-vietnam-400-latin.woff2',
  './fonts/be-vietnam-400-vietnamese.woff2',
  './fonts/be-vietnam-500-latin.woff2',
  './fonts/be-vietnam-500-vietnamese.woff2',
  './fonts/be-vietnam-600-latin.woff2',
  './fonts/be-vietnam-600-vietnamese.woff2',
  './fonts/be-vietnam-700-latin.woff2',
  './fonts/be-vietnam-700-vietnamese.woff2',
  './css/style.css',
  './js/app.js',
  './data/signs.js',
  './data/questions.js',
  './data/q2.js',
  './data/q3.js',
  './data/q4.js',
  './data/q5.js',
  './data/q7.js',
  './data/q8.js',
  './data/q9.js',
  './data/q10.js',
  './data/q11.js',
  './data/q12.js',
  './data/grammar.js',
  './data/situations.js',
  './data/gear.js',
  './data/models.js',
  './data/illustrations.js',
  './data/vocab.js',
  './data/vocab2.js',
  './data/vocab3.js',
  './data/vocab4.js',
  './data/vocab5.js',
  './data/hanviet.js',
  './data/vi.js',
  './data/vi2.js',
  './data/vi3.js',
  './data/vi6.js',
  './data/vi5.js',
  './data/vi4.js',
  './data/traps.js',
  './data/author.js',
  './data/quotes.js',
  './assets/avatar.jpg',
  './assets/qr.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

/* JS/CSS được cache kèm ?v= đúng như index.html gọi,
   nhờ vậy bản mới không bị bản cũ trong cache "che" mất */
const CACHED_URLS = ASSETS.map((u) => (/\.(js|css)$/.test(u) ? u + '?v=' + VERSION : u));

self.addEventListener('install', (e) => {
  /* Thêm từng file một: một file lỗi 404 không làm hỏng cả bản cập nhật */
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(CACHED_URLS.map((u) => c.add(u).catch(() => null))))
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

  /* Trang HTML: ưu tiên mạng → luôn nhận bản mới khi có mạng, offline thì lấy cache */
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      /* bỏ qua cả cache HTTP của CDN (GitHub Pages giữ HTML 10 phút) */
      fetch(req, { cache: 'no-store' })
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  /* Tài nguyên tĩnh: cache-first cho nhanh, tự cập nhật khi SW đổi phiên bản */
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
