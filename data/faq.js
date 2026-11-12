/* ============================================================
   Dữ liệu cho trợ lý hỏi–đáp trong app (offline)
   Mỗi mục: kw = từ khoá đã bỏ dấu; a = câu trả lời 3 ngôn ngữ;
   screen = màn liên quan (mở bằng nút).
   ============================================================ */
window.FAQ = [
  {
    id: 'fee', screen: 'info',
    kw: ['phi thi', 'le phi', 'bao nhieu tien', 'chi phi', '1600', '2350', '5250', 'hoc phi', 'tien thi', 'thi het bao nhieu', 'tong chi phi', 'mat bao nhieu'],
    a: {
      vi: 'Lệ phí tham khảo: thi 学科 khoảng 1.600 ¥, cấp bằng khoảng 2.350 ¥, khóa 原付講習 khoảng 5.250 ¥. Mức này khác nhau theo tỉnh.',
      zh: '参考费用：学科考试约 1,600 日元，发证约 2,350 日元，原付講習 约 5,250 日元。各县不同。',
      fil: 'Bayad: exam ~¥1,600, lisensya ~¥2,350, 原付講習 ~¥5,250. Iba-iba kada prepektura.'
    }
  },
  {
    id: 'age', screen: 'info',
    kw: ['bao nhieu tuoi', 'tuoi', '16 tuoi', '18 tuoi', 'do tuoi', 'may tuoi', 'tuoi thi', 'duoc thi', 'bao nhieu tuoi thi'],
    a: {
      vi: 'Đủ 16 tuổi là được thi và lái 原付. Không có bài thi thực hành, chỉ thi lý thuyết.',
      zh: '满 16 岁即可报考并驾驶原付。没有实操考试，只考理论。',
      fil: '16 taong gulang pataas ay puwede. Walang practical test, teorya lang.'
    }
  },
  {
    id: 'docs', screen: 'check',
    kw: ['giay to', 'can gi', 'chuan bi', 'ho so', '住民票', '在留カード', 'anh 3x4', 'checklist', 'can mang gi', 'mang gi', 'giay to gi'],
    a: {
      vi: 'Cần: 住民票 (có 本籍), 在留カード, ảnh 3×2,4 cm (2 tấm), tiền mặt, và giấy chứng nhận 原付講習.',
      zh: '需要：住民票（含本籍）、在留カード、3×2.4cm 照片 2 张、现金、原付講習 结业证明。',
      fil: 'Kailangan: 住民票 (may 本籍), 在留カード, litratong 3×2.4cm (2), cash, at sertipiko ng 原付講習.'
    }
  },
  {
    id: 'format', screen: 'info',
    kw: ['de thi', 'cau truc', 'bao nhieu cau', '48 cau', 'thoi gian', '30 phut', 'diem do', '45 diem'],
    a: {
      vi: 'Đề 48 câu trong 30 phút: 46 câu ○× (1 điểm) + 2 câu hình 危険予測 (2 điểm/câu, đúng cả 3 ý mới có điểm). Tổng 50 điểm, đỗ 45.',
      zh: '30 分钟 48 题：46 道○×（每题 1 分）+ 2 道图题（每题 2 分，3 个判断全对才得分）。满分 50，45 合格。',
      fil: '48 tanong sa 30 minuto: 46 ○× (1 puntos) + 2 larawan (2 puntos bawat isa, lahat tama). 50 puntos, 45 passing.'
    }
  },
  {
    id: 'seminar', screen: 'info',
    kw: ['原付講習', 'khoa hoc', 'hoc lai', 'giay chung nhan', 'seminar'],
    a: {
      vi: '原付講習 là khóa bắt buộc khoảng 3 giờ ở trường dạy lái, học phí tham khảo 5.250 ¥. Không có giấy chứng nhận thì không được cấp bằng.',
      zh: '原付講習 是驾校约 3 小时的必修课，费用约 5,250 日元。没有结业证明不能领证。',
      fil: 'Ang 原付講習 ay ~3 oras na seminar sa driving school, ~¥5,250. Walang sertipiko, walang lisensya.'
    }
  },
  {
    id: 'twostep', screen: 'practice',
    kw: ['二段階右折', 'hai buoc', 're phai hai buoc', 'two step', '3 lan', 'ba lan'],
    a: {
      vi: '二段階右折: ở đường một chiều từ 3 làn trở lên VÀ có đèn tín hiệu, phải đi thẳng qua giao lộ, dừng ở mép trái phía bên kia rồi mới rẽ phải. Có biển 小回り thì rẽ bình thường.',
      zh: '二段階右折：单向 3 车道以上且有信号灯时，要先直行过路口，在对向左端停下再右转。有小转弯标志则普通右转。',
      fil: '二段階右折: sa one-way na 3 lanes pataas AT may signal, dumiretso, huminto sa kaliwang gilid, tapos lumiko. May 小回り sign = normal na liko.'
    }
  },
  {
    id: 'speed', screen: 'practice',
    kw: ['toc do', '30km', '30 km', 'chay bao nhieu', 'qua toc do', 'di bao nhieu km', 'chay duoc bao nhieu'],
    a: {
      vi: '原付 có giới hạn 30 km/h, kể cả khi biển báo cho phép 40 hay 50. Vượt 30 km/h là vi phạm.',
      zh: '原付 限速 30 km/h，即使标志写 40 或 50 也一样。超过 30 就是违规。',
      fil: '30 km/h ang limit ng 原付, kahit 40 o 50 ang senyales. Lampas 30 = paglabag.'
    }
  },
  {
    id: 'helmet', screen: 'gear',
    kw: ['mu bao hiem', 'helmet', 'khong doi mu', 'quai', 'cai quai', 'doi mu', 'non bao hiem'],
    a: {
      vi: 'Đội mũ là bắt buộc và phải cài quai. Mũ phải có tem PSC và vừa đầu; mũ lỏng khi ngã sẽ văng ra.',
      zh: '必须戴头盔并扣好下颏带。头盔需有 PSC 标志、尺寸合适；太松摔倒会飞出去。',
      fil: 'Obligado ang helmet at naka-strap. Dapat may PSC mark at tamang sukat; maluwag ay lumalabas kapag natumba.'
    }
  },
  {
    id: 'insurance', screen: 'info',
    kw: ['bao hiem', '自賠責', 'jibaiseki', 'bat buoc', 'tu nguyen'],
    a: {
      vi: '自賠責 (bảo hiểm trách nhiệm bắt buộc) là bắt buộc, không có thì không được lưu thông. 任意保険 là tự nguyện nhưng rất nên mua vì 自賠責 chỉ trả mức tối thiểu.',
      zh: '自賠責（强制责任险）是必须的，没有就不能上路。任意保険 是自愿的，但建议购买，因为强制险只赔最低额度。',
      fil: 'Kailangan ang 自賠責; wala ito, bawal bumiyahe. Ang 任意保険 ay voluntary pero inirerekomenda dahil minimum lang ang 自賠責.'
    }
  },
  {
    id: 'plate', screen: 'info',
    kw: ['bien so', 'dang ky', 'ナンバー', '市役所', 'bien trang', 'bang lai'],
    a: {
      vi: 'Đăng ký xe và lấy biển số 原付 tại 市役所 nơi bạn ở. 新基準原付 (≤125cc, ≤4.0kW) cũng dùng biển trắng.',
      zh: '在你居住的 市役所 登记并领取原付车牌。新基準原付（≤125cc、≤4.0kW）同样用白牌。',
      fil: 'I-register ang 原付 at kumuha ng plaka sa 市役所. Puting plaka din ang 新基準原付 (≤125cc, ≤4.0kW).'
    }
  },
  {
    id: 'parking', screen: 'law',
    kw: ['do xe', 'dung xe', '駐車', '停車', 'phat do xe', 'cam do'],
    a: {
      vi: '駐車 = đỗ xe (dừng lâu, rời xe); 停車 = dừng tạm. 駐車禁止 chỉ cấm đỗ, còn 駐停車禁止 cấm cả dừng. Quanh giao lộ và vạch qua đường là 5 m, quanh bến xe buýt và đường sắt là 10 m.',
      zh: '駐車＝长时间停车；停車＝临时停。駐車禁止 只禁停，駐停車禁止 连临时停也禁。路口与人行横道 5 m，公交站与铁路 10 m。',
      fil: '駐車 = paradahan; 停車 = pansamantalang hinto. 駐車禁止 = paradahan lang; 駐停車禁止 = pati hinto. 5 m sa kanto at crosswalk, 10 m sa bus stop at riles.'
    }
  },
  {
    id: 'pass', screen: 'stats',
    kw: ['thi thu', 'bao nhieu diem', 'dat', 'do', 'rot', 'pass', '45/50'],
    a: {
      vi: 'Thi thử trong app chấm 50 điểm, đỗ từ 45. Nên luyện tới 47–48 cho chắc vì phòng thi có thể khác.',
      zh: 'App 模拟考满分 50，45 分合格。建议练到 47–48 更稳。',
      fil: '50 puntos ang mock exam, 45 passing. Sanayin hanggang 47–48 para sigurado.'
    }
  },
  {
    id: 'wrong', screen: 'home',
    kw: ['cau sai', 'on lai', 'xem lai', 'sai nhieu', 'ôn câu sai'],
    a: {
      vi: 'Mọi câu trả lời sai tự vào mục “Ôn câu sai” ở trang chủ. Bấm vào đó để luyện lại đúng những câu đã sai.',
      zh: '所有错题会自动进入首页的「复习错题」。点进去可只练错题。',
      fil: 'Awtomatikong napupunta sa “Balikan mali” sa home ang maling sagot. Pindutin para ulitin.'
    }
  },
  {
    id: 'lang', screen: 'home',
    kw: ['ngon ngu', 'doi ngon ngu', 'tieng viet', '中文', 'filipino', 'language'],
    a: {
      vi: 'Bấm nút cờ ở góc phải trên để đổi giữa Tiếng Việt, 中文 và Filipino. Toàn bộ giao diện, câu hỏi, giải thích và tỷ giá đổi theo.',
      zh: '点右上角国旗按钮可在越南语、中文、Filipino 之间切换。界面、题目、解释与汇率都会跟随。',
      fil: 'Pindutin ang bandila sa kanan sa taas para pumili ng Vietnamese, 中文, Filipino. Kasama ang UI, tanong, paliwanag at rate.'
    }
  },
  {
    id: 'emergency', screen: 'emg',
    kw: ['khan cap', 'cap cuu', '110', '119', 'dai su quan', 'hotline', 'tai nan'],
    a: {
      vi: 'Khẩn cấp: 110 cảnh sát, 119 cứu hỏa/cấp cứu, 118 cảnh sát biển. Đại sứ quán Việt Nam: 03-3466-3313; hotline bảo hộ 24/24: 080-3590-9136.',
      zh: '紧急：110 警察，119 消防/急救，118 海上保安厅。越南大使馆 03-3466-3313；24 小时保护热线 080-3590-9136。',
      fil: 'Emergency: 110 pulis, 119 bumbero/ambulansya, 118 coast guard. Embahada ng Vietnam 03-3466-3313; 24/24 hotline 080-3590-9136.'
    }
  },
  {
    id: 'weather', screen: 'home',
    kw: ['thoi tiet', 'weather', 'troi mua', 'nhiet do'],
    a: {
      vi: 'Thẻ thời tiết ở khung đầu trang lấy theo vị trí của bạn và tự cập nhật mỗi 30 phút. Chạm vào thẻ để làm mới ngay.',
      zh: '天气卡在首页顶部，按你的位置获取，每 30 分钟自动更新。点一下立即刷新。',
      fil: 'Ang weather card sa taas ng home ay ayon sa lokasyon, 30 minuto ang update. Pindutin para i-refresh.'
    }
  },
  {
    id: 'fx', screen: 'home',
    kw: ['ty gia', 'doi tien', 'yen', 'vnd', 'cny', 'php', 'quy doi'],
    a: {
      vi: 'Thẻ tỷ giá đổi theo ngôn ngữ: Tiếng Việt → VND, 中文 → CNY, Filipino → PHP. Lật thẻ để dùng máy quy đổi.',
      zh: '汇率卡按语言切换：越南语 → VND，中文 → CNY，Filipino → PHP。翻卡可使用换算器。',
      fil: 'Nagbabago ang rate card ayon sa wika: Vietnamese → VND, 中文 → CNY, Filipino → PHP. I-flip para sa converter.'
    }
  },
  {
    id: 'app', screen: 'home',
    kw: ['cai app', 'cai dat', 'qr', 'offline', 'khong co mang', 'pwa'],
    a: {
      vi: 'App cài được lên màn hình chính: Android mở bằng Chrome rồi bấm nút ⬇️; iPhone mở bằng Safari → Chia sẻ → Thêm vào Màn hình chính. Sau khi cài, app chạy được cả khi mất mạng.',
      zh: '可安装到主屏幕：Android 用 Chrome 打开后点 ⬇️；iPhone 用 Safari → 分享 → 添加到主屏幕。安装后离线也能用。',
      fil: 'Mai-install sa home screen: Android sa Chrome pindutin ang ⬇️; iPhone sa Safari → Share → Add to Home Screen. Offline din ito pagkatapos.'
    }
  },
  {
    id: 'contact', screen: 'connect',
    kw: ['lien he', 'gop y', 'bao loi', 'tac gia', 'facebook'],
    a: {
      vi: 'Góp ý hoặc báo câu sai: mở mục “Cài app & góp ý”. Gửi kèm mã câu (ví dụ b15) để sửa nhanh.',
      zh: '意见或报错：打开「安装与反馈」，附上题号（如 b15）会更快修正。',
      fil: 'Feedback o maling tanong: buksan ang “I-install at feedback”. Isama ang code ng tanong (hal. b15).'
    }
  }
];
