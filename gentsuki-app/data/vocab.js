/* ============================================================
   Từ vựng chuyên ngành — chạm vào từ trong câu hỏi để xem nghĩa
   r: cách đọc (hiragana) | m: nghĩa tiếng Việt | n: ghi chú (tuỳ chọn)
   ============================================================ */
window.VOCAB = {
  '原動機付自転車': { r: 'げんどうきつきじてんしゃ', m: 'Xe động cơ hai bánh dung tích 50cc trở xuống (hoặc động cơ điện 0.6kW trở xuống).' },
  '原付二種': { r: 'げんつきにしゅ', m: 'Xe 51–125cc. Cần bằng 小型自動二輪, không dùng bằng 原付 được.' },
  '原付講習': { r: 'げんつきこうしゅう', m: 'Khóa học bắt buộc khoảng 3 giờ ở trường dạy lái trước khi nhận bằng 原付.' },
  '原付': { r: 'げんつき', m: 'Viết tắt của 原動機付自転車 — xe 50cc trở xuống.' },

  '二段階右折': { r: 'にだんかいゆうせつ', m: 'Rẽ phải 2 bước: đi thẳng qua giao lộ, dừng ở mép trái bên kia rồi mới rẽ phải.' },
  '車両通行止め': { r: 'しゃりょうつうこうどめ', m: 'Cấm mọi xe đi qua đoạn đường — khác với 車両進入禁止 (chỉ cấm đi vào từ hướng này).' },
  '小回り右折': { r: 'こまわりゆうせつ', m: 'Rẽ phải kiểu bình thường (như ô tô), không phải rẽ 2 bước.' },

  '徐行': { r: 'じょこう', m: 'Đi chậm đến mức có thể dừng ngay lập tức (thực tế dưới 10km/h).' },
  '一時停止': { r: 'いちじていし', m: 'Dừng hẳn xe (tốc độ 0), quan sát rồi mới đi tiếp.' },
  '駐停車': { r: 'ちゅうていしゃ', m: 'Gộp chung đỗ xe và dừng xe.' },
  '駐車': { r: 'ちゅうしゃ', m: 'Đỗ xe — dừng lâu, rời xe hoặc tắt máy.' },
  '停車': { r: 'ていしゃ', m: 'Dừng xe tạm thời (dưới 5 phút, người lái vẫn có thể lái tiếp ngay).' },

  '追越し': { r: 'おいこし', m: 'Vượt xe phía trước (đi sang bên phải của xe đó).' },
  '車間距離': { r: 'しゃかんきょり', m: 'Khoảng cách với xe phía trước.' },
  '最高速度': { r: 'さいこうそくど', m: 'Tốc độ tối đa cho phép.' },
  '法定速度': { r: 'ほうていそくど', m: 'Tốc độ do luật quy định — 原付 là 30km/h, không phụ thuộc biển báo cao hơn.' },

  '横断歩道': { r: 'おうだんほどう', m: 'Vạch qua đường cho người đi bộ.' },
  '踏切': { r: 'ふみきり', m: 'Đoạn đường giao với đường sắt.' },
  '歩道': { r: 'ほどう', m: 'Vỉa hè dành cho người đi bộ.' },
  '車道': { r: 'しゃどう', m: 'Phần đường dành cho xe chạy.' },
  '路側帯': { r: 'ろそくたい', m: 'Dải sát mép đường, ngăn cách bởi vạch trắng.' },
  '交差点': { r: 'こうさてん', m: 'Giao lộ, ngã ba ngã tư.' },
  '環状交差点': { r: 'かんじょうこうさてん', m: 'Vòng xuyến (roundabout).' },
  '優先道路': { r: 'ゆうせんどうろ', m: 'Đường ưu tiên — xe trên đường này được đi trước.' },
  '側端': { r: 'そくたん', m: 'Mép đường, mép giao lộ.' },

  '信号機': { r: 'しんごうき', m: 'Đèn tín hiệu giao thông.' },
  '点滅': { r: 'てんめつ', m: 'Nhấp nháy (đèn vàng hoặc đỏ nháy).' },
  '矢印信号': { r: 'やじるししんごう', m: 'Đèn mũi tên — cho phép đi theo hướng mũi tên dù đèn chính đỏ.' },

  '標識': { r: 'ひょうしき', m: 'Biển báo (gắn trên cột).' },
  '標示': { r: 'ひょうじ', m: 'Vạch kẻ, chữ vẽ trên mặt đường.' },
  '規制標識': { r: 'きせいひょうしき', m: 'Biển quy định/cấm (thường hình tròn đỏ hoặc xanh).' },
  '指示標識': { r: 'しじひょうしき', m: 'Biển chỉ dẫn vị trí (vạch qua đường, bãi đỗ...).' },
  '警戒標識': { r: 'けいかいひょうしき', m: 'Biển cảnh báo nguy hiểm (hình thoi vàng).' },
  '補助標識': { r: 'ほじょひょうしき', m: 'Biển phụ ghi thêm bên dưới biển chính (thời gian, phạm vi).' },
  '中央線': { r: 'ちゅうおうせん', m: 'Vạch phân cách hai chiều xe chạy.' },
  '停止線': { r: 'ていしせん', m: 'Vạch dừng trước giao lộ.' },
  '導流帯': { r: 'どうりゅうたい', m: 'Vùng sọc chéo dẫn hướng — không được chạy lên.' },
  '網掛け': { r: 'あみがけ', m: 'Vạch lưới vàng trên mặt đường, báo cấm dừng đỗ.' },
  '転回': { r: 'てんかい', m: 'Quay đầu xe (U-turn).' },
  '警音器': { r: 'けいおんき', m: 'Còi xe.' },

  '合図': { r: 'あいず', m: 'Xi nhan, tín hiệu báo hướng đi.' },
  '進路変更': { r: 'しんろへんこう', m: 'Đổi làn, đổi hướng đi.' },
  '急ブレーキ': { r: 'きゅうブレーキ', m: 'Phanh gấp.' },
  '減光': { r: 'げんこう', m: 'Hạ đèn pha xuống mức thấp để không chói mắt xe đối diện.' },
  '前照灯': { r: 'ぜんしょうとう', m: 'Đèn chiếu sáng phía trước.' },

  '免許証': { r: 'めんきょしょう', m: 'Bằng lái xe.' },
  '初心者標識': { r: 'しょしんしゃひょうしき', m: 'Biển "lái mới" (若葉マーク) — chỉ bắt buộc với ô tô trong 1 năm đầu.' },
  '車検': { r: 'しゃけん', m: 'Kiểm định xe định kỳ — 原付 dưới 250cc không phải làm.' },
  '積載': { r: 'せきさい', m: 'Chở hàng, tải trọng.' },
  '軽自動車税': { r: 'けいじどうしゃぜい', m: 'Thuế xe nhỏ nộp cho quận/thành phố nơi đăng ký.' },

  '自賠責保険': { r: 'じばいせきほけん', m: 'Bảo hiểm trách nhiệm bắt buộc — không có là không được lưu thông.' },
  '任意保険': { r: 'にんいほけん', m: 'Bảo hiểm tự nguyện, chi trả phần vượt mức của 自賠責.' },

  '緊急自動車': { r: 'きんきゅうじどうしゃ', m: 'Xe ưu tiên: cứu hỏa, cứu thương, cảnh sát khi đang làm nhiệm vụ.' },
  '消火栓': { r: 'しょうかせん', m: 'Trụ nước chữa cháy bên đường.' },
  '停留所': { r: 'ていりゅうじょ', m: 'Trạm dừng xe buýt.' },
  '救護': { r: 'きゅうご', m: 'Cứu giúp người bị nạn.' },
  'ひき逃げ': { r: 'ひきにげ', m: 'Gây tai nạn rồi bỏ chạy.' },
  '示談': { r: 'じだん', m: 'Thỏa thuận dân sự giữa hai bên sau tai nạn.' },
  '発炎筒': { r: 'はつえんとう', m: 'Pháo hiệu đỏ dùng cảnh báo xe phía sau.' },
  '停止表示板': { r: 'ていしひょうじばん', m: 'Tam giác phản quang đặt sau xe gặp sự cố.' },
  '酒気帯び': { r: 'しゅきおび', m: 'Trong người có nồng độ cồn — lái xe là vi phạm.' },

  '小型特殊': { r: 'こがたとくしゅ', m: 'Xe chuyên dụng nhỏ (xe nâng, máy kéo) — bằng này lái được cả 原付.' }
};
