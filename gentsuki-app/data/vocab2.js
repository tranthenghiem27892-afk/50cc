/* ============================================================
   Từ vựng bổ sung — nhóm từ khó + động từ
   f: các dạng xuất hiện trong câu (biến thể chia) — bấm vào dạng nào
      cũng mở cùng một mục, hiển thị dạng từ điển.
   ============================================================ */
(function () {
  var V = window.VOCAB || (window.VOCAB = {});
  var add = function (obj) {
    Object.keys(obj).forEach(function (k) { V[k] = obj[k]; });
  };

  /* ---------------- Động từ ---------------- */
  add({
    '妨げる': { r: 'さまたげる', m: 'Cản trở, làm vướng bước của người khác.', f: ['妨げ', '妨げて'] },
    '妨害する': { r: 'ぼうがいする', m: 'Gây cản trở (mạnh hơn 妨げる).', f: ['妨害'] },
    '譲る': { r: 'ゆずる', m: 'Nhường đường, nhường bước.', f: ['譲ら', '譲り', '譲って'] },
    '避ける': { r: 'さける', m: 'Tránh, né.', f: ['避け', '避けて'] },
    '追い越す': { r: 'おいこす', m: 'Vượt xe phía trước (đi sang bên phải xe đó).', f: ['追い越し', '追い越して'] },
    'はみ出す': { r: 'はみだす', m: 'Lấn ra ngoài phần đường được phép (thường là lấn sang làn ngược chiều).', f: ['はみ出し', 'はみ出して'] },
    '曲がる': { r: 'まがる', m: 'Rẽ, quành.', f: ['曲がり', '曲がって'] },
    '進む': { r: 'すすむ', m: 'Đi tới, chạy tới.', f: ['進み', '進んで'] },
    '止まる': { r: 'とまる', m: 'Dừng lại.', f: ['止まり', '止まって', '止まる'] },
    '通る': { r: 'とおる', m: 'Đi qua, chạy qua.', f: ['通り', '通って'] },
    '越える': { r: 'こえる', m: 'Vượt qua (một mốc, một đoạn).', f: ['越え', '越えて'] },
    '確認する': { r: 'かくにんする', m: 'Xác nhận, kiểm tra lại.', f: ['確認', '確認し', '確認して'] },
    '点灯する': { r: 'てんとうする', m: 'Bật đèn, cho đèn sáng.', f: ['点灯', '点灯し'] },
    '消す': { r: 'けす', m: 'Tắt (đèn, máy).', f: ['消し', '消して'] },
    '鳴らす': { r: 'ならす', m: 'Bấm, làm kêu (còi).', f: ['鳴らし', '鳴らして'] },
    '積む': { r: 'つむ', m: 'Chất hàng, chở hàng.', f: ['積み', '積んで'] },
    '牽引する': { r: 'けんいんする', m: 'Kéo theo (xe kéo rơ-moóc).', f: ['牽引'] },
    '放置する': { r: 'ほうちする', m: 'Để mặc, bỏ đó không quản lý (放置駐車 = đỗ xe bừa bãi).', f: ['放置'] },
    '通報する': { r: 'つうほうする', m: 'Báo tin, gọi báo (cảnh sát, cứu hỏa).', f: ['通報'] },
    '救護する': { r: 'きゅうごする', m: 'Cứu giúp người bị nạn.', f: ['救護'] },
    '減速する': { r: 'げんそくする', m: 'Giảm tốc độ.', f: ['減速'] },
    '加速する': { r: 'かそくする', m: 'Tăng tốc độ.', f: ['加速'] },
    '通過する': { r: 'つうかする', m: 'Đi qua một điểm, một đoạn.', f: ['通過'] },
    '装着する': { r: 'そうちゃくする', m: 'Đeo, gắn (mũ bảo hiểm, thiết bị).', f: ['装着'] },
    '携帯する': { r: 'けいたいする', m: 'Mang theo trong người.', f: ['携帯'] },
    '発進する': { r: 'はっしんする', m: 'Khởi hành, bắt đầu chạy.', f: ['発進'] },
    '後退する': { r: 'こうたいする', m: 'Lùi xe.', f: ['後退'] },
    '転倒する': { r: 'てんとうする', m: 'Ngã xe, đổ xe.', f: ['転倒'] },
    '負傷する': { r: 'ふしょうする', m: 'Bị thương.', f: ['負傷'] },
    '停止する': { r: 'ていしする', m: 'Dừng lại (xe, máy).', f: ['停止'] },
    '進行する': { r: 'しんこうする', m: 'Đi tới, tiến lên.', f: ['進行'] }
  });

  /* ---------------- Từ khó (danh từ) ---------------- */
  add({
    '警笛': { r: 'けいてき', m: 'Còi xe (cách nói trang trọng của クラクション).' },
    '消灯': { r: 'しょうとう', m: 'Tắt đèn.' },
    '物損事故': { r: 'ぶっそんじこ', m: 'Tai nạn chỉ thiệt hại tài sản, không có người bị thương.' },
    '人身事故': { r: 'じんしんじこ', m: 'Tai nạn có người bị thương hoặc tử vong.' },
    '過失': { r: 'かしつ', m: 'Lỗi vô ý, sơ suất (過失運転致死傷 = lái xe gây chết người do sơ suất).' },
    '煽り運転': { r: 'あおりうんてん', m: 'Lái xe gây hấn: bám sát, còi liên tục, chèn ép xe khác.' },
    '脇見運転': { r: 'わきみうんてん', m: 'Lái xe không nhìn đường (nhìn sang chỗ khác).' },
    '過労運転': { r: 'かろううんてん', m: 'Lái xe khi quá mệt, thiếu ngủ.' },
    '酒酔い': { r: 'さけよい', m: 'Say rượu — mức nặng hơn 酒気帯び.' },
    '無免許': { r: 'むめんきょ', m: 'Không có bằng lái (vẫn lái xe).' },
    '最低速度': { r: 'さいていそくど', m: 'Tốc độ tối thiểu — không được chạy chậm hơn.' },
    '案内標識': { r: 'あんないひょうしき', m: 'Biển chỉ dẫn đường đi, khoảng cách, địa danh.' },
    '車線境界線': { r: 'しゃせんきょうかいせん', m: 'Vạch phân chia các làn xe cùng chiều.' },
    '外側線': { r: 'そとがわせん', m: 'Vạch mép ngoài của phần đường xe chạy.' },
    '自転車横断帯': { r: 'じてんしゃおうだんたい', m: 'Vạch dành cho xe đạp cắt ngang đường.' },
    '適性試験': { r: 'てきせいしけん', m: 'Kiểm tra thị lực, thể chất trước khi thi bằng lái.' },
    '有効期限': { r: 'ゆうこうきげん', m: 'Thời hạn hiệu lực (của bằng lái, bảo hiểm).' },
    '特定小型原付': { r: 'とくていこがたげんつき', m: 'Xe điện nhỏ tối đa 20km/h (xe scooter điện, ván trượt điện).' },
    '排気量': { r: 'はいきりょう', m: 'Dung tích xi-lanh (cc).' },
    '定格出力': { r: 'ていかくしゅつりょく', m: 'Công suất định mức của động cơ điện (kW).' },
    '交通整理': { r: 'こうつうせいり', m: 'Điều khiển giao thông (bằng đèn hoặc bằng tay).' },
    '手信号': { r: 'てしんごう', m: 'Hiệu lệnh bằng tay của cảnh sát.' },
    '見通し': { r: 'みとおし', m: 'Tầm nhìn (見通しの悪い = tầm nhìn kém).' },
    '合流': { r: 'ごうりゅう', m: 'Nhập vào dòng xe, hòa vào làn.' },
    '渋滞': { r: 'じゅうたい', m: 'Ùn tắc, kẹt xe.' },
    '路肩': { r: 'ろかた', m: 'Lề đường, phần sát mép đường.' },
    '車列': { r: 'しゃれつ', m: 'Đoàn xe, hàng xe nối đuôi.' },
    '右折': { r: 'うせつ', m: 'Rẽ phải.' },
    '左折': { r: 'させつ', m: 'Rẽ trái.' },
    '直進': { r: 'ちょくしん', m: 'Đi thẳng.' },
    '横断': { r: 'おうだん', m: 'Đi cắt ngang (đường, đường sắt).' },
    '走行': { r: 'そうこう', m: 'Chạy xe, lưu thông.' },
    '運転': { r: 'うんてん', m: 'Lái xe, điều khiển xe.' },
    '前方': { r: 'ぜんぽう', m: 'Phía trước.' },
    '後方': { r: 'こうほう', m: 'Phía sau.' }
  });
})();
