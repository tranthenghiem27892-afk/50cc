/* Service worker — cho phép dùng offline sau lần mở đầu tiên.
   Đổi CACHE khi sửa nội dung để buộc tải bản mới. */
const VERSION = '192';
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
  './data/penalties.js',
  './data/emergency.js',
  './data/changelog.js',
  './data/changelog_i18n.js',
  './data/changelog_i18n_extra.js',
  './data/faq.js',
  './data/law_faq.js',
  './data/faq_alias.js',
  './data/trouble_faq.js',
  './data/care_faq.js',
  './data/care_alias.js',
  './data/i18n.js',
  './data/qtext_i18n_1.js',
  './data/qtext_i18n_2.js',
  './data/qtext_i18n_3.js',
  './data/qtext_i18n_4.js',
  './data/qtext_i18n_5.js',
  './data/qtext_i18n_6.js',
  './data/grammar_i18n.js',
  './data/exp_i18n_1.js',
  './data/exp_i18n_2.js',
  './data/exp_i18n_3.js',
  './data/exp_i18n_4.js',
  './data/exp_i18n_5.js',
  './data/exp_i18n_6.js',
  './data/exp_i18n_7.js',
  './data/exp_i18n_8.js',
  './data/exp_i18n_9.js',
  './data/law_i18n.js',
  './data/ill_exp_i18n.js',
  './data/trap_i18n_1.js',
  './data/trap_i18n_3.js',
  './data/trap_i18n_4.js',
  './data/trap_i18n_2.js',
  './data/vocab_i18n_1.js',
  './data/vocab_i18n_2.js',
  './data/vocab_i18n_3.js',
  './data/vocab_i18n_4.js',
  './data/quote_i18n_1.js',
  './data/quote_i18n_2.js',
  './data/catalog_i18n.js',
  './data/sos_i18n.js',
  './data/info_i18n.js',
  './data/models.js',
  './data/illustrations.js',
  './data/ill-art.js',
  './data/vocab.js',
  './data/vocab2.js',
  './data/vocab3.js',
  './data/vocab4.js',
  './data/vocab5.js',
  './data/vocab6.js',
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
