/* ============================================================
   原付免許 50cc — app logic (vanilla JS, chạy trực tiếp file://)
   ============================================================ */
(function () {
  'use strict';

  var Q = window.QUESTIONS || [];
  var CATS = window.CATEGORIES || [];
  var SIGNS = window.SIGNS || {};
  var STORE = 'gentsuki.v2';
  var STORE_OLD = ['gentsuki.v1'];
  var EXAM_TIME = 30 * 60 * 1000;
  var EXAM_TEXT = 46;
  var EXAM_ILL = 2;
  var PASS = 45;
  var APP_VER = '192';

  var qById = {};
  Q.forEach(function (q) { qById[q.id] = q; });
  /* bẫy ngôn ngữ: không nằm trong Q nên không lẫn vào đề thi thử */
  var GQ = window.GRAMMAR || [];
  GQ.forEach(function (q) { q.cat = 'gram'; qById[q.id] = q; });
  var byPat = {};
  GQ.forEach(function (q) { (byPat[q.pat] || (byPat[q.pat] = [])).push(q); });
  var PATS = Object.keys(byPat);

  var MODELS = window.MODELS || [];
  var EMERGENCY = window.EMERGENCY || [];
  var CHANGELOG = window.CHANGELOG || [];
  var EMERGENCY_TIPS = window.EMERGENCY_TIPS || [];
  var PENALTIES = window.PENALTIES || [];
  var PENALTIES_HEAVY = window.PENALTIES_HEAVY || [];
  var PENALTY_NOTES = window.PENALTY_NOTES || [];
  var GEAR = window.GEAR || [];
  var GEAR_AVOID = window.GEAR_AVOID || [];
  var SITS = window.SITUATIONS || [];
  var COMPARE = window.COMPARE || [];
  var CHECKLIST = [
    'Đủ 16 tuổi',
    'Đã đăng ký 原付講習 ở trường dạy lái',
    'Có 住民票 bản có 本籍 (xin ở 市役所)',
    'Có 在留カード còn hạn',
    'Ảnh 3×2,4cm (2 tấm)',
    'Tiền mặt ~1.600 yên thi + ~2.350 yên cấp bằng',
    'Đã luyện đủ kho câu và thi thử đạt ≥ 45 điểm',
    'Biết đường và giờ mở cửa của 免許センター',
    'Sau khi có bằng: mua 自賠責 bảo hiểm bắt buộc',
    'Đăng ký biển số 原付 ở 市役所',
    'Có mũ bảo hiểm đạt chuẩn, vừa đầu',
    'Đã nắm 30km/h và 二段階右折'
  ];

  var ILLS = window.ILLUSTRATIONS || [];
  var illById = {};
  ILLS.forEach(function (x) { illById[x.id] = x; });
  var catById = {};
  CATS.forEach(function (c) { catById[c.id] = c; });
  catById['gram'] = { id: 'gram', vi: T('nav.gram'), ja: '表現', icon: '🔤' };
  var byCat = {};
  CATS.forEach(function (c) { byCat[c.id] = []; });
  Q.forEach(function (q) { (byCat[q.cat] || (byCat[q.cat] = [])).push(q); });

  /* gắn giải thích cho đáp án còn lại */
  var TRAPS = window.TRAPS || {};
  Q.forEach(function (q) { if (!q.trap) { q.trap = TRAPS[q.id] || ''; } });

  /* từ vựng: bọc các thuật ngữ bằng nút bấm được */
  var VOCAB = window.VOCAB || {};
  var VI = window.VI || {};
  var VI_MANUAL = {};
  (window.VI_MANUAL || []).forEach(function (k) { VI_MANUAL[k] = 1; });
  var VOCAB_ALIAS = {};
  Object.keys(VOCAB).forEach(function (k) {
    var v = VOCAB[k];
    if (v && v.f) { v.f.forEach(function (f) { VOCAB_ALIAS[f] = k; }); }
  });

  var VOCAB_RE = null;
  (function () {
    var seen = {}, terms = [];
    Object.keys(VOCAB).concat(Object.keys(VOCAB_ALIAS)).forEach(function (t) {
      if (!seen[t]) { seen[t] = 1; terms.push(t); }
    });
    if (!terms.length) { return; }
    terms.sort(function (a, b) { return b.length - a.length; });
    var alt = terms.map(function (t) {
      return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|');
    VOCAB_RE = new RegExp(alt, 'g');
  })();

  function mark(html) {
    if (!VOCAB_RE) { return html; }
    return html.replace(VOCAB_RE, function (m) {
      var key = VOCAB_ALIAS[m] || m;
      var v = VOCAB[key];
      var inner = (v && v.r) ? '<ruby>' + m + '<rt>' + v.r + '</rt></ruby>' : m;
      return '<button type="button" class="w" data-w="' + m + '">' + inner + '</button>';
    });
  }

  /* đọc tiếng Nhật bằng giọng có sẵn của máy */
  /* ---------------- cài app lên màn hình chính ---------------- */
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var b = document.getElementById('installBtn');
    if (b) { b.style.display = ''; }
  });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    var b = document.getElementById('installBtn');
    if (b) { b.style.display = 'none'; }
    toast('Đã cài app lên màn hình chính.');
  });

  function isStandalone() {
    try {
      return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
    } catch (e) { return false; }
  }

  function updateInstallBtn() {
    var b = document.getElementById('installBtn');
    if (!b) { return; }
    var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
    b.style.display = (!isStandalone() && (deferredPrompt || ios)) ? '' : 'none';
  }

  function openInstallGuide() {
    var body = document.getElementById('sheetBody');
    if (!body) { return; }
    var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
    body.innerHTML =
      '<div class="w-term">Cài app lên điện thoại</div>' +
      (ios
        ? '<p class="w-mean">Trên iPhone, chỉ Safari mới cài được:</p>' +
          '<ol class="w-steps">' +
            '<li>Mở trang này bằng <b>Safari</b> (không dùng Chrome, Zalo hay Facebook)</li>' +
            '<li>Bấm nút <b>Chia sẻ</b> ở thanh dưới (hình vuông có mũi tên)</li>' +
            '<li>Chọn <b>Thêm vào Màn hình chính</b> → <b>Thêm</b></li>' +
          '</ol>'
        : '<p class="w-mean">Trên Android (Chrome):</p>' +
          '<ol class="w-steps">' +
            '<li>Mở trang này bằng <b>Chrome</b></li>' +
            '<li>Bấm nút <b>⋮</b> ở góc phải</li>' +
            '<li>Chọn <b>Cài đặt ứng dụng</b> hoặc <b>Thêm vào màn hình chính</b></li>' +
          '</ol>') +
      '<p class="w-note">Nếu đang mở trong Zalo/Facebook, hãy bấm “Mở bằng trình duyệt” trước — các app đó chặn cài đặt.</p>' +
      '<button class="btn btn-ghost sheet-close" data-act="close-sheet">' + T('word.close') + '</button>';
    document.getElementById('sheet').classList.add('open');
    document.getElementById('sheetBack').classList.add('open');
  }

  function speak(text) {
    if (!text) { return; }
    if (!('speechSynthesis' in window)) { toast('Máy này không hỗ trợ đọc tiếng Nhật.'); return; }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.95;
    var vs = window.speechSynthesis.getVoices() || [];
    for (var i = 0; i < vs.length; i++) {
      if (/^ja/i.test(vs[i].lang)) { u.voice = vs[i]; break; }
    }
    window.speechSynthesis.speak(u);
  }

  function furiOn() { return document.documentElement.classList.contains('furi'); }

  function toggleFuri() {
    var on = document.documentElement.classList.toggle('furi');
    try { localStorage.setItem('gentsuki.furi', on ? '1' : '0'); } catch (e) { }
    var btn = document.querySelector('[data-act="furi"]');
    if (btn) { btn.classList.toggle('on', on); }
  }

  function openWord(term) {
    var key = VOCAB_ALIAS[term] || term;
    var v = VOCAB[key];
    if (!v) { return; }
    var body = document.getElementById('sheetBody');
    if (!body) { return; }
    body.innerHTML =
      '<div class="w-term">' + esc(key) +
        (hanViet(key) ? '<span class="w-hv">' + esc(hanViet(key)) + '</span>' : '') + '</div>' +
      '<div class="w-read">' + esc(v.r) + '</div>' +
      (term !== key ? '<div class="w-form">' + T('word.form') + esc(term) + '</div>' : '') +
      '<p class="w-mean">' + esc(vMean(key, v)) + '</p>' +
      (v.n ? '<p class="w-note">' + esc(v.n) + '</p>' : '') +
      '<button class="btn btn-ghost sheet-close" data-act="close-sheet">Đóng</button>';
    document.getElementById('sheet').classList.add('open');
    document.getElementById('sheetBack').classList.add('open');
  }

  function closeSheet() {
    var s = document.getElementById('sheet');
    var b = document.getElementById('sheetBack');
    if (s) { s.classList.remove('open'); }
    if (b) { b.classList.remove('open'); }
  }

  var db = loadDB();
  var screen = 'home';
  var S = null;
  var timerId = null;
  var toastTimer = null;

  /* ---------------- storage ---------------- */
  function loadDB() {
    /* dọn dữ liệu làm bài của phiên bản cũ — đưa app về trạng thái ban đầu */
    try { STORE_OLD.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) { }
    var d = {};
    try { d = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { d = {}; }
    d.answers = d.answers || {};
    d.wrong = Array.isArray(d.wrong) ? d.wrong : [];
    d.exams = Array.isArray(d.exams) ? d.exams : [];
    d.checklist = d.checklist || {};
    d.cards = d.cards || {};
    d.streak = d.streak || { last: '', n: 0 };
    return d;
  }
  function saveDB() {
    try { localStorage.setItem(STORE, JSON.stringify(db)); } catch (e) { /* private mode */ }
  }

  /* ---------------- helpers ---------------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function overall() {
    var n = 0, ok = 0;
    Object.keys(db.answers).forEach(function (id) {
      n += db.answers[id].n; ok += db.answers[id].ok;
    });
    return { n: n, ok: ok, rate: n ? Math.round(ok / n * 100) : 0, studied: Object.keys(db.answers).length };
  }
  function catStat(catId) {
    var n = 0, ok = 0;
    (byCat[catId] || []).forEach(function (q) {
      var a = db.answers[q.id];
      if (a) { n += a.n; ok += a.ok; }
    });
    return { n: n, ok: ok, rate: n ? Math.round(ok / n * 100) : 0 };
  }
  function isoDay(offset) {
    var d = new Date(Date.now() - (offset || 0) * 86400000);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function touchStreak() {
    var today = isoDay(0);
    var s = db.streak || { last: '', n: 0 };
    if (s.last === today) { return; }
    s.n = (s.last === isoDay(1)) ? (s.n + 1) : 1;
    s.last = today;
    db.streak = s;
  }
  function streakChip() {
    var s = db.streak || { last: '', n: 0 };
    var alive = (s.last === isoDay(0)) || (s.last === isoDay(1));
    var n = alive ? s.n : 0;
    return '<div class="streak">🔥 <b>' + n + '</b> ' + T('st.streakDay') +
      (n ? '' : T('st.streakStart')) + '</div>';
  }

  function record(id, ok) {
    var a = db.answers[id] || (db.answers[id] = { n: 0, ok: 0 });
    a.n++; if (ok) { a.ok++; }
    a.last = ok ? 1 : 0;
    a.t = Date.now();
    var i = db.wrong.indexOf(id);
    if (!ok && i < 0) { db.wrong.push(id); }
    if (ok && i >= 0) { db.wrong.splice(i, 1); }
    touchStreak();
    saveDB();
  }
  function askConfirm(text, onYes) {
    var w = document.createElement('div');
    w.className = 'cfm-wrap';
    w.innerHTML = '<div class="cfm"><p>' + esc(text) + '</p>' +
      '<div class="cfm-btns">' +
        '<button class="btn btn-ghost" data-c="0">' + T('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-c="1">' + T('common.ok') + '</button>' +
      '</div></div>';
    w.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) { if (e.target === w) { w.remove(); } return; }
      var yes = b.getAttribute('data-c') === '1';
      w.remove();
      if (yes && onYes) { onYes(); }
    });
    document.body.appendChild(w);
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { return; }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }
  function fmtTime(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(s / 60);
    s = s % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* ---------------- views ---------------- */
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function systemTheme() {
    try {
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    } catch (e) { return 'light'; }
  }
  function themeMode() {
    var m = null;
    try { m = localStorage.getItem('gentsuki.themeMode'); } catch (e) { }
    if (m === 'auto' || m === 'light' || m === 'dark') { return m; }
    try {
      var stored = localStorage.getItem('gentsuki.theme');
      if (stored === 'dark' || stored === 'light') { return stored; }
    } catch (e) { }
    return 'auto';
  }
  function paintTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { m.setAttribute('content', t === 'dark' ? '#14120f' : '#f5f2ec'); }
  }
  /* giữ cho ?theme= và tương thích cũ */
  function applyTheme(t) {
    paintTheme(t === 'dark' ? 'dark' : 'light');
    try { localStorage.setItem('gentsuki.theme', t === 'dark' ? 'dark' : 'light'); } catch (e) { }
  }
  function applyMode(mode, save) {
    if (mode !== 'auto' && mode !== 'light' && mode !== 'dark') { mode = 'auto'; }
    var t = mode === 'auto' ? systemTheme() : mode;
    paintTheme(t);
    if (save !== false) {
      try {
        localStorage.setItem('gentsuki.themeMode', mode);
        localStorage.setItem('gentsuki.theme', t);
      } catch (e) { }
    }
  }
  try {
    var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var onSysTheme = function () {
      if (themeMode() === 'auto') {
        applyMode('auto', false);
        try { render(true); } catch (e) { }
      }
    };
    if (mqDark) {
      if (mqDark.addEventListener) { mqDark.addEventListener('change', onSysTheme); }
      else if (mqDark.addListener) { mqDark.addListener(onSysTheme); }
    }
  } catch (e) { }

  var LANGS = ['vi', 'zh', 'fil'];

  var LANG = (function () {

    var v = null;

    try { v = localStorage.getItem('gentsuki.lang'); } catch (e) { }

    return LANGS.indexOf(v) >= 0 ? v : 'vi';

  })();

  function T(k) {

    var d = (window.I18N || {})[LANG] || {};

    var f = (window.I18N || {}).vi || {};

    return d[k] || f[k] || k;

  }

  function applyLang(l) {

    if (LANGS.indexOf(l) < 0) { l = 'vi'; }

    LANG = l;

    try { localStorage.setItem('gentsuki.lang', l); } catch (e) { }

    document.documentElement.setAttribute('lang', l === 'vi' ? 'vi' : l === 'zh' ? 'zh-Hans' : 'fil');
    try {
      try { chatMount(); } catch (err) { }

  document.title = T('page.title');
      var md = document.querySelector('meta[name="description"]');
      if (md) { md.setAttribute('content', T('meta.desc')); }
      var og = document.querySelector('meta[property="og:description"]');
      if (og) { og.setAttribute('content', T('meta.desc')); }
    } catch (err) { }

  }

  function vMean(k, v) {
    var tr = ((window.VOCAB_I18N || {})[k] || {})[LANG];
    return tr || (v && v.m) || '';
  }

  function catName(c) {
    if (!c) { return ''; }
    var k = T('cat.' + c.id);
    return (k && k !== 'cat.' + c.id) ? k : c.vi;
  }

  /* bản dịch 62 câu bẫy ngôn ngữ (zh / fil) */
  function trQ(id) {
    if (LANG === 'vi') { return VI[id] || ''; }
    return (((window.QTEXT_I18N || {})[id] || {})[LANG]) || '';
  }

  function expTxt(id) {
    var r = ((window.EXP_I18N || {})[id] || {})[LANG];
    if (!r) { return ''; }
    return typeof r === 'string' ? r : (r.exp || '');
  }

  function localizeQ(q) {
    if (!q || LANG === 'vi') { return q; }
    var g = ((window.GRAMMAR_I18N || {})[q.id] || {})[LANG];
    var eTxt = expTxt(q.id);
    var tp = ((window.TRAP_I18N || {})[q.id] || {})[LANG];
    if (!g && !eTxt && !tp) { return q; }
    var copy = {};
    for (var k in q) { if (Object.prototype.hasOwnProperty.call(q, k)) { copy[k] = q[k]; } }
    if (g) {
      if (g.q) { copy.q = g.q; }
      if (g.exp) { copy.exp = g.exp; }
      if (g.note) { copy.trap = g.note; }
    }
    if (eTxt) { copy.exp = eTxt; }
    if (tp) { copy.trap = tp; }
    else { copy.trap = ''; }
    return copy;
  }

  var LANG_META = {
    vi: {
      code: 'VI', name: 'Tiếng Việt', sub: 'Vietnamese',
      flag: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#da251d"/><path d="M10 3.1l1.16 3.5h3.7l-3 2.18 1.1 3.5-3-2.18-3 2.18 1.1-3.5-3-2.18h3.7z" fill="#ffde00"/></svg>'
    },
    zh: {
      code: '中', name: '中文', sub: 'Chinese',
      flag: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#de2910"/><path d="M4 2.1l.72 2.2h2.3l-1.86 1.35.71 2.2L4 6.5 2.13 7.85l.71-2.2L.98 4.3h2.3z" fill="#ffde00"/><circle cx="8.6" cy="2.4" r=".62" fill="#ffde00"/><circle cx="9.9" cy="3.8" r=".56" fill="#ffde00"/><circle cx="9.9" cy="5.6" r=".5" fill="#ffde00"/><circle cx="8.6" cy="7" r=".44" fill="#ffde00"/></svg>'
    },
    fil: {
      code: 'PH', name: 'Filipino', sub: 'Filipino',
      flag: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="7" fill="#0038a8"/><rect y="7" width="20" height="7" fill="#ce1126"/><path d="M0 0l8.4 7L0 14z" fill="#fff"/><circle cx="2.5" cy="7" r="1.15" fill="#fcd116"/><circle cx="5.4" cy="3.4" r=".5" fill="#fcd116"/><circle cx="5.4" cy="10.6" r=".5" fill="#fcd116"/><circle cx="6.7" cy="7" r=".5" fill="#fcd116"/></svg>'
    }
  };

  function langSel() {
    var cur = LANG_META[LANG] || LANG_META.vi;
    var opts = LANGS.map(function (l) {
      var m = LANG_META[l] || { code: l, name: l, sub: '', flag: '' };
      var on = l === LANG;
      return '<button class="lang-opt' + (on ? ' is-on' : '') + '" role="option" aria-selected="' + (on ? 'true' : 'false') + '" data-lang="' + l + '">' +
        '<span class="lf">' + m.flag + '</span>' +
        '<span class="lt"><b>' + m.name + '</b><i>' + m.sub + '</i></span>' +
        '<span class="ltick">✓</span>' +
        '</button>';
    }).join('');
    return '<div class="lang-dd" id="langDD">' +
      '<button class="lang-btn" data-act="langopen" aria-haspopup="listbox" aria-expanded="false" aria-label="Language">' +
        '<span class="lf">' + cur.flag + '</span><span class="lc">' + cur.code + '</span><span class="lcar">▾</span>' +
      '</button>' +
      '<div class="lang-menu" role="listbox" aria-label="Language">' + opts + '</div>' +
    '</div>';
  }

  function themeBtn() {
    var m = themeMode();
    var icon = m === 'dark' ? '🌙' : m === 'light' ? '☀️' : '🌗';
    var label = m === 'auto' ? T('th.auto') : m === 'dark' ? T('th.dark') : T('th.light');
    return '<button class="icon-btn" data-act="theme" aria-label="' + label + '" title="' + label + '">' + icon + '</button>';
  }

  function topbar(title, backTo) {
    return '<header class="topbar">' +
      '<button class="icon-btn" data-act="back" data-to="' + (backTo || 'home') + '" aria-label="Quay lại">←</button>' +
      '<div class="topbar-title">' + title + '</div>' +
      langSel() +
      themeBtn() +
      '</header>';
  }

  function creditBlock() {
    var a = window.AUTHOR || {};
    var name = a.name || '';
    var links = Array.isArray(a.links) ? a.links.filter(function (l) { return l && l.url; }) : [];
    if (!name && !links.length) { return ''; }

    var av;
    if (a.avatar) {
      av = '<img src="' + esc(a.avatar) + '" alt="">';
    } else {
      av = esc((name || '?').trim().charAt(0));
    }
    var linksHtml = links.map(function (l) {
      var fb = /facebook\.com/i.test(l.url) ? ' data-fb="1"' : '';
      return '<a class="credit-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer"' + fb + '>' +
        esc(l.label || l.url) + '</a>';
    }).join('');

    return '<footer class="credit">' +
      '<div class="credit-avatar">' + av + '</div>' +
      '<div class="credit-main">' +
        '<div class="credit-name">' + esc(name) +
          (a.handle ? '<span>' + esc(a.handle) + '</span>' : '') + '</div>' +
        (a.bio || a.bioLink
          ? '<p class="credit-bio">' + esc(LANG === 'vi' ? (a.bio || '') : T('credit.bio')) +
            (a.bioLink
              ? '<a class="credit-bio-link" href="' + esc(a.bioLink) + '" target="_blank" rel="noopener noreferrer"' +
                (/facebook\.com/i.test(a.bioLink) ? ' data-fb="1"' : '') + '>' +
                esc(LANG === 'vi' ? (a.bioLinkText || 'tại đây') : T('credit.link')) + '</a>'
              : '') +
            (a.bio ? '.' : '') +
            '</p>'
          : '') +
        (linksHtml ? '<div class="credit-links">' + linksHtml + '</div>' : '') +
      '</div>' +
      '</footer>';
  }

  var lastQuote = -1;
  function pickQuote() {
    var list = window.QUOTES || [];
    if (!list.length) { return null; }
    var i = Math.floor(Math.random() * list.length);
    if (list.length > 1 && i === lastQuote) { i = (i + 1) % list.length; }
    lastQuote = i;
    return list[i];
  }

  function quoteInner(q) {
    var tr = ((window.QUOTE_I18N || [])[lastQuote]) || null;
    var text = (tr && tr[LANG]) ? tr[LANG] : q.t;
    var author = q.a && q.a.indexOf('Tục ngữ') >= 0 ? T('quote.jp') : q.a;
    return '<div class="quote-emoji">' + q.e + '</div>' +
      '<div class="quote-body">' +
        '<p class="quote-text">' + esc(text) + '</p>' +
        (author ? '<p class="quote-author">— ' + esc(author) + '</p>' : '') +
      '</div>';
  }

  function quoteBlock() {
    var q = pickQuote();
    if (!q) { return ''; }
    return '<section class="quote" id="quoteBox">' + quoteInner(q) +
      '<button class="quote-next" data-act="quote" aria-label="' + T('quote.next') + '" title="' + T('quote.next') + '">↻</button>' +
      '</section>';
  }

  /* tự đổi câu động lực liên tục, nhanh hơn khối từ vựng */
  var QROT = { timer: null };
  var QROT_MS = 3600;

  function stopQuoteRotate() {
    if (QROT.timer) { clearInterval(QROT.timer); QROT.timer = null; }
  }

  function startQuoteRotate() {
    stopQuoteRotate();
    if (!(window.QUOTES || []).length) { return; }
    QROT.timer = setInterval(function () {
      var box = document.getElementById('quoteBox');
      if (!box) { stopQuoteRotate(); return; }
      var q = pickQuote();
      if (!q) { return; }
      box.innerHTML = quoteInner(q) +
        '<button class="quote-next" data-act="quote" aria-label="' + T('quote.next') + '" title="' + T('quote.next') + '">↻</button>';
      box.classList.remove('swap');
      void box.offsetWidth;
      box.classList.add('swap');
    }, QROT_MS);
  }

  /* ---------------- tỷ giá JPY → VND ---------------- */
  var FX_KEY = 'gentsuki.fx.v3';
  var FX_TTL = 30 * 60 * 1000;
  var FX_HIST_TTL = 12 * 60 * 60 * 1000;
  var FX_DAYS = 90;
  var FX_FLIP = false;   /* đang xem mặt sau (máy quy đổi) */
  var FX_SWAP = false;   /* false: ¥ → ₫, true: ₫ → ¥ */
  var FX_AMT = null;
  var FX_ANIM = '';

  /* đơn vị tiền tệ đích theo ngôn ngữ: vi → VND, zh → CNY, fil → PHP */
  var FX_CUR = {
    vi: { code: 'VND', sym: '₫', name: 'VND', loc: 'vi-VN', dec: 0, swap: 100000 },
    zh: { code: 'CNY', sym: '元', name: '人民币', loc: 'zh-CN', dec: 2, swap: 1000 },
    fil: { code: 'PHP', sym: '₱', name: 'PHP', loc: 'en-PH', dec: 2, swap: 1000 }
  };
  var FX_FALLBACK = { VND: 161.49, CNY: 0.0472, PHP: 0.392 };
  function fxCur() { return FX_CUR[LANG] || FX_CUR.vi; }
  function fxKey() {
    var c = fxCur();
    return c.code === 'VND' ? 'gentsuki.fx.v3' : 'gentsuki.fx.v3.' + c.code;
  }
  function fxDec() { return fxCur().dec; }
  function fxNum(n, d) {
    var dec = (d === undefined) ? fxDec() : d;
    try {
      return Number(n).toLocaleString(fxCur().loc, { minimumFractionDigits: dec, maximumFractionDigits: dec });
    } catch (e) { return String(Math.round(n)); }
  }
  function fxTitle() { return T('fx.title') + ' → ' + fxCur().name; }

  function fxScale() { return (FX_FALLBACK[fxCur().code] || 1) / FX_FALLBACK.VND; }
  /* chuỗi dự phòng (giá đóng cửa hằng tuần) khi không gọi được API */
  var FX_DEFAULT = [
    ['2026-08-16', 164.09], ['2026-08-23', 164.18], ['2026-08-30', 162.91],
    ['2026-09-06', 166.90], ['2026-09-13', 168.82], ['2026-09-20', 165.85],
    ['2026-09-27', 165.13], ['2026-10-04', 164.63], ['2026-10-11', 163.41],
    ['2026-10-18', 163.73], ['2026-10-25', 164.70], ['2026-11-01', 163.73],
    ['2026-11-08', 161.49]
  ];

  function fxRead() {
    try { return JSON.parse(localStorage.getItem(fxKey())); } catch (e) { return null; }
  }
  function fxWrite(d) {
    try { localStorage.setItem(fxKey(), JSON.stringify(d)); } catch (e) { }
  }
  function fxPad(n) { return ('0' + n).slice(-2); }
  function fxIso(dt) { return dt.getFullYear() + '-' + fxPad(dt.getMonth() + 1) + '-' + fxPad(dt.getDate()); }
  function fxVer(dt) { return dt.getFullYear() + '.' + (dt.getMonth() + 1) + '.' + dt.getDate(); }
  function fxDefaultSeries() {
    var k = fxScale();
    return FX_DEFAULT.map(function (p) { return { d: p[0], v: p[1] * k }; });
  }
  function fxSeriesOf(d) {
    var map = {};
    fxDefaultSeries().forEach(function (p) { map[p.d] = p.v; });
    if (d && d.series) { d.series.forEach(function (p) { map[p.d] = p.v; }); }
    return Object.keys(map).sort().map(function (k) { return { d: k, v: map[k] }; });
  }

  function fxLine(series) {
    if (series.length < 2) { return ''; }
    var w = 340, h = 112, pl = 4, pr = 34, pt = 8, pb = 20;
    var pw = w - pl - pr, ph = h - pt - pb;
    var vs = series.map(function (s) { return s.v; });
    var min = Math.min.apply(null, vs), max = Math.max.apply(null, vs);
    var span = (max - min) || max * 0.01 || 1;
    function X(i) { return pl + i * pw / (series.length - 1); }
    function Y(v) { return pt + ph - ((v - min) / span) * ph; }

    /* thang giá: 3 mốc bên phải */
    var grid = '';
    [max, (max + min) / 2, min].forEach(function (v) {
      var yy = Y(v);
      grid += '<line x1="' + pl + '" y1="' + yy.toFixed(1) + '" x2="' + (pl + pw).toFixed(1) + '" y2="' + yy.toFixed(1) +
        '" stroke="rgba(128,128,128,.18)" stroke-width="1" stroke-dasharray="2 3"/>';
      grid += '<text x="' + (pl + pw + 5).toFixed(1) + '" y="' + (yy + 2.7).toFixed(1) +
        '" font-size="8" fill="currentColor" opacity=".6">' + fxNum(v, v < 10 ? 3 : 0) + '</text>';
    });

    /* thang thời gian: đầu, giữa, cuối */
    var idxs = [0, Math.floor((series.length - 1) / 2), series.length - 1];
    var xlab = idxs.map(function (i) {
      var mmdd = series[i].d.slice(5).split('-');
      var txt = Number(mmdd[1]) + '/' + Number(mmdd[0]);
      var anchor = i === 0 ? 'start' : (i === series.length - 1 ? 'end' : 'middle');
      return '<text x="' + X(i).toFixed(1) + '" y="' + (h - 5) + '" font-size="8" text-anchor="' + anchor +
        '" fill="currentColor" opacity=".6">' + txt + '</text>';
    }).join('');

    var pts = series.map(function (s, i) { return [X(i), Y(s.v)]; });
    var line = pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ');
    var area = 'M' + pts[0][0].toFixed(1) + ',' + (pt + ph) + ' L' + line.replace(/ /g, ' L') +
      ' L' + pts[pts.length - 1][0].toFixed(1) + ',' + (pt + ph) + ' Z';
    var last = pts[pts.length - 1];

    return '<svg class="fx-chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Biểu đồ tỷ giá">' +
      '<defs><linearGradient id="fxg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#e8465c" stop-opacity="0.26"/>' +
      '<stop offset="100%" stop-color="#e8465c" stop-opacity="0"/>' +
      '</linearGradient></defs>' +
      grid +
      '<path d="' + area + '" fill="url(#fxg)"/>' +
      '<polyline points="' + line + '" fill="none" stroke="#e8465c" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<circle cx="' + last[0].toFixed(1) + '" cy="' + last[1].toFixed(1) + '" r="2.6" fill="#e8465c"/>' +
      xlab +
      '</svg>';
  }

  function fxRate() {
    var d = fxRead();
    if (d && d.rate) { return d.rate; }
    return FX_FALLBACK[fxCur().code] || 1;
  }

  function fxDigits(s) {
    return String(s).replace(/\D/g, '');
  }

  /* 10000 -> 10.000 (dấu chấm phân cách nghìn, kiểu Việt Nam) */
  function fxGroup(s) {
    return String(s).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function fxRate2() {
    var p = fxDec() === 0 ? 100 : 10000;
    return Math.round(fxRate() * p) / p;
  }

  function fxBack() {
    var c = fxCur(), rate = fxRate2();
    var amt = (FX_AMT === null) ? (FX_SWAP ? c.swap : 10000) : FX_AMT;
    var num = parseFloat(String(amt).replace(/[^\d.]/g, '')) || 0;
    var res = FX_SWAP ? (rate ? num / rate : 0) : num * rate;
    var shown = FX_SWAP ? fxNum(res, 0) : fxNum(res, c.dec === 0 ? 0 : 2);
    var from = FX_SWAP ? c.sym : '¥';
    var to = FX_SWAP ? '¥' : c.sym;
    return '<div class="fxb">' +
      '<div class="fxb-head"><b>' + T('fx.convert') + '</b>' +
        '<button class="fxb-swap" data-act="fxswap" aria-label="' + T('fx.swap') + '">' +
          '<span class="cur' + (FX_SWAP ? '' : ' on') + '">¥</span>' +
          '<span class="ar">⇄</span>' +
          '<span class="cur' + (FX_SWAP ? ' on' : '') + '">' + c.sym + '</span>' +
        '</button></div>' +
      '<label class="fxb-field">' +
        '<input id="fxAmt" type="text" inputmode="numeric" autocomplete="off" value="' + fxGroup(fxDigits(amt)) + '">' +
        '<span>' + from + '</span>' +
      '</label>' +
      '<div class="fxb-out"><b id="fxOut">' + shown + '</b><span>' + to + '</span></div>' +
      '<p class="fxb-note">' + T('fx.note') + '' + fxNum(rate, c.dec === 0 ? 2 : 4) + ' ' + c.sym + '</p>' +
      '<p class="fxb-hint">' + T('fx.hint') + '</p>' +
      '</div>';
  }

  function fxCard() {
    var anim = FX_ANIM;
    FX_ANIM = '';
    var d = fxRead();
    if (!d || !d.rate) {
      /* chưa có dữ liệu: vẫn cho lật sang máy quy đổi */
      var head0 = '<div class="fx-head"><b>' + fxTitle() + '</b>' +
        '<button class="fx-refresh" data-act="fx" aria-label="' + T('fx.refresh') + '">↻</button></div>' +
        '<p class="fx-note">' + T('fx.loading') + '</p>';
      return '<section class="fx-flip' + (FX_FLIP ? ' back' : '') + (anim ? ' ' + anim : '') + '" id="fxBox" data-act="fxflip">' +
        '<div class="fx-inner">' +
          '<div class="fx-face fx-front">' + head0 + '</div>' +
          '<div class="fx-face fx-fback">' + fxBack() + '</div>' +
        '</div></section>';
    }
    var all = fxSeriesOf(d);
    var cut = fxIso(new Date(Date.now() - (FX_DAYS + 3) * 86400000));
    var series = all.filter(function (p) { return p.d >= cut; });
    if (series.length < 2) { series = all.slice(-2); }

    var rate = series[series.length - 1].v;
    var chg = series.length > 1 ? (rate - series[0].v) : 0;
    var pct = series.length > 1 ? (chg / series[0].v) * 100 : 0;
    var stamp = (d && d.updatedLabel) ? d.updatedLabel : 'dữ liệu lưu sẵn';
    var stale = !d || d.stale;

    var front = '<div class="fx-head"><b>' + fxTitle() + '</b>' +
      '<button class="fx-refresh" data-act="fx" aria-label="' + T('fx.refresh') + '">↻</button></div>' +
      '<div class="fx-top"><div class="fx-rate">' + fxNum(rate, fxCur().dec === 0 ? 0 : 4) +
      '<small>' + fxCur().sym + ' / 1 ¥</small></div>' +
      '<div class="fx-chg ' + (chg > 0 ? 'fx-up' : chg < 0 ? 'fx-down' : '') + '">' +
      (chg > 0 ? '+' : '') + pct.toFixed(2) + '% · 90' + T('fx.days90') + '</div>' +
      '</div>' +
      fxLine(series) +
      '<p class="fx-note">' + T('fx.updated') + esc(stamp) + T('fx.src') +
      (stale ? T('fx.stale') : '') + ' · <b>' + T('fx.tap') + '</b></p>';

    return '<section class="fx-flip' + (FX_FLIP ? ' back' : '') + (anim ? ' ' + anim : '') + '" id="fxBox" data-act="fxflip">' +
      '<div class="fx-inner">' +
        '<div class="fx-face fx-front">' + front + '</div>' +
        '<div class="fx-face fx-fback">' + fxBack() + '</div>' +
      '</div>' +
    '</section>';
  }

  function fxConvert() {
    var el = document.getElementById('fxAmt');
    var out = document.getElementById('fxOut');
    if (!el || !out) { return; }
    var rate = fxRate2();
    var v = parseFloat(fxDigits(el.value)) || 0;
    var r = FX_SWAP ? (rate ? v / rate : 0) : v * rate;
    out.textContent = FX_SWAP ? fxNum(r, 0) : fxNum(r, fxCur().dec === 0 ? 0 : 2);
  }

  var amtEl = null;
  var amtPrevDigits = null;

  var amtComposing = false;
  var amtTimer = null;

  function fxFormatNow(el) {
    if (!el) { return; }
    var raw = el.value;
    var digits = fxDigits(raw).slice(0, 12);
    var out = fxGroup(digits);
    if (out === raw) { return; }
    var caret = el.selectionStart === null ? raw.length : el.selectionStart;
    var before = fxDigits(raw.slice(0, caret)).length;
    el.value = out;
    var pos = 0, seen = 0;
    for (var i = 0; i < out.length; i++) {
      if (out.charAt(i) >= '0' && out.charAt(i) <= '9') { seen++; }
      if (seen >= before) { pos = i + 1; break; }
    }
    if (before === 0) { pos = 0; }
    try { el.setSelectionRange(pos, pos); } catch (err) { }
    FX_AMT = out;
  }

  /* định dạng SAU khi ngừng gõ — không can thiệp giữa lúc bộ gõ đang xử lý */
  function fxSchedule(el) {
    clearTimeout(amtTimer);
    amtTimer = setTimeout(function () {
      if (amtComposing) { return; }
      fxFormatNow(el);
    }, 600);
  }

  document.addEventListener('compositionstart', function (e) {
    if (e.target && e.target.id === 'fxAmt') { amtComposing = true; }
  });
  document.addEventListener('compositionend', function (e) {
    if (!e.target || e.target.id !== 'fxAmt') { return; }
    amtComposing = false;
    fxFormatNow(e.target);
  });

  document.addEventListener('input', function (e) {
    if (!e.target || e.target.id !== 'fxAmt') { return; }
    var el = e.target;
    if (!amtComposing) { fxFormatNow(el); }   /* dấu chấm hiện ngay khi gõ */
    FX_AMT = el.value;
    fxConvert();
  });

  document.addEventListener('focusout', function (e) {
    if (!e.target || e.target.id !== 'fxAmt') { return; }
    clearTimeout(amtTimer);
    fxFormatNow(e.target);
  });

  function fxReplace() {
    var el = document.getElementById('fxBox');
    if (el) { el.outerHTML = fxCard(); }
    if (FX_FLIP) { setTimeout(fxConvert, 20); }
  }

  function fxFetchLatest() {
    return fetch('https://open.er-api.com/v6/latest/JPY', { mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var c = fxCur().code;
        return (j && j.rates && j.rates[c]) ? { d: fxIso(new Date()), v: j.rates[c] } : null;
      })
      .catch(function () { return null; })
      .then(function (x) {
        if (x) { return x; }
        return fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/jpy.min.json', { mode: 'cors' })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var c2 = fxCur().code.toLowerCase();
            return (j && j.jpy && j.jpy[c2]) ? { d: j.date, v: j.jpy[c2] } : null;
          })
          .catch(function () { return null; });
      });
  }

  /* lấy giá đóng cửa 90 ngày, gộp 15 ngày/request qua jsDelivr combine */
  function fxFetchHistory(days) {
    var dates = [];
    for (var i = days - 1; i >= 0; i--) { dates.push(new Date(Date.now() - i * 86400000)); }
    var chunks = [];
    for (var j = 0; j < dates.length; j += 15) { chunks.push(dates.slice(j, j + 15)); }

    var reqs = chunks.map(function (ch) {
      var url = 'https://cdn.jsdelivr.net/combine/' + ch.map(function (dt) {
        return 'npm/@fawazahmed0/currency-api@' + fxVer(dt) + '/v1/currencies/jpy.min.json';
      }).join(',');
      return fetch(url, { mode: 'cors' })
        .then(function (r) { return r.text(); })
        .then(function (txt) {
          var ds = txt.match(/"date":"\d{4}-\d{2}-\d{2}"/g) || [];
          var cc = fxCur().code.toLowerCase();
          var vs = txt.match(new RegExp('"' + cc + '":[0-9.]+', 'g')) || [];
          var out = [];
          for (var k = 0; k < Math.min(ds.length, vs.length); k++) {
            out.push({ d: ds[k].slice(8, 18), v: parseFloat(vs[k].slice(cc.length + 3)) });
          }
          return out;
        })
        .catch(function () { return []; });
    });

    return Promise.all(reqs).then(function (lists) {
      var out = [];
      lists.forEach(function (l) { out = out.concat(l); });
      return out;
    });
  }

  function fxLoad(force) {
    var d = fxRead();
    var needRate = force || !d || !d.rate || (Date.now() - (d.ts || 0) > FX_TTL);
    var needHist = force || !d || !d.histTs || (Date.now() - d.histTs > FX_HIST_TTL);
    if (!needRate && !needHist) { return; }

    Promise.all([
      needRate ? fxFetchLatest() : Promise.resolve(null),
      needHist ? fxFetchHistory(FX_DAYS) : Promise.resolve([])
    ]).then(function (res) {
      var x = res[0], hist = res[1] || [];
      var map = {};
      fxDefaultSeries().forEach(function (p) { map[p.d] = p.v; });
      if (d && d.series) { d.series.forEach(function (p) { map[p.d] = p.v; }); }
      hist.forEach(function (p) { map[p.d] = p.v; });
      if (x) { map[x.d] = x.v; }

      var series = Object.keys(map).sort().map(function (k) { return { d: k, v: map[k] }; });
      var last = series[series.length - 1];
      var now = new Date();
      fxWrite({
        rate: last.v, date: last.d, series: series,
        ts: x ? Date.now() : ((d && d.ts) || 0),
        histTs: (needHist && hist.length) ? Date.now() : ((d && d.histTs) || 0),
        stale: !x,
        updatedLabel: x
          ? fxPad(now.getHours()) + ':' + fxPad(now.getMinutes()) + ' ' + fxPad(now.getDate()) + '/' + fxPad(now.getMonth() + 1)
          : T('fx.saved')
      });
      fxReplace();
    });
  }

  /* ---------------- từ vựng xoay vòng ---------------- */
  var VROT = { list: [], i: 0, timer: null };
  var VROT_MS = 5500;

  function vocabPool() {
    var keys = Object.keys(VOCAB).filter(function (k) {
      var v = VOCAB[k];
      return v && v.r && v.m;
    });
    return keys;
  }

  function vocabPick(n) {
    var pool = vocabPool();
    var out = [], seen = {};
    while (out.length < n && pool.length) {
      var k = pool[Math.floor(Math.random() * pool.length)];
      if (!seen[k]) { seen[k] = 1; out.push(k); }
    }
    return out;
  }

  function hanViet(term) {
    if (LANG !== 'vi') { return ''; }
    var map = window.HANVIET || {};
    var out = [];
    for (var i = 0; i < term.length; i++) {
      var hv = map[term.charAt(i)];
      if (hv) { out.push(hv); }
    }
    return out.join(' ');
  }

  function vocabInner(term, idx, total) {
    var v = VOCAB[term] || { r: '', m: '' };
    return '<div class="vrot-head"><span class="vrot-label">' + T('vocab.label') + '</span>' +
      '<span class="vrot-count">' + (idx + 1) + '/' + total + '</span></div>' +
      '<div class="vrot-line">' +
        '<button class="vrot-term" data-act="vocab" data-w="' + esc(term) + '">' + esc(term) + '</button>' +
        (hanViet(term) ? '<span class="vrot-hv">' + esc(hanViet(term)) + '</span>' : '') +
      '</div>' +
      (v.r ? '<div class="vrot-read">' + esc(v.r) + '</div>' : '') +
      '<p class="vrot-mean">' + esc(vMean(term, v)) + '</p>';
  }

  function vocabBlock() {
    var list = vocabPick(8);
    if (!list.length) { return ''; }
    VROT.list = list;
    VROT.i = 0;
    return '<section class="vrot" id="vrotBox">' + vocabInner(list[0], 0, list.length) + '</section>';
  }

  function stopVocabRotate() {
    if (VROT.timer) { clearInterval(VROT.timer); VROT.timer = null; }
  }

  function startVocabRotate() {
    stopVocabRotate();
    if (!VROT.list.length) { return; }
    VROT.timer = setInterval(function () {
      var box = document.getElementById('vrotBox');
      if (!box) { stopVocabRotate(); return; }
      VROT.i = (VROT.i + 1) % VROT.list.length;
      box.innerHTML = vocabInner(VROT.list[VROT.i], VROT.i, VROT.list.length);
      box.classList.remove('swap');
      void box.offsetWidth;
      box.classList.add('swap');
    }, VROT_MS);
  }

  /* ---------------- mở app Facebook thay vì trình duyệt ---------------- */
  function openFacebook(url) {
    var ua = navigator.userAgent || '';
    var isAndroid = /Android/i.test(ua);
    var isIOS = /iPhone|iPad|iPod/i.test(ua);

    function watch() {
      /* nếu app mở được thì tab bị ẩn; nếu không, sau 1.5s quay về web */
      var done = false;
      var tmr = setTimeout(function () { if (!done) { window.location.href = url; } }, 1500);
      document.addEventListener('visibilitychange', function onVis() {
        if (document.hidden) {
          done = true;
          clearTimeout(tmr);
          document.removeEventListener('visibilitychange', onVis);
        }
      });
    }

    if (isAndroid) {
      var bare = url.replace(/^https?:\/\//, '');
      watch();
      window.location.href = 'intent://' + bare +
        '#Intent;scheme=https;package=com.facebook.katana;' +
        'S.browser_fallback_url=' + encodeURIComponent(url) + ';end';
      return;
    }

    if (isIOS) {
      watch();
      window.location.href = 'fb://facewebmodal/f?href=' + encodeURIComponent(url);
      return;
    }

    var win = window.open(url, '_blank', 'noopener');
    if (!win) { window.location.href = url; }
  }

  /* ---------------- đồng hồ & thời tiết ở hero ---------------- */
  var WX_KEY = 'gentsuki.wx.v1';
  var WX_TTL = 30 * 60 * 1000;
  var WX_BUSY = false;

  function wxRead() {
    try { return JSON.parse(localStorage.getItem(WX_KEY)); } catch (e) { return null; }
  }
  function wxSave(d) {
    try { localStorage.setItem(WX_KEY, JSON.stringify(d)); } catch (e) { }
  }
  function wxIcon(code) {
    if (code === 0) { return '☀️'; }
    if (code <= 3) { return '🌤'; }
    if (code === 45 || code === 48) { return '🌫'; }
    if (code >= 51 && code <= 67) { return '🌧'; }
    if (code >= 71 && code <= 77) { return '🌨'; }
    if (code >= 80 && code <= 82) { return '🌦'; }
    if (code >= 95) { return '⛈'; }
    return '🌤';
  }
  function pad2(n) { return ('0' + n).slice(-2); }
  function clockText(d) {
    var loc = LANG === 'vi' ? 'vi-VN' : LANG === 'zh' ? 'zh-CN' : 'en-PH';
    var hm = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
    var date = '';
    try {
      date = d.toLocaleDateString(loc, { weekday: 'short', day: '2-digit', month: '2-digit' });
    } catch (e) {
      date = pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1);
    }
    return { hm: hm, date: date };
  }
  function clockTick() {
    var hmEl = document.getElementById('hClock');
    var dEl = document.getElementById('hDate');
    if (!hmEl) { return; }
    var o = clockText(new Date());
    hmEl.textContent = o.hm;
    if (dEl) { dEl.textContent = o.date; }
  }
  function wxPaint(d) {
    var ico = document.getElementById('wxIco');
    var tmp = document.getElementById('wxTemp');
    var city = document.getElementById('wxCity');
    if (!ico || !tmp || !city) { return; }
    if (!d || d.temp === undefined) {
      ico.textContent = '🌤';
      tmp.textContent = '—';
      city.textContent = T('wx.off');
      return;
    }
    ico.textContent = wxIcon(d.code);
    tmp.textContent = Math.round(d.temp) + '°';
    city.textContent = (d.city || T('wx.here')) +
      (d.hum !== undefined && d.hum !== null ? ' · ' + T('wx.hum') + ' ' + Math.round(d.hum) + '%' : '');
  }
  function wxFetch(lat, lon) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
      '&current=temperature_2m,weather_code,relative_humidity_2m&timezone=auto';
    return fetch(url, { mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.current) { return null; }
        return { temp: j.current.temperature_2m, code: j.current.weather_code, hum: j.current.relative_humidity_2m };
      })
      .catch(function () { return null; });
  }
  function wxReverse(lat, lon) {
    var url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat +
      '&longitude=' + lon + '&localityLanguage=en';
    return fetch(url, { mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        return (j && (j.city || j.locality || j.principalSubdivision)) || '';
      })
      .catch(function () { return ''; });
  }
  function wxIpLocate() {
    return fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en', { mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || j.latitude === undefined || j.longitude === undefined) { return null; }
        return { lat: j.latitude, lon: j.longitude, city: j.city || j.locality || j.principalSubdivision || '' };
      })
      .catch(function () { return null; });
  }

  function wxLoad(force) {
    if (WX_BUSY) { return; }
    var d = wxRead();
    if (!force && d && d.ts && Date.now() - d.ts < WX_TTL) { wxPaint(d); return; }
    if (!d && !force) { wxPaint(null); }
    WX_BUSY = true;
    var tmp = document.getElementById('wxTemp');
    if (tmp) { tmp.textContent = '…'; }
    var guard = setTimeout(function () {
      if (WX_BUSY) { WX_BUSY = false; wxPaint(wxRead()); }
    }, 8000);

    function done(lat, lon) {
      wxFetch(lat, lon).then(function (w) {
        if (!w) {
          WX_BUSY = false;
          wxPaint(wxRead());
          return;
        }
        wxReverse(lat, lon).then(function (city) {
          var out = { lat: lat, lon: lon, city: city, ts: Date.now(), temp: w.temp, code: w.code, hum: w.hum };
          wxSave(out);
          WX_BUSY = false;
          wxPaint(out);
        });
      });
    }

    if (d && d.lat !== undefined && !force) { done(d.lat, d.lon); return; }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        done(pos.coords.latitude, pos.coords.longitude);
      }, function () {
        if (d && d.lat !== undefined) { done(d.lat, d.lon); return; }
        wxIpLocate().then(function (loc) {
          if (loc) { done(loc.lat, loc.lon); }
          else { WX_BUSY = false; wxPaint(null); }
        });
      }, { timeout: 8000, maximumAge: 60 * 60 * 1000 });
    } else if (d && d.lat !== undefined) {
      done(d.lat, d.lon);
    } else {
      WX_BUSY = false;
      wxPaint(null);
    }
  }
  function wxTick() {
    clockTick();
    if (!document.getElementById('wxTemp')) { return; }
    var d = wxRead();
    if (!d || !d.ts || Date.now() - d.ts > WX_TTL) { wxLoad(false); }
    else { wxPaint(d); }
  }

  function homeTiles(wrongN, o) {
    function tile(act, icon, title, sub, extra) {
      return '<button class="tile" data-act="' + act + '"' + (extra || '') + '>' +
        '<span class="tile-icon">' + icon + '</span>' +
        '<span class="tile-body"><h3>' + title + '</h3><p>' + sub + '</p></span>' +
        '<span class="chev">›</span>' +
        '</button>';
    }
    return '<div class="tiles">' +
      tile('go-practice', '📚', T('tile.practice'), CATS.length + ' ' + T('tile.practice.sub') + ' · ' + Q.length + ' ' + T('fact.q')) +
      tile('start-review', '🔁', T('tile.review'), wrongN ? wrongN + ' ' + T('tile.review.sub') : T('tile.review.none'), wrongN ? '' : ' disabled') +
      tile('go-stats', '📈', T('tile.stats'), o.n + ' ' + T('tile.stats.sub') + ' · ' + o.rate + '%') +
      tile('go-law', '⚖️', T('tile.law'), T('tile.law.sub')) +
      tile('go-info', '🇯🇵', T('tile.info'), T('tile.info.sub')) +
      tile('go-checklist', '✅', T('tile.check'), CHECKLIST.filter(function (x, i) { return db.checklist['c' + i]; }).length + '/' + CHECKLIST.length + ' ' + T('tile.check.sub')) +
      tile('go-sos', '📕', T('tile.sos'), SITS.length + ' ' + T('tile.sos.sub')) +
      tile('go-connect', '📲', T('tile.connect'), T('tile.connect.sub')) +
      '</div>';
  }

  function homeRows() {
    function row(act, icon, title, sub) {
      return '<button class="catrow" data-act="' + act + '">' +
        '<span class="catrow-icon">' + icon + '</span>' +
        '<span class="catrow-main"><h3>' + title + '</h3><p>' + sub + '</p></span>' +
        '<span class="chev">›</span></button>';
    }
    return '<div class="catlist home-extra">' +
      row('go-models', '🏍️', T('row.models'), MODELS.length + ' ' + T('row.models.sub')) +
      row('go-gear', '🧥', T('row.gear'), T('row.gear.sub')) +
      row('go-emg', '📞', T('row.emergency'), T('row.emergency.sub')) +
      '</div>';
  }

  function viewHome() {
    var o = overall();
    var wrongN = db.wrong.filter(function (id) { return qById[id]; }).length;
    var last = db.exams[0];
    return '' +
      '<header class="topbar">' +
        '<div class="brand"><span class="brand-mark">原</span>' +
          '<span class="brand-text"><b>原付免許</b><i>' + T('app.sub') + '</i></span></div>' +
        '<div class="topbar-actions">' +
          '<button class="icon-btn" id="installBtn" data-act="install" aria-label="Cài đặt app" style="display:none">⬇️</button>' +
          langSel() +
          themeBtn() + '</div>' +
      '</header>' +
      '<main class="wrap">' +
        '<section class="hero">' +
          '<div class="hero-main">' +
            '<div class="hero-eyebrow">' + T('hero.eyebrow') + '</div>' +
            '<h1>' + T('hero.title') + '</h1>' +
            '<p class="hero-sub">' + T('hero.sub') + '</p>' +
            '<div class="facts">' +
              '<div class="fact"><b>48</b><span>' + T('fact.q') + '</span></div>' +
              '<div class="fact"><b>30′</b><span>' + T('fact.t') + '</span></div>' +
              '<div class="fact"><b>45</b><span>' + T('fact.p') + '</span></div>' +
            '</div>' +
          '</div>' +
          '<aside class="hero-side">' +
            '<div class="hw hw-clock">' +
              '<span class="hw-k">' + T('wx.clock') + '</span>' +
              '<b id="hClock">' + (function () { var c = clockText(new Date()); return c.hm; })() + '</b>' +
              '<i id="hDate">' + (function () { var c = clockText(new Date()); return c.date; })() + '</i>' +
            '</div>' +
            '<button class="hw hw-wx" data-act="wx" type="button">' +
              '<span class="hw-k">' + T('wx.title') + '</span>' +
              '<span class="wx-row"><span class="wx-ico" id="wxIco">🌤</span><b id="wxTemp">—</b></span>' +
              '<i id="wxCity">' + T('wx.off') + '</i>' +
            '</button>' +
          '</aside>' +
        '</section>' +

        '<button class="cta" data-act="start-exam">' +
          '<span class="cta-main">' +
            '<span class="cta-title">' + T('cta.title') + '</span>' +
            '<span class="cta-sub">' + (last
              ? T('cta.last') + last.score + '/' + last.total
              : T('cta.sub')) + '</span>' +
          '</span>' +
          '<span class="cta-arrow">→</span>' +
        '</button>' +

        homeTiles(wrongN, o) +

        '<p class="footnote">' + T('foot') + '</p>' +
        
        vocabBlock() +
        quoteBlock() +
        fxCard() +
        homeRows() +
        '<p class="terms"><b>© 2026 Nghiệm Trần</b>' +
          '<span class="terms-note">' + T('terms.personal') + '</span>' +
          '<span class="ver">v' + APP_VER + '</span></p>' +
      '</main>';
  }

  function gStat() {
    var n = 0, ok = 0;
    GQ.forEach(function (q) {
      var a = db.answers[q.id];
      if (a) { n += a.n; ok += a.ok; }
    });
    return { n: n, ok: ok, rate: n ? Math.round(ok / n * 100) : 0 };
  }

  function viewPractice() {
    var gs = gStat();
    var special =
      '<button class="catrow catrow-special" data-act="gram">' +
        '<span class="catrow-icon">🔤</span>' +
        '<span class="catrow-main"><h3>' + T('nav.gram') + ' <em>表現</em></h3>' +
          '<p>' + GQ.length + ' ' + T('unit.q') + ' · ' + (gs.n ? T('gr.done') + ' ' + gs.rate + '%' : T('pr.tip')) + '</p>' +
          '<span class="bar"><i style="width:' + gs.rate + '%"></i></span></span>' +
        '<span class="chev">›</span></button>' +
      '<button class="catrow catrow-special" data-act="cards">' +
        '<span class="catrow-icon">🃏</span>' +
        '<span class="catrow-main"><h3>' + T('nav.cards') + ' <em>単語</em></h3>' +
          '<p>' + T('pr.cards') + '</p>' +
          '<span class="bar"><i style="width:0%"></i></span></span>' +
        '<span class="chev">›</span></button>' +
      '<button class="catrow catrow-special" data-act="hard">' +
        '<span class="catrow-icon">🔥</span>' +
        '<span class="catrow-main"><h3>' + T('pr.hard') + ' <em>難問</em></h3>' +
          '<p>' + T('pr.hardSub') + '</p>' +
          '<span class="bar"><i style="width:0%"></i></span></span>' +
        '<span class="chev">›</span></button>';

    var rows = CATS.map(function (c) {
      var list = byCat[c.id] || [];
      var st = catStat(c.id);
      return '<button class="catrow" data-act="start-cat" data-cat="' + c.id + '">' +
        '<span class="catrow-icon">' + c.icon + '</span>' +
        '<span class="catrow-main">' +
          '<h3>' + catName(c) + ' <em>' + c.ja + '</em></h3>' +
          '<p>' + list.length + ' ' + T('unit.q') + ' · ' + (st.n ? T('gr.done') + ' ' + st.rate + '%' : T('gr.notyet')) + '</p>' +
          '<span class="bar"><i style="width:' + st.rate + '%"></i></span>' +
        '</span>' +
        '<span class="chev">›</span></button>';
    }).join('');
    return topbar(T('nav.practice')) +
      '<main class="wrap"><div class="catlist">' + special + rows + '</div>' +
      '<p class="footnote">' + T('pr.foot') + '</p></main>';
  }

  function scoreSoFar() {
    if (!S) { return ''; }
    var ok = 0;
    S.picks.forEach(function (p, i) { if (p !== undefined && qById[S.ids[i]].a === p) { ok++; } });
    return '<span class="mini">' + ok + ' ' + T('hdr.ok') + '</span>';
  }

  function viewQuiz() {
    if (!S) { return viewHome(); }
    var anim = S.anim || '';
    S.anim = '';
    if (S.mode === 'exam' && S.phase === 'ill') { return viewIll(); }
    var q = localizeQ(qById[S.ids[S.i]]);
    var answeredNow = S.picks[S.i] !== undefined;
    var backTxt = trQ(q.id);
    var cat = catById[q.cat] || { vi: '', ja: '', icon: '' };
    var total = S.ids.length;
    var picked = S.picks[S.i];
    var isExam = S.mode === 'exam';
    var answered = picked !== undefined;
    var showFb = !isExam && answered;
    var viAnimCls = S.viAnim ? ' anim' : '';
    S.viAnim = false;

    var sign = q.img && SIGNS[q.img] ? '<div class="qsign">' + SIGNS[q.img] + '</div>' : '';
    var answers;

    if (!showFb) {
      answers = '<div class="answers">' +
        '<button class="ans' + (picked === 1 ? ' sel' : '') + '" data-act="answer" data-v="1">' +
          '<span class="glyph">○</span><span class="lbl">' + T('den.yes') + '</span></button>' +
        '<button class="ans' + (picked === 0 ? ' sel' : '') + '" data-act="answer" data-v="0">' +
          '<span class="glyph">×</span><span class="lbl">' + T('den.no') + '</span></button>' +
        '</div>';
    } else {
      answers = '<div class="answers done">' +
        '<div class="ans' + (q.a === 1 ? ' correct' : '') + (picked === 1 && q.a !== 1 ? ' wrong' : '') + '">' +
          '<span class="glyph">○</span><span class="lbl">' + T('den.yes') + '</span></div>' +
        '<div class="ans' + (q.a === 0 ? ' correct' : '') + (picked === 0 && q.a !== 0 ? ' wrong' : '') + '">' +
          '<span class="glyph">×</span><span class="lbl">' + T('den.no') + '</span></div>' +
        '</div>';
    }

    return '' +
      '<header class="quizbar">' +
        '<button class="icon-btn" data-act="quit" aria-label="Thoát">✕</button>' +
        '<div class="qmeta"><b>' + T('hdr.q') + ' ' + (S.i + 1) + '<span>/' + total + '</span></b>' +
          '<i>' + (isExam ? T('exam.label') : (S.cat === 'gram' ? T('nav.gram') : (S.cat ? catName(cat) : (S.label || cat.vi)))) + '</i></div>' +
        (isExam ? '<div class="timer" id="timer">30:00</div>' : '<div class="timer soft">' + scoreSoFar() + '</div>') +
      '</header>' +
      '<div class="progress"><i style="width:' + (((S.i + (answered ? 1 : 0)) / total) * 100) + '%"></i></div>' +
      '<main class="wrap quizwrap">' +
        '<article class="qcard' + (anim ? ' ' + anim : '') + '">' +
          '<span class="qtag cat-' + q.cat + '">' + cat.icon + ' ' + catName(cat) + '</span>' +
          sign +
          '<div class="qflip' + (S.viOn ? ' back' : '') + viAnimCls + '">' +
            '<div class="qflip-inner">' +
              '<div class="qflip-face qflip-front"><p class="qtext">' + mark(esc(q.q)) + '</p></div>' +
              '<div class="qflip-face qflip-back">' +
                '<p class="qtext qtext-vi">' + esc(backTxt) + '</p>' +
                '<span class="qflip-note">' + (LANG === 'vi' ? (VI_MANUAL[q.id] ? 'Bản dịch biên soạn' : 'Bản dịch tự động · tham khảo') : T('q.trans')) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="qctl">' +
            '<button class="qctl-btn" data-act="tts">' + T('q.tts') + '</button>' +
            '<button class="qctl-btn' + (furiOn() ? ' on' : '') + '" data-act="furi">' + T('q.furi') + '</button>' +
            (backTxt
              ? '<button class="qctl-btn' + (S.viOn ? ' on' : '') + '" data-act="vi">' + T('q.vi') + '</button>'
              : '') +
          '</div>' +
          '<p class="qhint">' + (isExam ? '' + T('q.hint.exam') + '' : '' + T('q.hint.live') + '') +
            ' · <span class="w-tip">' + T('q.tip') + '' +
              (isExam ? '' : T('q.tip.swipe')) + '</span></p>' +
          answers +
        '</article>' +
        (showFb ? feedback(q, picked) : '') +
        (isExam ? examFooter() : '') +
      '</main>';
  }

  function viewIll() {
    var set = illById[S.ills[S.j]];
    if (!set) { return viewHome(); }
    var picks = S.illPicks[S.j];
    var totalQ = S.ids.length + S.ills.length;

    var subs = set.subs.map(function (s, k) {
      var p = picks[k];
      return '<div class="ill-sub">' +
        '<p class="ill-q"><b>' + (k + 1) + '.</b> ' + mark(esc(s.q)) +
          (LANG === 'vi' && s.vi ? '<span class="ill-vi' + (S.viOn ? '' : ' vi-off') + '">' + esc(s.vi) + '</span>' : '') + '</p>' +
        '<div class="ill-ans">' +
          '<button class="pill-ans' + (p === 1 ? ' sel' : '') + '" data-act="ill" data-k="' + k + '" data-v="1">' + T('q.yes') + '</button>' +
          '<button class="pill-ans' + (p === 0 ? ' sel' : '') + '" data-act="ill" data-k="' + k + '" data-v="0">' + T('q.no') + '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    return '' +
      '<header class="quizbar">' +
        '<button class="icon-btn" data-act="quit" aria-label="Thoát">✕</button>' +
        '<div class="qmeta"><b>' + T('hdr.q') + ' ' + (S.ids.length + S.j + 1) + '<span>/' + totalQ + '</span></b>' +
          '<i>' + T('ill.hdr') + '</i></div>' +
        '<div class="timer" id="timer">30:00</div>' +
      '</header>' +
      '<div class="progress"><i style="width:' + (((S.ids.length + S.j) / totalQ) * 100) + '%"></i></div>' +
      '<main class="wrap quizwrap">' +
        '<article class="qcard">' +
          '<span class="qtag cat-bike">🎬 ' + esc(set.title) + '</span>' +
          ((window.ILL_ART && window.ILL_ART[set.id])
            ? '<div class="ill-art">' + window.ILL_ART[set.id] + '</div>' : '') +
          '<p class="ill-scene">' + mark(esc(set.scene)) +
            (LANG === 'vi' && set.sceneVi ? '<span class="ill-vi' + (S.viOn ? '' : ' vi-off') + '">' + esc(set.sceneVi) + '</span>' : '') + '</p>' +
          (LANG === 'vi'
            ? '<div class="qctl ill-ctl"><button class="qctl-btn' + (S.viOn ? ' on' : '') + '" data-act="vi">' + T('q.vi') + '</button></div>'
            : (picks.length === 3 && picks.every(function (p) { return p !== undefined; })
              ? '<p class="ill-exp show"><b>' + T('q.explain') + '</b> ' + esc(((window.ILL_EXP_I18N || {})[set.id] || {})[LANG] || '') + '</p>'
              : '')) +
          '<p class="qhint">' + T('ill.hint') + '</p>' +
          subs +
        '</article>' +
        examFooter() +
      '</main>';
  }

  function explainRows(q) {
    q = localizeQ(q);
    var yes = q.a === 1 ? q.exp : q.trap;
    var no = q.a === 0 ? q.exp : q.trap;
    function tidy(s) {
      return String(s || '').replace(/^(Đúng|Sai)\.\s+/, '');
    }
    function row(glyph, label, text, on) {
      return '<div class="exp-row' + (on ? ' on' : '') + '">' +
        '<span class="exp-mk">' + glyph + '</span>' +
        '<div class="exp-tx"><b>' + label + '</b><p>' + mark(esc(tidy(text) || '—')) + '</p></div>' +
        '</div>';
    }
    return '<div class="exps">' +
      row('○', q.a === 1 ? T('fb.right') : T('fb.why'), yes, q.a === 1) +
      row('×', q.a === 0 ? T('fb.right') : T('fb.why'), no, q.a === 0) +
      '</div>';
  }

  function feedback(q, picked) {
    var ok = q.a === picked;
    return '<section class="fb ' + (ok ? 'ok' : 'ng') + '">' +
      '<div class="fb-head"><b>' + (ok ? T('fb.ok') : T('fb.no')) + '</b>' +
        '<span>' + T('fb.correctIs') + ' <b class="ansmark">' + (q.a ? '○' : '×') + '</b></span></div>' +
      explainRows(q) +
      (q.ref ? '<p class="fb-ref">' + esc(q.ref) + '</p>' : '') +
      '<button class="btn btn-primary" data-act="next">' +
        (S.i + 1 >= S.ids.length ? T('fb.seeResult') : T('res.next').replace(' →','')) + ' →</button>' +
      '</section>';
  }

  function examFooter() {
    var dots = '';
    S.ids.forEach(function (id, i) {
      var cls = 'dot' + (S.picks[i] !== undefined ? ' done' : '') +
        (S.phase === 'text' && i === S.i ? ' cur' : '');
      dots += '<button class="' + cls + '" data-act="jump" data-i="' + i + '">' + (i + 1) + '</button>';
    });
    S.ills.forEach(function (id, j) {
      var ok = S.illPicks[j].every(function (p) { return p !== undefined; });
      var cls = 'dot ill' + (ok ? ' done' : '') + (S.phase === 'ill' && j === S.j ? ' cur' : '');
      dots += '<button class="' + cls + '" data-act="jump-ill" data-j="' + j + '">' +
        (S.ids.length + j + 1) + '</button>';
    });

    var allText = S.picks.every(function (p) { return p !== undefined; });
    var allIll = S.illPicks.every(function (arr) {
      return arr.every(function (p) { return p !== undefined; });
    });
    var btns;
    if (S.phase === 'text') {
      btns = '<button class="btn btn-ghost" data-act="prev"' + (S.i === 0 ? ' disabled' : '') + '>' + T('btn.prev') + '</button>' +
        '<button class="btn btn-primary" data-act="' + (allText ? 'to-ill' : 'next') + '">' +
          (allText ? T('btn.toIll') : T('btn.next')) + '</button>';
    } else {
      var lastIll = S.j >= S.ills.length - 1;
      btns = '<button class="btn btn-ghost" data-act="prev">' + T('btn.prev') + '</button>' +
        (lastIll
          ? '<button class="btn btn-primary" data-act="submit">' + T('btn.submit') + '</button>'
          : '<button class="btn btn-primary" data-act="next">' + T('btn.next') + '</button>');
    }
    /* giữ chỗ nút "nộp sớm" ở mọi trạng thái để chân trang không nhảy */
    var early = S.phase === 'text';
    return '<div class="examnav">' +
      '<div class="dots">' + dots + '</div>' +
      '<div class="examnav-btns">' + btns + '</div>' +
      '<button class="linkbtn' + (early ? '' : ' inv') + '" data-act="submit"' +
        (early ? '' : ' tabindex="-1" aria-hidden="true"') + '>' + T('btn.submitEarly') + '</button>' +
      '</div>';
  }

  function buildResult() {
    var details = S.ids.map(function (id, i) {
      var q = qById[id];
      var pick = S.picks[i];
      return { id: id, pick: pick, correct: pick !== undefined && pick === q.a };
    });
    var score = details.filter(function (d) { return d.correct; }).length;
    var total = details.length;
    var ill = null;
    var pass;
    if (S.mode === 'exam') {
      ill = S.ills.map(function (id, j) {
        var set = illById[id];
        var picks = S.illPicks[j] || [];
        var okAll = set.subs.every(function (s, k) { return picks[k] === s.a; });
        return { id: id, picks: picks, ok: okAll };
      });
      score += ill.filter(function (x) { return x.ok; }).length * 2;
      total = EXAM_TEXT + EXAM_ILL * 2;
      pass = score >= PASS;
    } else {
      pass = score / total >= 0.9;
    }
    return { details: details, score: score, total: total, pass: pass, ill: ill };
  }

  function shareResult() {
    var r = S && S.result;
    if (!r) { return; }
    var isExam = S.mode === 'exam';
    var pass = isExam && r.pass;

    var c = document.createElement('canvas');
    c.width = 1080; c.height = 1080;
    var x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 1080, 1080);
    g.addColorStop(0, '#14120f');
    g.addColorStop(1, pass ? '#0e2b20' : '#2a1015');
    x.fillStyle = g;
    x.fillRect(0, 0, 1080, 1080);

    x.strokeStyle = 'rgba(255,255,255,.14)';
    x.lineWidth = 3;
    x.strokeRect(48, 48, 984, 984);

    x.textAlign = 'center';
    x.fillStyle = 'rgba(255,255,255,.55)';
    x.font = '600 30px system-ui, -apple-system, sans-serif';
    x.fillText('THI THỬ 原付免許 · 50cc', 540, 190);

    x.fillStyle = '#ffffff';
    x.font = '700 170px system-ui, -apple-system, sans-serif';
    x.fillText(r.score + '/' + r.total, 540, 520);

    x.fillStyle = pass ? '#5be59b' : (isExam ? '#ff8a9b' : 'rgba(255,255,255,.75)');
    x.font = '700 54px system-ui, -apple-system, sans-serif';
    x.fillText(isExam ? (pass ? 'ĐỖ' : 'CHƯA ĐỖ') : 'KẾT QUẢ LUYỆN TẬP', 540, 610);

    x.fillStyle = 'rgba(255,255,255,.72)';
    x.font = '400 34px system-ui, -apple-system, sans-serif';
    x.fillText('Luyện thi bằng lái xe 50cc tại Nhật', 540, 840);
    x.fillStyle = 'rgba(255,255,255,.42)';
    x.font = '400 28px system-ui, -apple-system, sans-serif';
    x.fillText(new Date().toLocaleDateString('vi-VN'), 540, 900);

    function done(blob) {
      if (!blob) { return; }
      var file = null;
      try { file = new File([blob], 'gentuki-ket-qua.png', { type: 'image/png' }); } catch (e) { }
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: 'Kết quả thi thử 原付' }).catch(function () { });
        return;
      }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'gentuki-ket-qua.png';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      toast('Đã tạo ảnh kết quả.');
    }

    if (c.toBlob) { c.toBlob(done, 'image/png'); }
    else { var d = c.toDataURL('image/png').split(',')[1]; done(null); }
  }

  function viewResult() {
    if (!S || !S.result) { return viewHome(); }
    var r = S.result;
    var isExam = S.mode === 'exam';
    var pct = Math.round((r.score / r.total) * 100);
    var pass = isExam && r.pass;

    var bd = {};
    r.details.forEach(function (d) {
      var cid = qById[d.id].cat;
      bd[cid] = bd[cid] || { n: 0, ok: 0 };
      bd[cid].n++;
      if (d.correct) { bd[cid].ok++; }
    });
    var bdRows = Object.keys(bd).map(function (cid) {
      var c = catById[cid] || { vi: cid, icon: '' };
      var p = Math.round((bd[cid].ok / bd[cid].n) * 100);
      return '<div class="bdrow"><span class="bdname">' + c.icon + ' ' + catName(c) + '</span>' +
        '<span class="bar"><i style="width:' + p + '%"></i></span>' +
        '<span class="bdnum">' + bd[cid].ok + '/' + bd[cid].n + '</span></div>';
    }).join('');

    var wrong = r.details.filter(function (d) { return !d.correct; });
    var wrongHtml = wrong.length ? wrong.map(function (d) {
      var q = qById[d.id];
      var mine = d.pick === 1 ? '○' : d.pick === 0 ? '×' : '—';
      return '<details class="wcard"><summary>' +
        '<span class="wmark">' + (q.a ? '○' : '×') + '</span>' +
        '<span class="wq">' + esc(q.q) + '</span></summary>' +
        '<div class="wbody"><p class="wans">' + T('res.youPicked') + '<b>' + mine + '</b>' + T('res.answerIs') + '<b>' + (q.a ? '○' : '×') + '</b></p>' +
        explainRows(q) + '</div></details>';
    }).join('') : '<p class="empty">' + T('res.none') + '</p>';

    var verdict, sub;
    if (isExam) {
      verdict = pass ? T('res.pass') : T('res.fail');
      sub = pass
        ? T('res.passMsg2') + PASS + '/' + r.total + T('res.passMsg3')
        : T('res.needMore') + Math.max(0, PASS - r.score) + T('res.needMore2') + PASS + '/' + r.total + '.';
    } else {
      verdict = r.score + '/' + r.total;
      sub = T('res.practiceSub');
    }

    var illHtml = '';
    if (r.ill && r.ill.length) {
      illHtml = '<section class="panel"><h3 class="panel-title">' + T('res.ill') + '</h3>' +
        r.ill.map(function (x) {
          var set = illById[x.id];
          return '<div class="illres ' + (x.ok ? 'ok' : 'ng') + '">' +
            '<div class="illres-head">' + (x.ok ? '✓ +2 điểm' : '✗ 0 điểm') + ' · ' + esc(set.title) +
              (set.titleVi ? ' · ' + esc(set.titleVi) : '') + '</div>' +
            '<p>' + esc(((window.ILL_EXP_I18N || {})[set.id] || {})[LANG] || set.exp) + '</p></div>';
        }).join('') + '</section>';
    }

    return '<header class="topbar simple"><div class="topbar-title">' +
        (isExam ? T('res.exam') : T('res.practice')) + '</div></header>' +
      '<main class="wrap">' +
        '<section class="result">' +
          '<div class="ring" style="--p:' + pct + ';--c:' + (pass ? '#157f52' : isExam ? '#c8102e' : '#1f1d1b') + '">' +
            '<div class="ring-in"><b>' + r.score + '</b><span>/' + r.total + '</span></div>' +
          '</div>' +
          '<h2 class="verdict">' + verdict + '</h2>' +
          '<p class="verdict-sub">' + sub + '</p>' +
        '</section>' +
        '<section class="panel"><h3 class="panel-title">' + T('res.cats') + '</h3>' + bdRows + '</section>' +
        illHtml +
        '<section class="panel"><h3 class="panel-title">' + T('res.wrong') + ' (' + wrong.length + ')</h3>' + wrongHtml + '</section>' +
        '<div class="btnrow">' +
          '<button class="btn btn-primary" data-act="' + (isExam ? 'start-exam' : 'again') + '">' +
            (isExam ? T('res.again') : T('res.again')) + '</button>' +
          '<button class="btn btn-ghost" data-act="share">' + T('res.share') + '</button>' +
          '<button class="btn btn-ghost" data-act="back" data-to="home">' + T('res.home') + '</button>' +
        '</div>' +
      '</main>';
  }

  function readiness() {
    var ex = db.exams.slice(0, 5);
    var n = ex.length;
    var scores = ex.map(function (e) { return e.score; });
    var avg = n ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / n) : 0;
    var min = n ? Math.min.apply(null, scores) : 0;
    var state;
    if (!n) { state = 'none'; }
    else if (n >= 5 && min >= 47) { state = 'ready'; }
    else if (n >= 3 && avg >= 45 && min >= 42) { state = 'close'; }
    else { state = 'low'; }
    return { n: n, avg: avg, min: min, state: state, scores: scores };
  }

  function readyCard() {
    var r = readiness();
    var label, desc;
    if (r.state === 'none') {
      label = T('rd.none');
      desc = T('st.ready');
    } else if (r.state === 'ready') {
      label = T('rd.ready');
      desc = T('rd.readyDesc');
    } else if (r.state === 'close') {
      label = T('rd.close');
      desc = T('rd.close1') + r.avg + T('rd.close2') + r.min + T('rd.close3');
    } else {
      label = T('rd.no');
      desc = T('rd.no1') + r.avg + T('rd.no2');
    }
    var dots = '';
    for (var i = 0; i < 5; i++) {
      var s = r.scores[i];
      var cls = 'rdot';
      if (s === undefined) { cls += ' empty'; }
      else if (s >= 47) { cls += ' ok'; }
      else if (s >= 45) { cls += ' mid'; }
      else { cls += ' bad'; }
      dots += '<span class="' + cls + '">' + (s === undefined ? '·' : s) + '</span>';
    }
    return '<section class="panel ready ' + r.state + '">' +
      '<div class="ready-top"><span class="ready-dot"></span><b>' + label + '</b></div>' +
      '<p class="ready-desc">' + desc + '</p>' +
      '<div class="ready-dots">' + dots + '</div>' +
      '<p class="ready-note">' + T('rd.note') + '</p>' +
      '</section>';
  }

  function viewStats() {
    var o = overall();
    var rows = CATS.map(function (c) {
      var st = catStat(c.id);
      var total = (byCat[c.id] || []).length;
      var studied = (byCat[c.id] || []).filter(function (q) { return db.answers[q.id]; }).length;
      return '<div class="bdrow"><span class="bdname">' + c.icon + ' ' + catName(c) + '</span>' +
        '<span class="bar"><i style="width:' + st.rate + '%"></i></span>' +
        '<span class="bdnum">' + st.rate + '%</span>' +
        '<span class="bdsub">' + studied + '/' + total + ' ' + T('unit.q') + '</span></div>';
    }).join('');

    var hist = db.exams.length ? db.exams.slice(0, 6).map(function (e) {
      var d = new Date(e.t);
      var dd = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2);
      return '<div class="histrow"><span>' + dd + '</span>' +
        '<b class="' + (e.pass ? 'ok' : 'ng') + '">' + e.score + '/' + e.total + '</b>' +
        '<span class="pill">' + (e.pass ? T('st.pass') : T('st.fail')) + '</span></div>';
    }).join('') : '<p class="empty">' + T('st.empty') + '</p>';

    return topbar(T('nav.stats')) +
      '<main class="wrap">' +
        streakChip() +
        '<section class="stats">' +
          '<div class="stat"><b>' + o.n + '</b><span>' + T('st.answers') + '</span></div>' +
          '<div class="stat"><b>' + o.rate + '%</b><span>' + T('st.rate') + '</span></div>' +
          '<div class="stat"><b>' + o.studied + '/' + Q.length + '</b><span>' + T('st.studied') + '</span></div>' +
        '</section>' +
        readyCard() +
        '<section class="panel"><h3 class="panel-title">' + T('st.bycat') + '</h3>' + rows + '</section>' +
        '<section class="panel"><h3 class="panel-title">' + T('st.hist') + '</h3>' + hist + '</section>' +
        '<div class="btnrow">' +
          '<button class="btn btn-ghost" data-act="export">' + T('st.export') + '</button>' +
          '<button class="btn btn-danger" data-act="reset">' + T('st.reset') + '</button>' +
        '</div>' +
      '</main>';
  }

  function chkList() {
    var tr = ((window.CHECKLIST_I18N || {})[LANG]) || null;
    return CHECKLIST.map(function (x, i) {
      var on = !!db.checklist['c' + i];
      return '<button class="chk-item' + (on ? ' done' : '') + '" data-act="check" data-k="c' + i + '">' +
        '<span class="chk-box">' + (on ? '✓' : '') + '</span><span>' + esc(tr && tr[i] ? tr[i] : x) + '</span></button>';
    }).join('');
  }

  function viewChecklist() {
    var done = CHECKLIST.filter(function (x, i) { return db.checklist['c' + i]; }).length;
    return topbar(T('nav.check')) +
      '<main class="wrap">' +
        '<section class="panel">' +
          '<h2>' + T('chk.head') + '</h2>' +
          '<p class="muted" id="chkCount">' + done + '/' + CHECKLIST.length +
            T('chk.done') + '</p>' +
          '<div class="chk">' + chkList() + '</div>' +
        '</section>' +
      '</main>';
  }

  function viewSos() {
    return topbar(T('nav.sos')) +
      '<main class="wrap">' +
        '<section class="panel">' +
          '<h2>' + T('sos.head') + '</h2>' +
          '<p class="muted">' + T('sos.lead') + '</p>' +
          '<button class="btn btn-ghost emg-link" data-act="go-emg">📞 ' + T('emg.head') + '</button>' +
          SITS.map(function (s) {
      var tr = ((window.SITUATIONS_I18N || {})[s.id] || {})[LANG] || null;
      return '<details class="sos">' +
        '<summary><span class="sos-icon">' + esc(s.icon) + '</span>' + esc(tr ? tr.title : s.vi) + '</summary>' +
        '<p class="sos-tip">' + esc(tr ? tr.tip : s.tip) + '</p>' +
        '<ul class="sos-list">' +
          s.phrases.map(function (ph, k) {
            return '<li><span class="sos-ja">' + esc(ph.ja) + '</span>' +
              '<span class="sos-r">' + esc(ph.r) + '</span>' +
              '<span class="sos-vi">' + esc(tr && tr.phrases[k] ? tr.phrases[k] : ph.vi) + '</span></li>';
          }).join('') +
        '</ul>' +
      '</details>';
    }).join('') +
        '</section>' +
      '</main>';
  }

  function viewLaw() {
    var L = ((window.LAW_I18N || {})[LANG]) || ((window.LAW_I18N || {}).vi) || null;
    if (!L) { return viewHome(); }
    var bullets = L.bullets.map(function (x) { return '<li>' + x + '</li>'; }).join('');
    var rows = L.rows.map(function (x) {
      return '<div class="cmp-row"><span>' + esc(x.a) + '</span>' +
        '<span><b>' + esc(x.b) + '</b><i>' + esc(x.n) + '</i></span></div>';
    }).join('');
    return topbar(T('nav.law')) +
      '<main class="wrap info">' +
        '<section class="panel">' +
          '<h2>' + esc(L.h1) + '</h2>' +
          '<ul>' + bullets + '</ul>' +
          '<p class="muted">' + esc(L.src) + '</p>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>' + esc(L.h2) + '</h2>' +
          '<p class="muted">' + esc(L.lead) + '</p>' +
          '<div class="cmp">' +
            '<div class="cmp-row cmp-head"><span>' + esc(L.head1) + '</span><span>' + esc(L.head2) + '</span></div>' +
            rows +
          '</div>' +
        '</section>' +
        penaltyBlock() +
      '</main>';
  }

  /* ---------------- vi phạm & mức phạt ---------------- */
  function yen(n) {
    return n.toLocaleString('ja-JP') + ' ¥';
  }

  function penaltyBlock() {
    if (!PENALTIES.length) { return ''; }
    var rows = PENALTIES.map(function (p) {
      var pts = p.points
        ? '<span class="pen-pts">' + p.points + ' ' + T('pen.pt') + '</span>'
        : '<span class="pen-pts pen-zero">0 ' + T('pen.pt') + '</span>';
      var fine = p.fine
        ? '<span class="pen-fine">' + yen(p.fine) + '</span>'
        : '<span class="pen-fine pen-no">' + T('pen.no') + '</span>';
      return '<div class="pen-row">' +
        '<div class="pen-main"><b>' + esc(p.ja) + '</b><span>' + esc(p[LANG] || p.vi) + '</span>' +
          (p.note ? '<i class="pen-note">' + esc(p.note[LANG] || p.note.vi) + '</i>' : '') + '</div>' +
        '<div class="pen-side">' + fine + pts + '</div>' +
      '</div>';
    }).join('');

    var heavy = PENALTIES_HEAVY.map(function (p) {
      return '<div class="pen-heavy-row">' +
        '<div class="pen-main"><b>' + esc(p.ja) + '</b><span>' + esc(p[LANG] || p.vi) + '</span></div>' +
        '<div class="pen-heavy-pun">' + esc(p.punish[LANG] || p.punish.vi) + '</div>' +
        '<div class="pen-heavy-pts">' + esc(p.points[LANG] || p.points.vi) + '</div>' +
      '</div>';
    }).join('');

    var notes = PENALTY_NOTES.map(function (n) { return '<li>' + esc(n[LANG] || n.vi) + '</li>'; }).join('');

    return '<section class="panel">' +
        '<h2>' + T('pen.title') + '</h2>' +
        '<p class="muted">' + T('pen.lead') + '</p>' +
        '<div class="pen-list">' + rows + '</div>' +
      '</section>' +
      '<section class="panel">' +
        '<h2>' + T('pen.heavy') + '</h2>' +
        '<div class="pen-heavy">' + heavy + '</div>' +
        '<ul class="pen-notes">' + notes + '</ul>' +
        '<p class="muted">' + T('pen.src') + '</p>' +
      '</section>';
  }

  function viewConnect() {
    return topbar(T('nav.connect')) +
      '<main class="wrap info">' +
'<section class="panel">' +
          '<h2>' + T('conn.qr') + '</h2>' +
          '<p class="muted">' + T('conn.qrLead') + '</p>' +
          '<div class="qrbox"><img src="assets/qr.png" alt="Mã QR mở app 原付 50cc" width="240" height="240" loading="lazy"></div>' +
          '<p class="qrurl">tranthenghiem27892-afk.github.io/50cc</p>' +
          '<ol class="w-steps">' +
            '<li>' + T('conn.step1') + '</li>' +
            '<li>' + T('conn.step2') + '</li>' +
            '<li>' + T('conn.step3') + '</li>' +
          '</ol>' +
          '<button class="btn btn-primary qrshare" data-act="share-app">' + T('conn.share') + '</button>' +
        '</section>' +
'<section class="panel">' +
          '<h2>' + T('conn.comm') + '</h2>' +
          '<p>' + T('conn.p1') + '</p>' +
          '<p class="muted">' + T('conn.p2') + '</p>' +
        '</section>' +
        creditBlock() +
        changelogBlock() +
      '</main>';
  }

  function modelCard(m) {
    var brand = (window.MODEL_BRANDS || {})[m.brand] || {};
    var tr = ((window.MODELS_I18N || {})[m.id] || {})[LANG] || null;
    var type = tr ? tr.type : m.type;
    var desc = tr ? tr.desc : m.desc;
    var specs = tr ? tr.specs : m.specs;
    var fit = tr ? tr.fit : m.fit;
    var note = tr ? tr.note : m.note;
    return '<article class="model">' +
      '<div class="model-body">' +
        '<div class="model-head"><span class="model-brand">' + esc(m.brand) + '</span>' +
          '<h3>' + esc(String(m.name).replace('(dự kiến)', T('models.planned'))) + '</h3></div>' +
        '<p class="model-romaji">' + esc(m.romaji) + ' · ' + esc(type) + '</p>' +
        '<div class="model-facts">' +
          '<span><b>' + esc(m.cc) + '</b></span>' +
          '<span><b>' + esc(String(m.power).replace('(dự kiến)', T('models.planned'))) + '</b></span>' +
          '<span><b>' + esc(String(m.price).replace(/^xe cũ /, T('models.used'))) + '</b></span>' +
        '</div>' +
        '<p class="model-desc">' + esc(desc) + '</p>' +
        '<ul class="model-specs">' + specs.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
        '<p class="model-fit"><b>' + T('models.fit') + '</b> ' + esc(fit) + '</p>' +
        '<p class="model-note">' + esc(note) + '</p>' +
        '<a class="btn btn-ghost model-link" href="' + esc(m.url || brand.url || '#') + '" target="_blank" rel="noopener noreferrer">' +
          T('models.link') + ' ' + esc(m.brand) + ' ↗</a>' +
      '</div>' +
    '</article>';
  }

  function viewModels() {
    if (!MODELS.length) { return viewHome(); }
    var news = MODELS.filter(function (m) { return m.group === 'new'; });
    var olds = MODELS.filter(function (m) { return m.group !== 'new'; });

    return topbar(T('nav.models')) +
      '<main class="wrap">' +
        '<section class="panel">' +
          '<h2>' + T('models.title') + '</h2>' +
          '<p class="muted">' + T('models.lead1') + ' ' + T('models.lead3') + '</p>' +
          '<p class="muted">' + T('models.lead2') + '</p>' +
        '</section>' +
        '<h3 class="group-title">' + T('models.group1') + '</h3>' +
        news.map(modelCard).join('') +
        '<h3 class="group-title">' + T('models.group2') + '</h3>' +
        '<p class="muted group-note">' + T('models.note') + '</p>' +
        olds.map(modelCard).join('') +
      '</main>';
  }

  function viewGear() {
    if (!GEAR.length) { return viewHome(); }
    var items = GEAR.map(function (g) {
      var tr = ((window.GEAR_I18N || {})[g.ja] || {})[LANG] || null;
      return '<article class="gear-item">' +
        '<div class="gear-icon">' + esc(g.icon) + '</div>' +
        '<div class="gear-body">' +
          '<div class="gear-head"><h3>' + esc(g.ja) + '</h3>' +
            (g.must ? '<span class="gear-must">' + T('gear.must') + '</span>' : '<span class="gear-opt">' + T('gear.opt') + '</span>') + '</div>' +
          '<p class="gear-vi">' + esc(tr ? tr.label : g.vi) + '</p>' +
          '<p class="gear-desc">' + esc(tr ? tr.desc : g.desc) + '</p>' +
          '<p class="gear-tip">' + esc(tr ? tr.tip : g.tip) + '</p>' +
        '</div>' +
      '</article>';
    }).join('');

    var avoidList = ((window.GEAR_AVOID_I18N || {})[LANG]) || GEAR_AVOID;
    var avoid = avoidList.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');

    return topbar(T('nav.gear')) +
      '<main class="wrap">' +
        '<section class="panel">' +
          '<h2>' + T('gear.title') + '</h2>' +
          '<p class="muted">' + T('gear.lead') + '</p>' +
        '</section>' +
        items +
        '<section class="panel gear-avoid">' +
          '<h2>' + T('gear.avoid') + '</h2>' +
          '<ul>' + avoid + '</ul>' +
        '</section>' +
      '</main>';
  }

  function changelogBlock() {
    if (!CHANGELOG.length) { return ''; }
    var tr = ((window.CHANGELOG_I18N || {})[LANG]) || null;
    var rows = CHANGELOG.map(function (c, i) {
      var src = (tr && tr[i]) ? tr[i] : { t: c.title, i: c.items };
      return '<details class="cl">' +
        '<summary><b>' + esc(c.v) + '</b><span>' + esc(src.t) + '</span></summary>' +
        '<ul>' + src.i.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '</details>';
    }).join('');
    return '<section class="panel">' +
      '<h2>' + T('cl.title') + '</h2>' +
      '<p class="muted">' + T('cl.lead') + '</p>' +
      rows +
      '</section>';
  }

  function viewEmergency() {
    var blocks = EMERGENCY.map(function (g) {
      var rows = g.items.map(function (x) {
        return '<a class="emg-row" href="tel:' + esc(x.tel) + '">' +
          '<span class="emg-num">' + esc(x.num) + '</span>' +
          '<span class="emg-txt"><b>' + esc(x.ja) + '</b>' +
            '<i>' + esc(x[LANG] || x.vi) + '</i>' +
            '<em>' + esc((x.note && (x.note[LANG] || x.note.vi)) || '') + '</em></span>' +
          '<span class="emg-call">📞</span>' +
        '</a>';
      }).join('');
      return '<section class="panel emg-group"><h2>' + esc(g[LANG] || g.vi) + '</h2>' + rows + '</section>';
    }).join('');

    var tips = EMERGENCY_TIPS.map(function (x) { return '<li>' + esc(x[LANG] || x.vi) + '</li>'; }).join('');

    return topbar(T('nav.emg')) +
      '<main class="wrap info">' +
        '<section class="panel">' +
          '<h2>' + T('emg.head') + '</h2>' +
          '<p class="muted">' + T('emg.lead') + '</p>' +
        '</section>' +
        blocks +
        '<section class="panel"><h2>' + T('emg.tips') + '</h2><ul class="emg-tips">' + tips + '</ul></section>' +
      '</main>';
  }

  function viewInfo() {
    var secs = ((window.INFO_I18N || {})[LANG]) || ((window.INFO_I18N || {}).vi) || [];
    var html = secs.map(function (sec) {
      var body = '';
      (sec.ps || []).forEach(function (x) { body += '<p>' + esc(x) + '</p>'; });
      if (sec.lis && sec.lis.length) {
        body += '<ul>' + sec.lis.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      }
      if (sec.warn) { body += '<p class="warn">' + esc(sec.warn) + '</p>'; }
      return '<section class="panel"><h2>' + esc(sec.h) + '</h2>' + body + '</section>';
    }).join('');
    return topbar(T('nav.info')) + '<main class="wrap info">' + html + '</main>';
  }

  /* ---------------- actions ---------------- */
  function navSnapshot() {
    var copy = null;
    try { copy = S ? JSON.parse(JSON.stringify(S)) : null; } catch (err) { copy = null; }
    return { nav: 1, screen: screen, S: copy };
  }
  function navSync() {
    try { history.replaceState(navSnapshot(), ''); } catch (err) { }
  }

  function go(name) {
    screen = name;
    try { history.pushState(navSnapshot(), ''); } catch (err) { }
    render();
  }

  function startPractice(catId) {
    var list = shuffle(byCat[catId] || []);
    if (!list.length) { return; }
    S = { mode: 'practice', cat: catId, ids: list.map(function (q) { return q.id; }),
          i: 0, picks: list.map(function () { return undefined; }) };
    go('quiz');
  }

  function startGram(pat) {
    var list = pat ? (byPat[pat] || []) : GQ;
    if (!list.length) { return; }
    var ids = shuffle(list.map(function (q) { return q.id; }));
    S = { mode: 'practice', cat: 'gram', label: pat || 'Bẫy ngôn ngữ',
          ids: ids, i: 0, picks: ids.map(function () { return undefined; }) };
    go('quiz');
  }

  function startHard() {
    var pool = Q.slice().sort(function (a, b) { return b.q.length - a.q.length; }).slice(0, 60);
    var ids = shuffle(pool.map(function (q) { return q.id; })).slice(0, 20);
    S = { mode: 'practice', cat: null, label: 'Đề khó',
          ids: ids, i: 0, picks: ids.map(function () { return undefined; }) };
    go('quiz');
  }

  /* ---------------- flashcard từ vựng ---------------- */
  var F = null;

  function startCards() {
    var keys = Object.keys(VOCAB).filter(function (k) {
      var v = VOCAB[k];
      return v && v.r && v.m;
    });
    if (!keys.length) { return; }
    var pool = keys.filter(function (k) { return (db.cards[k] || 0) < 3; });
    if (pool.length < 8) { pool = keys; }
    F = { keys: shuffle(pool).slice(0, 12), i: 0, open: false, ok: 0, no: 0 };
    go('cards');
  }

  function nextCard() {
    if (!F) { return; }
    F.i++;
    F.open = false;
    render();
  }

  function viewCards() {
    if (!F) { return viewHome(); }
    if (F.i >= F.keys.length) {
      return topbar(T('nav.cards')) +
        '<main class="wrap"><section class="panel fcdone">' +
          '<h2>' + T('cards.done') + '</h2>' +
          '<p>' + T('cards.ok1') + ' <b>' + F.ok + '</b> ' + T('cards.ok2') + ' <b>' + F.no + '</b> ' + T('cards.ok3') + '</p>' +
          '<p class="muted">' + T('cards.note') + '</p>' +
          '<div class="btnrow">' +
            '<button class="btn btn-primary" data-act="cards-again">' + T('cards.new') + '</button>' +
            '<button class="btn btn-ghost" data-act="back" data-to="home">' + T('res.home') + '</button>' +
          '</div>' +
        '</section></main>';
    }
    var k = F.keys[F.i];
    var v = VOCAB[k];
    var box = db.cards[k] || 0;
    var hv = hanViet(k);
    var anim = F.anim || '';
    var flipCls = F.flip ? ' ' + F.flip : '';
    F.anim = '';
    F.flip = '';

    return topbar(T('nav.cards')) +
      '<main class="wrap fcmain">' +
        '<div class="fc-meta">' + T('cards.meta') + ' ' + (F.i + 1) + '/' + F.keys.length +
          ' · ' + T('cards.box') + ' ' + (box || 1) + '/3</div>' +
        '<div class="fc3d' + (F.open ? ' back' : '') + (anim ? ' ' + anim : '') + flipCls + '" data-act="flip">' +
          '<div class="fc3d-inner">' +
            '<div class="fc-face fc-front">' +
              '<span class="fc-term">' + esc(k) + '</span>' +
              '<span class="fc-hint">' + T('cards.hint') + '</span>' +
            '</div>' +
            '<div class="fc-face fc-back">' +
              '<span class="fc-term">' + esc(k) + '</span>' +
              '<span class="fc-read">' + esc(v.r) + (hv ? ' · ' + esc(hv) : '') + '</span>' +
              '<span class="fc-mean">' + esc(vMean(k, v)) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        (F.open
          ? '<div class="btnrow fc-btns">' +
              '<button class="btn btn-ghost" data-act="card-no">' + T('cards.hard') + '</button>' +
              '<button class="btn btn-primary" data-act="card-yes">' + T('cards.easy') + '</button>' +
            '</div>'
          : '<button class="btn btn-primary fc-show" data-act="flip">' + T('cards.flip') + '</button>') +
      '</main>';
  }

  function cardSwipe(dir) {
    if (!F) { return; }
    if (dir > 0) {
      if (F.i + 1 >= F.keys.length) { return; }
      F.i++;
      F.anim = 'in-left';
    } else {
      if (F.i === 0) { return; }
      F.i--;
      F.anim = 'in-right';
    }
    F.open = false;
    render();
  }

  /* cử chỉ: chạm = lật, lướt ngang = đổi thẻ */
  var cardPtr = null;
  var cardSwipeAt = 0;
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest('.fc3d');
    if (!el) { return; }
    cardPtr = { x: e.clientX, y: e.clientY, t: Date.now() };
  });
  document.addEventListener('click', function (e) {
    var opt = e.target.closest('.lang-opt');
    if (opt) {
      var l = opt.getAttribute('data-lang');
      if (l && l !== LANG) {
        applyLang(l);
        render(true);
        try { fxLoad(false); } catch (err) { }
      }
      return;
    }
    var btn = e.target.closest('[data-act="langopen"]');
    if (btn) {
      var dd = btn.closest('.lang-dd');
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    var openDd = document.querySelector('.lang-dd.open');
    if (openDd && !e.target.closest('.lang-dd')) {
      openDd.classList.remove('open');
      var b2 = openDd.querySelector('[data-act="langopen"]');
      if (b2) { b2.setAttribute('aria-expanded', 'false'); }
    }
  });

  document.addEventListener('pointerup', function (e) {
    if (!cardPtr) { return; }
    var dx = e.clientX - cardPtr.x;
    var dy = e.clientY - cardPtr.y;
    var dt = Date.now() - cardPtr.t;
    cardPtr = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) && dt < 900) {
      cardSwipeAt = Date.now();
      cardSwipe(dx < 0 ? 1 : -1);
    }
  });

  function viewGram() {
    var st = gStat();
    var rows = PATS.map(function (pat) {
      var list = byPat[pat], n = 0, ok = 0;
      list.forEach(function (q) {
        var a = db.answers[q.id];
        if (a) { n += a.n; ok += a.ok; }
      });
      var rate = n ? Math.round(ok / n * 100) : 0;
      return '<button class="catrow" data-act="gram-pat" data-pat="' + esc(pat) + '">' +
        '<span class="catrow-icon">🔤</span>' +
        '<span class="catrow-main"><h3>' + esc(pat) + '</h3>' +
          '<p>' + list.length + ' ' + T('unit.q') + ' · ' + (n ? T('gr.done') + ' ' + rate + '%' : T('gr.notyet')) + '</p>' +
          '<span class="bar"><i style="width:' + rate + '%"></i></span></span>' +
        '<span class="chev">›</span></button>';
    }).join('');

    return topbar(T('nav.gram')) +
      '<main class="wrap">' +
        '<section class="panel gramintro">' +
          '<h2>' + T('gr.intro') + '</h2>' +
          '<p>' + T('gr.lead') + '</p>' +
          '<p class="muted">' + GQ.length + ' ' + T('unit.q') + ' · ' + (st.n ? T('gr.done') + ' ' + st.rate + '%' : T('gr.none')) + '</p>' +
          '<button class="btn btn-primary" data-act="gram-all">' + T('gr.all1') + ' ' + GQ.length + ' ' + T('gr.all2') + '</button>' +
        '</section>' +
        '<div class="catlist">' + rows + '</div>' +
      '</main>';
  }

  function startExam() {
    var ids = shuffle(Q).slice(0, Math.min(EXAM_TEXT, Q.length)).map(function (q) { return q.id; });
    var ills = shuffle(ILLS).slice(0, EXAM_ILL).map(function (x) { return x.id; });
    S = { mode: 'exam', phase: 'text', ids: ids, i: 0,
          picks: ids.map(function () { return undefined; }),
          ills: ills, j: 0,
          illPicks: ills.map(function () { return [undefined, undefined, undefined]; }),
          startedAt: Date.now(), deadline: Date.now() + EXAM_TIME };
    go('quiz');
    startTimer();
  }

  function startReview() {
    var ids = db.wrong.filter(function (id) { return qById[id]; });
    if (!ids.length) { toast('Chưa có câu sai nào để ôn.'); return; }
    ids = shuffle(ids);
    S = { mode: 'practice', cat: null, ids: ids, i: 0,
          picks: ids.map(function () { return undefined; }) };
    go('quiz');
  }

  function answer(v) {
    if (!S) { return; }
    if (S.picks[S.i] !== undefined) { return; }
    S.picks[S.i] = v;
    if (S.mode !== 'exam') {
      var q = localizeQ(qById[S.ids[S.i]]);
      record(q.id, q.a === v);
    }
    render(true);
  }

  /* vuốt ngang để đổi câu khi luyện theo nhóm */
  var pracSwipe = null;
  document.addEventListener('pointerdown', function (e) {
    if (!S || S.mode !== 'practice' || screen !== 'quiz') { return; }
    if (e.target.closest('a, input, textarea, .qctl, .answers, .examfooter, .quizbar, .topbar, .progress')) { return; }
    pracSwipe = { x: e.clientX, y: e.clientY, t: Date.now() };
  });
  document.addEventListener('pointercancel', function () { pracSwipe = null; });
  document.addEventListener('touchend', function (e) {
    if (!pracSwipe || !e.changedTouches || !e.changedTouches.length) { return; }
    var tt = e.changedTouches[0];
    var dx = tt.clientX - pracSwipe.x, dy = tt.clientY - pracSwipe.y, dt = Date.now() - pracSwipe.t;
    pracSwipe = null;
    if (dt > 900 || Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) { return; }
    e.preventDefault();
    if (dx < 0) { if (S && S.i + 1 < S.ids.length) { S.anim = 'in-left'; next(); } }
    else { S.anim = 'in-right'; prev(); }
  }, { passive: false });
  document.addEventListener('pointerup', function (e) {
    if (!pracSwipe) { return; }
    var dx = e.clientX - pracSwipe.x;
    var dy = e.clientY - pracSwipe.y;
    var dt = Date.now() - pracSwipe.t;
    pracSwipe = null;
    if (dt > 900 || Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) { return; }
    if (dx < 0) {
      if (S && S.i + 1 < S.ids.length) { S.anim = 'in-left'; next(); }
    } else {
      S.anim = 'in-right';
      prev();
    }
  });

  function next() {
    if (!S) { return; }
    if (S.mode === 'exam' && S.phase === 'ill') {
      if (S.j + 1 < S.ills.length) { S.j++; render(); }
      return;
    }
    if (S.i + 1 >= S.ids.length) {
      if (S.mode === 'exam') { S.phase = 'ill'; S.j = 0; render(); return; }
      finishPractice();
      return;
    }
    S.i++;
    S.viOn = false;
    render();
  }

  function prev() {
    if (!S) { return; }
    if (S.mode === 'exam' && S.phase === 'ill') {
      if (S.j > 0) { S.j--; } else { S.phase = 'text'; S.i = S.ids.length - 1; }
      render();
      return;
    }
    if (S.i === 0) { return; }
    S.i--;
    S.viOn = false;
    render();
  }

  function finishPractice() {
    S.result = buildResult();
    go('result');
  }

  function submitExam(timeout) {
    if (!S) { return; }
    stopTimer();
    S.result = buildResult();
    var r = S.result;
    r.details.forEach(function (d) { record(d.id, d.correct); });
    db.exams.unshift({ t: Date.now(), score: r.score, total: r.total, pass: r.pass });
    db.exams = db.exams.slice(0, 30);
    saveDB();
    go('result');
    if (timeout) { toast('Hết giờ — bài đã được nộp tự động.'); }
  }

  /* ---------------- timer ---------------- */
  function startTimer() {
    stopTimer();
    timerId = setInterval(function () {
      if (!S || !S.deadline) { return; }
      var left = S.deadline - Date.now();
      if (left <= 0) { stopTimer(); submitExam(true); return; }
      paintTimer(left);
    }, 1000);
    paintTimer(S.deadline - Date.now());
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function paintTimer(left) {
    var el = document.getElementById('timer');
    if (!el) { return; }
    if (left === undefined) { left = S ? S.deadline - Date.now() : 0; }
    el.textContent = fmtTime(left);
    el.classList.toggle('warn', left < 5 * 60 * 1000);
  }

  /* ---------------- render ---------------- */

  /* chặn pull-to-refresh của trình duyệt trên màn hình chính */
  var PTR_Y = null;
  document.addEventListener('touchstart', function (e) {
    PTR_Y = null;
    if (document.documentElement.classList.contains('sc-home')) { return; }
    if (!e.touches || e.touches.length !== 1) { return; }
    if (e.target.closest('#chatPanel, .chat-panel, .sheet, .sheet-wrap, input, textarea, select, .cnt-scroll')) { return; }
    if ((window.scrollY || window.pageYOffset || 0) > 0) { return; }
    PTR_Y = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (PTR_Y === null || !e.touches || !e.touches.length) { return; }
    if ((window.scrollY || window.pageYOffset || 0) > 0) { PTR_Y = null; return; }
    var dy = e.touches[0].clientY - PTR_Y;
    if (dy > 6 && e.cancelable) { e.preventDefault(); }
  }, { passive: false });
  document.addEventListener('touchend', function () { PTR_Y = null; }, { passive: true });
  document.addEventListener('touchcancel', function () { PTR_Y = null; }, { passive: true });

  /* ---------------- trợ lý hỏi đáp (offline + AI tuỳ chọn) ---------------- */
  var CHAT = { open: false, msgs: [], busy: false };
  var AI_CFG_KEY = 'gentsuki.ai.v1';

  function aiCfg() {
    try { return JSON.parse(localStorage.getItem(AI_CFG_KEY)) || {}; } catch (e) { return {}; }
  }
  function aiSave(c) {
    try { localStorage.setItem(AI_CFG_KEY, JSON.stringify(c)); } catch (e) { }
  }
  function chatNorm(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9fff]+/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function chatLang() { return LANG === 'zh' ? 'zh' : LANG === 'fil' ? 'fil' : 'vi'; }

  function chatCjkGrams(n) {
    var out = [];
    var stop = { '可以': 1, '什么': 1, '怎么': 1, '是否': 1, '多少': 1, '请问': 1, '这个': 1, '那个': 1, '一下': 1, '怎样': 1, '如何': 1, '为什': 1, '吗吗': 1 };
    var cjk = n.replace(/[^\u4e00-\u9fff]/g, '');
    for (var i = 0; i + 1 < cjk.length; i++) {
      var g = cjk.slice(i, i + 2);
      if (!stop[g]) { out.push(g); }
    }
    return out;
  }

  function chatFaq(text) {
    var n = chatNorm(text), best = null, bestScore = 0;
    var grams = LANG === 'vi' ? [] : chatCjkGrams(n);
    var stopFil = { 'ang': 1, 'mga': 1, 'ng': 1, 'sa': 1, 'ay': 1, 'at': 1, 'na': 1, 'ba': 1, 'po': 1, 'ko': 1, 'mo': 1, 'si': 1, 'ni': 1, 'sa': 1, 'para': 1, 'hindi': 1, 'may': 1, 'pag': 1, 'ito': 1, 'iyan': 1 };
    var toks = LANG === 'vi' ? [] : n.split(' ').filter(function (w) { return w.length >= 4 && !stopFil[w]; });
    (window.FAQ || []).forEach(function (f) {
      var sc = 0;
      var aliases = ((window.FAQ_ALIAS || {})[f.id] || {})[LANG] || [];
      (f.kw || []).concat(aliases).forEach(function (k) {
        var kk = chatNorm(k);
        if (kk && n.indexOf(kk) >= 0) {
          var w = kk.length + (/[\u3040-\u30ff\u4e00-\u9fff]/.test(kk) ? 3 : 0);
          if (/^[a-z0-9 ]+$/.test(kk)) {
            var esc2 = kk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            try {
              if (new RegExp('(^|[^a-z0-9])' + esc2 + '([^a-z0-9]|$)').test(n)) { w += 2; }
            } catch (e) { }
          }
          sc += Math.max(4, w);
        }
      });
      if (LANG !== 'vi') {
        var ans = chatNorm((f.a && (f.a[chatLang()] || f.a.vi)) || '');
        grams.forEach(function (g) { if (ans.indexOf(g) >= 0) { sc += 6; } });
        toks.forEach(function (w) { if (ans.indexOf(w) >= 0) { sc += 3; } });
      }
      if (sc > 0 && sc >= bestScore) { bestScore = sc; best = f; }
    });
    return bestScore >= 6 ? best : null;
  }

  function chatSearchQ(text) {
    var n = chatNorm(text);
    var toks = n.split(' ').filter(function (w) { return w.length >= 2; });
    if (!toks.length || !window.Q) { return []; }
    var out = [];
    window.Q.forEach(function (q) {
      var hay = chatNorm((VI[q.id] || '') + ' ' + (q.exp || '') + ' ' + (q.trap || '') + ' ' + (q.q || ''));
      var sc = 0;
      toks.forEach(function (w) { if (hay.indexOf(w) >= 0) { sc += 1; } });
      if (sc >= 2) { out.push({ q: q, sc: sc }); }
    });
    out.sort(function (a, b) { return b.sc - a.sc; });
    return out.slice(0, 3);
  }

  var PEN_TOPICS = [
    { k: ['den do', 'vuot den', 'red light', '红灯', 'pula', 'lumampas sa pula'], q: '信号無視' },
    { k: ['toc do', 'speed', '超速', 'bilis', 'sobra sa bilis'], q: '速度超過' },
    { k: ['dien thoai', 'cellphone', '手机', 'telepono'], q: '携帯電話' },
    { k: ['mu bao hiem', 'helmet', '头盔', 'sombrero', 'walang helmet'], q: 'ヘルメット' },
    { k: ['cho 2', 'hai nguoi', 'cho nguoi', 'angkas', 'pasahero', '载人'], q: '乗車積載' },
    { k: ['khong bat den', 'den xe', 'ilaw', '未开灯', 'walang ilaw'], q: '無灯火' },
    { k: ['xi nhan', 'signal', '转向灯'], q: '合図' },
    { k: ['dung lai', '止まれ', 'stop', 'tigil'], q: '一時不停止' },
    { k: ['ruou', 'con ', 'alcohol', '酒', 'alak', 'lasing'], q: '酒' },
    { k: ['khong co bang', 'vo bang', '無免許', 'walang lisensya'], q: '無免許' },
    { k: ['bao hiem', 'insurance', '自賠責', 'seguro'], q: '無保険' },
    { k: ['bo chay', 'hit and run', '逃逸', 'takas'], q: '救護義務' }
  ];

  function penItem(text, key) {
    var n = chatNorm(text);
    var hit = null;
    PEN_TOPICS.forEach(function (tp) {
      if (hit) { return; }
      tp.k.forEach(function (k) {
        if (!hit && n.indexOf(chatNorm(k)) >= 0) { hit = tp.q; }
      });
    });
    var list = [];
    if (window.PENALTIES) { list = list.concat(window.PENALTIES); }
    if (window.PENALTIES_HEAVY) { list = list.concat(window.PENALTIES_HEAVY); }
    var found = [];
    list.forEach(function (it) {
      var hay = chatNorm([it.vi, it.zh, it.fil, it.ja].filter(Boolean).join(' '));
      if (hay.indexOf(chatNorm(key || hit || '')) >= 0 && (key || hit)) { found.push(it); }
    });
    return found.length ? found : null;
  }

  function penLine(it) {
    var lang = chatLang();
    var name = it[lang] || it.vi || it.ja;
    var out = '<b>' + esc(name) + '</b>';
    if (it.fine !== undefined) {
      if (it.fine > 0) {
        out += ' — ¥' + it.fine.toLocaleString('en-US') + ' · ' + it.points + ' ' + T('chat.pen.pts');
      } else {
        var note = (it.note && (it.note[lang] || it.note.vi)) || T('chat.pen.court');
        out += ' — ' + esc(note) + ' · ' + it.points + ' ' + T('chat.pen.pts');
      }
    } else {
      var punish = (it.punish && (it.punish[lang] || it.punish.vi)) || '';
      var pts = (it.points && (it.points[lang] || it.points.vi)) || '';
      out += ' — ' + esc(punish) + (pts ? ' · ' + esc(pts) : '');
    }
    return '<div class="chat-pen">' + out + '</div>';
  }

  function chatPenalty(text, allowGeneric) {
    var n = chatNorm(text);
    var asks = /phat|vi pham|muc phat|tien phat|反則|罰|点|multa|fine|penalt|suspens|revoke|扣分/.test(n);
    var items = penItem(text);
    if (!items && !(allowGeneric && asks)) { return ''; }
    var body = '';
    if (items) {
      body = items.slice(0, 3).map(penLine).join('');
    } else {
      var picks = ['信号無視', '速度超過（15〜20km/h未満）', '携帯電話', 'ヘルメット', '乗車積載'];
      var list = (window.PENALTIES || []).filter(function (it) {
        return picks.some(function (pk) { return (it.ja || '').indexOf(pk) >= 0; });
      });
      body = (list.length ? list : (window.PENALTIES || []).slice(0, 5)).map(penLine).join('');
      body = '<p class="chat-sub">' + T('chat.pen.list') + '</p>' + body +
        '<p class="chat-sub">' + T('chat.pen.more') + '</p>';
    }
    return '<p class="chat-sub">' + T('chat.pen.head') + '</p>' + body +
      '<p class="chat-pnote">' + T('chat.pen.note') + '</p>';
  }

  function chatAnswer(text) {
    var pen = chatPenalty(text, false);
    if (pen) { return pen; }
    var f = chatFaq(text);
    if (f) {
      var ans = (f.a && (f.a[chatLang()] || f.a.vi)) || '';
      var btn = f.screen
        ? '<button class="chat-link" data-act="chat-go" data-screen="' + f.screen + '">' + T('chat.openSec') + ' →</button>'
        : '';
      return '<p>' + esc(ans) + '</p>' + btn;
    }
    pen = chatPenalty(text, true);
    if (pen) { return pen; }
    var hits = chatSearchQ(text);
    if (hits.length) {
      var cards = hits.map(function (h) {
        var q = localizeQ(h.q);
        var exp = String(q.exp || '').replace(/^(Đúng|Sai)\.\s+/i, '').slice(0, 110);
        return '<button class="chat-q" data-act="chat-q" data-id="' + esc(q.id) + '">' +
          '<b>' + esc(String(q.q || '').slice(0, 70)) + '…</b>' +
          '<i>' + esc(exp) + '</i>' +
          '<span>' + T('chat.openQ') + ' →</span>' +
        '</button>';
      }).join('');
      return '<p class="chat-sub">' + T('chat.found') + '</p>' + cards;
    }
    var sug = ['signal', 'passenger', 'railway', 'expressway'];
    var chips = sug.map(function (id) {
      var f = (window.FAQ || []).filter(function (x) { return x.id === id; })[0];
      if (!f) { return ''; }
      var label = (f.a && f.a[chatLang()] ? f.a[chatLang()] : '').split(/[.:：]/)[0].slice(0, 26);
      return '<button class="chat-chip" data-act="chat-chip" data-text="' + esc(label) + '">' + esc(label) + '…</button>';
    }).join('');
    return '<p>' + T('chat.unknown') + '</p>' + (chips ? '<div class="chat-sug">' + chips + '</div>' : '');
  }

  function chatAI(text) {
    var cfg = aiCfg();
    var langName = LANG === 'zh' ? 'Simplified Chinese' : LANG === 'fil' ? 'Filipino' : 'Vietnamese';
    var sys = 'You are a study assistant for the Japanese 50cc moped licence (原付免許) exam. ' +
      'Answer in ' + langName + ', max 120 words, practical and specific about Japanese traffic law. ' +
      'If unsure, say so and suggest checking the 免許センター. Never invent article numbers.';
    if (cfg.provider === 'openrouter') {
      return fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
        body: JSON.stringify({
          model: cfg.model || 'openai/gpt-4o-mini',
          messages: [{ role: 'system', content: sys }, { role: 'user', content: text }],
          temperature: 0.2, max_tokens: 500
        })
      }).then(function (r) {
        if (!r.ok) { throw r.status; }
        return r.json();
      }).then(function (j) {
        return (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
      });
    }
    var model = cfg.model || 'gemini-2.0-flash';
    return fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) +
      ':generateContent?key=' + encodeURIComponent(cfg.key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: sys }] },
        contents: [{ role: 'user', parts: [{ text: text }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 512 }
      })
    }).then(function (r) {
      if (!r.ok) { throw r.status; }
      return r.json();
    }).then(function (j) {
      var c = j && j.candidates && j.candidates[0];
      return (c && c.content && c.content.parts) ? c.content.parts.map(function (p) { return p.text || ''; }).join('') : '';
    });
  }

  function chatBubble(role, html) {
    var m = { role: role, html: html };
    CHAT.msgs.push(m);
    var body = document.getElementById('chatBody');
    if (body) {
      var el = document.createElement('div');
      el.className = 'chat-msg ' + role;
      el.innerHTML = html;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      m.el = el;
    }
    return m;
  }

  function chatSwap(m, html) {
    m.html = html;
    if (m.el) {
      m.el.innerHTML = html;
      var body = document.getElementById('chatBody');
      if (body) { body.scrollTop = body.scrollHeight; }
    }
  }

  function chatSend(text) {
    text = String(text || '').trim();
    if (!text || CHAT.busy) { return; }
    chatBubble('me', '<p>' + esc(text) + '</p>');
    var cfg = aiCfg();
    var useAI = !!(cfg.on && cfg.key);
    CHAT.busy = true;
    var m = chatBubble('bot', '<p class="chat-typing">' + T('chat.thinking') + '</p>');

    function finish(html, tag) {
      chatSwap(m, '<div class="chat-tag">' + esc(tag) + '</div>' + html);
      CHAT.busy = false;
    }

    if (useAI) {
      chatAI(text).then(function (ans) {
        if (ans) { finish('<p>' + esc(ans) + '</p>', T('chat.aiTag')); }
        else { finish(chatAnswer(text), T('chat.fromApp')); }
      }).catch(function (code) {
        var err = code === 401 ? T('chat.keyBad') : code === 429 ? T('chat.quota') : T('chat.aiErr');
        finish(chatAnswer(text) + '<p class="chat-err">' + esc(err) + '</p>', T('chat.fromApp'));
      });
      return;
    }
    setTimeout(function () { finish(chatAnswer(text), T('chat.fromApp')); }, 180);
  }

  function chatSettingsHTML() {
    var cfg = aiCfg();
    return '<div class="chat-set" id="chatSet" hidden>' +
      '<b>' + T('chat.aiTitle') + '</b>' +
      '<p class="chat-warn">' + T('chat.aiDesc') + '</p>' +
      '<label class="chat-row"><span>' + T('chat.provider') + '</span>' +
        '<select id="aiProv"><option value="gemini">Gemini</option><option value="openrouter">OpenRouter</option></select></label>' +
      '<label class="chat-row"><span>' + T('chat.key') + '</span><input id="aiKey" type="password" autocomplete="off" placeholder="AIza… / sk-or-…"></label>' +
      '<label class="chat-row"><span>' + T('chat.model') + '</span><input id="aiModel" type="text" placeholder="gemini-2.0-flash"></label>' +
      '<p class="chat-priv">' + T('chat.privacy') + '</p>' +
      '<div class="chat-setbtns">' +
        '<button class="btn btn-primary" data-act="chat-save">' + T('chat.save') + '</button>' +
        '<button class="btn btn-ghost" data-act="chat-clear">' + T('chat.clear') + '</button>' +
      '</div>' +
    '</div>';
  }

  function chatPanelHTML() {
    var chips = [T('chat.chip1'), T('chat.chip2'), T('chat.chip3'), T('chat.chip4'), T('chat.chip5'), T('chat.chip6')]
      .map(function (c) { return '<button class="chat-chip" data-act="chat-chip" data-text="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    return '<div class="chat-head">' +
        '<span class="chat-ava" aria-hidden="true">原</span>' +
        '<div class="chat-ttl"><b>' + T('chat.title') + '</b><i>' + T('chat.sub') + '</i></div>' +
        '<div class="chat-hbtns">' +
          '<button data-act="chat-set" aria-label="' + T('chat.set') + '">⚙</button>' +
          '<button data-act="chat-close" aria-label="Close">✕</button>' +
        '</div></div>' +
      '<div class="chat-body" id="chatBody"></div>' +
      '<div class="chat-chips" id="chatChips">' + chips + '</div>' +
      '<form class="chat-form" id="chatForm">' +
        '<input id="chatInput" type="text" autocomplete="off" placeholder="' + T('chat.ph') + '">' +
        '<button type="submit" aria-label="' + T('chat.send') + '">→</button>' +
      '</form>' +
      '<p class="chat-note">' + T('chat.note') + '</p>' +
      chatSettingsHTML();
  }

  function chatMount() {
    if (document.getElementById('chatPanel')) { return; }
    var d = document.createElement('section');
    d.className = 'chat-panel';
    d.id = 'chatPanel';
    d.innerHTML = chatPanelHTML();
    document.body.appendChild(d);
    var body = document.getElementById('chatBody');
    CHAT.msgs.forEach(function (m) {
      var el = document.createElement('div');
      el.className = 'chat-msg ' + m.role;
      el.innerHTML = m.html;
      m.el = el;
      if (body) { body.appendChild(el); }
    });
    chatFabLabel();
  }

  function chatFabLabel() {
    var f = document.getElementById('chatFab');
    if (!f) { return; }
    f.setAttribute('aria-label', T('chat.open'));
    var tx = f.querySelector('.cf-txt');
    if (tx) { tx.textContent = T('chat.title'); }
  }

  function chatOpen() {
    chatMount();
    var panel = document.getElementById('chatPanel');
    if (panel) { panel.classList.add('open'); }
    document.body.classList.add('chat-open');
    CHAT.open = true;
    var body = document.getElementById('chatBody');
    if (body) { body.scrollTop = body.scrollHeight; }
    var inp = document.getElementById('chatInput');
    if (inp) { setTimeout(function () { inp.focus(); }, 200); }
  }
  function chatClose() {
    var panel = document.getElementById('chatPanel');
    if (panel) { panel.classList.remove('open'); }
    document.body.classList.remove('chat-open');
    CHAT.open = false;
  }
  function chatGoChat() {
    chatClose();
    go('home');
  }

  document.addEventListener('click', function (e) {
    var t2 = e.target.closest('[data-act^="chat-"]');
    if (!t2) { return; }
    var act = t2.getAttribute('data-act');
    if (act === 'chat-open') { chatOpen(); return; }
    if (act === 'chat-close') { chatClose(); return; }
    if (act === 'chat-chip') { chatSend(t2.getAttribute('data-text') || t2.textContent); return; }
    if (act === 'chat-go') {
      var sc = t2.getAttribute('data-screen');
      chatClose();
      if (sc) { go(sc); }
      return;
    }
    if (act === 'chat-q') {
      var id = t2.getAttribute('data-id');
      var q = id ? qById[id] : null;
      chatClose();
      if (q) {
        S = { mode: 'practice', cat: q.cat, ids: [q.id], i: 0, picks: [undefined] };
        go('quiz');
      }
      return;
    }
    if (act === 'chat-set') {
      var s2 = document.getElementById('chatSet');
      if (!s2) { return; }
      s2.hidden = !s2.hidden;
      if (!s2.hidden) {
        var cfg = aiCfg();
        var prov = document.getElementById('aiProv');
        var key = document.getElementById('aiKey');
        var mod = document.getElementById('aiModel');
        if (prov) { prov.value = cfg.provider || 'gemini'; }
        if (key) { key.value = cfg.key || ''; }
        if (mod) { mod.value = cfg.model || ''; }
      }
      return;
    }
    if (act === 'chat-save') {
      var p2 = document.getElementById('aiProv');
      var k2 = document.getElementById('aiKey');
      var m2 = document.getElementById('aiModel');
      var key2 = (k2 && k2.value || '').trim();
      aiSave({ on: !!key2, provider: (p2 && p2.value) || 'gemini', key: key2, model: (m2 && m2.value || '').trim() });
      var st = document.getElementById('chatSet');
      if (st) { st.hidden = true; }
      chatBubble('bot', '<p>' + (key2 ? 'AI ✓' : 'AI ✕') + '</p>');
      return;
    }
    if (act === 'chat-clear') {
      aiSave({ on: false });
      var st2 = document.getElementById('chatSet');
      if (st2) { st2.hidden = true; }
      chatBubble('bot', '<p>AI ✕</p>');
      return;
    }
  });

  document.addEventListener('submit', function (e) {
    if (!e.target || e.target.id !== 'chatForm') { return; }
    e.preventDefault();
    var inp = document.getElementById('chatInput');
    if (!inp) { return; }
    var v = inp.value;
    inp.value = '';
    chatSend(v);
  });

  setInterval(wxTick, 1000);

  function render(keepScroll) {
    try { document.documentElement.classList.toggle('sc-home', screen === 'home'); } catch (e) { }
    var app = document.getElementById('app');
    var y = window.scrollY || window.pageYOffset || 0;
    var html;
    if (screen === 'practice') { html = viewPractice(); }
    else if (screen === 'quiz') { html = viewQuiz(); }
    else if (screen === 'result') { html = viewResult(); }
    else if (screen === 'stats') { html = viewStats(); }
    else if (screen === 'info') { html = viewInfo(); }
    else if (screen === 'gram') { html = viewGram(); }
    else if (screen === 'cards') { html = viewCards(); }
    else if (screen === 'checklist') { html = viewChecklist(); }
    else if (screen === 'sos') { html = viewSos(); }
    else if (screen === 'law') { html = viewLaw(); }
    else if (screen === 'connect') { html = viewConnect(); }
    else if (screen === 'models') { html = viewModels(); }
    else if (screen === 'gear') { html = viewGear(); }
    else if (screen === 'emg') { html = viewEmergency(); }
    else { html = viewHome(); }
    app.innerHTML = html;
    if (keepScroll) {
      /* giữ nguyên vị trí cuộn khi chỉ bật/tắt bản dịch, phiên âm */
      window.scrollTo(0, y);
      requestAnimationFrame(function () { window.scrollTo(0, y); });
    } else {
      window.scrollTo(0, 0);
    }
    if (screen === 'home') {
      fxLoad(false);
      startVocabRotate();
      startQuoteRotate();
    } else {
      stopVocabRotate();
      stopQuoteRotate();
    }
    if (screen === 'quiz' && S && S.mode === 'exam') { paintTimer(); }
    if (screen === 'home') { updateInstallBtn(); }
    navSync();
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var fbLink = e.target.closest('a[data-fb]');
    if (fbLink) { e.preventDefault(); openFacebook(fbLink.getAttribute('href')); return; }

    var w = e.target.closest('.w');
    if (w) { openWord(w.getAttribute('data-w')); return; }

    var t = e.target.closest('[data-act]');
    if (!t) { return; }
    var act = t.dataset.act;

    if (act === 'close-sheet') { closeSheet(); return; }
    if (act === 'vocab') { openWord(t.dataset.w); return; }
    if (act === 'tts') {
      var cur = S && qById[S.ids[S.i]];
      speak(cur ? cur.q : '');
      return;
    }
    if (act === 'furi') { toggleFuri(); return; }
    if (act === 'vi') { if (S) { S.viOn = !S.viOn; S.viAnim = true; render(true); } return; }
    if (act === 'fx') { fxLoad(true); return; }
    if (act === 'fxflip') {
      if (e.target.closest('input, button, a')) { return; }
      FX_FLIP = !FX_FLIP;
      FX_ANIM = FX_FLIP ? 'flip-to-back' : 'flip-to-front';
      fxReplace();
      if (FX_FLIP) { setTimeout(fxConvert, 30); }
      return;
    }
    if (act === 'fxswap') {
      FX_SWAP = !FX_SWAP;
      FX_AMT = null;
      fxReplace();
      setTimeout(fxConvert, 30);
      return;
    }
    if (act === 'quote') {
      var qb = document.getElementById('quoteBox');
      if (qb) { qb.outerHTML = quoteBlock(); }
      startQuoteRotate();
      return;
    }
    if (act === 'wx') { wxLoad(true); return; }

    if (act === 'theme') {
      var order = ['auto', 'dark', 'light'];
      var cur = themeMode();
      var nextMode = order[(order.indexOf(cur) + 1) % order.length];
      applyMode(nextMode, true);
      render(true);
      return;
    }

    if (act === 'back') { stopTimer(); S = null; go(t.dataset.to || 'home'); return; }
    if (act === 'go-practice') { go('practice'); return; }
    if (act === 'go-stats') { go('stats'); return; }
    if (act === 'go-info') { go('info'); return; }
    if (act === 'go-checklist') { go('checklist'); return; }
    if (act === 'go-sos') { go('sos'); return; }
    if (act === 'go-law') { go('law'); return; }
    if (act === 'go-connect') { go('connect'); return; }
    if (act === 'go-models') { go('models'); return; }
    if (act === 'go-gear') { go('gear'); return; }
    if (act === 'go-emg') { go('emg'); return; }
    if (act === 'check') {
      var ck = t.dataset.k;
      db.checklist[ck] = !db.checklist[ck];
      saveDB();
      t.classList.toggle('done', !!db.checklist[ck]);
      t.querySelector('.chk-box').textContent = db.checklist[ck] ? '✓' : '';
      var cnt = document.getElementById('chkCount');
      if (cnt) {
        var done = CHECKLIST.filter(function (x, i) { return db.checklist['c' + i]; }).length;
        cnt.textContent = done + '/' + CHECKLIST.length + ' mục đã xong — lưu trên máy này.';
      }
      return;
    }
    if (act === 'share-app') {
      var shareUrl = 'https://tranthenghiem27892-afk.github.io/50cc/';
      var shareData = {
        title: 'Luyện thi 原付 50cc',
        text: 'App luyện thi bằng lái xe 50cc tại Nhật — miễn phí, dùng offline được.',
        url: shareUrl
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function () { });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(function () {
          toast('Đã copy link cài app.');
        }, function () { toast(shareUrl); });
      } else {
        toast(shareUrl);
      }
      return;
    }
    if (act === 'install') {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
      } else {
        openInstallGuide();
      }
      return;
    }
    if (act === 'share') { shareResult(); return; }
    if (act === 'cards') { startCards(); return; }
    if (act === 'cards-again') { startCards(); return; }
    if (act === 'flip') {
      if (Date.now() - cardSwipeAt < 400) { return; }
      if (F) {
        F.open = !F.open;
        F.flip = F.open ? 'flip-to-back' : 'flip-to-front';
        render(true);
      }
      return;
    }
    if (act === 'card-yes' || act === 'card-no') {
      if (!F) { return; }
      var ck2 = F.keys[F.i];
      if (act === 'card-yes') {
        db.cards[ck2] = Math.min(3, (db.cards[ck2] || 0) + 1);
        F.ok++;
      } else {
        db.cards[ck2] = 1;
        F.no++;
      }
      saveDB();
      nextCard();
      return;
    }
    if (act === 'gram') { go('gram'); return; }
    if (act === 'gram-all') { startGram(null); return; }
    if (act === 'gram-pat') { startGram(t.dataset.pat); return; }
    if (act === 'hard') { startHard(); return; }
    if (act === 'start-cat') { startPractice(t.dataset.cat); return; }
    if (act === 'start-exam') { startExam(); return; }
    if (act === 'start-review') { startReview(); return; }
    if (act === 'answer') { answer(Number(t.dataset.v)); return; }
    if (act === 'ill') {
      if (!S || S.phase !== 'ill') { return; }
      S.illPicks[S.j][Number(t.dataset.k)] = Number(t.dataset.v);
      render(true);
      return;
    }
    if (act === 'next') { next(); return; }
    if (act === 'prev') { prev(); return; }
    if (act === 'to-ill') { S.phase = 'ill'; S.j = 0; render(); return; }
    if (act === 'to-text') { S.phase = 'text'; S.i = S.ids.length - 1; render(); return; }
    if (act === 'jump') {
      S.phase = 'text';
      S.i = Number(t.dataset.i);
      render();
      return;
    }
    if (act === 'jump-ill') {
      S.phase = 'ill';
      S.j = Number(t.dataset.j);
      render();
      return;
    }
    if (act === 'submit') {
      var left = S.ids.filter(function (id, i) { return S.picks[i] === undefined; }).length;
      var leftIll = 0;
      if (S.mode === 'exam') {
        S.illPicks.forEach(function (arr) {
          if (arr.some(function (p) { return p === undefined; })) { leftIll++; }
        });
      }
      var un = left + leftIll;
      if (un > 0) {
        askConfirm(T('cf.submit1') + un + T('cf.submit2'), function () { submitExam(false); });
        return;
      }
      submitExam(false);
      return;
    }
    if (act === 'quit') {
      if (S && S.mode === 'exam') {
        askConfirm(T('cf.quit'), function () { stopTimer(); S = null; go('home'); });
        return;
      }
      stopTimer(); S = null; go('home');
      return;
    }
    if (act === 'again') {
      var cat = S && S.cat;
      S = null;
      if (cat) { startPractice(cat); } else { go('practice'); }
      return;
    }
    if (act === 'reset') {
      askConfirm(T('cf.reset'), function () {
        localStorage.removeItem(STORE);
        db = loadDB();
        toast(T('toast.cleared'));
        go('home');
      });
      return;
    }
    if (act === 'export') {
      var blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'gentsuki-progress.json';
      a.click();
      URL.revokeObjectURL(a.href);
      toast('Đã tải file tiến độ.');
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSheet(); return; }
    if (screen !== 'quiz' || !S) { return; }
    if (S.mode === 'exam' && S.phase === 'ill') { return; }
    var k = e.key;
    if (k === '1' || k === 'o' || k === 'O') { answer(1); }
    else if (k === '2' || k === 'x' || k === 'X') { answer(0); }
    else if (k === 'ArrowRight' || k === 'Enter') {
      if (S.picks[S.i] !== undefined) { e.preventDefault(); next(); }
    } else if (k === 'ArrowLeft') { prev(); }
  });

  /* ---------------- kiểm tra CSS đã cập nhật chưa ---------------- */
  function cssFresh() {
    var d = document.createElement('div');
    d.className = 'fc3d';
    d.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px';
    document.body.appendChild(d);
    var v = '';
    try { v = getComputedStyle(d).perspective || ''; } catch (e) { }
    document.body.removeChild(d);
    return !!v && v !== 'none' && v !== 'auto';
  }

  function warnStaleCss() {
    if (document.getElementById('cssWarn')) { return; }
    var d = document.createElement('div');
    d.id = 'cssWarn';
    d.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:99999;' +
      'background:#c8102e;color:#fff;font-size:11.5px;line-height:1.5;padding:8px 12px;' +
      'border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.3)';
    d.textContent = 'Giao diện chưa cập nhật trên máy chủ (CSS cũ). Hãy upload lại css/style.css.';
    document.body.appendChild(d);
  }

  /* ---------------- boot ---------------- */
  window.addEventListener('beforeunload', function () { stopTimer(); stopVocabRotate(); });
  window.addEventListener('popstate', function (e) {
    var st = e.state;
    if (!st || !st.nav) { return; }
    screen = st.screen || 'home';
    S = st.S || null;
    if (screen === 'quiz' && S && S.mode === 'exam') { startTimer(); } else { stopTimer(); }
    render();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stopVocabRotate(); stopQuoteRotate(); }
    else if (screen === 'home') { startVocabRotate(); startQuoteRotate(); }
  });
  var sheetBack = document.getElementById('sheetBack');
  if (sheetBack) { sheetBack.addEventListener('click', closeSheet); }

  /* ?demo=... — chỉ dùng để chụp ảnh/giới thiệu, không ảnh hưởng lúc dùng thật */
  var demo = new URLSearchParams(location.search).get('demo');
  var qLang = new URLSearchParams(location.search).get('lang');
  if (qLang) { applyLang(qLang); }
  var themeParam = new URLSearchParams(location.search).get('theme');
  if (themeParam === 'dark' || themeParam === 'light') { applyTheme(themeParam); }
  try { if (localStorage.getItem('gentsuki.furi') === '1') { document.documentElement.classList.add('furi'); } } catch (e) { }
  if (new URLSearchParams(location.search).get('furi') === '1') { document.documentElement.classList.add('furi'); }
  if (demo) { document.documentElement.classList.add('no-anim'); }
  if (demo === 'quiz') { startPractice('sign'); }
  else if (demo === 'answered') { startPractice('sign'); answer(1); }
  else if (demo === 'exam') { startExam(); }
  else if (demo === 'result') {
    startPractice('sign');
    S.picks = S.ids.map(function (id, i) { return i % 3 === 0 ? (qById[id].a === 1 ? 0 : 1) : qById[id].a; });
    finishPractice();
  } else if (demo === 'stats') { go('stats'); }
  else if (demo === 'gram') { go('gram'); }
  else if (demo === 'check') { go('checklist'); }
  else if (demo === 'law') { go('law'); }
  else if (demo === 'models') { go('models'); }
  else if (demo === 'fxback') { FX_FLIP = true; go('home'); }
  else if (demo === 'gear') { go('gear'); }
  else if (demo === 'emg') { go('emg'); }
  else if (demo === 'connect') { go('connect'); }
  else if (demo === 'sos') { go('sos'); }
  else if (demo === 'cards') {
    startCards();
    if (new URLSearchParams(location.search).get('open') === '1' && F) { F.open = true; render(); }
  }
  else if (demo === 'info') { go('info'); }
  else if (demo === 'practice') { go('practice'); }
  else if (demo === 'ill') {
    startExam();
    S.picks = S.picks.map(function (x, i) { return i % 2 === 0 ? 1 : 0; });
    S.illPicks[0] = [1, 0, 1];
    S.phase = 'ill'; S.j = 0; render();
  }
  else if (demo === 'examresult') {
    startExam();
    S.picks = S.ids.map(function (id, i) { return i % 6 === 0 ? 0 : qById[id].a; });
    S.illPicks = S.ills.map(function (id, j) {
      return illById[id].subs.map(function (s) { return j === 0 ? s.a : 1 - s.a; });
    });
    submitExam(false);
  }
  else if (demo === 'fxempty') {
    fxWrite({ rate: 161.5, date: '2026-11-08', series: [], ts: Date.now(),
      updatedLabel: '22:30 08/11', stale: true });
    go('home');
  }
  else if (demo === 'fx') {
    var ser = [];
    var base = 164;
    for (var fi = 89; fi >= 0; fi--) {
      var fdt = new Date(Date.now() - fi * 86400000);
      base += Math.sin(fi * 0.35) * 0.45 + (fi < 30 ? -0.25 : 0.12) + (Math.random() - 0.5) * 0.5;
      ser.push({ d: fxIso(fdt), v: Math.round(base * 100) / 100 });
    }
    fxWrite({ rate: ser[ser.length - 1].v, date: ser[ser.length - 1].d, series: ser,
      ts: Date.now(), histTs: Date.now(), updatedLabel: '22:30 08/11' });
    go('home');
  }
  else if (demo === 'ready') {
    db.exams = [50, 47, 49, 48, 47].map(function (s, i) {
      return { t: Date.now() - i * 86400000, score: s, total: 50, pass: s >= 45 };
    });
    saveDB(); go('stats');
  }
  else if (demo === 'word') {
    startPractice('cross');
    openWord(new URLSearchParams(location.search).get('w') || '二段階右折');
  }
  else if (demo === 'q' && qById[new URLSearchParams(location.search).get('id')]) {
    var qid = new URLSearchParams(location.search).get('id');
    S = { mode: 'practice', cat: qById[qid].cat, ids: [qid], i: 0, picks: [undefined] };
    if (new URLSearchParams(location.search).get('vi') === '1') { S.viOn = true; }
    go('quiz');
  } else { render(); }

  (function () {
    var qa = new URLSearchParams(location.search).get('amt');
    if (qa) { FX_AMT = qa; }
  })();

  document.title = T('page.title');
  (function () {
    var md = document.querySelector('meta[name="description"]');
    if (md) { md.setAttribute('content', T('meta.desc')); }
    var og = document.querySelector('meta[property="og:description"]');
    if (og) { og.setAttribute('content', T('meta.desc')); }
    var ot = document.querySelector('meta[property="og:title"]');
    if (ot) { ot.setAttribute('content', T('page.title')); }
  })();

  if (!cssFresh()) { warnStaleCss(); }
  if (FX_FLIP) { setTimeout(fxConvert, 80); }
})();
