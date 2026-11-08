/* ============================================================
   Bổ sung đợt 6 — 24 câu vạch kẻ đường + 10 câu cho 5 biển mới
   ============================================================ */
window.QUESTIONS.push(
  /* ---------- 道路標示 (vạch kẻ đường) ---------- */
  { id: 'm01', cat: 'mark', a: 1,
    q: '道路標示は、路面に描かれた標示で、規制標示と指示標示がある。',
    exp: 'Đúng. 道路標示 chia hai nhóm: quy định/cấm và chỉ dẫn vị trí, khu vực.',
    ref: '道路交通法第2条' },

  { id: 'm02', cat: 'mark', a: 1,
    q: '規制標示は、駐停車禁止などの禁止・規制を表す。',
    exp: 'Đúng. Ví dụ vạch lưới vàng, vạch cấm dừng đỗ, vạch cấm vượt.',
    ref: '' },

  { id: 'm03', cat: 'mark', a: 1,
    q: '指示標示は、横断歩道や停止線など、場所や区画を示す。',
    exp: 'Đúng. Nhóm này không cấm gì, chỉ cho biết nơi nào là gì.',
    ref: '' },

  { id: 'm04', cat: 'mark', a: 1,
    q: '白の破線の中央線は、安全を確かめれば追い越しができることを示す。',
    exp: 'Đúng. Vạch đứt cho phép lấn làn để vượt, với điều kiện đủ an toàn.',
    ref: '' },

  { id: 'm05', cat: 'mark', a: 0,
    q: '白の破線の中央線は、追越しが禁止されていることを示す。',
    exp: 'Sai. Vạch trắng đứt nghĩa là ĐƯỢC vượt; cấm vượt là vạch liền (đặc biệt vạch vàng).',
    ref: '' },

  { id: 'm06', cat: 'mark', a: 1,
    q: '停止線は、交差点の手前に引かれている。',
    exp: 'Đúng. Vạch dừng nằm ngay trước giao lộ để xe biết chỗ phải dừng.',
    ref: '' },

  { id: 'm07', cat: 'mark', a: 0,
    q: '停止線は、交差点を過ぎた位置に引かれている。',
    exp: 'Sai. Vạch dừng luôn ở phía trước giao lộ, không phải sau.',
    ref: '' },

  { id: 'm08', cat: 'mark', a: 1,
    q: '停止線がある交差点で赤信号のときは、停止線の手前で止まる。',
    exp: 'Đúng. Bánh trước không được vượt qua vạch dừng.',
    ref: '道路交通法第7条' },

  { id: 'm09', cat: 'mark', a: 1,
    q: '路面に「止まれ」と書かれている場所でも、一時停止しなければならない。',
    exp: 'Đúng. Chữ 止まれ trên mặt đường có hiệu lực như biển báo.',
    ref: '道路交通法第43条' },

  { id: 'm10', cat: 'mark', a: 0,
    q: '路面の「止まれ」は、速度を落とすだけでよい。',
    exp: 'Sai. Phải dừng hẳn (tốc độ 0) rồi mới đi tiếp, giống biển 止まれ.',
    ref: '' },

  { id: 'm11', cat: 'mark', a: 1,
    q: '横断歩道の標示の上に、車を止めておいてはいけない。',
    exp: 'Đúng. Đỗ hay dừng trên vạch qua đường đều cản trở người đi bộ.',
    ref: '道路交通法第44条' },

  { id: 'm12', cat: 'mark', a: 1,
    q: '自転車横断帯は、自転車が道路を横断するための場所である。',
    exp: 'Đúng. Khi có người đi xe đạp đang qua, xe phải nhường.',
    ref: '' },

  { id: 'm13', cat: 'mark', a: 0,
    q: '自転車横断帯の上に、車を駐車してもよい。',
    exp: 'Sai. Chặn lối qua của xe đạp là vi phạm, giống như chặn vạch qua đường.',
    ref: '' },

  { id: 'm14', cat: 'mark', a: 1,
    q: '導流帯（ゼブラゾーン）は、車の流れを安全に導くために設けられている。',
    exp: 'Đúng. Vùng sọc chéo dẫn hướng xe đi đúng luồng, không phải để chạy lên.',
    ref: '' },

  { id: 'm15', cat: 'mark', a: 0,
    q: '導流帯の上は、車が走行するために設けられている。',
    exp: 'Sai. Đó là vùng dẫn hướng — chạy lên là nguy hiểm và bị xử lý.',
    ref: '' },

  { id: 'm16', cat: 'mark', a: 1,
    q: '道路標示には、白いものと黄色いものがある。',
    exp: 'Đúng. Trắng là chỉ dẫn/phân làn; vàng thường là quy định hoặc cảnh báo.',
    ref: '' },

  { id: 'm17', cat: 'mark', a: 0,
    q: 'ひし形の標示は、駐車禁止を意味している。',
    exp: 'Sai. Hình thoi báo phía trước có vạch qua đường, không liên quan đỗ xe.',
    ref: '' },

  { id: 'm18', cat: 'mark', a: 1,
    q: '黄色の標示は、規制や注意を表すことが多い。',
    exp: 'Đúng. Vạch vàng thường mang nghĩa cấm hoặc cảnh báo mạnh hơn vạch trắng.',
    ref: '' },

  { id: 'm19', cat: 'mark', a: 0,
    q: '網掛けの標示がある場所では、短時間なら駐車できる。',
    exp: 'Sai. Vạch lưới vàng là cấm cả dừng lẫn đỗ, không có ngoại lệ thời gian.',
    ref: '道路交通法第44条' },

  { id: 'm20', cat: 'mark', a: 1,
    q: '路面の矢印（進行方向別通行区分）は、その車線で進める方向を示している。',
    exp: 'Đúng. Vào làn có mũi tên nào thì phải đi theo hướng đó.',
    ref: '' },

  { id: 'm21', cat: 'mark', a: 0,
    q: '路面の矢印と違う方向に進んでもよい。',
    exp: 'Sai. Đi sai hướng của làn là vi phạm và rất dễ gây tai nạn ở giao lộ.',
    ref: '' },

  { id: 'm22', cat: 'mark', a: 1,
    q: '道路標示は、夜間でも見えるように反射材料が使われている。',
    exp: 'Đúng. Nhờ đó đèn xe chiếu vào là vạch sáng lên.',
    ref: '' },

  { id: 'm23', cat: 'mark', a: 0,
    q: '道路標示に従わなくても、罰則はない。',
    exp: 'Sai. 道路標示 có hiệu lực pháp lý như biển báo; vi phạm vẫn bị xử phạt.',
    ref: '道路交通法第8条' },

  { id: 'm24', cat: 'mark', a: 1,
    q: '車線境界線は、同じ方向に進む車の車線を分けている。',
    exp: 'Đúng. Đây là vạch phân chia các làn cùng chiều.',
    ref: '' },

  /* ---------- 5 biển bổ sung ---------- */
  { id: 's83', cat: 'sign', a: 1, img: 'horn',
    q: '「警笛鳴らせ」の標識がある場所では、警音器を鳴らさなければならない。',
    exp: 'Đúng. Đến đoạn này phải bấm còi để cảnh báo người và xe phía trước.',
    ref: '道路交通法第54条' },

  { id: 's84', cat: 'sign', a: 0, img: 'horn',
    q: '「警笛鳴らせ」の標識がある場所では、警音器を鳴らしてはいけない。',
    exp: 'Sai. Ngược lại — biển này buộc phải bấm còi.',
    ref: '' },

  { id: 's85', cat: 'sign', a: 1, img: 'stopall',
    q: '「通行止め」の標識がある道路は、歩行者も車両も通行できない。',
    exp: 'Đúng. Khác 車両通行止め: biển này cấm cả người đi bộ.',
    ref: '道路交通法第8条' },

  { id: 's86', cat: 'sign', a: 0, img: 'stopall',
    q: '「通行止め」の標識は、自動車だけを対象にしている。',
    exp: 'Sai. Đối tượng gồm cả người đi bộ, xe đạp và 原付.',
    ref: '' },

  { id: 's87', cat: 'sign', a: 1, img: 'nopedestrian',
    q: '「歩行者等通行止め」の標識がある場所では、歩行者は横断してはいけない。',
    exp: 'Đúng. Biển vuông đỏ dùng cho người đi bộ, cấm họ qua đường tại đó.',
    ref: '道路交通法第8条' },

  { id: 's88', cat: 'sign', a: 0, img: 'nopedestrian',
    q: '「歩行者等通行止め」は、車両の通行を禁止する標識である。',
    exp: 'Sai. Biển này cấm NGƯỜI ĐI BỘ, không phải cấm xe.',
    ref: '' },

  { id: 's89', cat: 'sign', a: 1, img: 'nocrossing',
    q: '「車両横断禁止」の標識がある場所では、車両が道路を横断してはいけない。',
    exp: 'Đúng. Cấm cắt ngang đường (ví dụ sang bên kia để vào cửa hàng).',
    ref: '道路交通法第25条の2' },

  { id: 's90', cat: 'sign', a: 0, img: 'nocrossing',
    q: '「車両横断禁止」の標識は、右折してはいけないという意味である。',
    exp: 'Sai. 横断 là cắt ngang đường, không phải rẽ phải. Rẽ phải bị cấm là biển 指定方向外進行禁止.',
    ref: '' },

  { id: 's91', cat: 'sign', a: 1, img: 'minspeed',
    q: '「最低速度」の標識がある道路では、指定された速度より遅く走ってはいけない。',
    exp: 'Đúng. Đây là tốc độ tối thiểu, buộc phải chạy nhanh hơn hoặc bằng.',
    ref: '道路交通法第22条' },

  { id: 's92', cat: 'sign', a: 0, img: 'minspeed',
    q: '「最低速度」の標識は、その道路の最高速度を示している。',
    exp: 'Sai. Số có gạch ngang bên dưới là tốc độ TỐI THIỂU, không phải tối đa.',
    ref: '' }
);
