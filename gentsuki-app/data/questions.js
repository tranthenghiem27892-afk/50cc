/* ============================================================
   原付免許（50cc）学科試験 — Ngân hàng câu hỏi khởi tạo
   ------------------------------------------------------------
   Schema:
     id   : mã duy nhất
     cat  : basic | sign | cross | road | safe | emg
     q    : câu hỏi tiếng Nhật (đúng như đề thi ○×)
     a    : 1 = câu đúng (○), 0 = câu sai (×)
     exp  : giải thích tiếng Việt
     ref  : (tuỳ chọn) căn cứ pháp lý
     img  : (tuỳ chọn) khoá biển báo trong data/signs.js
   ------------------------------------------------------------
   LƯU Ý: đây là câu hỏi do mình biên soạn lại từ luật, KHÔNG copy
   từ trang web nào. Bạn có thể thay/thêm bằng dữ liệu của mình.
   ============================================================ */

window.CATEGORIES = [
  { id: 'basic', vi: 'Quy định cơ bản', ja: '原付のきまり', icon: '🛵',
    desc: 'Tốc độ, giấy tờ, mũ bảo hiểm, khái niệm 原付' },
  { id: 'sign',  vi: 'Biển báo', ja: '標識・標示', icon: '🚸',
    desc: 'Ý nghĩa biển báo, đèn tín hiệu' },
  { id: 'cross', vi: 'Giao lộ & rẽ', ja: '交差点・右左折', icon: '↩️',
    desc: 'Rẽ phải 2 bước, nhường đường, xi nhan' },
  { id: 'road',  vi: 'Vị trí & tốc độ', ja: '走行位置・速度', icon: '🛣️',
    desc: 'Đi sát trái, làn đường, tốc độ' },
  { id: 'safe',  vi: 'An toàn & đỗ xe', ja: '安全運転・駐停車', icon: '🅿️',
    desc: 'Khoảng cách, đường sắt, nơi cấm dừng đỗ' },
  { id: 'emg',   vi: 'Sự cố & tai nạn', ja: '事故・緊急時', icon: '🚨',
    desc: 'Xử lý tai nạn, hỏng xe, uống rượu' },
  { id: 'mark',  vi: 'Vạch kẻ đường', ja: '道路標示', icon: '🟨',
    desc: 'Vạch dừng, vạch qua đường, dải dẫn hướng' }
];

