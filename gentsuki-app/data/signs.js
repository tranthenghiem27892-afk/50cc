/* Biển báo vẽ bằng SVG — đã đối chiếu với hình mẫu chuẩn (標識令) rồi mới vẽ lại */
window.SIGNS = {
  /* 一時停止 (330-A) — tam giác ngược đỏ, viền trắng, 止まれ + STOP */
  stop: `<svg viewBox="0 0 160 148" role="img" aria-label="止まれ">
    <polygon points="80,3 157,141 3,141" fill="#d0021b"/>
    <polygon points="80,17 142,134 18,134" fill="none" stroke="#ffffff" stroke-width="3.5"/>
    <text x="80" y="107" text-anchor="middle" font-size="23" font-weight="700"
      fill="#ffffff" font-family="'Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif">止まれ</text>
    <text x="80" y="129" text-anchor="middle" font-size="15" font-weight="700"
      fill="#ffffff" font-family="'Segoe UI',Arial,sans-serif">STOP</text>
  </svg>`,

  /* 徐行 (329-A) — tam giác ngược đỏ, viền trắng, 徐行 + SLOW */
  slowdown: `<svg viewBox="0 0 160 148" role="img" aria-label="徐行">
    <polygon points="80,3 157,141 3,141" fill="#d0021b"/>
    <polygon points="80,17 142,134 18,134" fill="none" stroke="#ffffff" stroke-width="3.5"/>
    <text x="80" y="107" text-anchor="middle" font-size="27" font-weight="700"
      fill="#ffffff" font-family="'Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif">徐行</text>
    <text x="80" y="129" text-anchor="middle" font-size="15" font-weight="700"
      fill="#ffffff" font-family="'Segoe UI',Arial,sans-serif">SLOW</text>
  </svg>`,

  /* 一方通行 (326) — nền xanh, mũi tên trắng */
  oneway: `<svg viewBox="0 0 180 92" role="img" aria-label="一方通行">
    <rect x="3" y="3" width="174" height="86" rx="6" fill="#005bac"/>
    <rect x="18" y="38" width="94" height="16" fill="#ffffff"/>
    <polygon points="106,19 166,46 106,73" fill="#ffffff"/>
  </svg>`,

  /* 駐車禁止 (316) — nền xanh, viền đỏ, một gạch chéo */
  noparking: `<svg viewBox="0 0 140 140" role="img" aria-label="駐車禁止">
    <circle cx="70" cy="70" r="62" fill="#005bac" stroke="#d0021b" stroke-width="13"/>
    <line x1="27" y1="27" x2="113" y2="113" stroke="#d0021b" stroke-width="13"/>
  </svg>`,

  /* 駐停車禁止 (315) — nền xanh, viền đỏ, hai gạch chéo X */
  nostopping: `<svg viewBox="0 0 140 140" role="img" aria-label="駐停車禁止">
    <circle cx="70" cy="70" r="62" fill="#005bac" stroke="#d0021b" stroke-width="13"/>
    <line x1="29" y1="29" x2="111" y2="111" stroke="#d0021b" stroke-width="13"/>
    <line x1="111" y1="29" x2="29" y2="111" stroke="#d0021b" stroke-width="13"/>
  </svg>`,

  /* 最高速度 (323) — vòng trắng viền đỏ, số xanh */
  speed30: `<svg viewBox="0 0 140 140" role="img" aria-label="最高速度30km/h">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <text x="70" y="93" text-anchor="middle" font-size="60" font-weight="800"
      fill="#005bac" font-family="'Segoe UI',Arial,sans-serif">30</text>
  </svg>`,

  /* 車両進入禁止 (303) — đĩa đỏ, thanh trắng ngang */
  noentry: `<svg viewBox="0 0 140 140" role="img" aria-label="車両進入禁止">
    <circle cx="70" cy="70" r="62" fill="#d0021b"/>
    <rect x="27" y="59" width="86" height="22" rx="2" fill="#ffffff"/>
  </svg>`,

  /* 車両通行止め (302) — vòng trắng viền đỏ, gạch chéo đỏ */
  nopassage: `<svg viewBox="0 0 140 140" role="img" aria-label="車両通行止め">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <line x1="29" y1="29" x2="111" y2="111" stroke="#d0021b" stroke-width="13"/>
  </svg>`,

  /* 追越し禁止 (314-2) — vòng trắng viền đỏ, hai mũi tên xanh, gạch chéo đỏ */
  overtaking: `<svg viewBox="0 0 140 140" role="img" aria-label="追越し禁止">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <g fill="#005bac">
      <rect x="41" y="60" width="10" height="40"/>
      <polygon points="46,30 31,62 61,62"/>
      <path d="M78 102 V76 a17 17 0 0 1 17 -17 h4" fill="none" stroke="#005bac"
        stroke-width="10" stroke-linecap="round"/>
      <polygon points="96,44 118,55 96,66"/>
    </g>
    <line x1="28" y1="28" x2="112" y2="112" stroke="#d0021b" stroke-width="12"/>
  </svg>`,

  /* 転回禁止 (313) — vòng trắng viền đỏ, mũi tên U xanh, gạch chéo đỏ */
  turnaround: `<svg viewBox="0 0 140 140" role="img" aria-label="転回禁止">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <path d="M56 104 V66 a16 16 0 0 1 32 0 V80" fill="none" stroke="#005bac"
      stroke-width="11" stroke-linecap="round"/>
    <polygon points="88,98 72,80 104,80" fill="#d0021b"/>
    <line x1="30" y1="30" x2="110" y2="110" stroke="#d0021b" stroke-width="11"/>
  </svg>`,

  /* 指定方向外進行禁止 (311-A) — nền xanh, mũi tên trắng */
  direction: `<svg viewBox="0 0 140 140" role="img" aria-label="指定方向外進行禁止">
    <circle cx="70" cy="70" r="62" fill="#005bac"/>
    <g fill="#ffffff">
      <rect x="66" y="58" width="9" height="42"/>
      <polygon points="70,32 55,60 85,60"/>
      <rect x="38" y="88" width="26" height="9"/>
      <polygon points="28,92.5 52,79 52,106"/>
    </g>
  </svg>`,

  /* 二段階右折 (327の8) — nền xanh, mũi tên trắng + 原付 */
  twostep: `<svg viewBox="0 0 140 140" role="img" aria-label="原動機付自転車の右折方法（二段階）">
    <circle cx="70" cy="70" r="62" fill="#005bac"/>
    <g fill="#ffffff">
      <rect x="30" y="30" width="9" height="40"/>
      <polygon points="34.5,8 21,36 48,36"/>
      <rect x="52" y="28" width="44" height="9"/>
      <polygon points="110,32.5 88,19 88,46"/>
    </g>
    <text x="70" y="112" text-anchor="middle" font-size="30" font-weight="700"
      fill="#ffffff" font-family="'Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif">原付</text>
  </svg>`,

  /* 小回り右折 (327の9) — vòng trắng viền đỏ, mũi tên xanh + 原付 + gạch chéo */
  smallturn: `<svg viewBox="0 0 140 140" role="img" aria-label="原動機付自転車の右折方法（小回り）">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <g fill="#005bac">
      <rect x="30" y="30" width="9" height="40"/>
      <polygon points="34.5,8 21,36 48,36"/>
      <rect x="52" y="28" width="40" height="9"/>
      <polygon points="106,32.5 86,20 86,45"/>
    </g>
    <text x="70" y="112" text-anchor="middle" font-size="30" font-weight="700"
      fill="#005bac" font-family="'Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif">原付</text>
    <line x1="28" y1="28" x2="112" y2="112" stroke="#d0021b" stroke-width="11"/>
  </svg>`,

  /* 歩行者専用 (325の4) — nền xanh, người lớn dắt trẻ em */
  pedestrian: `<svg viewBox="0 0 140 140" role="img" aria-label="歩行者専用">
    <circle cx="70" cy="70" r="62" fill="#005bac"/>
    <g fill="#ffffff">
      <circle cx="56" cy="34" r="10"/>
      <path d="M48 48 h16 l5 30 h-7 l-3 34 h-8 l-2 -30 h-4 l-2 30 h-8 l-3 -34 h-6 z"/>
      <circle cx="92" cy="58" r="7.5"/>
      <path d="M86 69 h12 l3 22 h-5 l-2 24 h-6 l-1 -22 h-3 l-1 22 h-6 l-2 -24 h-3 z"/>
    </g>
  </svg>`,

  /* 自転車専用 (325の2) — nền xanh, xe đạp trắng */
  bicycle: `<svg viewBox="0 0 140 140" role="img" aria-label="自転車専用">
    <circle cx="70" cy="70" r="62" fill="#005bac"/>
    <g fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="48" cy="90" r="15"/>
      <circle cx="94" cy="90" r="15"/>
      <path d="M48 90 L64 62 L82 90 L48 90"/>
      <path d="M64 62 L82 62"/>
      <path d="M82 90 L88 58"/>
      <path d="M80 52 L98 52"/>
    </g>
  </svg>`,

  /* 横断歩道 (407) — nền xanh, người đi trên vạch kẻ */
  crosswalk: `<svg viewBox="0 0 140 140" role="img" aria-label="横断歩道">
    <rect x="6" y="6" width="128" height="128" rx="6" fill="#005bac"/>
    <g fill="#ffffff">
      <rect x="24" y="100" width="14" height="9"/>
      <rect x="46" y="100" width="14" height="9"/>
      <rect x="68" y="100" width="14" height="9"/>
      <rect x="90" y="100" width="14" height="9"/>
      <circle cx="66" cy="40" r="10"/>
      <rect x="56" y="52" width="20" height="28" rx="9"/>
      <rect x="56" y="78" width="8" height="20" rx="4"/>
      <rect x="69" y="78" width="8" height="20" rx="4"/>
    </g>
  </svg>`,

  /* 駐車可 — nền xanh, chữ P */
  parking: `<svg viewBox="0 0 140 140" role="img" aria-label="駐車可">
    <rect x="6" y="6" width="128" height="128" rx="6" fill="#005bac"/>
    <text x="70" y="104" text-anchor="middle" font-size="92" font-weight="700"
      fill="#ffffff" font-family="'Segoe UI',Arial,sans-serif">P</text>
  </svg>`,

  /* 高さ制限 (321) — vòng trắng viền đỏ, số xanh */
  heightlimit: `<svg viewBox="0 0 140 140" role="img" aria-label="高さ制限 3.3m">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <text x="70" y="84" text-anchor="middle" font-size="42" font-weight="800"
      fill="#005bac" font-family="'Segoe UI',Arial,sans-serif">3.3m</text>
  </svg>`,

  /* 重量制限 (320) — vòng trắng viền đỏ, số xanh */
  weightlimit: `<svg viewBox="0 0 140 140" role="img" aria-label="重量制限 5.5t">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <text x="70" y="90" text-anchor="middle" font-size="52" font-weight="800"
      fill="#005bac" font-family="'Segoe UI',Arial,sans-serif">5.5t</text>
  </svg>`,

  /* 警笛鳴らせ (328) — nền xanh, kèn + sóng âm trắng */
  horn: `<svg viewBox="0 0 140 140" role="img" aria-label="警笛鳴らせ">
    <circle cx="70" cy="70" r="62" fill="#005bac"/>
    <path d="M28 62 h10 l16 -14 v44 l-16 -14 h-10 z" fill="#ffffff"/>
    <g fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round">
      <path d="M64 54 a14 14 0 0 1 0 32"/>
      <path d="M82 43 a28 28 0 0 1 0 54"/>
    </g>
  </svg>`,

  /* 通行止め (301) — vòng trắng viền đỏ, X đỏ, chữ 通行止め */
  stopall: `<svg viewBox="0 0 140 140" role="img" aria-label="通行止め">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <line x1="30" y1="30" x2="110" y2="110" stroke="#d0021b" stroke-width="13"/>
    <line x1="110" y1="30" x2="30" y2="110" stroke="#d0021b" stroke-width="13"/>
    <text x="70" y="108" text-anchor="middle" font-size="17" font-weight="700"
      fill="#005bac" stroke="#ffffff" stroke-width="4" paint-order="stroke"
      font-family="'Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif">通行止め</text>
  </svg>`,

  /* 歩行者等通行止め (331) — nền đỏ vuông, người đi bộ xanh, gạch chéo */
  nopedestrian: `<svg viewBox="0 0 140 140" role="img" aria-label="歩行者等通行止め">
    <rect x="4" y="4" width="132" height="132" rx="6" fill="#d0021b"/>
    <rect x="17" y="17" width="106" height="106" fill="#ffffff"/>
    <g fill="#005bac">
      <circle cx="72" cy="40" r="9"/>
      <path d="M64 52 h16 l4 26 h-8 l-2 22 h-8 l-1 -20 h-4 l-3 20 h-8 l3 -26 z"/>
    </g>
    <line x1="24" y1="24" x2="118" y2="118" stroke="#d0021b" stroke-width="12"/>
    <text x="70" y="114" text-anchor="middle" font-size="15" font-weight="700"
      fill="#005bac" stroke="#ffffff" stroke-width="4" paint-order="stroke"
      font-family="'Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif">通行止め</text>
  </svg>`,

  /* 車両横断禁止 (312) — vòng trắng viền đỏ, mũi tên xanh rẽ phải, gạch chéo */
  nocrossing: `<svg viewBox="0 0 140 140" role="img" aria-label="車両横断禁止">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <path d="M44 96 V78 a12 12 0 0 1 12 -12 h36" fill="none" stroke="#005bac"
      stroke-width="11" stroke-linecap="round"/>
    <polygon points="92,54 116,66 92,78" fill="#005bac"/>
    <line x1="30" y1="30" x2="110" y2="110" stroke="#d0021b" stroke-width="11"/>
  </svg>`,

  /* 最低速度 (324) — vòng trắng viền đỏ, số xanh + gạch ngang xanh */
  minspeed: `<svg viewBox="0 0 140 140" role="img" aria-label="最低速度30km/h">
    <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#d0021b" stroke-width="13"/>
    <text x="70" y="86" text-anchor="middle" font-size="54" font-weight="800"
      fill="#005bac" font-family="'Segoe UI',Arial,sans-serif">30</text>
    <rect x="40" y="94" width="60" height="7" fill="#005bac"/>
  </svg>`
};
