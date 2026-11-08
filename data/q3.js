/* ============================================================
   Bổ sung đợt 4 — 36 câu biển báo (có hình), đưa tổng lên 236
   ============================================================ */
window.QUESTIONS.push(
  /* ---------- 駐停車禁止 ---------- */
  { id: 's39', cat: 'sign', a: 1, img: 'nostopping',
    q: '「駐停車禁止」の標識がある場所では、駐車も停車もしてはいけない。',
    exp: 'Đúng. Hai gạch chéo hình X trên nền xanh: cấm cả đỗ lẫn dừng, dù chỉ vài chục giây.',
    ref: '道路交通法第44条' },

  { id: 's40', cat: 'sign', a: 0, img: 'nostopping',
    q: '「駐停車禁止」と「駐車禁止」は、同じ意味の標識である。',
    exp: 'Sai. 駐車禁止 (một gạch chéo) chỉ cấm đỗ; 駐停車禁止 (hai gạch) cấm cả đỗ và dừng.',
    ref: '道路交通法第44条・第45条' },

  /* ---------- 車両進入禁止 ---------- */
  { id: 's41', cat: 'sign', a: 1, img: 'noentry',
    q: '「車両進入禁止」の標識がある道路には、車両が進入してはいけない。',
    exp: 'Đúng. Đĩa đỏ có thanh trắng: cấm đi vào từ hướng này.',
    ref: '道路交通法第9条' },

  { id: 's42', cat: 'sign', a: 0, img: 'noentry',
    q: '「車両進入禁止」と「車両通行止め」は、まったく同じ意味である。',
    exp: 'Sai. 進入禁止 chỉ cấm đi vào từ phía này; 車両通行止め cấm mọi chiều đi qua đoạn đường đó.',
    ref: '' },

  /* ---------- 追越し禁止 ---------- */
  { id: 's43', cat: 'sign', a: 1, img: 'overtaking',
    q: '「追越し禁止」の標識がある道路では、追い越しのために右側にはみ出してはいけない。',
    exp: 'Đúng. Biển này cấm cả việc vượt lẫn lấn sang làn đối diện để vượt.',
    ref: '道路交通法第30条' },

  { id: 's44', cat: 'sign', a: 0, img: 'overtaking',
    q: '「追越し禁止」の標識は、追い越される側の車にだけ適用される。',
    exp: 'Sai. Biển áp dụng cho tất cả xe trên đoạn đường đó, không phân biệt ai vượt ai.',
    ref: '' },

  /* ---------- 歩行者専用 ---------- */
  { id: 's45', cat: 'sign', a: 1, img: 'pedestrian',
    q: '「歩行者専用」の標識がある道路は、歩行者だけが通行でき、車両は通行できない。',
    exp: 'Đúng. Đường dành riêng cho người đi bộ — xe cộ, kể cả 原付, đều không được vào.',
    ref: '道路交通法第9条' },

  { id: 's46', cat: 'sign', a: 0, img: 'pedestrian',
    q: '「歩行者専用」の標識がある道路では、自転車も通行することができる。',
    exp: 'Sai. Xe đạp cũng là 車両, nên cũng không được đi vào đường dành riêng cho người đi bộ.',
    ref: '' },

  /* ---------- 自転車専用 ---------- */
  { id: 's47', cat: 'sign', a: 1, img: 'bicycle',
    q: '「自転車専用」の標識がある道路は、自転車だけが通行できる。',
    exp: 'Đúng. Đường dành riêng cho xe đạp; 原付 và ô tô không được vào.',
    ref: '道路交通法第9条' },

  { id: 's48', cat: 'sign', a: 0, img: 'bicycle',
    q: '「自転車専用」の標識がある道路は、原付も通行することができる。',
    exp: 'Sai. 原付 không được đi vào đường dành riêng cho xe đạp.',
    ref: '' },

  /* ---------- 転回禁止 ---------- */
  { id: 's49', cat: 'sign', a: 1, img: 'turnaround',
    q: '「転回禁止」の標識がある場所では、車の向きを変えて反対方向に進んではいけない。',
    exp: 'Đúng. 転回 = quay đầu xe (U-turn); biển này cấm quay đầu tại chỗ.',
    ref: '道路交通法第25条の2' },

  { id: 's50', cat: 'sign', a: 0, img: 'turnaround',
    q: '「転回禁止」の標識がある場所でも、安全を確かめればUターンできる。',
    exp: 'Sai. Cấm tuyệt đối, không có ngoại lệ "nếu thấy an toàn".',
    ref: '' },

  /* ---------- 指定方向外進行禁止 ---------- */
  { id: 's51', cat: 'sign', a: 1, img: 'direction',
    q: '矢印が直進と左折を示す「指定方向外進行禁止」の標識では、右折してはいけない。',
    exp: 'Đúng. Chỉ được đi theo đúng các hướng mũi tên trên biển.',
    ref: '道路交通法第35条' },

  { id: 's52', cat: 'sign', a: 0, img: 'direction',
    q: '「指定方向外進行禁止」の標識があっても、矢印と違う方向に進んでよい場合がある。',
    exp: 'Sai. Không có ngoại lệ; muốn đi hướng khác thì phải chọn tuyến khác từ trước.',
    ref: '' },

  /* ---------- 横断歩道 ---------- */
  { id: 's53', cat: 'sign', a: 1, img: 'crosswalk',
    q: '「横断歩道」の標識がある場所では、歩行者が優先である。',
    exp: 'Đúng. Có người đang qua hoặc chuẩn bị qua là xe phải dừng nhường.',
    ref: '道路交通法第38条' },

  { id: 's54', cat: 'sign', a: 0, img: 'crosswalk',
    q: '「横断歩道」の標識は、車両が優先であることを示している。',
    exp: 'Sai. Ngược lại hoàn toàn — người đi bộ được ưu tiên tại vạch qua đường.',
    ref: '' },

  /* ---------- 駐車可 ---------- */
  { id: 's55', cat: 'sign', a: 1, img: 'parking',
    q: '「駐車可」の標識がある場所では、駐車することができる。',
    exp: 'Đúng. Đây là biển chỉ dẫn nơi được phép đỗ xe.',
    ref: '' },

  { id: 's56', cat: 'sign', a: 0, img: 'parking',
    q: '「駐車可」の標識があれば、その周辺のどこにでも自由に駐車してよい。',
    exp: 'Sai. Chỉ được đỗ đúng khu vực biển cho phép, không phải cả đoạn đường.',
    ref: '' },

  /* ---------- 高さ制限・重量制限 ---------- */
  { id: 's57', cat: 'sign', a: 1, img: 'heightlimit',
    q: '「高さ制限」の標識は、指定された高さを超える車両の通行を禁止している。',
    exp: 'Đúng. Xe cao hơn con số trên biển không được đi qua.',
    ref: '道路交通法第8条' },

  { id: 's58', cat: 'sign', a: 0, img: 'heightlimit',
    q: '「高さ制限」で指定された高さを超える荷物を積んでいても、原付なら通行できる。',
    exp: 'Sai. Giới hạn áp dụng cho mọi xe, tính cả hàng hoá chất trên xe.',
    ref: '' },

  { id: 's59', cat: 'sign', a: 1, img: 'weightlimit',
    q: '「重量制限」の標識は、指定された重量を超える車両の通行を禁止している。',
    exp: 'Đúng. Con số trên biển là tổng trọng lượng tối đa được phép.',
    ref: '道路交通法第8条' },

  { id: 's60', cat: 'sign', a: 0, img: 'weightlimit',
    q: '「重量制限」は、積んでいる荷物の重さだけを制限している。',
    exp: 'Sai. Đó là tổng trọng lượng của cả xe lẫn hàng, không chỉ riêng hàng.',
    ref: '' },

  /* ---------- Quy tắc chung về biển báo ---------- */
  { id: 's61', cat: 'sign', a: 1,
    q: '「止まれ」の標識には、英語で「STOP」と併記されているものもある。',
    exp: 'Đúng. Từ 2017, nhiều nơi gắn thêm chữ STOP để người nước ngoài hiểu.',
    ref: '' },

  { id: 's62', cat: 'sign', a: 1,
    q: '「一方通行」の標識の矢印が左を向いている場合、左方向にしか進めない。',
    exp: 'Đúng. Mũi tên chỉ chiều duy nhất được đi.',
    ref: '道路交通法第8条' },

  { id: 's63', cat: 'sign', a: 1,
    q: '指示標識は、青地に白で表されるものが多い。',
    exp: 'Đúng. Nhóm biển chỉ dẫn (横断歩道, 駐車可...) dùng nền xanh, hình trắng.',
    ref: '' },

  { id: 's64', cat: 'sign', a: 1,
    q: '警戒標識は、黄色の菱形に黒い縁取りと黒い記号で表される。',
    exp: 'Đúng. Biển cảnh báo nguy hiểm phía trước có dạng hình thoi vàng.',
    ref: '' },

  { id: 's65', cat: 'sign', a: 0,
    q: '案内標識は、赤い円形で表される。',
    exp: 'Sai. 案内標識 dùng nền xanh dương hoặc xanh lá, chữ trắng.',
    ref: '' },

  { id: 's66', cat: 'sign', a: 0,
    q: '補助標識は、本標識の上に取り付ける。',
    exp: 'Sai. Biển phụ luôn gắn bên dưới biển chính.',
    ref: '' },

  { id: 's67', cat: 'sign', a: 1,
    q: '補助標識がある場合、本標識の意味はその内容によって限定されることがある。',
    exp: 'Đúng. Ví dụ biển phụ ghi "8時〜20時" thì quy định chỉ có hiệu lực trong khung giờ đó.',
    ref: '' },

  { id: 's68', cat: 'sign', a: 0,
    q: '標識と警察官の指示が違う場合、標識に従わなければならない。',
    exp: 'Sai. Khi cảnh sát đang điều khiển trực tiếp thì hiệu lực cao hơn biển báo và đèn.',
    ref: '道路交通法第6条' },

  { id: 's69', cat: 'sign', a: 1,
    q: '規制標識は、赤地に青・白、または青地に白で表されるものが多い。',
    exp: 'Đúng. Nhóm biển quy định/cấm dùng hai kiểu phối màu này.',
    ref: '' },

  { id: 's70', cat: 'sign', a: 1,
    q: '「駐車禁止」の標識は、青い円形に赤い縁と赤い斜線1本で表される。',
    exp: 'Đúng. Thêm một gạch chéo nữa là thành 駐停車禁止.',
    ref: '' },

  { id: 's71', cat: 'sign', a: 1,
    q: '工事中などに設置される仮設の標識でも、従わなければならない。',
    exp: 'Đúng. Biển tạm thời có hiệu lực như biển chính thức trong thời gian thi công.',
    ref: '' },

  { id: 's72', cat: 'sign', a: 1,
    q: '道路標識には、夜間でも見えるように反射材料が使われている。',
    exp: 'Đúng. Nhờ đó đèn xe chiếu vào là biển sáng lên, dễ nhận ra từ xa.',
    ref: '' },

  { id: 's73', cat: 'sign', a: 1,
    q: '道路標識は、公安委員会または道路管理者が設置する。',
    exp: 'Đúng. Hai chủ thể này chịu trách nhiệm theo 道路交通法 và 道路法.',
    ref: '道路交通法第4条' },

  { id: 's74', cat: 'sign', a: 0,
    q: '同じ意味の標識が重ねて設置されることはない。',
    exp: 'Sai. Nhiều nơi vẫn gắn trùng (ví dụ 止まれ và 横断歩道) để tăng khả năng nhận biết.',
    ref: '' }
);