window.QUESTIONS = [
  /* ---------- 原付のきまり ---------- */
  { id: 'b01', cat: 'basic', a: 1,
    q: '原動機付自転車（原付）とは、排気量50cc以下、または定格出力0.6kW以下の二輪車をいう。',
    exp: 'Đây là định nghĩa của 原付 — loại xe mà bằng 原付 cho phép lái. Xe điện có công suất định mức từ 0.6kW trở xuống cũng thuộc nhóm này.',
    ref: '道路交通法第2条' },

  { id: 'b02', cat: 'basic', a: 1,
    q: '原付は、道路標識で最高速度が40km/hと指定されている道路でも、30km/hを超えて運転してはならない。',
    exp: 'Tốc độ tối đa theo luật của 原付 luôn là 30km/h. Biển "40" hay "50" chỉ áp dụng cho ô tô — xe 50cc vẫn không được vượt 30km/h.',
    ref: '道路交通法第22条' },

  { id: 'b03', cat: 'basic', a: 0,
    q: '原付は、二人乗りをして運転することができる。',
    exp: '原付 chỉ chở được 1 người (chính người lái). Chở thêm người là vi phạm, bất kể quãng đường ngắn.',
    ref: '道路交通法第57条' },

  { id: 'b04', cat: 'basic', a: 0,
    q: '原付は、高速道路や自動車専用道路を通行することができる。',
    exp: '原付 bị cấm hoàn toàn trên đường cao tốc và đường chỉ dành cho ô tô. Đây là lỗi hay gặp ở người mới sang Nhật.',
    ref: '' },

  { id: 'b05', cat: 'basic', a: 1,
    q: '原付を運転するときは、ヘルメットを着用しなければならない。',
    exp: 'Đội mũ bảo hiểm là nghĩa vụ bắt buộc với cả 原付, không phải "nên làm".',
    ref: '道路交通法第71条の4' },

  { id: 'b06', cat: 'basic', a: 1,
    q: '原付免許を受けることができるのは、満16歳以上の人である。',
    exp: 'Đủ 16 tuổi là đủ điều kiện tuổi thi bằng 原付. Không có bài thi thực hành — chỉ thi lý thuyết.',
    ref: '道路交通法第88条' },

  { id: 'b07', cat: 'basic', a: 1,
    q: '原付免許を取得するには、原付講習を受講しなければならない。',
    exp: 'Khóa 原付講習 (khoảng 3 giờ, học tại trường dạy lái) là bắt buộc. Không có giấy chứng nhận hoàn thành thì không được cấp bằng.',
    ref: '道路交通法第108条の2' },

  { id: 'b08', cat: 'basic', a: 0,
    q: '原付を運転するときは、運転免許証を携帯していなくてもよい。',
    exp: 'Luôn phải mang theo bằng lái khi lái xe. Không mang theo cũng là một lỗi vi phạm.',
    ref: '道路交通法第95条' },

  { id: 'b09', cat: 'basic', a: 1,
    q: '原付には、自賠責保険（自動車損害賠償責任保険）の加入が義務付けられている。',
    exp: 'Bảo hiểm bắt buộc 自賠責 là điều kiện để xe được lưu thông. Chưa đóng là chưa được chạy.',
    ref: '自動車損害賠償保障法' },

  { id: 'b10', cat: 'basic', a: 1,
    q: '小型特殊免許を持っていれば、原付を運転することができる。',
    exp: 'Bằng 小型特殊 cho phép lái cả xe 小型特殊 và 原付. Ngược lại, bằng 原付 KHÔNG lái được xe 小型特殊 (xe nâng, máy kéo...).',
    ref: '道路交通法第84条' },

  /* ---------- 標識・標示 ---------- */
  { id: 's01', cat: 'sign', a: 1, img: 'stop',
    q: '「止まれ」の標識がある交差点では、必ず一時停止しなければならない。',
    exp: 'Biển 止まれ buộc phải dừng hẳn xe (tốc độ 0) và quan sát trước khi đi tiếp — kể cả khi đường vắng, không có ai.',
    ref: '道路交通法第43条' },

  { id: 's02', cat: 'sign', a: 0, img: 'noparking',
    q: '「駐車禁止」の標識がある場所では、5分以内の停車もしてはいけない。',
    exp: '駐車禁止 chỉ cấm ĐỖ xe (駐車); dừng ngắn (停車) vẫn được phép. Nếu cấm cả hai thì biển là 駐停車禁止.',
    ref: '道路交通法第45条' },

  { id: 's03', cat: 'sign', a: 1, img: 'oneway',
    q: '「一方通行」の標識がある道路では、矢印の方向にのみ進むことができる。',
    exp: 'Đường một chiều — chỉ được đi theo đúng chiều mũi tên. Đi ngược chiều là vi phạm nặng.',
    ref: '道路交通法第8条' },

  { id: 's04', cat: 'sign', a: 1, img: 'speed30',
    q: '「最高速度30km/h」の標識は、原付の法定速度と同じ速度を示している。',
    exp: 'Đúng. 原付 có tốc độ tối đa theo luật là 30km/h, nên biển này trùng với giới hạn của xe.',
    ref: '道路交通法第22条' },

  { id: 's05', cat: 'sign', a: 1,
    q: '赤色の点滅信号では、一時停止しなければならない。',
    exp: 'Đèn đỏ nhấp nháy = phải dừng lại, nhường đường cho xe trên đường ưu tiên rồi mới đi.',
    ref: '道路交通法第4条' },

  { id: 's06', cat: 'sign', a: 1,
    q: '黄色の点滅信号では、他の交通に注意しながら進むことができる。',
    exp: 'Vàng nhấp nháy = được đi nhưng phải giảm tốc và chú ý xung quanh.',
    ref: '道路交通法第4条' },

  { id: 's07', cat: 'sign', a: 1,
    q: '「追越し禁止」の標識がある道路では、原付は他の車を追い越してはならない。',
    exp: 'Biển cấm vượt áp dụng cho mọi loại xe, kể cả 原付. Không được vượt xe phía trước ở đoạn có biển này.',
    ref: '道路交通法第30条' },

  { id: 's08', cat: 'sign', a: 1,
    q: '「車両通行止め」の標識がある道路は、原付も通行することができない。',
    exp: 'Cấm xe cộ lưu thông — 原付 cũng nằm trong nhóm bị cấm, không có ngoại lệ.',
    ref: '道路交通法第8条' },

  { id: 's09', cat: 'sign', a: 0,
    q: '「原動機付自転車の右折方法（小回り）」の標識がある交差点では、二段階右折をしなければならない。',
    exp: 'Ngược lại. Biển "小回り" nghĩa là rẽ phải kiểu bình thường (như ô tô), KHÔNG phải rẽ 2 bước.',
    ref: '道路交通法第34条' },

  { id: 's10', cat: 'sign', a: 1,
    q: '「徐行」の標識がある場所では、すぐに停止できる速度で進まなければならない。',
    exp: '徐行 = tốc độ có thể dừng ngay lập tức khi cần (thực tế khoảng dưới 10km/h).',
    ref: '道路交通法第2条' },

  /* ---------- 交差点・右左折 ---------- */
  { id: 'c01', cat: 'cross', a: 1,
    q: '片側3車線以上の道路の交差点で右折するときは、二段階右折をしなければならない。',
    exp: 'Từ 3 làn trở lên theo một chiều (kể cả đường một chiều) thì bắt buộc rẽ phải 2 bước: đi thẳng qua giao lộ, dừng ở mép trái phía bên kia rồi mới rẽ.',
    ref: '道路交通法第34条' },

  { id: 'c02', cat: 'cross', a: 0,
    q: '信号機のない片側3車線以上の交差点で右折するときも、二段階右折をしなければならない。',
    exp: 'Sai. Nếu giao lộ không có đèn tín hiệu (và không có cảnh sát điều khiển bằng tay) thì không bắt buộc rẽ 2 bước, dù có 3 làn.',
    ref: '道路交通法第34条' },

  { id: 'c03', cat: 'cross', a: 1,
    q: '二段階右折では、交差点を直進した向こう側で、進行方向を右に変えて待つ。',
    exp: 'Đúng. Đi thẳng sang bên kia giao lộ, quay đầu xe sang phải tại mép trái và chờ đèn cho hướng mới.',
    ref: '道路交通法第34条' },

  { id: 'c04', cat: 'cross', a: 1,
    q: '一方通行の道路から右折するときは、小回り右折をする。',
    exp: 'Từ đường một chiều rẽ phải thì rẽ kiểu thường (小回り), không phải rẽ 2 bước.',
    ref: '道路交通法第34条' },

  { id: 'c05', cat: 'cross', a: 1,
    q: '左折するときは、あらかじめ道路の左側端に寄り、徐行しながら左折する。',
    exp: 'Rẽ trái: tấp sát mép trái từ trước và đi chậm (徐行) khi vào cua.',
    ref: '道路交通法第34条' },

  { id: 'c06', cat: 'cross', a: 1,
    q: '右左折の合図は、交差点の手前30mの地点に達したときに行う。',
    exp: 'Xi nhan trước 30m tính từ giao lộ (đường thường). Đổi làn thì xi nhan trước 3 giây.',
    ref: '道路交通法施行令第21条' },

  { id: 'c07', cat: 'cross', a: 1,
    q: '黄色信号では、安全に停止することができない場合を除き、停止位置で止まらなければならない。',
    exp: 'Vàng = phải dừng, chỉ ngoại lệ khi phanh gấp sẽ nguy hiểm hơn.',
    ref: '道路交通法第7条' },

  { id: 'c08', cat: 'cross', a: 1,
    q: '信号のない交差点では、左方から来る車が優先である。',
    exp: 'Nguyên tắc nhường đường bên trái (左方優先) khi giao lộ không có đèn và không có biển ưu tiên.',
    ref: '道路交通法第36条' },

  { id: 'c09', cat: 'cross', a: 1,
    q: '優先道路を通行している車は、交差点で優先される。',
    exp: 'Đường ưu tiên (có biển 優先道路) được đi trước; xe từ đường nhánh phải nhường.',
    ref: '道路交通法第36条' },

  { id: 'c10', cat: 'cross', a: 0,
    q: '二段階右折のときは、交差点を渡ったあとも右折の合図を出し続けなければならない。',
    exp: 'Sai. Qua giao lộ, quay xe sang phải rồi TẮT xi nhan và chờ. Bật suốt sẽ khiến xe khác hiểu nhầm.',
    ref: '道路交通法第53条' },

  { id: 'c11', cat: 'cross', a: 1,
    q: '小回り右折をするときは、あらかじめ道路の中央に寄る。',
    exp: 'Rẽ phải kiểu thường: tấp vào giữa đường (bên phải phần đường của mình) rồi mới rẽ.',
    ref: '道路交通法第34条' },

  { id: 'c12', cat: 'cross', a: 1,
    q: '交差点内で停止するおそれがあるときは、交差点に進入してはならない。',
    exp: 'Nếu vào giao lộ mà có khả năng bị kẹt giữa giao lộ (ùn tắc) thì phải chờ trước vạch.',
    ref: '道路交通法第50条' },

  /* ---------- 走行位置・速度 ---------- */
  { id: 'r01', cat: 'road', a: 1,
    q: '原付は、車道の左側端に寄って走行しなければならない。',
    exp: 'Đi sát mép trái của phần đường dành cho xe (keep left). Đây là quy tắc cơ bản nhất của 原付.',
    ref: '道路交通法第18条' },

  { id: 'r02', cat: 'road', a: 0,
    q: '原付は、歩道を通行することができる。',
    exp: 'Không. 原付 không được đi trên vỉa hè; chỉ xe đạp mới có trường hợp được đi.',
    ref: '道路交通法第17条' },

  { id: 'r03', cat: 'road', a: 0,
    q: '原付は、道路の中央寄りを走行するのが安全である。',
    exp: 'Sai. Đi giữa đường rất nguy hiểm vì bị ô tô ép và khó quan sát.',
    ref: '道路交通法第18条' },

  { id: 'r04', cat: 'road', a: 0,
    q: '原付は、30km/hを超える速度で走行することができる道路がある。',
    exp: 'Không có. Dù biển báo cho phép cao hơn, 原付 vẫn bị giới hạn 30km/h.',
    ref: '道路交通法第22条' },

  { id: 'r05', cat: 'road', a: 1,
    q: '夜間、原付を運転するときは、前照灯を点灯しなければならない。',
    exp: 'Ban đêm bắt buộc bật đèn chiếu sáng phía trước.',
    ref: '道路交通法第52条' },

  { id: 'r06', cat: 'road', a: 0,
    q: '原付は、信号待ちで止まっている車の横をすり抜けて先頭に出てもよい。',
    exp: 'Luồn lách giữa các xe rất nguy hiểm, dễ bị kẹp và bị xử phạt.',
    ref: '道路交通法第71条' },

  { id: 'r07', cat: 'road', a: 1,
    q: '原付も、前の車との車間距離を十分にとる必要がある。',
    exp: 'Giữ khoảng cách an toàn là quy tắc chung cho mọi phương tiện, kể cả xe 50cc.',
    ref: '道路交通法第26条' },

  { id: 'r08', cat: 'road', a: 1,
    q: '雨天時は、路面が滑りやすいので、速度を落として走行する。',
    exp: 'Trời mưa: giảm tốc, tăng khoảng cách, tránh phanh gấp vì bánh dễ trượt.',
    ref: '' },

  { id: 'r09', cat: 'road', a: 1,
    q: '原付は、前の自転車を追い越すときは、安全を確かめてから追い越す。',
    exp: 'Phải quan sát và giữ khoảng cách bên hông khi vượt xe đạp; không được sát quá.',
    ref: '道路交通法第28条' },

  { id: 'r10', cat: 'road', a: 0,
    q: '原付は、道路の左側端を走行中、後方から車が来たら道路の中央に寄る。',
    exp: 'Sai. Không được nép vào giữa; phải giữ vị trí sát trái ổn định để xe sau biết đường mà vượt.',
    ref: '道路交通法第18条' },

  /* ---------- 安全運転・駐停車 ---------- */
  { id: 'f01', cat: 'safe', a: 1,
    q: '踏切を通過するときは、一時停止して安全を確認しなければならない。',
    exp: 'Đường sắt: dừng hẳn, quan sát hai bên rồi mới qua.',
    ref: '道路交通法第33条' },

  { id: 'f02', cat: 'safe', a: 1,
    q: '横断歩道を渡ろうとしている歩行者がいる場合は、その手前で停止して譲らなければならない。',
    exp: 'Nhường người đi bộ tại vạch qua đường — đây là lỗi bị giám sát chặt ở Nhật.',
    ref: '道路交通法第38条' },

  { id: 'f03', cat: 'safe', a: 1,
    q: '駐停車禁止の場所では、5分以内の停車もしてはいけない。',
    exp: 'Cấm đỗ VÀ dừng — kể cả dừng vài chục giây để trả khách hay bốc hàng.',
    ref: '道路交通法第44条' },

  { id: 'f04', cat: 'safe', a: 1,
    q: '交差点から5m以内の場所は、駐停車禁止である。',
    exp: 'Trong phạm vi 5m tính từ mép giao lộ hoặc góc cua: cấm dừng và đỗ xe.',
    ref: '道路交通法第44条' },

  { id: 'f05', cat: 'safe', a: 1,
    q: 'バス停から10m以内の場所は、駐停車禁止である。',
    exp: 'Cách cột biển trạm xe buýt 10m trở vào: cấm dừng/đỗ.',
    ref: '道路交通法第44条' },

  { id: 'f06', cat: 'safe', a: 1,
    q: '坂道で駐車するときは、車輪止めをし、ギアをローに入れるなどの措置をする。',
    exp: 'Đỗ xe trên dốc phải chèn bánh và gài số thấp để xe không tự trôi.',
    ref: '道路交通法第47条' },

  { id: 'f07', cat: 'safe', a: 0,
    q: '雨天時は、車間距離を短くして走行した方が安全である。',
    exp: 'Sai hoàn toàn — trời mưa phải TĂNG khoảng cách vì quãng đường phanh dài hơn.',
    ref: '' },

  { id: 'f08', cat: 'safe', a: 1,
    q: 'カーブの手前では、あらかじめ減速してから曲がる。',
    exp: 'Giảm tốc TRƯỚC khi vào cua; phanh gấp trong cua rất dễ trượt bánh.',
    ref: '' },

  { id: 'f09', cat: 'safe', a: 1,
    q: '運転中にスマートフォンを注視して操作してはいけない。',
    exp: 'Vừa lái vừa nhìn điện thoại là vi phạm và cực kỳ nguy hiểm.',
    ref: '道路交通法第71条' },

  { id: 'f10', cat: 'safe', a: 1,
    q: '原付は、積載量30kgを超える荷物を積んではならない。',
    exp: 'Giới hạn tải trọng của 原付 là 30kg. Xe 51cc trở lên mới được 60kg.',
    ref: '道路交通法施行令第22条' },

  /* ---------- 事故・緊急時 ---------- */
  { id: 'e01', cat: 'emg', a: 1,
    q: '交通事故を起こしたときは、直ちに運転を停止し、負傷者を救護し、警察官に報告しなければならない。',
    exp: 'Dừng xe — cứu người — báo cảnh sát. Đây là nghĩa vụ pháp lý, không phải "nên làm".',
    ref: '道路交通法第72条' },

  { id: 'e02', cat: 'emg', a: 1,
    q: '故障などで道路上に停車するときは、発炎筒や停止表示板で後続車に知らせる。',
    exp: 'Cảnh báo xe phía sau bằng pháo hiệu hoặc tam giác phản quang để tránh bị đâm từ sau.',
    ref: '' },

  { id: 'e03', cat: 'emg', a: 0,
    q: '事故でけが人がいない場合でも、警察への報告は必要ない。',
    exp: 'Sai. Dù không có người bị thương vẫn phải báo cảnh sát; không báo là tội ひき逃げ (bỏ chạy).',
    ref: '道路交通法第72条' },

  { id: 'e04', cat: 'emg', a: 0,
    q: '危険を感じたときは、ブレーキをかけるよりクラクションを鳴らす方が安全である。',
    exp: 'Sai. Ưu tiên phanh giảm tốc; còi chỉ dùng để cảnh báo, không thay được phanh.',
    ref: '' },

  { id: 'e05', cat: 'emg', a: 1,
    q: '原付の日常点検では、ブレーキやタイヤの状態を確認する。',
    exp: 'Kiểm tra phanh, lốp, đèn, xích... trước khi đi. Xe 50cc hỏng phanh rất khó xử lý.',
    ref: '' },

  { id: 'e06', cat: 'emg', a: 0,
    q: '飲酒運転は、少量の酒であれば許される。',
    exp: 'Sai. Bất kỳ nồng độ cồn nào cũng vi phạm; mức phạt với 原付 cũng rất nặng.',
    ref: '道路交通法第65条' },

  { id: 'e07', cat: 'emg', a: 0,
    q: '原付がパンクしたときは、そのままの速度で走行を続けてよい。',
    exp: 'Sai. Phải giảm tốc, tấp vào nơi an toàn và dừng lại; chạy tiếp dễ mất lái.',
    ref: '' },

  { id: 'e08', cat: 'emg', a: 1,
    q: '地震が起きたときは、慌てずに安全な場所に停車する。',
    exp: 'Dừng ở nơi an toàn, tránh cột điện, tường và biển hiệu có thể đổ.',
    ref: '' },

  /* ============================================================
     BỔ SUNG — đợt 2
     ============================================================ */

  /* ---------- 原付のきまり ---------- */
  { id: 'b11', cat: 'basic', a: 1,
    q: '原付免許で、普通自動車を運転することはできない。',
    exp: 'Bằng 原付 chỉ dùng cho xe 50cc. Muốn lái ô tô phải thi bằng 普通免許 riêng.',
    ref: '道路交通法第84条' },

  { id: 'b12', cat: 'basic', a: 1,
    q: '原付には、ナンバープレートを取り付けなければならない。',
    exp: 'Biển số là bắt buộc. Không gắn, gắn sai vị trí hoặc làm biến dạng đều bị phạt.',
    ref: '道路運送車両法' },

  { id: 'b13', cat: 'basic', a: 0,
    q: '原付免許に有効期限はない。',
    exp: 'Sai. Mọi bằng lái ở Nhật đều có hạn. Hết hạn mà vẫn lái là vi phạm, bị xử như không có bằng.',
    ref: '道路交通法第92条' },

  { id: 'b14', cat: 'basic', a: 0,
    q: '原付免許は、取得した都道府県でしか運転できない。',
    exp: 'Sai. Bằng lái Nhật có hiệu lực trên toàn quốc.',
    ref: '' },

  { id: 'b15', cat: 'basic', a: 1,
    q: '原付一種の免許で、125ccのバイクを運転することはできない。',
    exp: 'Đúng. Xe 51–125cc (原付二種) cần 小型自動二輪免許, không dùng bằng 原付 được.',
    ref: '道路交通法第84条' },

  { id: 'b16', cat: 'basic', a: 1,
    q: '原付の学科試験は、運転免許試験場のほか、一部の警察署でも受けられる場合がある。',
    exp: 'Đúng. Tùy tỉnh, một số 警察署 có tổ chức thi 原付. Nên gọi hỏi trước.',
    ref: '' },

  { id: 'b17', cat: 'basic', a: 0,
    q: '原付を運転するときは、初心者標識（若葉マーク）を付けなければならない。',
    exp: 'Sai. 初心者標識 chỉ bắt buộc với ô tô trong 1 năm đầu, không áp dụng cho 原付.',
    ref: '道路交通法第71条の5' },

  { id: 'b18', cat: 'basic', a: 0,
    q: '原付免許を取得してから1年以内は、高速道路を通行することができない。',
    exp: 'Sai — câu bẫy. 原付 bị cấm lên cao tốc vĩnh viễn, không phải chỉ 1 năm đầu.',
    ref: '' },

  { id: 'b19', cat: 'basic', a: 0,
    q: '原付は、車検（継続検査）を受けなければならない。',
    exp: 'Sai. 原付 (dưới 250cc) không thuộc diện 車検. Chỉ cần bảo dưỡng và đóng thuế, mua bảo hiểm.',
    ref: '道路運送車両法' },

  { id: 'b20', cat: 'basic', a: 1,
    q: '原付も、任意保険に加入しておくことが望ましい。',
    exp: 'Đúng. 自賠責 chỉ chi trả mức tối thiểu; 任意保険 giúp bạn không phá sản khi gây tai nạn lớn.',
    ref: '' },

  /* ---------- 標識・標示 ---------- */
  { id: 's11', cat: 'sign', a: 1,
    q: '駐停車禁止の標識がある場所では、駐車も停車もしてはいけない。',
    exp: '駐停車禁止 cấm cả đỗ xe (駐車) lẫn dừng xe (停車).',
    ref: '道路交通法第44条' },

  { id: 's12', cat: 'sign', a: 1,
    q: '黄色の網掛け（網状の線）の標示がある場所は、駐停車禁止である。',
    exp: 'Vạch lưới vàng trên mặt đường = cấm dừng và đỗ xe.',
    ref: '' },

  { id: 's13', cat: 'sign', a: 1,
    q: '中央線が黄色の実線の場合、追越しをしてはいけない。',
    exp: 'Vạch vàng liền: cấm vượt và cấm lấn sang phần đường ngược chiều.',
    ref: '' },

  { id: 's14', cat: 'sign', a: 0,
    q: '中央線が白色の破線であれば、追越し禁止の場所でも追い越すことができる。',
    exp: 'Sai. Vạch trắng đứt chỉ cho biết được lấn làn; ở nơi cấm vượt (giao lộ, đường sắt, hầm...) vẫn cấm.',
    ref: '' },

  { id: 's15', cat: 'sign', a: 1,
    q: '転回禁止の標識がある場所では、Uターンをしてはいけない。',
    exp: '転回 = quay đầu xe. Biển này cấm quay đầu tại chỗ.',
    ref: '' },

  { id: 's16', cat: 'sign', a: 1,
    q: '指定方向外進行禁止の標識は、矢印の方向にしか進めないことを示す。',
    exp: 'Chỉ được đi theo đúng hướng mũi tên trên biển.',
    ref: '道路交通法第35条' },

  { id: 's17', cat: 'sign', a: 0,
    q: '歩行者専用の標識がある道路は、原付も通行することができる。',
    exp: 'Sai. Đường dành riêng cho người đi bộ — 原付 không được vào.',
    ref: '' },

  { id: 's18', cat: 'sign', a: 0,
    q: '自転車専用の標識がある道路は、原付も通行することができる。',
    exp: 'Sai. Đường dành riêng cho xe đạp — 原付 không được vào.',
    ref: '' },

  { id: 's19', cat: 'sign', a: 1,
    q: '警笛鳴らせの標識がある場所では、警音器を鳴らさなければならない。',
    exp: 'Đúng. Đến đoạn có biển này phải bấm còi cảnh báo.',
    ref: '道路交通法第54条' },

  { id: 's20', cat: 'sign', a: 0,
    q: '高さ制限の標識で指定された高さを超える車両でも、原付なら通行することができる。',
    exp: 'Sai. Giới hạn chiều cao áp dụng cho mọi xe, kể cả 原付.',
    ref: '' },

  { id: 's21', cat: 'sign', a: 1,
    q: 'ひし形の道路標示は、横断歩道が近づいていることを示している。',
    exp: 'Đúng. Hình thoi trên mặt đường báo phía trước có vạch qua đường.',
    ref: '' },

  { id: 's22', cat: 'sign', a: 1,
    q: '横断歩道の標示は、歩行者が道路を渡るための場所を示している。',
    exp: 'Đúng. Xe phải nhường khi có người đang qua hoặc chuẩn bị qua.',
    ref: '道路交通法第38条' },

  { id: 's23', cat: 'sign', a: 0,
    q: '導流帯（ゼブラゾーン）の上は、走行してもよい。',
    exp: 'Sai. Vùng sọc chéo chỉ để dẫn hướng, không được chạy lên.',
    ref: '' },

  { id: 's24', cat: 'sign', a: 0,
    q: '規制標識は、車両にだけ適用され、歩行者には関係ない。',
    exp: 'Sai. Nhiều biển áp dụng cho cả người đi bộ (ví dụ biển cấm người đi bộ).',
    ref: '' },

  { id: 's25', cat: 'sign', a: 1,
    q: '青い円形の標識は、指定を表すものが多い。',
    exp: 'Đúng. Xanh tròn thường là quy định chỉ dẫn (đi một chiều, bắt buộc đi theo hướng...).',
    ref: '' },

  { id: 's26', cat: 'sign', a: 0,
    q: '車両通行止めと駐車禁止は、どちらも車両の通行を禁止する標識である。',
    exp: 'Sai. 駐車禁止 chỉ cấm đỗ xe, xe vẫn được chạy qua bình thường.',
    ref: '' },

  /* ---------- 交差点・右左折 ---------- */
  { id: 'c13', cat: 'cross', a: 1,
    q: '交差点で右折するときは、対向の直進車の進行を妨げてはいけない。',
    exp: 'Đúng. Phải nhường xe đi thẳng từ hướng đối diện.',
    ref: '道路交通法第37条' },

  { id: 'c14', cat: 'cross', a: 0,
    q: '見通しの悪い交差点では、徐行しなくてもよい。',
    exp: 'Sai. Tầm nhìn kém là nơi bắt buộc 徐行.',
    ref: '道路交通法第42条' },

  { id: 'c15', cat: 'cross', a: 0,
    q: '停止線は、一時停止のときには関係がない。',
    exp: 'Sai. Vạch dừng là vị trí phải dừng khi đèn đỏ hoặc khi có biển 一時停止.',
    ref: '' },

  { id: 'c16', cat: 'cross', a: 1,
    q: '交差点の中では、追越しをしてはいけない。',
    exp: 'Đúng. Giao lộ nằm trong danh sách cấm vượt.',
    ref: '道路交通法第30条' },

  { id: 'c17', cat: 'cross', a: 0,
    q: '交差点とその手前30m以内でも、安全を確かめれば追い越してよい。',
    exp: 'Sai. Đoạn này cấm vượt tuyệt đối, không có ngoại lệ an toàn.',
    ref: '道路交通法第30条' },

  { id: 'c18', cat: 'cross', a: 1,
    q: '横断歩道とその手前30m以内では、追越しをしてはいけない。',
    exp: 'Đúng. Cấm vượt để bảo vệ người đi bộ.',
    ref: '道路交通法第30条' },

  { id: 'c19', cat: 'cross', a: 0,
    q: 'トンネルの中でも、前の車が遅いときは追い越してよい。',
    exp: 'Sai. Trong hầm cấm vượt, dù xe trước chạy chậm.',
    ref: '道路交通法第30条' },

  { id: 'c20', cat: 'cross', a: 1,
    q: '曲がり角の付近では、追越しをしてはいけない。',
    exp: 'Đúng. Gần góc cua tầm nhìn hạn chế nên cấm vượt.',
    ref: '道路交通法第30条' },

  { id: 'c21', cat: 'cross', a: 0,
    q: '上り坂の頂上付近でも、見通しがよければ追い越してよい。',
    exp: 'Sai. Đỉnh dốc lên và dốc xuống gấp luôn cấm vượt.',
    ref: '道路交通法第30条' },

  { id: 'c22', cat: 'cross', a: 0,
    q: '黄色信号になったら、加速して早く通過した方がよい。',
    exp: 'Sai. Vàng nghĩa là phải dừng; tăng tốc để vượt đèn là cực kỳ nguy hiểm.',
    ref: '道路交通法第7条' },

  { id: 'c23', cat: 'cross', a: 1,
    q: '優先道路を通行していない車は、優先道路を通行する車の進行を妨げてはいけない。',
    exp: 'Đúng. Xe từ đường nhánh phải nhường đường ưu tiên.',
    ref: '道路交通法第36条' },

  { id: 'c24', cat: 'cross', a: 0,
    q: '信号機のない交差点では、必ず一時停止しなければならない。',
    exp: 'Sai. Chỉ bắt buộc khi có biển 止まれ hoặc tầm nhìn kém. Không có đèn không đồng nghĩa phải dừng.',
    ref: '' },

  { id: 'c25', cat: 'cross', a: 1,
    q: '踏切の中で立ち往生するおそれがあるときは、踏切に進入してはいけない。',
    exp: 'Đúng. Nếu phía bên kia đang kẹt xe thì phải chờ trước đường sắt.',
    ref: '道路交通法第33条' },

  { id: 'c26', cat: 'cross', a: 0,
    q: '右折矢印の信号が出ていても、右折してはいけない。',
    exp: 'Sai. Mũi tên rẽ phải nghĩa là được rẽ phải (dù đèn chính đang đỏ).',
    ref: '道路交通法第7条' },

  { id: 'c27', cat: 'cross', a: 0,
    q: '歩行者用の信号が青であれば、車は止まらなくてよい。',
    exp: 'Sai. Xe vẫn theo đèn của xe; và khi người đi bộ đang qua đường thì phải nhường.',
    ref: '' },

  { id: 'c28', cat: 'cross', a: 0,
    q: '信号が青であれば、交差点の中で停止してもよい。',
    exp: 'Sai. Dừng trong giao lộ là vi phạm, kể cả khi đèn xanh.',
    ref: '道路交通法第50条' },

  /* ---------- 走行位置・速度 ---------- */
  { id: 'r11', cat: 'road', a: 1,
    q: '車線変更をするときは、あらかじめ合図をし、安全を確かめてから変更する。',
    exp: 'Đúng. Xi nhan trước, quan sát gương và điểm mù rồi mới chuyển làn.',
    ref: '道路交通法第53条' },

  { id: 'r12', cat: 'road', a: 0,
    q: '進路変更の合図は、変更する直前に出せばよい。',
    exp: 'Sai. Phải xi nhan trước khi đổi làn 3 giây.',
    ref: '道路交通法施行令第21条' },

  { id: 'r13', cat: 'road', a: 0,
    q: '原付が前の車を追い越すときは、左側を通過する。',
    exp: 'Sai. Vượt xe phải đi bên phải của xe bị vượt.',
    ref: '道路交通法第28条' },

  { id: 'r14', cat: 'road', a: 1,
    q: '追越しをされるときは、速度を上げてはいけない。',
    exp: 'Đúng. Không được tăng tốc để cản xe đang vượt.',
    ref: '道路交通法第28条' },

  { id: 'r15', cat: 'road', a: 1,
    q: '追越しをされるときは、道路の左側端に寄る。',
    exp: 'Đúng. Tấp trái để nhường đường cho xe vượt.',
    ref: '道路交通法第28条' },

  { id: 'r16', cat: 'road', a: 0,
    q: '夜間、対向車とすれ違うときは、前照灯を上向きのままにする。',
    exp: 'Sai. Phải hạ đèn (減光) để không làm chói mắt tài xế ngược chiều.',
    ref: '道路交通法第52条' },

  { id: 'r17', cat: 'road', a: 1,
    q: 'トンネルの中では、前照灯を点灯しなければならない。',
    exp: 'Đúng. Trong hầm luôn phải bật đèn, kể cả ban ngày.',
    ref: '道路交通法第52条' },

  { id: 'r18', cat: 'road', a: 0,
    q: '車線の少ない道路では、原付は道路の中央を走行してよい。',
    exp: 'Sai. Luôn phải đi sát mép trái, không phụ thuộc số làn.',
    ref: '道路交通法第18条' },

  { id: 'r19', cat: 'road', a: 0,
    q: '原付は、歩行者用の路側帯を通行することができる。',
    exp: 'Sai. Dải bên đường dành cho người đi bộ — 原付 không được đi vào.',
    ref: '' },

  { id: 'r20', cat: 'road', a: 0,
    q: '緊急自動車が近づいてきたときは、そのままの速度で走行する。',
    exp: 'Sai. Phải tấp vào bên trái và nhường đường cho xe ưu tiên.',
    ref: '道路交通法第40条' },

  { id: 'r21', cat: 'road', a: 1,
    q: '速度が速いほど、停止距離は長くなる。',
    exp: 'Đúng. Gồm quãng phản ứng và quãng phanh, cả hai đều tăng theo tốc độ.',
    ref: '' },

  { id: 'r22', cat: 'road', a: 0,
    q: '車間距離は、速度に関係なく一定でよい。',
    exp: 'Sai. Chạy càng nhanh càng phải giữ khoảng cách xa.',
    ref: '道路交通法第26条' },

  { id: 'r23', cat: 'road', a: 0,
    q: '夜間は、前照灯を点灯しなくても走行できる。',
    exp: 'Sai. Ban đêm bắt buộc bật đèn.',
    ref: '道路交通法第52条' },

  { id: 'r24', cat: 'road', a: 0,
    q: 'カーブでは、曲がりながら減速するのがよい。',
    exp: 'Sai. Phải giảm tốc trước khi vào cua; phanh trong cua dễ trượt bánh.',
    ref: '' },

  { id: 'r25', cat: 'road', a: 1,
    q: '道路の状況に応じて、30km/hより遅い速度で走行しなければならない場合がある。',
    exp: 'Đúng. Mưa, sương mù, đường hẹp, đông người... đều phải chạy chậm hơn 30km/h.',
    ref: '道路交通法第22条' },

  { id: 'r26', cat: 'road', a: 0,
    q: '雨天時は、晴天時と同じ車間距離でよい。',
    exp: 'Sai. Trời mưa phải tăng khoảng cách vì phanh ăn kém hơn.',
    ref: '' },

  /* ---------- 安全運転・駐停車 ---------- */
  { id: 'f11', cat: 'safe', a: 1,
    q: '消火栓や消防用防火水槽の標識がある場所から5m以内は、駐停車禁止である。',
    exp: 'Đúng. Chừa 5m quanh trụ nước chữa cháy để xe cứu hỏa lấy nước.',
    ref: '道路交通法第44条' },

  { id: 'f12', cat: 'safe', a: 1,
    q: '踏切の前後10m以内は、駐停車禁止である。',
    exp: 'Đúng. Chừa 10m hai bên đường sắt.',
    ref: '道路交通法第44条' },

  { id: 'f13', cat: 'safe', a: 1,
    q: 'トンネルの中は、駐停車禁止である。',
    exp: 'Đúng. Dừng trong hầm cực kỳ nguy hiểm vì không có chỗ thoát.',
    ref: '' },

  { id: 'f14', cat: 'safe', a: 0,
    q: '坂道の途中では、駐車してはいけない。',
    exp: 'Sai. Được đỗ nếu chèn bánh và gài số thấp; không có quy định cấm tuyệt đối.',
    ref: '' },

  { id: 'f15', cat: 'safe', a: 0,
    q: '駐車するときは、エンジンをかけたままでよい。',
    exp: 'Sai. Phải tắt máy, kéo phanh tay và có biện pháp chống trôi.',
    ref: '道路交通法第47条' },

  { id: 'f16', cat: 'safe', a: 0,
    q: '荷物は、走行中に落ちないように固定しなくてもよい。',
    exp: 'Sai. Phải cố định chắc chắn, nếu để rơi sẽ bị phạt và gây tai nạn.',
    ref: '' },

  { id: 'f17', cat: 'safe', a: 0,
    q: '原付の荷台に人を乗せて運ぶことができる。',
    exp: 'Sai. 原付 chỉ chở 1 người; chở người trên giá hàng là vi phạm.',
    ref: '道路交通法第57条' },

  { id: 'f18', cat: 'safe', a: 0,
    q: '横断歩道の上に駐車してもよい。',
    exp: 'Sai. Chặn lối qua đường của người đi bộ là vi phạm.',
    ref: '道路交通法第44条' },

  { id: 'f19', cat: 'safe', a: 0,
    q: '交差点の近くに駐車しても、見通しには関係ない。',
    exp: 'Sai. Xe đỗ gần giao lộ che khuất tầm nhìn và gây nguy hiểm.',
    ref: '' },

  { id: 'f20', cat: 'safe', a: 1,
    q: '駐車するときは、他の車の通行を妨げない場所を選ぶ。',
    exp: 'Đúng. Nguyên tắc cơ bản: không chặn đường người khác.',
    ref: '' },

  { id: 'f21', cat: 'safe', a: 1,
    q: 'エンジンをかけたまま車を離れると、盗難の危険がある。',
    exp: 'Đúng. Nhiều vụ trộm xe bắt đầu từ việc để máy nổ rồi rời đi.',
    ref: '' },

  { id: 'f22', cat: 'safe', a: 0,
    q: '路上駐車は、緊急車両の通行に影響しない。',
    exp: 'Sai. Xe đỗ sai chỗ là nguyên nhân làm chậm xe cứu hỏa, cứu thương.',
    ref: '' },

  { id: 'f23', cat: 'safe', a: 0,
    q: 'ハザードランプを点滅させていれば、駐車違反にならない。',
    exp: 'Sai. Đèn cảnh báo không miễn trừ lỗi đỗ xe.',
    ref: '' },

  { id: 'f24', cat: 'safe', a: 0,
    q: '原付は、歩道に駐車してもよい。',
    exp: 'Sai. Đỗ trên vỉa hè là vi phạm, còn cản trở người đi bộ.',
    ref: '' },

  { id: 'f25', cat: 'safe', a: 0,
    q: '夜間、道路上に駐車するときは、灯火をつけなくてよい。',
    exp: 'Sai. Ban đêm đỗ xe trên đường phải bật đèn để xe khác nhận ra.',
    ref: '道路交通法第52条' },

  { id: 'f26', cat: 'safe', a: 0,
    q: '交差点から5m以内でも、人が乗っていれば駐車できる。',
    exp: 'Sai. Không có ngoại lệ như vậy — 5m quanh giao lộ luôn cấm.',
    ref: '道路交通法第44条' },

  /* ---------- 事故・緊急時 ---------- */
  { id: 'e09', cat: 'emg', a: 0,
    q: '事故の相手が「大丈夫」と言えば、警察に届けなくてよい。',
    exp: 'Sai. Vẫn phải báo cảnh sát; thỏa thuận miệng không thay thế được thủ tục.',
    ref: '道路交通法第72条' },

  { id: 'e10', cat: 'emg', a: 1,
    q: '事故で人がけがをしたときは、救護しなければならない。',
    exp: 'Đúng. Nghĩa vụ cứu người, không làm là tội phạm.',
    ref: '道路交通法第72条' },

  { id: 'e11', cat: 'emg', a: 1,
    q: 'ひき逃げは、事故の報告義務違反になる。',
    exp: 'Đúng. Bỏ chạy sau tai nạn là vi phạm nặng, có thể bị phạt tù.',
    ref: '道路交通法第72条' },

  { id: 'e12', cat: 'emg', a: 1,
    q: '事故現場では、二次事故を防ぐため、後続車に合図を送る。',
    exp: 'Đúng. Bật đèn cảnh báo, đặt tam giác để xe sau tránh.',
    ref: '' },

  { id: 'e13', cat: 'emg', a: 0,
    q: '故障して動かなくなった車は、道路の中央に止めたままにする。',
    exp: 'Sai. Phải đẩy ra lề, bật đèn cảnh báo và đặt biển báo.',
    ref: '' },

  { id: 'e14', cat: 'emg', a: 1,
    q: '転倒したときは、周囲の安全を確認してから起き上がる。',
    exp: 'Đúng. Đứng dậy ngay giữa đường rất dễ bị xe sau tông.',
    ref: '' },

  { id: 'e15', cat: 'emg', a: 0,
    q: '示談がまとまれば、警察への報告は必要ない。',
    exp: 'Sai. Báo cảnh sát là nghĩa vụ pháp lý, không phụ thuộc việc thỏa thuận.',
    ref: '道路交通法第72条' },

  { id: 'e16', cat: 'emg', a: 0,
    q: 'パンクしたときは、急ブレーキをかけて止める。',
    exp: 'Sai. Phải giảm tốc từ từ; phanh gấp dễ mất lái và ngã.',
    ref: '' },

  { id: 'e17', cat: 'emg', a: 0,
    q: '地震の揺れを感じたら、建物のそばに停車する。',
    exp: 'Sai. Phải tránh xa tường, cột điện và biển hiệu vì có thể đổ.',
    ref: '' },

  { id: 'e18', cat: 'emg', a: 1,
    q: '台風や大雨のときは、無理に運転しない。',
    exp: 'Đúng. Mưa lớn làm giảm tầm nhìn và dễ ngập, nên hoãn chuyến đi.',
    ref: '' },

  { id: 'e19', cat: 'emg', a: 1,
    q: '飲酒運転で事故を起こすと、任意保険が使えない場合がある。',
    exp: 'Đúng. Nhiều hợp đồng loại trừ trách nhiệm khi lái xe trong tình trạng có cồn.',
    ref: '' },

  { id: 'e20', cat: 'emg', a: 0,
    q: '運転中に地震が起きたら、急ブレーキで止める。',
    exp: 'Sai. Phanh gấp dễ bị xe sau tông; hãy giảm tốc từ từ và tấp vào nơi an toàn.',
    ref: '' },

  { id: 'e21', cat: 'emg', a: 1,
    q: '道路で転倒したときは、後続車に注意しながら道路の外へ移動する。',
    exp: 'Đúng. Rời khỏi làn xe càng sớm càng tốt sau khi đã quan sát.',
    ref: '' },

  { id: 'e22', cat: 'emg', a: 0,
    q: '事故を起こしたら、まず車を安全な場所へ移動させる。',
    exp: 'Sai. Việc đầu tiên là dừng xe ngay tại chỗ, cứu người, rồi mới tính di chuyển.',
    ref: '道路交通法第72条' }
];
