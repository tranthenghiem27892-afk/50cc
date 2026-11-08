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
  var APP_VER = '44';

  var qById = {};
  Q.forEach(function (q) { qById[q.id] = q; });
  /* bẫy ngôn ngữ: không nằm trong Q nên không lẫn vào đề thi thử */
  var GQ = window.GRAMMAR || [];
  GQ.forEach(function (q) { q.cat = 'gram'; qById[q.id] = q; });
  var byPat = {};
  GQ.forEach(function (q) { (byPat[q.pat] || (byPat[q.pat] = [])).push(q); });
  var PATS = Object.keys(byPat);

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
  catById['gram'] = { id: 'gram', vi: 'Bẫy ngôn ngữ', ja: '表現', icon: '🔤' };
  var byCat = {};
  CATS.forEach(function (c) { byCat[c.id] = []; });
  Q.forEach(function (q) { (byCat[q.cat] || (byCat[q.cat] = [])).push(q); });

  /* gắn giải thích cho đáp án còn lại */
  var TRAPS = window.TRAPS || {};
  Q.forEach(function (q) { if (!q.trap) { q.trap = TRAPS[q.id] || ''; } });

  /* từ vựng: bọc các thuật ngữ bằng nút bấm được */
  var VOCAB = window.VOCAB || {};
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
      (term !== key ? '<div class="w-form">dạng trong câu: ' + esc(term) + '</div>' : '') +
      '<p class="w-mean">' + esc(v.m) + '</p>' +
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
    return '<div class="streak">🔥 <b>' + n + '</b> ngày liên tiếp' +
      (n ? '' : ' — làm một câu để bắt đầu chuỗi') + '</div>';
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
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('gentsuki.theme', t); } catch (e) { /* private mode */ }
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { m.setAttribute('content', t === 'dark' ? '#14120f' : '#f5f2ec'); }
  }
  function themeBtn() {
    var dark = currentTheme() === 'dark';
    return '<button class="icon-btn" data-act="theme" aria-label="' +
      (dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối') + '">' +
      (dark ? '☀️' : '🌙') + '</button>';
  }

  function topbar(title, backTo) {
    return '<header class="topbar">' +
      '<button class="icon-btn" data-act="back" data-to="' + (backTo || 'home') + '" aria-label="Quay lại">←</button>' +
      '<div class="topbar-title">' + title + '</div>' +
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
          ? '<p class="credit-bio">' + esc(a.bio || '') +
            (a.bioLink
              ? '<a class="credit-bio-link" href="' + esc(a.bioLink) + '" target="_blank" rel="noopener noreferrer"' +
                (/facebook\.com/i.test(a.bioLink) ? ' data-fb="1"' : '') + '>' +
                esc(a.bioLinkText || 'tại đây') + '</a>'
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
    return '<div class="quote-emoji">' + q.e + '</div>' +
      '<div class="quote-body">' +
        '<p class="quote-text">' + esc(q.t) + '</p>' +
        (q.a ? '<p class="quote-author">— ' + esc(q.a) + '</p>' : '') +
      '</div>';
  }

  function quoteBlock() {
    var q = pickQuote();
    if (!q) { return ''; }
    return '<section class="quote" id="quoteBox">' + quoteInner(q) +
      '<button class="quote-next" data-act="quote" aria-label="Câu khác" title="Câu khác">↻</button>' +
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
        '<button class="quote-next" data-act="quote" aria-label="Câu khác" title="Câu khác">↻</button>';
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
  /* chuỗi dự phòng (giá đóng cửa hằng tuần) khi không gọi được API */
  var FX_DEFAULT = [
    ['2026-08-16', 164.09], ['2026-08-23', 164.18], ['2026-08-30', 162.91],
    ['2026-09-06', 166.90], ['2026-09-13', 168.82], ['2026-09-20', 165.85],
    ['2026-09-27', 165.13], ['2026-10-04', 164.63], ['2026-10-11', 163.41],
    ['2026-10-18', 163.73], ['2026-10-25', 164.70], ['2026-11-01', 163.73],
    ['2026-11-08', 161.49]
  ];

  function fxRead() {
    try { return JSON.parse(localStorage.getItem(FX_KEY)); } catch (e) { return null; }
  }
  function fxWrite(d) {
    try { localStorage.setItem(FX_KEY, JSON.stringify(d)); } catch (e) { }
  }
  function fxPad(n) { return ('0' + n).slice(-2); }
  function fxIso(dt) { return dt.getFullYear() + '-' + fxPad(dt.getMonth() + 1) + '-' + fxPad(dt.getDate()); }
  function fxVer(dt) { return dt.getFullYear() + '.' + (dt.getMonth() + 1) + '.' + dt.getDate(); }
  function fxDefaultSeries() {
    return FX_DEFAULT.map(function (p) { return { d: p[0], v: p[1] }; });
  }
  function fxSeriesOf(d) {
    var map = {};
    FX_DEFAULT.forEach(function (p) { map[p[0]] = p[1]; });
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
        '" font-size="8" fill="currentColor" opacity=".6">' + Math.round(v) + '</text>';
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

  function fxCard() {
    var d = fxRead();
    var all = fxSeriesOf(d);
    var cut = fxIso(new Date(Date.now() - (FX_DAYS + 3) * 86400000));
    var series = all.filter(function (p) { return p.d >= cut; });
    if (series.length < 2) { series = all.slice(-2); }

    var chart = fxLine(series);

    var rate = series[series.length - 1].v;
    var chg = series.length > 1 ? (rate - series[0].v) : 0;
    var pct = series.length > 1 ? (chg / series[0].v) * 100 : 0;
    var stamp = (d && d.updatedLabel) ? d.updatedLabel : 'dữ liệu lưu sẵn';
    var stale = !d || d.stale;

    return '<section class="fx" id="fxBox">' +
      '<div class="fx-head"><b>Tỷ giá JPY → VND</b>' +
      '<button class="fx-refresh" data-act="fx" aria-label="Cập nhật tỷ giá">↻</button></div>' +
      '<div class="fx-top"><div class="fx-rate">' + Math.round(rate).toLocaleString('vi-VN') +
      '<small>₫ / 1 ¥</small></div>' +
      '<div class="fx-chg ' + (chg > 0 ? 'fx-up' : chg < 0 ? 'fx-down' : '') + '">' +
      (chg > 0 ? '+' : '') + pct.toFixed(2) + '% · 90 ngày</div>' +
      '</div>' +
      chart +
      '<p class="fx-note">Cập nhật ' + esc(stamp) + ' · nguồn: er-api / currency-api' +
      (stale ? ' · số liệu lưu sẵn' : '') + '</p>' +
      '</section>';
  }

  function fxReplace() {
    var el = document.getElementById('fxBox');
    if (el) { el.outerHTML = fxCard(); }
  }

  function fxFetchLatest() {
    return fetch('https://open.er-api.com/v6/latest/JPY', { mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        return (j && j.rates && j.rates.VND) ? { d: fxIso(new Date()), v: j.rates.VND } : null;
      })
      .catch(function () { return null; })
      .then(function (x) {
        if (x) { return x; }
        return fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/jpy.min.json', { mode: 'cors' })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            return (j && j.jpy && j.jpy.vnd) ? { d: j.date, v: j.jpy.vnd } : null;
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
          var vs = txt.match(/"vnd":[0-9.]+/g) || [];
          var out = [];
          for (var k = 0; k < Math.min(ds.length, vs.length); k++) {
            out.push({ d: ds[k].slice(8, 18), v: parseFloat(vs[k].slice(6)) });
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
      FX_DEFAULT.forEach(function (p) { map[p[0]] = p[1]; });
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
          : 'dữ liệu lưu sẵn'
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
    return '<div class="vrot-head"><span class="vrot-label">Từ vựng quan trọng</span>' +
      '<span class="vrot-count">' + (idx + 1) + '/' + total + '</span></div>' +
      '<div class="vrot-line">' +
        '<button class="vrot-term" data-act="vocab" data-w="' + esc(term) + '">' + esc(term) + '</button>' +
        (hanViet(term) ? '<span class="vrot-hv">' + esc(hanViet(term)) + '</span>' : '') +
      '</div>' +
      (v.r ? '<div class="vrot-read">' + esc(v.r) + '</div>' : '') +
      '<p class="vrot-mean">' + esc(v.m) + '</p>';
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

  function viewHome() {
    var o = overall();
    var wrongN = db.wrong.filter(function (id) { return qById[id]; }).length;
    var last = db.exams[0];
    return '' +
      '<header class="topbar">' +
        '<div class="brand"><span class="brand-mark">原</span>' +
          '<span class="brand-text"><b>原付免許</b><i>50cc · luyện thi</i></span></div>' +
        '<div class="topbar-actions">' + themeBtn() + '</div>' +
      '</header>' +
      '<main class="wrap">' +
        '<section class="hero">' +
          '<div class="hero-eyebrow">学科試験 · 46 câu + 2 câu hình</div>' +
          '<h1>Đỗ bằng lái<br>xe 50cc tại Nhật</h1>' +
          '<p class="hero-sub">Luyện từng nhóm kiến thức, rồi thi thử đúng 48 câu trong 30 phút.</p>' +
          '<div class="facts">' +
            '<div class="fact"><b>48</b><span>câu hỏi</span></div>' +
            '<div class="fact"><b>30′</b><span>thời gian</span></div>' +
            '<div class="fact"><b>45</b><span>điểm đỗ</span></div>' +
          '</div>' +
        '</section>' +

        '<button class="cta" data-act="start-exam">' +
          '<span class="cta-main">' +
            '<span class="cta-title">Thi thử ngay</span>' +
            '<span class="cta-sub">' + (last
              ? 'Lần gần nhất: ' + last.score + '/' + last.total + ' điểm'
              : 'Đề ngẫu nhiên · chấm điểm như thi thật') + '</span>' +
          '</span>' +
          '<span class="cta-arrow">→</span>' +
        '</button>' +

        '<div class="tiles">' +
          '<button class="tile" data-act="go-practice">' +
            '<span class="tile-icon">📚</span>' +
            '<span class="tile-body"><h3>Luyện theo nhóm</h3><p>' + CATS.length + ' nhóm · ' + Q.length + ' câu</p></span>' +
            '<span class="chev">›</span>' +
          '</button>' +
          '<button class="tile" data-act="start-review"' + (wrongN ? '' : ' disabled') + '>' +
            '<span class="tile-icon">🔁</span>' +
            '<span class="tile-body"><h3>Ôn câu sai</h3><p>' + (wrongN ? wrongN + ' câu cần xem lại' : 'Chưa có câu sai') + '</p></span>' +
            '<span class="chev">›</span>' +
          '</button>' +
          '<button class="tile" data-act="go-stats">' +
            '<span class="tile-icon">📈</span>' +
            '<span class="tile-body"><h3>Tiến độ</h3><p>' + o.n + ' lượt trả lời · đúng ' + o.rate + '%</p></span>' +
            '<span class="chev">›</span>' +
          '</button>' +
          '<button class="tile" data-act="go-info">' +
            '<span class="tile-icon">🇯🇵</span>' +
            '<span class="tile-body"><h3>Thủ tục & mẹo thi</h3><p>Giấy tờ, lệ phí, 原付講習</p></span>' +
            '<span class="chev">›</span>' +
          '</button>' +
          '<button class="tile" data-act="go-checklist">' +
            '<span class="tile-icon">✅</span>' +
            '<span class="tile-body"><h3>Checklist đi thi</h3><p>' +
              CHECKLIST.filter(function (x, i) { return db.checklist['c' + i]; }).length + '/' + CHECKLIST.length +
              ' mục đã xong</p></span>' +
            '<span class="chev">›</span>' +
          '</button>' +
          '<button class="tile" data-act="go-sos">' +
            '<span class="tile-icon">📕</span>' +
            '<span class="tile-body"><h3>Sổ tay tình huống</h3><p>' + SITS.length + ' tình huống · câu tiếng Nhật</p></span>' +
            '<span class="chev">›</span>' +
          '</button>' +
        '</div>' +

        '<p class="footnote">Bộ câu hỏi tự biên soạn từ luật, không sao chép từ trang khác. Luôn đối chiếu với 免許センター nơi bạn thi.</p>' +
        vocabBlock() +
        quoteBlock() +
        fxCard() +
        creditBlock() +
        '<p class="terms"><b>© 2026 Nghiệm Trần</b>' +
          'Đây là dự án miễn phí vì cộng đồng. Vui lòng chỉ dùng cá nhân, ' +
          'không sao chép/tái bản, không dùng để kiếm tiền. ' +
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
        '<span class="catrow-main"><h3>Bẫy ngôn ngữ <em>表現</em></h3>' +
          '<p>' + GQ.length + ' câu · ' + (gs.n ? 'đúng ' + gs.rate + '%' : 'mẹo đọc câu hỏi') + '</p>' +
          '<span class="bar"><i style="width:' + gs.rate + '%"></i></span></span>' +
        '<span class="chev">›</span></button>' +
      '<button class="catrow catrow-special" data-act="cards">' +
        '<span class="catrow-icon">🃏</span>' +
        '<span class="catrow-main"><h3>Flashcard từ vựng <em>単語</em></h3>' +
          '<p>12 thẻ mỗi lượt · ưu tiên thẻ còn khó</p>' +
          '<span class="bar"><i style="width:0%"></i></span></span>' +
        '<span class="chev">›</span></button>' +
      '<button class="catrow catrow-special" data-act="hard">' +
        '<span class="catrow-icon">🔥</span>' +
        '<span class="catrow-main"><h3>Đề khó <em>難問</em></h3>' +
          '<p>20 câu dài và khó nhất trong kho</p>' +
          '<span class="bar"><i style="width:0%"></i></span></span>' +
        '<span class="chev">›</span></button>';

    var rows = CATS.map(function (c) {
      var list = byCat[c.id] || [];
      var st = catStat(c.id);
      return '<button class="catrow" data-act="start-cat" data-cat="' + c.id + '">' +
        '<span class="catrow-icon">' + c.icon + '</span>' +
        '<span class="catrow-main">' +
          '<h3>' + c.vi + ' <em>' + c.ja + '</em></h3>' +
          '<p>' + list.length + ' câu · ' + (st.n ? 'đúng ' + st.rate + '%' : 'chưa làm') + '</p>' +
          '<span class="bar"><i style="width:' + st.rate + '%"></i></span>' +
        '</span>' +
        '<span class="chev">›</span></button>';
    }).join('');
    return topbar('Chọn nhóm kiến thức') +
      '<main class="wrap"><div class="catlist">' + special + rows + '</div>' +
      '<p class="footnote">Mỗi câu trả lời được lưu trên máy này. Trả lời sai sẽ tự vào mục “Ôn câu sai”.</p></main>';
  }

  function scoreSoFar() {
    if (!S) { return ''; }
    var ok = 0;
    S.picks.forEach(function (p, i) { if (p !== undefined && qById[S.ids[i]].a === p) { ok++; } });
    return '<span class="mini">' + ok + ' đúng</span>';
  }

  function viewQuiz() {
    if (!S) { return viewHome(); }
    if (S.mode === 'exam' && S.phase === 'ill') { return viewIll(); }
    var q = qById[S.ids[S.i]];
    var cat = catById[q.cat] || { vi: '', ja: '', icon: '' };
    var total = S.ids.length;
    var picked = S.picks[S.i];
    var isExam = S.mode === 'exam';
    var answered = picked !== undefined;
    var showFb = !isExam && answered;

    var sign = q.img && SIGNS[q.img] ? '<div class="qsign">' + SIGNS[q.img] + '</div>' : '';
    var answers;

    if (!showFb) {
      answers = '<div class="answers">' +
        '<button class="ans' + (picked === 1 ? ' sel' : '') + '" data-act="answer" data-v="1">' +
          '<span class="glyph">○</span><span class="lbl">Đúng</span></button>' +
        '<button class="ans' + (picked === 0 ? ' sel' : '') + '" data-act="answer" data-v="0">' +
          '<span class="glyph">×</span><span class="lbl">Sai</span></button>' +
        '</div>';
    } else {
      answers = '<div class="answers done">' +
        '<div class="ans' + (q.a === 1 ? ' correct' : '') + (picked === 1 && q.a !== 1 ? ' wrong' : '') + '">' +
          '<span class="glyph">○</span><span class="lbl">Đúng</span></div>' +
        '<div class="ans' + (q.a === 0 ? ' correct' : '') + (picked === 0 && q.a !== 0 ? ' wrong' : '') + '">' +
          '<span class="glyph">×</span><span class="lbl">Sai</span></div>' +
        '</div>';
    }

    return '' +
      '<header class="quizbar">' +
        '<button class="icon-btn" data-act="quit" aria-label="Thoát">✕</button>' +
        '<div class="qmeta"><b>Câu ' + (S.i + 1) + '<span>/' + total + '</span></b>' +
          '<i>' + (isExam ? 'Thi thử' : (S.label || cat.vi)) + '</i></div>' +
        (isExam ? '<div class="timer" id="timer">30:00</div>' : '<div class="timer soft">' + scoreSoFar() + '</div>') +
      '</header>' +
      '<div class="progress"><i style="width:' + (((S.i + (answered ? 1 : 0)) / total) * 100) + '%"></i></div>' +
      '<main class="wrap quizwrap">' +
        '<article class="qcard">' +
          '<span class="qtag cat-' + q.cat + '">' + cat.icon + ' ' + cat.vi + '</span>' +
          sign +
          '<p class="qtext">' + mark(esc(q.q)) + '</p>' +
          '<div class="qctl">' +
            '<button class="qctl-btn" data-act="tts">🔊 Đọc câu</button>' +
            '<button class="qctl-btn' + (furiOn() ? ' on' : '') + '" data-act="furi">あ Phiên âm</button>' +
          '</div>' +
          '<p class="qhint">' + (isExam ? 'Chọn ○ nếu đúng, × nếu sai' : 'Câu này đúng hay sai?') +
            ' · <span class="w-tip">chạm từ tiếng Nhật để tra nghĩa</span></p>' +
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
        '<p class="ill-q"><b>' + (k + 1) + '.</b> ' + mark(esc(s.q)) + '</p>' +
        '<div class="ill-ans">' +
          '<button class="pill-ans' + (p === 1 ? ' sel' : '') + '" data-act="ill" data-k="' + k + '" data-v="1">○ Đúng</button>' +
          '<button class="pill-ans' + (p === 0 ? ' sel' : '') + '" data-act="ill" data-k="' + k + '" data-v="0">× Sai</button>' +
        '</div>' +
      '</div>';
    }).join('');

    return '' +
      '<header class="quizbar">' +
        '<button class="icon-btn" data-act="quit" aria-label="Thoát">✕</button>' +
        '<div class="qmeta"><b>Câu ' + (S.ids.length + S.j + 1) + '<span>/' + totalQ + '</span></b>' +
          '<i>Câu hình · 危険予測 · 2 điểm</i></div>' +
        '<div class="timer" id="timer">30:00</div>' +
      '</header>' +
      '<div class="progress"><i style="width:' + (((S.ids.length + S.j) / totalQ) * 100) + '%"></i></div>' +
      '<main class="wrap quizwrap">' +
        '<article class="qcard">' +
          '<span class="qtag cat-bike">🎬 ' + esc(set.title) + '</span>' +
          '<p class="ill-scene">' + mark(esc(set.scene)) + '</p>' +
          '<p class="qhint">Ba nhận định dưới đây đúng hay sai? Đúng cả 3 mới được 2 điểm.</p>' +
          subs +
        '</article>' +
        examFooter() +
      '</main>';
  }

  function explainRows(q) {
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
      row('○', q.a === 1 ? 'Đáp án đúng' : 'Vì sao sai', yes, q.a === 1) +
      row('×', q.a === 0 ? 'Đáp án đúng' : 'Vì sao sai', no, q.a === 0) +
      '</div>';
  }

  function feedback(q, picked) {
    var ok = q.a === picked;
    return '<section class="fb ' + (ok ? 'ok' : 'ng') + '">' +
      '<div class="fb-head"><b>' + (ok ? 'Chính xác' : 'Sai rồi') + '</b>' +
        '<span>Đáp án đúng: <b class="ansmark">' + (q.a ? '○' : '×') + '</b></span></div>' +
      explainRows(q) +
      (q.ref ? '<p class="fb-ref">' + esc(q.ref) + '</p>' : '') +
      '<button class="btn btn-primary" data-act="next">' +
        (S.i + 1 >= S.ids.length ? 'Xem kết quả' : 'Câu tiếp') + ' →</button>' +
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
      dots += '<span class="' + cls + '">' + (S.ids.length + j + 1) + '</span>';
    });

    var allText = S.picks.every(function (p) { return p !== undefined; });
    var allIll = S.illPicks.every(function (arr) {
      return arr.every(function (p) { return p !== undefined; });
    });
    var btns;
    if (S.phase === 'text') {
      btns = '<button class="btn btn-ghost" data-act="prev"' + (S.i === 0 ? ' disabled' : '') + '>← Trước</button>' +
        '<button class="btn btn-primary" data-act="' + (allText ? 'to-ill' : 'next') + '">' +
          (allText ? 'Câu hình →' : 'Tiếp →') + '</button>';
    } else {
      btns = '<button class="btn btn-ghost" data-act="to-text">← Trước</button>' +
        '<button class="btn btn-primary" data-act="submit"' + (allIll ? '' : ' disabled') + '>Nộp bài</button>';
    }
    return '<div class="examnav">' +
      '<div class="dots">' + dots + '</div>' +
      '<div class="examnav-btns">' + btns + '</div>' +
      (allText && allIll ? '' : '<button class="linkbtn" data-act="submit">Nộp bài sớm</button>') +
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
      return '<div class="bdrow"><span class="bdname">' + c.icon + ' ' + c.vi + '</span>' +
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
        '<div class="wbody"><p class="wans">Bạn chọn <b>' + mine + '</b> · đáp án <b>' + (q.a ? '○' : '×') + '</b></p>' +
        explainRows(q) + '</div></details>';
    }).join('') : '<p class="empty">Không có câu sai. Quá tốt!</p>';

    var verdict, sub;
    if (isExam) {
      verdict = pass ? 'Đỗ' : 'Chưa đỗ';
      sub = pass
        ? 'Trên mức ' + PASS + '/' + r.total + ' — giữ phong độ này khi vào phòng thi.'
        : 'Cần thêm ' + Math.max(0, PASS - r.score) + ' câu đúng nữa để đạt ' + PASS + '/' + r.total + '.';
    } else {
      verdict = r.score + '/' + r.total;
      sub = 'Số câu đúng trong lượt luyện này.';
    }

    var illHtml = '';
    if (r.ill && r.ill.length) {
      illHtml = '<section class="panel"><h3 class="panel-title">Câu hình · 危険予測</h3>' +
        r.ill.map(function (x) {
          var set = illById[x.id];
          return '<div class="illres ' + (x.ok ? 'ok' : 'ng') + '">' +
            '<div class="illres-head">' + (x.ok ? '✓ +2 điểm' : '✗ 0 điểm') + ' · ' + esc(set.title) + '</div>' +
            '<p>' + esc(set.exp) + '</p></div>';
        }).join('') + '</section>';
    }

    return '<header class="topbar simple"><div class="topbar-title">' +
        (isExam ? 'Kết quả thi thử' : 'Kết quả luyện tập') + '</div></header>' +
      '<main class="wrap">' +
        '<section class="result">' +
          '<div class="ring" style="--p:' + pct + ';--c:' + (pass ? '#157f52' : isExam ? '#c8102e' : '#1f1d1b') + '">' +
            '<div class="ring-in"><b>' + r.score + '</b><span>/' + r.total + '</span></div>' +
          '</div>' +
          '<h2 class="verdict">' + verdict + '</h2>' +
          '<p class="verdict-sub">' + sub + '</p>' +
        '</section>' +
        '<section class="panel"><h3 class="panel-title">Theo nhóm kiến thức</h3>' + bdRows + '</section>' +
        illHtml +
        '<section class="panel"><h3 class="panel-title">Câu sai (' + wrong.length + ')</h3>' + wrongHtml + '</section>' +
        '<div class="btnrow">' +
          '<button class="btn btn-primary" data-act="' + (isExam ? 'start-exam' : 'again') + '">' +
            (isExam ? 'Thi lại' : 'Làm lại nhóm này') + '</button>' +
          '<button class="btn btn-ghost" data-act="share">Chia sẻ kết quả</button>' +
          '<button class="btn btn-ghost" data-act="back" data-to="home">Về trang chủ</button>' +
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
      label = 'Chưa đủ dữ liệu';
      desc = 'Thi thử ít nhất 3 đề để biết mức sẵn sàng. Mục tiêu: 5 đề liên tiếp đều từ 47/50.';
    } else if (r.state === 'ready') {
      label = 'Sẵn sàng thi';
      desc = '5 đề gần nhất đều đạt 47/50 trở lên. Giữ phong độ này khi vào phòng thi.';
    } else if (r.state === 'close') {
      label = 'Gần đạt';
      desc = 'Trung bình ' + r.avg + '/50, thấp nhất ' + r.min + '. Cần cả 5 đề đạt 47 trở lên mới tính là sẵn sàng.';
    } else {
      label = 'Chưa sẵn sàng';
      desc = 'Trung bình ' + r.avg + '/50. Ngưỡng đỗ là 45/50, nhưng nên luyện tới 47+ cho chắc.';
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
      '<p class="ready-note">5 đề thi thử gần nhất · điểm đỗ 45/50</p>' +
      '</section>';
  }

  function viewStats() {
    var o = overall();
    var rows = CATS.map(function (c) {
      var st = catStat(c.id);
      var total = (byCat[c.id] || []).length;
      var studied = (byCat[c.id] || []).filter(function (q) { return db.answers[q.id]; }).length;
      return '<div class="bdrow"><span class="bdname">' + c.icon + ' ' + c.vi + '</span>' +
        '<span class="bar"><i style="width:' + st.rate + '%"></i></span>' +
        '<span class="bdnum">' + st.rate + '%</span>' +
        '<span class="bdsub">' + studied + '/' + total + ' câu</span></div>';
    }).join('');

    var hist = db.exams.length ? db.exams.slice(0, 6).map(function (e) {
      var d = new Date(e.t);
      var dd = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2);
      return '<div class="histrow"><span>' + dd + '</span>' +
        '<b class="' + (e.pass ? 'ok' : 'ng') + '">' + e.score + '/' + e.total + '</b>' +
        '<span class="pill">' + (e.pass ? 'Đỗ' : 'Trượt') + '</span></div>';
    }).join('') : '<p class="empty">Chưa thi thử lần nào.</p>';

    return topbar('Tiến độ học') +
      '<main class="wrap">' +
        streakChip() +
        '<section class="stats">' +
          '<div class="stat"><b>' + o.n + '</b><span>lượt trả lời</span></div>' +
          '<div class="stat"><b>' + o.rate + '%</b><span>tỉ lệ đúng</span></div>' +
          '<div class="stat"><b>' + o.studied + '/' + Q.length + '</b><span>câu đã học</span></div>' +
        '</section>' +
        readyCard() +
        '<section class="panel"><h3 class="panel-title">Tỉ lệ đúng theo nhóm</h3>' + rows + '</section>' +
        '<section class="panel"><h3 class="panel-title">Lịch sử thi thử</h3>' + hist + '</section>' +
        '<div class="btnrow">' +
          '<button class="btn btn-ghost" data-act="export">Xuất dữ liệu (.json)</button>' +
          '<button class="btn btn-danger" data-act="reset">Xoá toàn bộ tiến độ</button>' +
        '</div>' +
      '</main>';
  }

  function chkList() {
    return CHECKLIST.map(function (x, i) {
      var on = !!db.checklist['c' + i];
      return '<button class="chk-item' + (on ? ' done' : '') + '" data-act="check" data-k="c' + i + '">' +
        '<span class="chk-box">' + (on ? '✓' : '') + '</span><span>' + esc(x) + '</span></button>';
    }).join('');
  }

  function viewChecklist() {
    var done = CHECKLIST.filter(function (x, i) { return db.checklist['c' + i]; }).length;
    return topbar('Checklist đi thi') +
      '<main class="wrap">' +
        '<section class="panel">' +
          '<h2>Chuẩn bị trước ngày thi</h2>' +
          '<p class="muted" id="chkCount">' + done + '/' + CHECKLIST.length +
            ' mục đã xong — lưu trên máy này.</p>' +
          '<div class="chk">' + chkList() + '</div>' +
        '</section>' +
      '</main>';
  }

  function viewSos() {
    return topbar('Sổ tay tình huống') +
      '<main class="wrap">' +
        '<section class="panel">' +
          '<h2>Câu tiếng Nhật dùng được ngay</h2>' +
          '<p class="muted">Chạm vào từng tình huống để mở.</p>' +
          SITS.map(function (s) {
            return '<details class="sos">' +
              '<summary><span class="sos-icon">' + esc(s.icon) + '</span>' + esc(s.vi) + '</summary>' +
              '<p class="sos-tip">' + esc(s.tip) + '</p>' +
              '<ul class="sos-list">' +
                s.phrases.map(function (ph) {
                  return '<li><span class="sos-ja">' + esc(ph.ja) + '</span>' +
                    '<span class="sos-r">' + esc(ph.r) + '</span>' +
                    '<span class="sos-vi">' + esc(ph.vi) + '</span></li>';
                }).join('') +
              '</ul>' +
            '</details>';
          }).join('') +
        '</section>' +
      '</main>';
  }

  function viewInfo() {
    return topbar('Thủ tục & mẹo thi') +
      '<main class="wrap info">' +
        '<section class="panel">' +
          '<h2>Thi lý thuyết 原付 (50cc)</h2>' +
          '<p>Đề gồm <b>46 câu chữ ○×</b> (1 điểm/câu) và <b>2 câu hình 危険予測</b> (2 điểm/câu, mỗi câu có 3 tiểu hỏi — ' +
          'đúng cả 3 mới được 2 điểm). Tổng <b>48 câu, 50 điểm, 45 điểm là đỗ</b>, làm trong <b>30 phút</b>.</p>' +
          '<p>Không có thi thực hành — chỉ lý thuyết tại 運転免許試験場. Tỷ lệ đỗ toàn quốc khoảng <b>58,7%</b> (năm 2025).</p>' +
          '<p class="muted">Nguồn tham khảo: trang 学科試験 của 高知県警察 (30 phút, 50 điểm, 45 điểm đỗ).</p>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Luật mới cần biết</h2>' +
          '<ul>' +
            '<li><b>新基準原付 (từ 1/4/2025):</b> xe 125cc trở xuống, công suất tối đa <b>4.0kW</b> — lái được bằng bằng 原付. ' +
              'Vẫn 30km/h, vẫn 二段階右折, vẫn 1 người, biển số trắng. Xe 125cc không giới hạn công suất vẫn cần bằng 普通二輪.</li>' +
            '<li><b>特定小型原付 (từ 1/7/2023):</b> xe điện tối đa 20km/h, từ 16 tuổi, <b>không cần bằng</b>, ' +
              'đội mũ là <b>努力義務</b> (không bắt buộc như 原付 thường), đi dưới lòng đường là nguyên tắc.</li>' +
            '<li><b>最低速度</b> chỉ áp dụng cho 自動車 — 原付 không bị ràng buộc bởi biển tốc độ tối thiểu.</li>' +
          '</ul>' +
          '<p class="muted">Nguồn: 道路交通法施行規則第1条の2, 道路交通法第23条・第71条の4, 警察庁 (2025).</p>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Điều kiện & thủ tục</h2>' +
          '<ul>' +
            '<li>Đủ <b>16 tuổi</b> trở lên.</li>' +
            '<li>Học <b>原付講習</b> (khoảng 3 giờ) tại trường dạy lái — bắt buộc, lệ phí tham khảo <b>5.250 yên</b>. ' +
              'Nhiều tỉnh cho phép học trước hoặc sau khi thi, nhưng phải có giấy chứng nhận mới được cấp bằng.</li>' +
            '<li>Thi 学科 tại 免許センター: lệ phí thi khoảng <b>1.600 yên</b>, lệ phí cấp bằng khoảng <b>2.350 yên</b> (khác nhau theo tỉnh).</li>' +
            '<li>Giấy tờ: 住民票 (có 本籍), 在留カード, ảnh 3×2,4cm, tiền mặt.</li>' +
            '<li>Thi xong thường biết kết quả trong ngày, nhận bằng cùng ngày nếu đã có 原付講習.</li>' +
          '</ul>' +
          '<p class="warn">Số liệu có thể thay đổi theo tỉnh và theo thời điểm — hãy kiểm tra trang web của 免許センター nơi bạn thi trước khi đi.</p>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Mẹo làm bài</h2>' +
          '<ul>' +
            '<li>Câu hỏi luôn có một ý “tuyệt đối” (必ず, 絶対に, いつでも) — thường là câu <b>sai</b>.</li>' +
            '<li>Nhóm câu về <b>二段階右折</b> xuất hiện rất nhiều: nhớ “3 làn trở lên” và “có đèn tín hiệu”.</li>' +
            '<li>Phân biệt 駐車禁止 (chỉ cấm đỗ) và 駐停車禁止 (cấm cả dừng).</li>' +
            '<li>Không bỏ trống câu nào — sai không bị trừ điểm.</li>' +
          '</ul>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Thói quen Việt Nam vs Nhật Bản</h2>' +
          '<p class="muted">Những phản xạ ở Việt Nam sẽ làm bạn trượt hoặc bị phạt ở Nhật.</p>' +
          '<div class="cmp">' +
            '<div class="cmp-row cmp-head"><span>Ở Việt Nam</span><span>Ở Nhật</span></div>' +
            COMPARE.map(function (x) {
              return '<div class="cmp-row"><span>' + esc(x.vi) + '</span>' +
                '<span><b>' + esc(x.jp) + '</b><i>' + esc(x.note) + '</i></span></div>';
            }).join('') +
          '</div>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Về bộ câu hỏi này</h2>' +
          '<p>Toàn bộ câu hỏi được biên soạn lại bằng tiếng Nhật từ nội dung luật (道路交通法), có giải thích tiếng Việt. ' +
          'Không sao chép văn bản từ trang luyện thi nào.</p>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Cộng đồng & góp ý</h2>' +
          '<p>Thấy câu nào sai nghĩa, giải thích khó hiểu, hay muốn góp thêm câu hỏi? ' +
            'Nhắn tin cho tác giả — mọi báo lỗi đều được xem lại và sửa trong bản cập nhật.</p>' +
          '<p class="muted">Khi báo lỗi, gửi kèm mã câu (ví dụ <b>s23</b>) hoặc chụp màn hình để sửa nhanh hơn.</p>' +
          '<a class="btn btn-ghost" href="https://www.facebook.com/Gimichan92" target="_blank" rel="noopener noreferrer" data-fb="1">Nhắn tin qua Facebook</a>' +
        '</section>' +
      '</main>';
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
      return topbar('Flashcard từ vựng') +
        '<main class="wrap"><section class="panel fcdone">' +
          '<h2>Xong lượt thẻ</h2>' +
          '<p>Đã nhớ <b>' + F.ok + '</b> thẻ · còn khó <b>' + F.no + '</b> thẻ.</p>' +
          '<p class="muted">Thẻ “còn khó” sẽ xuất hiện lại sớm hơn ở lượt sau.</p>' +
          '<div class="btnrow">' +
            '<button class="btn btn-primary" data-act="cards-again">Lượt mới</button>' +
            '<button class="btn btn-ghost" data-act="back" data-to="home">Về trang chủ</button>' +
          '</div>' +
        '</section></main>';
    }
    var k = F.keys[F.i];
    var v = VOCAB[k];
    var box = db.cards[k] || 0;
    var hv = hanViet(k);

    return topbar('Flashcard từ vựng') +
      '<main class="wrap">' +
        '<div class="fc-meta">Thẻ ' + (F.i + 1) + '/' + F.keys.length +
          ' · hộp ' + (box || 1) + '/3</div>' +
        '<button class="fc' + (F.open ? ' open' : '') + '" data-act="flip">' +
          '<span class="fc-term">' + esc(k) + '</span>' +
          (F.open
            ? '<span class="fc-read">' + esc(v.r) + (hv ? ' · ' + esc(hv) : '') + '</span>' +
              '<span class="fc-mean">' + esc(v.m) + '</span>'
            : '<span class="fc-hint">chạm để xem nghĩa</span>') +
        '</button>' +
        (F.open
          ? '<div class="btnrow fc-btns">' +
              '<button class="btn btn-ghost" data-act="card-no">Còn khó</button>' +
              '<button class="btn btn-primary" data-act="card-yes">Đã nhớ</button>' +
            '</div>'
          : '<button class="btn btn-primary fc-show" data-act="flip">Xem nghĩa</button>') +
      '</main>';
  }

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
          '<p>' + list.length + ' câu · ' + (n ? 'đúng ' + rate + '%' : 'chưa làm') + '</p>' +
          '<span class="bar"><i style="width:' + rate + '%"></i></span></span>' +
        '<span class="chev">›</span></button>';
    }).join('');

    return topbar('Bẫy ngôn ngữ') +
      '<main class="wrap">' +
        '<section class="panel gramintro">' +
          '<h2>Đọc câu hỏi cho đúng</h2>' +
          '<p>Đề 原付 gài bẫy bằng <b>cấu trúc câu</b> chứ không phải bằng luật. Nắm 8 mẫu dưới đây là nắm phần lớn câu khó.</p>' +
          '<p class="muted">' + GQ.length + ' câu · ' + (st.n ? 'đúng ' + st.rate + '%' : 'chưa làm câu nào') + '</p>' +
          '<button class="btn btn-primary" data-act="gram-all">Làm tất cả ' + GQ.length + ' câu</button>' +
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
      var q = qById[S.ids[S.i]];
      record(q.id, q.a === v);
    }
    render();
  }

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
  function render() {
    var app = document.getElementById('app');
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
    else { html = viewHome(); }
    app.innerHTML = html;
    window.scrollTo(0, 0);
    if (screen === 'home') {
      fxLoad(false);
      startVocabRotate();
      startQuoteRotate();
    } else {
      stopVocabRotate();
      stopQuoteRotate();
    }
    if (screen === 'quiz' && S && S.mode === 'exam') { paintTimer(); }
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
    if (act === 'fx') { fxLoad(true); return; }
    if (act === 'quote') {
      var qb = document.getElementById('quoteBox');
      if (qb) { qb.outerHTML = quoteBlock(); }
      startQuoteRotate();
      return;
    }
    if (act === 'theme') {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      render();
      return;
    }

    if (act === 'back') { stopTimer(); S = null; go(t.dataset.to || 'home'); return; }
    if (act === 'go-practice') { go('practice'); return; }
    if (act === 'go-stats') { go('stats'); return; }
    if (act === 'go-info') { go('info'); return; }
    if (act === 'go-checklist') { go('checklist'); return; }
    if (act === 'go-sos') { go('sos'); return; }
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
    if (act === 'share') { shareResult(); return; }
    if (act === 'cards') { startCards(); return; }
    if (act === 'cards-again') { startCards(); return; }
    if (act === 'flip') { if (F) { F.open = !F.open; render(); } return; }
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
      render();
      return;
    }
    if (act === 'next') { next(); return; }
    if (act === 'prev') { prev(); return; }
    if (act === 'to-ill') { S.phase = 'ill'; S.j = 0; render(); return; }
    if (act === 'to-text') { S.phase = 'text'; S.i = S.ids.length - 1; render(); return; }
    if (act === 'jump') {
      if (S.mode === 'exam' && S.phase !== 'text') { return; }
      S.i = Number(t.dataset.i); render(); return;
    }
    if (act === 'submit') {
      var left = S.ids.filter(function (id, i) { return S.picks[i] === undefined; }).length;
      var leftIll = 0;
      if (S.mode === 'exam') {
        S.illPicks.forEach(function (arr) {
          if (arr.some(function (p) { return p === undefined; })) { leftIll++; }
        });
      }
      var msg = '';
      if (left > 0) { msg = 'Còn ' + left + ' câu chữ'; }
      if (leftIll > 0) { msg += (msg ? ' và ' : 'Còn ') + leftIll + ' câu hình'; }
      if (msg && !confirm(msg + ' chưa trả lời. Vẫn nộp bài?')) { return; }
      submitExam(false);
      return;
    }
    if (act === 'quit') {
      if (S && S.mode === 'exam' && !confirm('Thoát bài thi? Kết quả sẽ không được lưu.')) { return; }
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
      if (!confirm('Xoá toàn bộ tiến độ học trên máy này?')) { return; }
      localStorage.removeItem(STORE);
      db = loadDB();
      toast('Đã xoá tiến độ.');
      go('home');
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
  else if (demo === 'sos') { go('sos'); }
  else if (demo === 'cards') { startCards(); }
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
    go('quiz');
  } else { render(); }
})();
