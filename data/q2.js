/* ============================================================
   Bổ sung đợt 3 — 52 câu, đưa tổng kho lên 200
   Cùng schema với data/questions.js
   ============================================================ */
window.QUESTIONS.push(
  /* ---------- 原付のきまり ---------- */
  { id: 'b21', cat: 'basic', a: 0,
    q: '原付は、満18歳にならなければ運転できない。',
    exp: 'Sai. Đủ 16 tuổi là được thi và lái 原付. Mốc 18 tuổi là điều kiện của bằng 普通 (ô tô).',
    ref: '道路交通法第88条' },

  { id: 'b22', cat: 'basic', a: 1,
    q: '普通自動車免許を持っていれば、原付を運転することができる。',
    exp: 'Đúng. Bằng 普通 tự động bao gồm quyền lái 原付 — không cần thi thêm bằng 原付.',
    ref: '道路交通法第84条' },

  { id: 'b23', cat: 'basic', a: 0,
    q: '原付免許の試験は学科試験だけで、視力などの適性試験は行われない。',
    exp: 'Sai. Có kiểm tra thị lực (適性試験): hai mắt phải đạt 0.5 trở lên. Không đạt thì không được thi.',
    ref: '道路交通法第91条' },

  { id: 'b24', cat: 'basic', a: 0,
    q: '原付は、軽自動車税を納めなくてもよい。',
    exp: 'Sai. 原付 thuộc diện nộp 軽自動車税 (thuế xe nhỏ) hằng năm cho quận/thành phố nơi đăng ký.',
    ref: '地方税法' },

  { id: 'b25', cat: 'basic', a: 1,
    q: '原付のナンバープレートは、市区町村から交付される。',
    exp: 'Đúng. Khác với ô tô, biển số 原付 do 市区町村 cấp khi đăng ký xe.',
    ref: '' },

  { id: 'b26', cat: 'basic', a: 0,
    q: '引っ越して住所が変わっても、免許証の住所変更の手続きは必要ない。',
    exp: 'Sai. Phải làm thủ tục đổi địa chỉ trên bằng trong vòng 30 ngày kể từ khi chuyển nhà.',
    ref: '道路交通法第94条' },

  { id: 'b27', cat: 'basic', a: 0,
    q: '原付免許を取得すれば、普通自動車も運転できる。',
    exp: 'Sai. Bằng 原付 chỉ lái được 原付; ô tô cần bằng 普通 riêng.',
    ref: '道路交通法第84条' },

  { id: 'b28', cat: 'basic', a: 0,
    q: '原付講習を受けていなくても、学科試験に合格すれば免許証が交付される。',
    exp: 'Sai. Thi đỗ chỉ là một bước; phải hoàn thành 原付講習 và nộp giấy chứng nhận mới được cấp bằng.',
    ref: '道路交通法第108条の2' },

  /* ---------- 標識・標示 ---------- */
  { id: 's27', cat: 'sign', a: 1,
    q: '「止まれ」の標識は、赤い逆三角形である。',
    exp: 'Đúng. Tam giác ngược màu đỏ, chữ 止まれ trắng — dễ nhận ra nhất trong các biển.',
    ref: '' },

  { id: 's28', cat: 'sign', a: 1,
    q: '「一方通行」の標識は、青い四角形で白い矢印が描かれている。',
    exp: 'Đúng. Nền xanh, mũi tên trắng chỉ chiều được đi.',
    ref: '' },

  { id: 's29', cat: 'sign', a: 1,
    q: '「駐停車禁止」の標識は、赤い斜線が2本入っている。',
    exp: 'Đúng. Hai gạch chéo hình X = cấm cả đỗ và dừng. Một gạch chéo = 駐車禁止 (chỉ cấm đỗ).',
    ref: '' },

  { id: 's30', cat: 'sign', a: 0,
    q: '「追越し禁止」の標識は、青い円形である。',
    exp: 'Sai. Biển cấm vượt là hình tròn trắng viền đỏ, bên trong có hai ô tô (một đỏ, một đen).',
    ref: '' },

  { id: 's31', cat: 'sign', a: 1,
    q: '「車両通行止め」の標識がある道路は、自転車も通行できない。',
    exp: 'Đúng. Ở Nhật, xe đạp được coi là 車両 (phương tiện), nên cũng bị cấm.',
    ref: '道路交通法第8条' },

  { id: 's32', cat: 'sign', a: 1,
    q: '道路標識には、規制標識・指示標識・警戒標識・補助標識がある。',
    exp: 'Đúng. Bốn nhóm cơ bản: quy định, chỉ dẫn, cảnh báo và biển phụ.',
    ref: '' },

  { id: 's33', cat: 'sign', a: 0,
    q: '「徐行」の標識は、速度を落とさずに進んでよいという意味である。',
    exp: 'Sai. 徐行 nghĩa là phải đi chậm đến mức dừng được ngay — ngược lại hoàn toàn.',
    ref: '' },

  { id: 's34', cat: 'sign', a: 0,
    q: '「転回禁止」は、車を後退させてはいけないという意味である。',
    exp: 'Sai. 転回 là quay đầu xe (U-turn), không phải lùi xe.',
    ref: '' },

  { id: 's35', cat: 'sign', a: 0,
    q: '警戒標識は、禁止事項を表す標識である。',
    exp: 'Sai. 警戒標識 cảnh báo nguy hiểm phía trước (hình thoi vàng), không phải biển cấm.',
    ref: '' },

  { id: 's36', cat: 'sign', a: 1,
    q: '補助標識は、本標識の意味を補足する標識である。',
    exp: 'Đúng. Biển phụ ghi thêm thời gian, phạm vi, đối tượng áp dụng của biển chính.',
    ref: '' },

  { id: 's37', cat: 'sign', a: 0,
    q: '道路標示は、路面ではなく標識板に描かれている。',
    exp: 'Sai. 道路標示 vẽ trực tiếp trên mặt đường; 標識 mới là biển gắn trên cột.',
    ref: '' },

  { id: 's38', cat: 'sign', a: 0,
    q: '青信号であれば、横断歩道を渡っている人を妨げてもよい。',
    exp: 'Sai. Đèn xanh cho xe đi, nhưng người đang qua đường vẫn được ưu tiên — phải nhường.',
    ref: '道路交通法第38条' },

  /* ---------- 交差点・右左折 ---------- */
  { id: 'c29', cat: 'cross', a: 1,
    q: '「止まれ」の標識がある交差点では、停止線の手前で一時停止する。',
    exp: 'Đúng. Dừng trước vạch, nếu không có vạch thì dừng ngay trước giao lộ.',
    ref: '道路交通法第43条' },

  { id: 'c30', cat: 'cross', a: 0,
    q: '一時停止するときは、停止線を越えて止まってもよい。',
    exp: 'Sai. Phải dừng TRƯỚC vạch; lấn qua vạch là không còn được tính là dừng đúng.',
    ref: '' },

  { id: 'c31', cat: 'cross', a: 0,
    q: '右折するときは、交差点の中心の外側を大きく回って曲がる。',
    exp: 'Sai. Phải rẽ vòng qua phía trong của tâm giao lộ (中心の内側), không vòng rộng ra ngoài.',
    ref: '道路交通法第34条' },

  { id: 'c32', cat: 'cross', a: 0,
    q: '交差点を直進するときも、合図をしなければならない。',
    exp: 'Sai. Đi thẳng không cần xi nhan. Chỉ rẽ hoặc đổi làn mới phải bật.',
    ref: '道路交通法第53条' },

  { id: 'c33', cat: 'cross', a: 1,
    q: '左折するときは、後方の安全を確認して巻き込みを防ぐ。',
    exp: 'Đúng. Xe máy và người đi bộ bên trái rất dễ bị cuốn vào khi xe rẽ trái.',
    ref: '' },

  { id: 'c34', cat: 'cross', a: 1,
    q: '二段階右折の標識があれば、車線の数に関係なく二段階右折をする。',
    exp: 'Đúng. Biển 二段階右折 áp dụng cả trên đường 2 làn — không chỉ đường 3 làn trở lên.',
    ref: '道路交通法第34条' },

  { id: 'c35', cat: 'cross', a: 0,
    q: '二段階右折のときは、交差点の中で待ってよい。',
    exp: 'Sai. Phải đi thẳng qua giao lộ, dừng ở mép trái phía bên kia — không đứng giữa giao lộ.',
    ref: '道路交通法第34条' },

  { id: 'c36', cat: 'cross', a: 0,
    q: '交差点を左折した先が渋滞しているときは、交差点内で待ってよい。',
    exp: 'Sai. Nếu phía bên kia kẹt xe thì phải chờ trước giao lộ, không được chặn ngang.',
    ref: '道路交通法第50条' },

  /* ---------- 走行位置・速度 ---------- */
  { id: 'r27', cat: 'road', a: 0,
    q: '追越しをするときは、対向車に注意しなくてよい。',
    exp: 'Sai. Vượt xe là lúc phải lấn sang làn ngược chiều — đối tượng nguy hiểm nhất chính là xe đối diện.',
    ref: '道路交通法第28条' },

  { id: 'r28', cat: 'road', a: 1,
    q: '自動車専用道路の入口には、原付の通行を禁止する標識がある。',
    exp: 'Đúng. 原付 bị cấm vào đường chỉ dành cho ô tô, và ở cửa vào luôn có biển báo rõ ràng.',
    ref: '' },

  { id: 'r29', cat: 'road', a: 0,
    q: '見通しの悪い場所では、速度を上げて早く通過した方が安全である。',
    exp: 'Sai. Tầm nhìn kém thì phải giảm tốc; chạy nhanh để thoát khỏi đoạn nguy hiểm là phản khoa học.',
    ref: '' },

  { id: 'r30', cat: 'road', a: 0,
    q: '夜間でも、昼間と同じ速度で走行してよい。',
    exp: 'Sai. Ban đêm tầm nhìn hạn chế hơn nhiều, phải chạy chậm hơn mức ban ngày.',
    ref: '' },

  { id: 'r31', cat: 'road', a: 0,
    q: '濡れた路面では、ブレーキがよく効く。',
    exp: 'Sai. Đường ướt làm giảm ma sát, quãng phanh dài hơn và rất dễ trượt bánh.',
    ref: '' },

  { id: 'r32', cat: 'road', a: 0,
    q: '強い横風を受けても、原付はふらつかない。',
    exp: 'Sai. Xe nhẹ nên rất dễ bị gió đẩy lệch, nhất là khi qua cầu hoặc ra khỏi hầm.',
    ref: '' },

  { id: 'r33', cat: 'road', a: 0,
    q: '下り坂では、エンジンブレーキを使わず、ブレーキだけで減速する。',
    exp: 'Sai. Dốc dài mà chỉ dùng phanh sẽ cháy phanh, mất phanh — phải kết hợp phanh động cơ.',
    ref: '' },

  { id: 'r34', cat: 'road', a: 1,
    q: 'トンネルを出た瞬間に、横風を受けることがある。',
    exp: 'Đúng. Gió bị nén trong hầm rồi thoát ra đột ngột, dễ làm xe lạng tay lái.',
    ref: '' },

  /* ---------- 安全運転・駐停車 ---------- */
  { id: 'f27', cat: 'safe', a: 0,
    q: '駐車するときは、車の周りに人がいても気にしなくてよい。',
    exp: 'Sai. Phải quan sát quanh xe trước khi đỗ, nhất là khi lùi hay mở chân chống.',
    ref: '' },

  { id: 'f28', cat: 'safe', a: 0,
    q: '車を離れるときは、窓を開けたままでよい。',
    exp: 'Sai. Phải đóng cửa, khóa xe và không để đồ quý trong cốp.',
    ref: '' },

  { id: 'f29', cat: 'safe', a: 1,
    q: 'ガソリンを補給するときは、エンジンを止める。',
    exp: 'Đúng. Bắt buộc tắt máy khi đổ xăng để tránh cháy nổ.',
    ref: '' },

  { id: 'f30', cat: 'safe', a: 0,
    q: 'タイヤの空気圧は、点検しなくてよい。',
    exp: 'Sai. Áp suất sai làm xe trượt, phanh kém và dễ nổ lốp khi chạy nhanh.',
    ref: '' },

  { id: 'f31', cat: 'safe', a: 1,
    q: 'ブレーキの効きが悪いときは、早めに点検・修理する。',
    exp: 'Đúng. Xe 50cc chỉ có một phanh trước và một phanh sau — hỏng một bên là nguy hiểm gấp đôi.',
    ref: '' },

  { id: 'f32', cat: 'safe', a: 0,
    q: 'ヘルメットは、あごひもを締めなくてもよい。',
    exp: 'Sai. Không cài quai thì khi ngã mũ sẽ văng ra trước khi bảo vệ đầu.',
    ref: '' },

  { id: 'f33', cat: 'safe', a: 0,
    q: '雨の日は、カッパを着ない方が安全である。',
    exp: 'Sai. Áo mưa giữ cơ thể khô và giữ tầm nhìn; thiếu nó dễ bị lạnh, run tay khi lái.',
    ref: '' },

  { id: 'f34', cat: 'safe', a: 1,
    q: '交差点の近くに駐車すると、見通しが悪くなる。',
    exp: 'Đúng. Xe đỗ gần giao lộ che khuất tầm nhìn của cả người đi bộ lẫn xe khác.',
    ref: '' },

  /* ---------- 事故・緊急時 ---------- */
  { id: 'e23', cat: 'emg', a: 1,
    q: '事故を起こしたら、まず負傷者を救護する。',
    exp: 'Đúng. Thứ tự nghĩa vụ: dừng xe → cứu người → cảnh báo → báo cảnh sát.',
    ref: '道路交通法第72条' },

  { id: 'e24', cat: 'emg', a: 1,
    q: '救急車を呼ぶときは、場所とけがの状況を伝える。',
    exp: 'Đúng. Nói rõ địa điểm (địa chỉ, mốc dễ thấy) và tình trạng người bị nạn để xe đến đúng chỗ.',
    ref: '' },

  { id: 'e25', cat: 'emg', a: 1,
    q: '事故現場に近づく車は、徐行して安全を確認する。',
    exp: 'Đúng. Hiện trường tai nạn là nơi dễ xảy ra tai nạn thứ hai nhất.',
    ref: '' },

  { id: 'e26', cat: 'emg', a: 1,
    q: 'けが人がいるのに、そのまま走り去るのは違法である。',
    exp: 'Đúng. Đây là tội ひき逃げ — có thể bị phạt tù, nặng hơn nhiều so với tai nạn ban đầu.',
    ref: '道路交通法第72条' },

  { id: 'e27', cat: 'emg', a: 0,
    q: '事故を起こしたら、まず車を移動させてから通報する。',
    exp: 'Sai. Phải dừng xe ngay tại chỗ và cứu người trước; di chuyển chỉ sau khi đã đảm bảo an toàn.',
    ref: '道路交通法第72条' },

  { id: 'e28', cat: 'emg', a: 1,
    q: '事故の記録として、現場の写真を撮っておくとよい。',
    exp: 'Đúng. Ảnh hiện trường, vị trí xe và biển số là bằng chứng quan trọng khi xử lý bảo hiểm.',
    ref: '' },

  { id: 'e29', cat: 'emg', a: 1,
    q: '二次事故を防ぐため、事故現場の後方に停止表示板を置く。',
    exp: 'Đúng. Đặt tam giác phản quang phía sau để xe đến sau biết mà giảm tốc.',
    ref: '' },

  { id: 'e30', cat: 'emg', a: 0,
    q: '相手が「大丈夫」と言えば、その場を離れてよい。',
    exp: 'Sai. Vẫn phải báo cảnh sát và lập biên bản; rời đi có thể bị coi là bỏ chạy.',
    ref: '道路交通法第72条' }
);
