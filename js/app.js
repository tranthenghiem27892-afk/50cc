/* ============================================================
   原付免許 50cc — app logic (vanilla JS, chạy trực tiếp file://)
   ============================================================ */
(function () {
  'use strict';

  var Q = window.QUESTIONS || [];
  var CATS = window.CATEGORIES || [];
  var SIGNS = window.SIGNS || {};
  var STORE = 'gentsuki.v1';
  var EXAM_TIME = 30 * 60 * 1000;
  var EXAM_LEN = 50;
  var PASS = 45;

  var qById = {};
  Q.forEach(function (q) { qById[q.id] = q; });
  var catById = {};
  CATS.forEach(function (c) { catById[c.id] = c; });
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
      return '<button type="button" class="w" data-w="' + m + '">' + m + '</button>';
    });
  }

  function openWord(term) {
    var key = VOCAB_ALIAS[term] || term;
    var v = VOCAB[key];
    if (!v) { return; }
    var body = document.getElementById('sheetBody');
    if (!body) { return; }
    body.innerHTML =
      '<div class="w-term">' + esc(key) + '</div>' +
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
    var d = {};
    try { d = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { d = {}; }
    d.answers = d.answers || {};
    d.wrong = Array.isArray(d.wrong) ? d.wrong : [];
    d.exams = Array.isArray(d.exams) ? d.exams : [];
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
  function record(id, ok) {
    var a = db.answers[id] || (db.answers[id] = { n: 0, ok: 0 });
    a.n++; if (ok) { a.ok++; }
    a.last = ok ? 1 : 0;
    a.t = Date.now();
    var i = db.wrong.indexOf(id);
    if (!ok && i < 0) { db.wrong.push(id); }
    if (ok && i >= 0) { db.wrong.splice(i, 1); }
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
      return '<a class="credit-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(l.label || l.url) + '</a>';
    }).join('');

    return '<footer class="credit">' +
      '<div class="credit-avatar">' + av + '</div>' +
      '<div class="credit-main">' +
        '<div class="credit-name">' + esc(name) +
          (a.handle ? '<span>' + esc(a.handle) + '</span>' : '') + '</div>' +
        (a.bio ? '<p class="credit-bio">' + esc(a.bio) + '</p>' : '') +
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

  function quoteBlock() {
    var q = pickQuote();
    if (!q) { return ''; }
    return '<section class="quote" id="quoteBox">' +
      '<div class="quote-emoji">' + q.e + '</div>' +
      '<div class="quote-body">' +
        '<p class="quote-text">' + esc(q.t) + '</p>' +
        (q.a ? '<p class="quote-author">— ' + esc(q.a) + '</p>' : '') +
      '</div>' +
      '<button class="quote-next" data-act="quote" aria-label="Câu khác" title="Câu khác">↻</button>' +
      '</section>';
  }

  function viewHome() {
    var o = overall();
    var wrongN = db.wrong.filter(function (id) { return qById[id]; }).length;
    var last = db.exams[0];
    return '' +
      '<header class="topbar">' +
        '<div class="brand"><span class="brand-mark">原</span>' +
          '<span class="brand-text"><b>原付免許</b><i>50cc · luyện thi</i></span></div>' +
        '<div class="topbar-actions">' + themeBtn() +
          '<button class="icon-btn" data-act="go-stats" aria-label="Tiến độ">📈</button></div>' +
      '</header>' +
      '<main class="wrap">' +
        '<section class="hero">' +
          '<div class="hero-eyebrow">学科試験 · ○× 50 câu</div>' +
          '<h1>Đỗ bằng lái<br>xe 50cc tại Nhật</h1>' +
          '<p class="hero-sub">Luyện từng nhóm kiến thức, rồi thi thử đúng 50 câu trong 30 phút.</p>' +
          '<div class="facts">' +
            '<div class="fact"><b>50</b><span>câu hỏi</span></div>' +
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
        '</div>' +

        '<p class="footnote">Bộ câu hỏi tự biên soạn từ luật, không sao chép từ trang khác. Luôn đối chiếu với 免許センター nơi bạn thi.</p>' +
        creditBlock() +
        quoteBlock() +
      '</main>';
  }

  function viewPractice() {
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
      '<main class="wrap"><div class="catlist">' + rows + '</div>' +
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
          '<i>' + (isExam ? 'Thi thử' : cat.vi) + '</i></div>' +
        (isExam ? '<div class="timer" id="timer">30:00</div>' : '<div class="timer soft">' + scoreSoFar() + '</div>') +
      '</header>' +
      '<div class="progress"><i style="width:' + (((S.i + (answered ? 1 : 0)) / total) * 100) + '%"></i></div>' +
      '<main class="wrap quizwrap">' +
        '<article class="qcard">' +
          '<span class="qtag">' + cat.icon + ' ' + cat.vi + '</span>' +
          sign +
          '<p class="qtext">' + mark(esc(q.q)) + '</p>' +
          '<p class="qhint">' + (isExam ? 'Chọn ○ nếu đúng, × nếu sai' : 'Câu này đúng hay sai?') +
            ' · <span class="w-tip">chạm từ tiếng Nhật để tra nghĩa</span></p>' +
          answers +
        '</article>' +
        (showFb ? feedback(q, picked) : '') +
        (isExam ? examFooter() : '') +
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
    var dots = S.ids.map(function (id, i) {
      var cls = 'dot' + (S.picks[i] !== undefined ? ' done' : '') + (i === S.i ? ' cur' : '');
      return '<button class="' + cls + '" data-act="jump" data-i="' + i + '">' + (i + 1) + '</button>';
    }).join('');
    var allDone = S.picks.every(function (p) { return p !== undefined; });
    return '<div class="examnav">' +
      '<div class="dots">' + dots + '</div>' +
      '<div class="examnav-btns">' +
        '<button class="btn btn-ghost" data-act="prev"' + (S.i === 0 ? ' disabled' : '') + '>← Trước</button>' +
        '<button class="btn btn-primary" data-act="' + (allDone ? 'submit' : 'next') + '">' +
          (allDone ? 'Nộp bài' : 'Tiếp →') + '</button>' +
      '</div>' +
      (allDone ? '' : '<button class="linkbtn" data-act="submit">Nộp bài sớm</button>') +
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
    var pass = total >= EXAM_LEN ? score >= PASS : score / total >= 0.9;
    return { details: details, score: score, total: total, pass: pass };
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
        '<section class="panel"><h3 class="panel-title">Câu sai (' + wrong.length + ')</h3>' + wrongHtml + '</section>' +
        '<div class="btnrow">' +
          '<button class="btn btn-primary" data-act="' + (isExam ? 'start-exam' : 'again') + '">' +
            (isExam ? 'Thi lại' : 'Làm lại nhóm này') + '</button>' +
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

  function viewInfo() {
    return topbar('Thủ tục & mẹo thi') +
      '<main class="wrap info">' +
        '<section class="panel">' +
          '<h2>Thi lý thuyết 原付 (50cc)</h2>' +
          '<p>Đề thi gồm <b>50 câu ○×</b>, làm trong <b>30 phút</b>, mỗi câu 1 điểm, <b>45/50 là đỗ</b>. ' +
          'Không có thi thực hành — chỉ lý thuyết tại 運転免許試験場 (trung tâm cấp bằng của tỉnh).</p>' +
          '<p class="muted">Nguồn tham khảo: trang 学科試験 của 高知県警察 (30 phút, 50 điểm, 45 điểm đỗ).</p>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Điều kiện & thủ tục</h2>' +
          '<ul>' +
            '<li>Đủ <b>16 tuổi</b> trở lên.</li>' +
            '<li>Học <b>原付講習</b> (khoảng 3 giờ) tại trường dạy lái — bắt buộc, thường 5.000–8.000 yên. ' +
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
          '<h2>Về bộ câu hỏi này</h2>' +
          '<p>Toàn bộ câu hỏi được biên soạn lại bằng tiếng Nhật từ nội dung luật (道路交通法), có giải thích tiếng Việt. ' +
          'Không sao chép văn bản từ trang luyện thi nào. Nếu bạn muốn thêm câu từ một nguồn khác, hãy chắc chắn bạn có quyền sử dụng nội dung đó.</p>' +
        '</section>' +
      '</main>';
  }

  /* ---------------- actions ---------------- */
  function go(name) { screen = name; render(); }

  function startPractice(catId) {
    var list = shuffle(byCat[catId] || []);
    if (!list.length) { return; }
    S = { mode: 'practice', cat: catId, ids: list.map(function (q) { return q.id; }),
          i: 0, picks: list.map(function () { return undefined; }) };
    go('quiz');
  }

  function startExam() {
    var ids = shuffle(Q).slice(0, Math.min(EXAM_LEN, Q.length)).map(function (q) { return q.id; });
    S = { mode: 'exam', ids: ids, i: 0,
          picks: ids.map(function () { return undefined; }),
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
    if (S.i + 1 >= S.ids.length) {
      if (S.mode === 'exam') { submitExam(false); } else { finishPractice(); }
      return;
    }
    S.i++;
    render();
  }

  function prev() {
    if (!S || S.i === 0) { return; }
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
    else { html = viewHome(); }
    app.innerHTML = html;
    window.scrollTo(0, 0);
    if (screen === 'quiz' && S && S.mode === 'exam') { paintTimer(); }
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var w = e.target.closest('.w');
    if (w) { openWord(w.getAttribute('data-w')); return; }

    var t = e.target.closest('[data-act]');
    if (!t) { return; }
    var act = t.dataset.act;

    if (act === 'close-sheet') { closeSheet(); return; }
    if (act === 'quote') {
      var qb = document.getElementById('quoteBox');
      if (qb) { qb.outerHTML = quoteBlock(); }
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
    if (act === 'start-cat') { startPractice(t.dataset.cat); return; }
    if (act === 'start-exam') { startExam(); return; }
    if (act === 'start-review') { startReview(); return; }
    if (act === 'answer') { answer(Number(t.dataset.v)); return; }
    if (act === 'next') { next(); return; }
    if (act === 'prev') { prev(); return; }
    if (act === 'jump') { S.i = Number(t.dataset.i); render(); return; }
    if (act === 'submit') {
      var left = S.ids.length - S.picks.filter(function (p) { return p !== undefined; }).length;
      if (left > 0 && !confirm('Còn ' + left + ' câu chưa trả lời. Vẫn nộp bài?')) { return; }
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
    var k = e.key;
    if (k === '1' || k === 'o' || k === 'O') { answer(1); }
    else if (k === '2' || k === 'x' || k === 'X') { answer(0); }
    else if (k === 'ArrowRight' || k === 'Enter') {
      if (S.picks[S.i] !== undefined) { e.preventDefault(); next(); }
    } else if (k === 'ArrowLeft') { prev(); }
  });

  /* ---------------- boot ---------------- */
  window.addEventListener('beforeunload', function () { stopTimer(); });
  var sheetBack = document.getElementById('sheetBack');
  if (sheetBack) { sheetBack.addEventListener('click', closeSheet); }

  /* ?demo=... — chỉ dùng để chụp ảnh/giới thiệu, không ảnh hưởng lúc dùng thật */
  var demo = new URLSearchParams(location.search).get('demo');
  var themeParam = new URLSearchParams(location.search).get('theme');
  if (themeParam === 'dark' || themeParam === 'light') { applyTheme(themeParam); }
  if (demo) { document.documentElement.classList.add('no-anim'); }
  if (demo === 'quiz') { startPractice('sign'); }
  else if (demo === 'answered') { startPractice('sign'); answer(1); }
  else if (demo === 'exam') { startExam(); }
  else if (demo === 'result') {
    startPractice('sign');
    S.picks = S.ids.map(function (id, i) { return i % 3 === 0 ? (qById[id].a === 1 ? 0 : 1) : qById[id].a; });
    finishPractice();
  } else if (demo === 'stats') { go('stats'); }
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
