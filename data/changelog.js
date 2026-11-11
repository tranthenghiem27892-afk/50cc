/* ============================================================
   Lịch sử cập nhật (changelog) — hiển thị trong màn Cài app & góp ý
   Đã gộp các đợt nhỏ cho gọn (v104–v119 thành một mục).
   ============================================================ */
window.CHANGELOG = [
  {
    v: 'v1', title: 'Bản đầu tiên',
    items: [
      '278 câu ○× tiếng Nhật, chia 8 nhóm kiến thức',
      'Đề thi thử đúng dạng thật: 46 câu chữ + 2 câu hình, 50 điểm, đậu 45, 30 phút',
      'Lưu tiến độ và lịch sử thi trên máy'
    ]
  },
  {
    v: 'v2 – v20', title: 'Mở rộng kho câu',
    items: [
      'Kho câu tăng 278 → 503 → 619 câu',
      'Giải thích tiếng Việt cho cả đáp án đúng và đáp án sai',
      'Thêm dạng câu hình 危険予測 (2 điểm, 3 nhận định)',
      '62 câu bẫy ngôn ngữ: なければならない, てはならない, なくてもよい…',
      'Cập nhật luật 2025: 新基準原付, 特定小型原付'
    ]
  },
  {
    v: 'v21 – v35', title: 'Tra từ & phiên âm',
    items: [
      'Chạm từ tiếng Nhật bất kỳ để tra nghĩa ngay trong câu',
      '400+ từ vựng có cách đọc hiragana và âm Hán-Việt',
      'Nút あ Phiên âm: bật furigana trên đầu chữ Hán',
      'Nút 🔊 Đọc câu bằng giọng tiếng Nhật có sẵn của máy'
    ]
  },
  {
    v: 'v36 – v50', title: 'Giao diện & tiện ích',
    items: [
      'Giao diện pastel, 8 màu ô chức năng, chế độ tối',
      'Font Be Vietnam Pro tự host — không phụ thuộc Google Fonts',
      '201 câu danh ngôn hiển thị luân phiên',
      'Thẻ tỷ giá JPY → VND với biểu đồ 90 ngày',
      'Mã QR cài app, chia sẻ kết quả thành ảnh, nút cài PWA',
      'Cử chỉ vuốt/back hoạt động đúng như app native'
    ]
  },
  {
    v: 'v51 – v56', title: 'Bản dịch toàn bộ',
    items: [
      'Dịch tay 681 câu hỏi + giải thích sang tiếng Việt',
      'Nút 🌐 Dịch lật thẻ 3D để xem bản dịch',
      'Gắn nhãn "Bản dịch biên soạn" cho câu dịch tay'
    ]
  },
  {
    v: 'v57 – v65', title: 'Sửa cơ chế cập nhật',
    items: [
      'Gắn ?v= vào CSS/JS để ép tải bản mới',
      'Service worker chuyển sang ưu tiên mạng cho HTML',
      'Tự dọn service worker + cache cũ một lần khi lên bản mới',
      'Cảnh báo đỏ nếu CSS trên máy chủ chưa cập nhật'
    ]
  },
  {
    v: 'v66 – v75', title: 'Flashcard, từ vựng & hai màn mới',
    items: [
      'Flashcard lật 3D: mặt trước chữ Nhật, mặt sau cách đọc + nghĩa',
      'Thêm 26 từ ghép còn thiếu phiên âm (新基準原付, 雨天時…)',
      'Các mẫu xe phổ biến: 12 mẫu 50cc và 新基準原付 125cc, link trang hãng',
      'Trang phục khi đi xe: 8 món bắt buộc/nên có + 6 điều không nên',
      'Ô "Từ vựng quan trọng" cao cố định, không nhảy khi đổi từ'
    ]
  },
  {
    v: 'v76 – v84', title: 'Máy quy đổi, bảng phạt & thi thử',
    items: [
      'Lật thẻ tỷ giá thành máy quy đổi ¥ ↔ ₫, tự chèn dấu phân cách nghìn',
      'Sửa lỗi bộ gõ tiếng Việt làm nhân đôi số, nhảy con trỏ',
      'Thêm bảng vi phạm thường gặp và khung xử phạt 原付',
      'Sửa lỗi kẹt ở câu 47: không sang được câu 48, không nộp được bài',
      'Vuốt ngang để đổi câu khi luyện theo nhóm'
    ]
  },
  {
    v: 'v85 – v96', title: 'Hình minh hoạ & rà soát',
    items: [
      'Vẽ 12 hình cho 12 tình huống 危険予測, câu hỏi chuyển sang tiếng Nhật',
      'Sửa vạch qua đường, tim đường, giao lộ, phối cảnh cửa hầm',
      'Đọc lại 619 câu + 36 nhận định, sửa 6 lỗi luật (b15, t41, c01, n31, b01, 横断禁止)',
      'Bản dịch câu hình giữ chỗ sẵn — bật/tắt không đổi kích thước khối',
      'Bấm Dịch, chọn đáp án, lật thẻ, đổi theme — không còn nhảy về đầu trang'
    ]
  },
  {
    v: 'v97 – v103', title: 'Số khẩn cấp & lịch sử cập nhật',
    items: [
      'Màn Số khẩn cấp: 110, 119, 118, 171, #9110, đại sứ quán, hotline bảo hộ',
      'Bấm số là gọi luôn, kèm hướng dẫn "khi gọi thì nói gì"',
      'Thêm mục Lịch sử cập nhật dạng xổ trong Cài app & góp ý',
      'Lướt đổi câu khi luyện có hiệu ứng trượt giống thẻ flashcard'
    ]
  },
  {
    v: 'v104 – v119', title: 'Đa ngôn ngữ & dịch toàn bộ nội dung',
    items: [
      'Bỏ tiếng Hàn — còn Tiếng Việt, 中文, Filipino; chọn ngôn ngữ cạnh nút sáng/tối',
      'Dịch giao diện, 619 câu giải thích, 293 “vì sao sai”, 62 câu ngữ pháp',
      'Dịch số khẩn cấp, bảng phạt, 12 mẫu xe, trang phục, sổ tay, checklist, thủ tục, changelog',
      'Dịch 406 nghĩa từ vựng và 201 danh ngôn',
      'Nút Dịch trong câu hỏi hiển thị theo ngôn ngữ đã chọn'
    ]
  },
  {
    v: 'v120 – v134', title: 'Dịch sâu & dọn giao diện',
    items: [
      'Dịch màn Luật mới, 12 giải thích tình huống minh hoạ',
      'Dịch nhãn Thống kê (streak, mức sẵn sàng), Ngữ pháp, Mẫu xe, thẻ tỷ giá',
      'Ẩn âm Hán-Việt và bản dịch tiếng Việt khi chọn 中文/Filipino',
      'Meta description đổi theo ngôn ngữ'
    ]
  },
  {
    v: 'v135 – v147', title: 'Hoàn tất “vì sao sai” & sửa nút Dịch',
    items: [
      'Dịch 293/293 giải thích “vì sao sai”',
      'Sửa lỗi expTxt: giải thích đúng/sai giờ hiện đúng ngôn ngữ',
      'Nút Dịch không còn lật ra trống; câu hình chỉ hiện giải thích sau khi chọn đủ 3 ý',
      'Dịch nốt màn luyện theo nhóm và nhãn phản hồi'
    ]
  },
  {
    v: 'v148 – v154', title: 'Dịch toàn bộ 619 câu hỏi',
    items: [
      'Dịch 619/619 câu hỏi sang zh và fil (6 đợt)',
      'Nút Dịch hoạt động trở lại: lật thẻ xem bản dịch câu hỏi',
      'Câu chưa dịch tự ẩn nút, không lật ra trống',
      'Bản dịch vẫn ưu tiên tiếng Việt khi chọn Tiếng Việt'
    ]
  },
  {
    v: 'v155 – v156', title: 'Tiền tệ theo ngôn ngữ',
    items: [
      'Gộp changelog v104–v119, rút từ 40 xuống 14 mục',
      'Thẻ tỷ giá và máy đổi tiền đổi đơn vị theo ngôn ngữ: Tiếng Việt → VND, 中文 → CNY, Filipino → PHP',
      'Tỷ giá, biểu đồ 90 ngày và bộ nhớ đệm tách riêng cho từng loại tiền',
      'Đổi ngôn ngữ là tự tải tỷ giá của tiền tệ mới'
    ]
  }
];
