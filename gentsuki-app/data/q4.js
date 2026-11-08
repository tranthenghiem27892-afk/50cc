/* ============================================================
   Bổ sung đợt 5 — 8 câu cho 4 biển vừa đối chiếu và vẽ lại
   ============================================================ */
window.QUESTIONS.push(
  /* ---------- 徐行 (329-A) ---------- */
  { id: 's75', cat: 'sign', a: 1, img: 'slowdown',
    q: '「徐行」の標識がある場所では、すぐに停止できる速度で進まなければならない。',
    exp: 'Đúng. 徐行 = tốc độ có thể dừng ngay khi cần, thực tế khoảng dưới 10km/h.',
    ref: '道路交通法第42条' },

  { id: 's76', cat: 'sign', a: 0, img: 'slowdown',
    q: '「徐行」の標識は、その場所の最高速度を示す標識である。',
    exp: 'Sai. Đây là biển hiệu lệnh đi chậm, không phải biển giới hạn tốc độ.',
    ref: '' },

  /* ---------- 車両通行止め (302) ---------- */
  { id: 's77', cat: 'sign', a: 1, img: 'nopassage',
    q: '「車両通行止め」の標識がある道路は、車両が通行してはいけない。',
    exp: 'Đúng. Cấm mọi xe đi qua đoạn đường này, kể cả 原付 và xe đạp.',
    ref: '道路交通法第8条' },

  { id: 's78', cat: 'sign', a: 0, img: 'nopassage',
    q: '「車両通行止め」の標識は、駐車してはいけないという意味である。',
    exp: 'Sai. Đó là biển cấm đỗ (nền xanh). Biển này cấm đi qua hoàn toàn, không liên quan đỗ xe.',
    ref: '' },

  /* ---------- 二段階右折 (327の8) ---------- */
  { id: 's79', cat: 'sign', a: 1, img: 'twostep',
    q: '「原動機付自転車の右折方法（二段階）」の標識がある交差点では、二段階右折をしなければならない。',
    exp: 'Đúng. Biển này buộc rẽ phải 2 bước, bất kể đường có mấy làn.',
    ref: '道路交通法第34条' },

  { id: 's80', cat: 'sign', a: 0, img: 'twostep',
    q: '「原動機付自転車の右折方法（二段階）」の標識がある交差点では、小回り右折をしなければならない。',
    exp: 'Sai. Chính biển này là biển buộc rẽ 2 bước; 小回り là biển khác.',
    ref: '' },

  /* ---------- 小回り右折 (327の9) ---------- */
  { id: 's81', cat: 'sign', a: 1, img: 'smallturn',
    q: '「原動機付自転車の右折方法（小回り）」の標識がある交差点では、小回り右折をする。',
    exp: 'Đúng. Rẽ phải kiểu thông thường như ô tô: tấp vào giữa đường rồi rẽ.',
    ref: '道路交通法第34条' },

  { id: 's82', cat: 'sign', a: 0, img: 'smallturn',
    q: '「原動機付自転車の右折方法（小回り）」の標識がある交差点では、二段階右折をしなければならない。',
    exp: 'Sai. Biển 小回り miễn trừ việc rẽ 2 bước, dù đường có 3 làn trở lên.',
    ref: '' }
);
