/* ============================================================
   Lịch sử cập nhật (changelog) — hiển thị trong màn Cài app & góp ý
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
    v: 'v66 – v70', title: 'Flashcard & từ vựng',
    items: [
      'Flashcard lật 3D: mặt trước chữ Nhật, mặt sau cách đọc + nghĩa',
      'Lật có animation hai chiều, thẻ cao cố định',
      'Thêm 26 từ ghép còn thiếu phiên âm (新基準原付, 雨天時…)',
      'Sửa lỗi phiên âm đè lên dòng chữ'
    ]
  },
  {
    v: 'v71 – v75', title: 'Hai màn mới',
    items: [
      'Các mẫu xe phổ biến: 12 mẫu 50cc và 新基準原付 125cc, link trang hãng',
      'Trang phục khi đi xe: 8 món bắt buộc/nên có + 6 điều không nên',
      'Chuyển hai mục này xuống cuối trang chủ',
      'Ô "Từ vựng quan trọng" cao cố định, không nhảy khi đổi từ'
    ]
  },
  {
    v: 'v76 – v82', title: 'Máy quy đổi tiền',
    items: [
      'Lật thẻ tỷ giá thành máy quy đổi ¥ ↔ ₫',
      'Nút đổi chiều dạng viên thuốc, đồng tiền đang đổi tô đỏ',
      'Tự chèn dấu phân cách nghìn khi nhập',
      'Sửa lỗi bộ gõ tiếng Việt làm nhân đôi số, nhảy con trỏ'
    ]
  },
  {
    v: 'v83 – v84', title: 'Luật & thi thử',
    items: [
      'Thêm bảng vi phạm thường gặp và khung xử phạt 原付',
      'Sửa lỗi kẹt ở câu 47: không sang được câu 48, không nộp được bài',
      'Ô số 47/48 bấm được, chân trang có nút Tiếp',
      'Vuốt ngang để đổi câu khi luyện theo nhóm'
    ]
  },
  {
    v: 'v85 – v91', title: 'Hình minh hoạ câu 47/48',
    items: [
      'Vẽ 12 hình cho 12 tình huống 危険予測',
      'Câu hỏi hình chuyển sang tiếng Nhật, thêm nút Dịch',
      'Thêm mây, nhà cửa, cây cối cho đỡ trống',
      'Sửa vạch qua đường, tim đường, giao lộ, phối cảnh cửa hầm'
    ]
  },
  {
    v: 'v92 – v96', title: 'Rà soát toàn bộ',
    items: [
      'Đọc lại 619 câu + 36 nhận định câu hình',
      'Sửa 6 lỗi luật: b15, t41, c01, n31, b01 và biển 横断禁止',
      'Bản dịch câu hình giữ chỗ sẵn — bật/tắt không đổi kích thước khối',
      'Bấm Dịch, chọn đáp án, lật thẻ, đổi theme — không còn nhảy về đầu trang'
    ]
  },
  {
    v: 'v97 – v99', title: 'Số khẩn cấp',
    items: [
      'Màn Số khẩn cấp: 110, 119, 118, 171, #9110',
      'Đại sứ quán Việt Nam, hotline bảo hộ 24/24, ban lao động, ban giáo dục',
      'Bấm số là gọi luôn, kèm hướng dẫn "khi gọi thì nói gì"',
      'Cập nhật mô tả app: 619 câu, 48 câu trong 30 phút'
    ]
  },
  {
    v: 'v100 – v102', title: 'Lịch sử cập nhật & đồng bộ thao tác',
    items: [
      'Thêm mục Lịch sử cập nhật dạng xổ từng bản trong Cài app & góp ý',
      'Đưa lịch sử cập nhật xuống cuối trang',
      'Lướt đổi câu khi luyện có hiệu ứng trượt giống thẻ flashcard'
    ]
  }
];
