/* ============================================================
   Hình minh hoạ 危険予測 (câu 47–48) — vẽ lại theo đúng mô tả
   Góc nhìn: ngồi trên xe, đường bên trái (Nhật chạy bên trái).
   ============================================================ */
(function () {
  var W = 480, H = 300;

  /* mây trên trời */
  function clouds(o) {
    var col = o.night ? '#2a3646' : o.rain ? '#9aa5b1' : '#ffffff';
    var op = o.night ? .55 : o.rain ? .55 : .9;
    var pts = [[70, 40, 1], [196, 28, .82], [320, 46, .95], [428, 30, .72]];
    var g = '';
    for (var i = 0; i < pts.length; i++) {
      var x = pts[i][0], y = pts[i][1], s = pts[i][2];
      g += '<g opacity="' + op + '" fill="' + col + '">' +
        '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (26 * s) + '" ry="' + (11 * s) + '"/>' +
        '<ellipse cx="' + (x - 16 * s) + '" cy="' + (y + 3 * s) + '" rx="' + (17 * s) + '" ry="' + (8 * s) + '"/>' +
        '<ellipse cx="' + (x + 18 * s) + '" cy="' + (y + 4 * s) + '" rx="' + (19 * s) + '" ry="' + (9 * s) + '"/>' +
        '</g>';
    }
    return g;
  }

  /* cây cối, nhà cửa hai bên đường */
  function scenery(o) {
    var leaf = o.night ? '#1d2b22' : o.rain ? '#4e5c4c' : '#5f8f57';
    var leaf2 = o.night ? '#22322a' : o.rain ? '#5c6b58' : '#74a566';
    var trunk = o.night ? '#2a2320' : '#6b4f3a';
    var wallC = o.night ? '#39414c' : o.rain ? '#9aa3ac' : '#e8e2d6';
    var roofC = o.night ? '#2a3038' : o.rain ? '#6f7780' : '#b5563f';
    var lit = o.night ? '#ffd76a' : '#9fc6e0';

    function tree(x, y, s, alt) {
      return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
        '<rect x="-2.5" y="-16" width="5" height="16" fill="' + trunk + '"/>' +
        '<circle cx="0" cy="-24" r="13" fill="' + (alt ? leaf2 : leaf) + '"/>' +
        '<circle cx="-9" cy="-18" r="9" fill="' + (alt ? leaf : leaf2) + '"/>' +
        '<circle cx="9" cy="-19" r="8.5" fill="' + (alt ? leaf2 : leaf) + '"/>' +
        '</g>';
    }

    function house(x, y, s, litWin) {
      return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
        '<rect x="-22" y="-26" width="44" height="26" fill="' + wallC + '"/>' +
        '<polygon points="-26,-26 0,-40 26,-26" fill="' + roofC + '"/>' +
        '<rect x="-14" y="-20" width="10" height="9" fill="' + (litWin ? lit : '#5d6875') + '"/>' +
        '<rect x="4" y="-20" width="10" height="9" fill="' + (litWin ? lit : '#5d6875') + '"/>' +
        '<rect x="-3" y="-9" width="8" height="9" fill="#6b5a48"/>' +
        '</g>';
    }

    var g = '';
    /* bên trái */
    g += house(34, 196, 1.15, o.night);
    g += house(96, 168, .8, o.night);
    g += tree(144, 214, 1.25, false);
    g += tree(16, 250, 1.6, true);
    /* bên phải */
    g += house(444, 190, 1.1, o.night);
    g += house(392, 164, .78, o.night);
    g += tree(354, 212, 1.2, true);
    g += tree(470, 246, 1.55, false);
    return g;
  }

  /* đường phía trước: làn của bạn bên trái, làn ngược chiều bên phải */
  function base(o) {
    o = o || {};
    var id = o.id || 'x';
    var night = o.night, rain = o.rain;
    var sky1 = night ? '#0c1420' : rain ? '#79838f' : '#cfe6f7';
    var sky2 = night ? '#1a2636' : rain ? '#a7b2be' : '#eaf4fb';
    var grass = night ? '#121820' : rain ? '#5f6a63' : '#8fb07f';
    var road = night ? '#1d232b' : rain ? '#474f59' : '#555b65';
    var line = night ? '#cfc9ba' : '#f2f0e6';

    var g = '<defs><linearGradient id="s' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + sky1 + '"/><stop offset="1" stop-color="' + sky2 + '"/></linearGradient></defs>';
    g += '<rect width="' + W + '" height="' + H + '" fill="' + grass + '"/>';
    g += '<rect width="' + W + '" height="120" fill="url(#s' + id + ')"/>';

    if (o.tunnel) { return g; }

    g += clouds(o);
    if (!o.noScenery) { g += scenery(o); }

    if (o.downhill) {
      /* dốc xuống: mặt đường phía xa nhô lên rồi đổ xuống */
      g += '<polygon points="150,232 330,232 306,120 174,120" fill="' + (night ? '#252c35' : '#6b727c') + '"/>';
      g += '<polygon points="24,300 470,300 330,232 150,232" fill="' + road + '"/>';
      g += '<rect x="150" y="230" width="180" height="3" fill="#8a9099" opacity=".8"/>';
      g += '<polygon points="150,232 158,232 172,120 166,120" fill="' + line + '" opacity=".85"/>';
      g += '<polygon points="322,232 330,232 314,120 308,120" fill="' + line + '" opacity=".85"/>';
      g += '<polygon points="236,232 244,232 246,120 238,120" fill="' + line + '" opacity=".8"/>';
      g += '<polygon points="244,232 236,232 264,300 274,300" fill="' + line + '" opacity=".85"/>';
      return g;
    }

    /* lòng đường: mép trái – vạch giữa – mép phải */
    g += '<polygon points="168,120 240,120 268,300 24,300" fill="' + road + '"/>';
    g += '<polygon points="240,120 312,120 470,300 268,300" fill="' + road + '"/>';
    if (o.center === 'dashed') {
      for (var d = 0; d < 6; d++) {
        var t1 = d / 6.2, t2 = t1 + 0.055;
        var yy1 = 122 + 178 * t1, yy2 = 122 + 178 * t2;
        var cx1 = 240 + 8 * t1, cx2 = 240 + 8 * t2;
        var ww1 = 3 + 2.6 * t1, ww2 = 3 + 2.6 * t2;
        g += '<polygon points="' + (cx1 - ww1) + ',' + yy1 + ' ' + (cx1 + ww1) + ',' + yy1 + ' ' +
          (cx2 + ww2) + ',' + yy2 + ' ' + (cx2 - ww2) + ',' + yy2 + '" fill="' + line + '" opacity=".85"/>';
      }
    } else if (o.center !== false) {
      g += '<polygon points="236,120 244,120 272,300 264,300" fill="' + line + '" opacity=".9"/>';
    }
    if (o.edge !== false) {
      g += '<polygon points="164,120 172,120 30,300 14,300" fill="' + line + '" opacity=".85"/>';
      g += '<polygon points="308,120 316,120 474,300 458,300" fill="' + line + '" opacity=".85"/>';
    }
    if (o.guard) {
      g += '<polygon points="330,120 470,160 470,300 340,300" fill="none"/>';
      for (var k = 0; k < 7; k++) {
        var yy = 130 + k * 26, xx = 300 + k * 24;
        g += '<rect x="' + xx + '" y="' + yy + '" width="' + (6 + k * 2) + '" height="' + (14 + k * 4) +
          '" fill="#9aa1a8" opacity=".85"/>';
      }
    }
    if (rain) {
      for (var r = 0; r < 30; r++) {
        var rxp = (r * 41 % 476) + 3, ryp = (r * 57 % 280) + 5;
        g += '<line x1="' + rxp + '" y1="' + ryp + '" x2="' + (rxp - 8) + '" y2="' + (ryp + 18) +
          '" stroke="#dfe9f2" stroke-width="1.3" opacity=".5"/>';
      }
    }
    return g;
  }

  /* ---------- phương tiện (nhìn từ sau) ---------- */
  function carBack(x, y, w, color, o) {
    o = o || {};
    var s = w / 100;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">';
    g += '<ellipse cx="0" cy="1" rx="52" ry="6" fill="#000" opacity=".25"/>';
    g += '<rect x="-48" y="-56" width="96" height="56" rx="12" fill="' + color + '"/>';
    g += '<rect x="-38" y="-50" width="76" height="20" rx="7" fill="#28323e" opacity=".72"/>';
    g += '<rect x="-44" y="-15" width="19" height="9" rx="4" fill="' + (o.brake ? '#ff3b30' : '#7d2b25') + '"/>';
    g += '<rect x="25" y="-15" width="19" height="9" rx="4" fill="' + (o.brake ? '#ff3b30' : '#7d2b25') + '"/>';
    if (o.brake) {
      g += '<ellipse cx="-35" cy="-11" rx="20" ry="12" fill="#ff3b30" opacity=".25"/>';
      g += '<ellipse cx="35" cy="-11" rx="20" ry="12" fill="#ff3b30" opacity=".25"/>';
    }
    g += '<rect x="-13" y="-8" width="26" height="7" rx="3" fill="#2b2f36"/>';
    if (o.left) {
      g += '<circle cx="-54" cy="-32" r="7" fill="#ffb300"/><circle cx="-54" cy="-32" r="13" fill="#ffb300" opacity=".28"/>';
    }
    if (o.right) {
      g += '<circle cx="54" cy="-32" r="7" fill="#ffb300"/><circle cx="54" cy="-32" r="13" fill="#ffb300" opacity=".28"/>';
    }
    return g + '</g>';
  }

  function truckBack(x, y, w, o) {
    o = o || {};
    var s = w / 100;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">';
    g += '<ellipse cx="0" cy="1" rx="54" ry="6" fill="#000" opacity=".25"/>';
    g += '<rect x="-50" y="-96" width="100" height="96" rx="6" fill="' + (o.color || '#e7e9ec') + '"/>';
    g += '<rect x="-42" y="-88" width="84" height="58" rx="3" fill="#cfd4da"/>';
    g += '<rect x="-42" y="-26" width="84" height="16" rx="3" fill="#b9bfc6"/>';
    g += '<rect x="-45" y="-16" width="18" height="9" rx="3" fill="' + (o.brake ? '#ff3b30' : '#7d2b25') + '"/>';
    g += '<rect x="27" y="-16" width="18" height="9" rx="3" fill="' + (o.brake ? '#ff3b30' : '#7d2b25') + '"/>';
    if (o.left) {
      g += '<circle cx="-56" cy="-46" r="8" fill="#ffb300"/><circle cx="-56" cy="-46" r="14" fill="#ffb300" opacity=".25"/>';
    }
    return g + '</g>';
  }

  function carFront(x, y, w, color, o) {
    o = o || {};
    var s = w / 100;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">';
    g += '<ellipse cx="0" cy="1" rx="50" ry="6" fill="#000" opacity=".3"/>';
    g += '<rect x="-48" y="-52" width="96" height="52" rx="12" fill="' + color + '"/>';
    g += '<rect x="-38" y="-46" width="76" height="18" rx="6" fill="#22303c" opacity=".85"/>';
    g += '<circle cx="-31" cy="-12" r="8" fill="#fff6cf"/>';
    g += '<circle cx="31" cy="-12" r="8" fill="#fff6cf"/>';
    if (o.bright) {
      g += '<circle cx="-31" cy="-12" r="30" fill="#fff6cf" opacity=".22"/>';
      g += '<circle cx="31" cy="-12" r="30" fill="#fff6cf" opacity=".22"/>';
      g += '<polygon points="-58,-12 -4,-12 -30,26" fill="#fff6cf" opacity=".10"/>';
      g += '<polygon points="4,-12 58,-12 30,26" fill="#fff6cf" opacity=".10"/>';
    }
    return g + '</g>';
  }

  function busSide(x, y, w, h) {
    var g = '<g transform="translate(' + x + ',' + y + ')">';
    g += '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="10" fill="#e2e7ec"/>';
    g += '<rect x="0" y="0" width="' + w + '" height="26" rx="8" fill="#c8102e" opacity=".85"/>';
    for (var i = 0; i < 3; i++) {
      g += '<rect x="10" y="' + (34 + i * 34) + '" width="' + (w - 34) + '" height="22" rx="4" fill="#2a3440" opacity=".72"/>';
    }
    g += '<circle cx="26" cy="' + (h - 2) + '" r="14" fill="#24282e"/>';
    g += '<circle cx="' + (w - 34) + '" cy="' + (h - 2) + '" r="14" fill="#24282e"/>';
    return g + '</g>';
  }

  function ped(x, y, h, color, o) {
    o = o || {};
    var s = h / 60;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">';
    g += '<ellipse cx="0" cy="1" rx="13" ry="3" fill="#000" opacity=".22"/>';
    g += '<circle cx="0" cy="-50" r="7" fill="' + (o.dark ? '#2a2620' : '#e6c3a1') + '"/>';
    g += '<rect x="-9" y="-42" width="18" height="24" rx="7" fill="' + color + '"/>';
    g += '<rect x="-8" y="-20" width="6" height="20" rx="3" fill="#2f353c"/>';
    g += '<rect x="2" y="-20" width="6" height="20" rx="3" fill="#2f353c"/>';
    if (o.umbrella) {
      g += '<path d="M-24,-56 Q0,-78 24,-56 Z" fill="' + o.umbrella + '"/>';
      g += '<line x1="0" y1="-56" x2="0" y2="-32" stroke="#666" stroke-width="2"/>';
    }
    return g + '</g>';
  }

  function cyclist(x, y, w, color, o) {
    o = o || {};
    var s = w / 100;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')' +
      (o.tilt ? ' rotate(' + o.tilt + ')' : '') + '">';
    g += '<ellipse cx="0" cy="1" rx="30" ry="4" fill="#000" opacity=".2"/>';
    g += '<circle cx="-26" cy="-12" r="12" fill="none" stroke="#2b2f36" stroke-width="3"/>';
    g += '<circle cx="26" cy="-12" r="12" fill="none" stroke="#2b2f36" stroke-width="3"/>';
    g += '<path d="M-26,-12 L0,-32 L26,-12" stroke="#2b2f36" stroke-width="3" fill="none"/>';
    g += '<rect x="-4" y="-46" width="16" height="18" rx="6" fill="' + color + '"/>';
    g += '<circle cx="4" cy="-54" r="6" fill="#e6c3a1"/>';
    return g + '</g>';
  }

  function signal(x, y, green) {
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<rect x="-1.8" y="0" width="3.6" height="' + (240 - y) + '" fill="#5b626a"/>' +
      '<rect x="-12" y="-34" width="24" height="46" rx="5" fill="#2b2f36"/>' +
      '<circle cx="0" cy="-26" r="6.5" fill="' + (green ? '#2a2e35' : '#e8465c') + '"/>' +
      '<circle cx="0" cy="-13" r="6.5" fill="#2a2e35"/>' +
      '<circle cx="0" cy="0" r="6.5" fill="' + (green ? '#3ddc84' : '#2a2e35') + '"/>' +
      (green ? '<circle cx="0" cy="0" r="13" fill="#3ddc84" opacity=".22"/>' : '') +
      '</g>';
  }

  function zebra(y0, n, step) {
    var g = '';
    for (var i = 0; i < n; i++) {
      var y = y0 + i * step;
      var hw = 46 + i * 26;
      g += '<rect x="' + (240 - hw) + '" y="' + y + '" width="' + (hw * 2) + '" height="' +
        (8 + i * 3) + '" fill="#f2f0e6" opacity=".9"/>';
    }
    return g;
  }

  function manhole(x, y, r) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + (r * .4) + '" fill="#343b44"/>' +
      '<ellipse cx="' + x + '" cy="' + (y - 1.5) + '" rx="' + (r * .78) + '" ry="' + (r * .28) + '" fill="#4a525c"/>';
  }

  function svg(id, body, o) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="hình minh hoạ tình huống">' +
      base(o) + body + '</svg>';
  }

  var A = {};

  /* 1. Giao lộ, đèn xanh, xe tải bên trái xi-nhan trái chờ rẽ */
  A.il01 = svg('il01', (function () {
    function L(y) { return 168 - 144 * ((y - 120) / 180); }
    function R(y) { return 312 + 158 * ((y - 120) / 180); }
    var g = '';
    var yA = 150, yB = 208;
    /* dải đường ngang — đè lên vạch dọc để giao lộ liền mạch */
    g += '<rect x="0" y="' + yA + '" width="480" height="' + (yB - yA) + '" fill="#4d535d"/>';
    /* mép đường ngang: chỉ vẽ ngoài làn mình */
    g += '<rect x="0" y="' + yA + '" width="' + L(yA).toFixed(0) + '" height="3" fill="#f2f0e6" opacity=".7"/>';
    g += '<rect x="' + R(yA).toFixed(0) + '" y="' + yA + '" width="' + (480 - R(yA)).toFixed(0) + '" height="3" fill="#f2f0e6" opacity=".7"/>';
    g += '<rect x="0" y="' + (yB - 3) + '" width="' + L(yB).toFixed(0) + '" height="3" fill="#f2f0e6" opacity=".7"/>';
    g += '<rect x="' + R(yB).toFixed(0) + '" y="' + (yB - 3) + '" width="' + (480 - R(yB)).toFixed(0) + '" height="3" fill="#f2f0e6" opacity=".7"/>';
    /* vạch qua đường */
    var yF = 214, yN = 242, n = 7;
    for (var i = 0; i < n; i++) {
      var u0 = i / n, u1 = (i + 0.6) / n;
      var xF0 = L(yF) + (R(yF) - L(yF)) * u0, xF1 = L(yF) + (R(yF) - L(yF)) * u1;
      var xN0 = L(yN) + (R(yN) - L(yN)) * u0, xN1 = L(yN) + (R(yN) - L(yN)) * u1;
      g += '<polygon points="' + xF0.toFixed(1) + ',' + yF + ' ' + xF1.toFixed(1) + ',' + yF + ' ' +
        xN1.toFixed(1) + ',' + yN + ' ' + xN0.toFixed(1) + ',' + yN + '" fill="#f2f0e6" opacity=".95"/>';
    }
    /* vạch dừng dày */
    g += '<polygon points="' + L(252).toFixed(1) + ',252 262,252 261,261 ' + L(261).toFixed(1) + ',261" fill="#f2f0e6"/>';
    /* nhà cửa hai bên, đặt ngoài dải đường */
    g += '<g>' +
      '<rect x="26" y="126" width="34" height="20" fill="#e8e2d6"/><polygon points="22,126 43,112 64,126" fill="#b5563f"/>' +
      '<rect x="414" y="122" width="36" height="22" fill="#e8e2d6"/><polygon points="410,122 432,108 454,122" fill="#b5563f"/>' +
      '<rect x="18" y="246" width="38" height="22" fill="#e8e2d6"/><polygon points="14,246 37,232 60,246" fill="#b5563f"/>' +
      '<rect x="430" y="242" width="36" height="22" fill="#e8e2d6"/><polygon points="426,242 448,228 470,242" fill="#b5563f"/>' +
      '</g>';
    /* cây */
    g += '<circle cx="88" cy="136" r="11" fill="#5f8f57"/><rect x="85" y="136" width="5" height="14" fill="#6b4f3a"/>';
    g += '<circle cx="392" cy="134" r="10" fill="#74a566"/><rect x="389" y="134" width="5" height="13" fill="#6b4f3a"/>';
    /* đèn tín hiệu */
    g += signal(92, 150, true);
    /* xe tải chờ rẽ trái */
    g += truckBack(172, 206, 96, { left: true });
    return g;
  })(), { id: 'il01', center: 'solid', edge: true, noScenery: true });

  /* 2. Mưa, vạch sơn trắng bên trái, nắp cống, xe trước phanh */
  A.il02 = svg('il02', (function () {
    var g = '';
    g += '<polygon points="72,300 96,300 196,152 188,152" fill="#f2f0e6" opacity=".8"/>';
    g += manhole(128, 252, 24);
    g += carBack(168, 214, 66, '#c9ced6', { brake: true });
    return g;
  })(), { id: 'il02', center: 'dashed', rain: true });

  /* 3. Đường hẹp, người đi bộ cùng chiều, xe đạp lách sang trái */
  A.il03 = svg('il03', (function () {
    var g = ped(196, 226, 58, '#3f6fb5');
    g += cyclist(150, 222, 66, '#d4553f', { tilt: -9 });
    return g;
  })(), { id: 'il03', edge: false, center: false });

  /* 4. Ra khỏi hầm, gió mạnh */
  A.il04 = svg('il04', (function () {
    var g = '';
    /* ---- khung cửa hầm ---- */
    g += '<rect x="150" y="106" width="180" height="146" fill="#cfe6f7"/>';
    /* trời phía trên đường chân trời */
    g += '<rect x="150" y="106" width="180" height="72" fill="#bfe0f7"/>';
    g += '<rect x="150" y="110" width="180" height="26" fill="#d6ecfa"/>';
    /* dải đồi xa + chân trời */
    g += '<rect x="150" y="176" width="180" height="9" fill="#cfe0bd"/>';
    g += '<rect x="150" y="183" width="180" height="2" fill="#a9c496" opacity=".8"/>';
    /* đất hai bên đường ngoài */
    g += '<polygon points="150,185 232,185 168,252 150,252" fill="#9dbb8b"/>';
    g += '<polygon points="330,185 248,185 312,252 330,252" fill="#9dbb8b"/>';
    /* ---- đường phía ngoài: từ chân trời xuống cửa hầm ---- */
    g += '<polygon points="168,252 312,252 248,185 232,185" fill="#6b727c"/>';
    g += '<polygon points="168,252 177,252 234,185 232,185" fill="#f2f0e6" opacity=".9"/>';
    g += '<polygon points="303,252 312,252 248,185 246,185" fill="#f2f0e6" opacity=".9"/>';
    g += '<polygon points="237,252 243,252 241,185 239,185" fill="#f2f0e6" opacity=".9"/>';
    /* ---- sàn hầm ---- */
    g += '<polygon points="0,300 480,300 330,252 150,252" fill="#2a3038"/>';
    g += '<polygon points="0,300 5,300 153,252 150,252" fill="#f2f0e6" opacity=".8"/>';
    g += '<polygon points="475,300 480,300 330,252 327,252" fill="#f2f0e6" opacity=".8"/>';
    g += '<polygon points="260,300 267,300 243,252 237,252" fill="#f2f0e6" opacity=".9"/>';
    /* ---- trần và hai thành hầm ---- */
    g += '<polygon points="0,0 480,0 330,106 150,106" fill="#1b2027"/>';
    g += '<polygon points="0,0 150,106 150,252 0,300" fill="#1b2027"/>';
    g += '<polygon points="480,0 330,106 330,252 480,300" fill="#1b2027"/>';
    /* đèn trần chạy dọc hai bên */
    for (var i = 0; i < 4; i++) {
      var tt = i / 3.6;
      g += '<rect x="' + (206 - 92 * tt).toFixed(1) + '" y="' + (86 - 40 * tt).toFixed(1) +
        '" width="' + (18 - 8 * tt).toFixed(1) + '" height="4" rx="2" fill="#ffd76a" opacity=".85"/>';
      g += '<rect x="' + (250 + 92 * tt).toFixed(1) + '" y="' + (86 - 40 * tt).toFixed(1) +
        '" width="' + (18 - 8 * tt).toFixed(1) + '" height="4" rx="2" fill="#ffd76a" opacity=".85"/>';
    }
    /* ---- gió mạnh ngoài cửa hầm ---- */
    g += '<g stroke="#ffffff" stroke-width="2.2" fill="none" opacity=".7" stroke-linecap="round">' +
      '<path d="M152,132 q42,-8 76,4 t56,-6"/>' +
      '<path d="M154,166 q40,10 78,-2 t50,4"/>' +
      '<path d="M328,120 q-38,-6 -66,6"/></g>';
    var leaves = [[196,120],[300,132],[236,146],[312,152],[264,160],[206,168],[300,172],[250,178]];
    for (var k = 0; k < leaves.length; k++) {
      var lx = leaves[k][0], ly = leaves[k][1];
      g += '<ellipse cx="' + lx + '" cy="' + ly + '" rx="5" ry="2.4" fill="' + (k % 2 ? '#8fb07f' : '#c8a24a') +
        '" transform="rotate(' + (k * 37 % 60 - 30) + ' ' + lx + ' ' + ly + ')"/>';
    }
    return g;
  })(), { id: 'il04', tunnel: true, edge: false });

  /* 5. Dốc dài xuống, xe tải trước phanh */
  A.il05 = svg('il05', (function () {
    var g = truckBack(178, 262, 92, { brake: true });
    return g;
  })(), { id: 'il05', downhill: true, center: 'solid' });

  /* 6. Đêm, xe ngược chiều bật đèn pha */
  A.il06 = svg('il06', (function () {
    var g = carFront(356, 226, 70, '#3f4b5a', { bright: true });
    return g;
  })(), { id: 'il06', night: true, center: 'dashed' });

  /* 7. Xe tải quay đầu giữa đường */
  A.il07 = svg('il07', (function () {
    var g = '<g transform="translate(178,240) rotate(-28)">' + truckBack(0, 0, 86, { left: true }) + '</g>';
    return g;
  })(), { id: 'il07', center: 'dashed' });

  /* 8. Mưa to, học sinh chuẩn bị băng qua vạch */
  A.il08 = svg('il08', (function () {
    function L(y) { return 168 - 144 * ((y - 120) / 180); }
    function R(y) { return 312 + 158 * ((y - 120) / 180); }
    var yF = 194, yN = 252, n = 7, g = '';
    for (var i = 0; i < n; i++) {
      var u0 = i / n, u1 = (i + 0.6) / n;
      var xF0 = L(yF) + (R(yF) - L(yF)) * u0, xF1 = L(yF) + (R(yF) - L(yF)) * u1;
      var xN0 = L(yN) + (R(yN) - L(yN)) * u0, xN1 = L(yN) + (R(yN) - L(yN)) * u1;
      g += '<polygon points="' + xF0.toFixed(1) + ',' + yF + ' ' + xF1.toFixed(1) + ',' + yF + ' ' +
        xN1.toFixed(1) + ',' + yN + ' ' + xN0.toFixed(1) + ',' + yN + '" fill="#f2f0e6" opacity=".92"/>';
    }
    g += '<polygon points="' + L(258).toFixed(1) + ',258 ' + R(258).toFixed(1) + ',258 ' +
      R(262).toFixed(1) + ',262 ' + L(262).toFixed(1) + ',262" fill="#f2f0e6" opacity=".75"/>';
    g += ped(118, 246, 52, '#c8102e', { umbrella: '#e8465c' });
    g += ped(150, 252, 50, '#2f6fd0', { umbrella: '#2f6fd0' });
    g += ped(184, 258, 48, '#f0b429', { umbrella: '#f0b429' });
    return g;
  })(), { id: 'il08', rain: true, center: 'solid' });

  /* 9. Xe buýt dừng bên trái, bạn vượt bên phải */
  A.il09 = svg('il09', (function () {
    var g = busSide(-24, 138, 188, 162);
    g += '<rect x="150" y="196" width="16" height="10" rx="4" fill="#ffb300"/>';
    g += '<circle cx="158" cy="201" r="14" fill="#ffb300" opacity=".25"/>';
    g += ped(188, 250, 54, '#3f6fb5');
    return g;
  })(), { id: 'il09', center: 'dashed' });

  /* 10. Đường hẹp nông thôn, xe ngược chiều, rãnh bên trái */
  A.il10 = svg('il10', (function () {
    var g = '<polygon points="0,300 62,300 160,150 150,150" fill="#2c3a33"/>';
    g += carFront(300, 232, 62, '#b9c0c8', {});
    return g;
  })(), { id: 'il10', edge: false, center: false });

  /* 11. Đêm, người mặc đồ tối đi cùng chiều */
  A.il11 = svg('il11', (function () {
    var g = ped(198, 236, 56, '#23262b', { dark: true });
    return g;
  })(), { id: 'il11', night: true, center: 'dashed' });

  /* 12. Dốc xuống, xe trước phanh gấp */
  A.il12 = svg('il12', (function () {
    var g = '<polygon points="120,300 164,300 192,258 180,258" fill="#3a3f47" opacity=".5"/>';
    g += '<polygon points="196,300 236,300 214,260 204,260" fill="#3a3f47" opacity=".5"/>';
    g += carBack(178, 266, 90, '#c9ced6', { brake: true });
    return g;
  })(), { id: 'il12', downhill: true, center: 'solid' });

  window.ILL_ART = A;
})();
