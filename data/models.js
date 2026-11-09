/* ============================================================
   Mẫu xe 原付 tại Nhật — 50cc (đã ngừng sản xuất) và 新基準原付 125cc
   Link trỏ tới trang sản phẩm / danh mục xe chính thức của hãng.
   ============================================================ */
window.MODELS = [
  /* ---------- 新基準原付: 125cc, ≤4,0 kW, đi bằng bằng 原付 ---------- */
  {
    id: 'dio110', brand: 'Honda', group: 'new',
    name: 'ディオ110 Lite', romaji: 'Dio 110 Lite',
    cc: '109cc', power: '≤ 4,0 kW', price: '239.800 ¥',
    type: 'Tay ga · bánh 14 inch',
    desc: 'Bản giới hạn công suất của Dio 110 để đủ điều kiện 新基準原付. Sàn để chân phẳng, cốp dưới yên rộng — mẫu thực dụng nhất cho đi chợ và đi làm.',
    specs: ['Sàn phẳng, chở được đồ cồng kềnh', 'Bánh 14 inch chạy êm', 'Trọng lượng ~100 kg'],
    fit: 'Người cần xe thực dụng hằng ngày, đi quãng ngắn–trung.',
    note: 'Bản Lite bị giới hạn điện tử ở 4,0 kW — độ lại là mất tính hợp pháp.',
    url: 'https://www.honda.co.jp/Dio110/'
  },
  {
    id: 'cub110', brand: 'Honda', group: 'new',
    name: 'スーパーカブ110 Lite', romaji: 'Super Cub 110 Lite',
    cc: '109cc', power: '≤ 4,0 kW', price: '341.000 ¥',
    type: 'Xe số 4 cấp',
    desc: 'Cub 110 bản giới hạn công suất. Máy 110cc chạy nhàn, mô-men tốt ở vòng tua thấp nên leo dốc khỏe hơn hẳn 50cc.',
    specs: ['Xe số 4 cấp, bền', 'Bánh 17 inch', 'Giữ giá khi bán lại'],
    fit: 'Người thích xe số, đi đường dài, cần độ bền cao.',
    note: 'Giá cao nhất nhóm nhưng bán lại được giá — tính tổng chi phí thì không đắt.',
    url: 'https://www.honda.co.jp/SUPERCUB/'
  },
  {
    id: 'crosscub110', brand: 'Honda', group: 'new',
    name: 'クロスカブ110 Lite', romaji: 'Cross Cub 110 Lite',
    cc: '109cc', power: '≤ 4,0 kW', price: '~ 360.000 ¥',
    type: 'Xe số · phong cách địa hình',
    desc: 'Phiên bản gầm cao, lốp gai của dòng Cub. Chạy đường xấu, đường đất tốt hơn hẳn xe ga bánh nhỏ.',
    specs: ['Gầm cao, lốp gai', 'Bánh 14 inch', 'Chở được đồ trên giá sau'],
    fit: 'Người ở vùng nông thôn, đường xấu, hay đi xa.',
    note: 'Yên cao hơn Cub thường — bạn thấp người nên ngồi thử trước.',
    url: 'https://www.honda.co.jp/CROSSCUB/'
  },
  {
    id: 'jogone', brand: 'Yamaha', group: 'new',
    name: 'JOG ONE', romaji: 'Jog One',
    cc: '124cc', power: '≤ 4,0 kW', price: '259.600 ¥',
    type: 'Tay ga · 95 kg',
    desc: 'Mẫu 新基準原付 hoàn toàn mới của Yamaha (ra mắt 2026), thiết kế từ đầu cho chuẩn 4,0 kW chứ không phải cắt bớt từ xe 125.',
    specs: ['Cốp dưới yên 21,3 L — vừa mũ full-face + áo mưa', 'Có ổ USB (tùy chọn)', 'Trọng lượng 95 kg'],
    fit: 'Người muốn một chiếc xe ga mới, cốp rộng, không phải xe cũ.',
    note: 'Nặng hơn 50cc khoảng 15–20 kg — dắt xe và dựng chân chống giữa sẽ mệt hơn.',
    url: 'https://www.yamaha-motor.co.jp/mc/lineup/'
  },
  {
    id: 'address125', brand: 'Suzuki', group: 'new',
    name: 'アドレス125 ベース (dự kiến)', romaji: 'Address 125 based',
    cc: '124cc', power: '≤ 4,0 kW (dự kiến)', price: '~ 280.500 ¥',
    type: 'Tay ga',
    desc: 'Suzuki được cho là sẽ ra mẫu 新基準原付 dựa trên Address 125 — bánh to, cốp rộng, chạy êm. Chưa có lịch chính thức.',
    specs: ['Bánh lớn, chạy êm', 'Cốp dưới yên rộng', 'Thông tin chưa công bố chính thức'],
    fit: 'Người thích xe Suzuki, có thể chờ hoặc xem xe cũ.',
    note: 'Đây là thông tin dự kiến từ báo chí xe — kiểm tra trang Suzuki trước khi mua.',
    url: 'https://www1.suzuki.co.jp/motor/lineup/'
  },

  /* ---------- 50cc: đã ngừng sản xuất 10/2025 ---------- */
  {
    id: 'cub50', brand: 'Honda', group: 'old',
    name: 'スーパーカブ50', romaji: 'Super Cub 50',
    cc: '49cc', power: '—', price: 'xe cũ 5–15 man',
    type: 'Xe số 4 cấp',
    desc: 'Huyền thoại từ 1958. Máy bền, phụ tùng rẻ — nhưng 50cc đã ngừng sản xuất từ 10/2025.',
    specs: ['Tiết kiệm ~60–70 km/L', 'Bánh 17 inch', 'Phụ tùng dễ kiếm hiện tại'],
    fit: 'Người cần xe rẻ, bền, chấp nhận xe cũ.',
    note: 'Phụ tùng 50cc sẽ khan dần sau 2030 — cân nhắc khi mua để đi lâu dài.',
    url: 'https://www.honda.co.jp/SUPERCUB/'
  },
  {
    id: 'giorno', brand: 'Honda', group: 'old',
    name: 'ジョルノ', romaji: 'Giorno',
    cc: '49cc', power: '—', price: 'xe cũ 6–16 man',
    type: 'Tay ga',
    desc: 'Thiết kế cổ điển châu Âu, yên thấp, tư thế ngồi thoải mái. Rất phổ biến ở thành phố.',
    specs: ['Yên thấp, dễ chống chân', 'Móc treo tiện', 'Đèn pha tròn'],
    fit: 'Người thích phong cách nhẹ nhàng, đi phố.',
    note: 'Xe cũ giữ giá; kiểm tra kỹ giấy tờ và tình trạng máy.',
    url: 'https://www.honda.co.jp/50-Scooter/'
  },
  {
    id: 'zoomer', brand: 'Honda', group: 'old',
    name: 'ズーマー', romaji: 'Zoomer',
    cc: '49cc', power: '—', price: 'xe cũ 7–18 man',
    type: 'Tay ga',
    desc: 'Khung lộ, bánh to bản, thiết kế cá tính. Nhiều người độ lại theo phong cách riêng.',
    specs: ['Bánh 10 inch bản rộng', 'Không có cốp', 'Khung thép chắc'],
    fit: 'Bạn trẻ thích nổi bật, hay độ xe.',
    note: 'Không hợp để chở đồ — gần như không có chỗ cất.',
    url: 'https://www.honda.co.jp/ZOOMER/'
  },
  {
    id: 'jog', brand: 'Yamaha', group: 'old',
    name: 'ジョグ', romaji: 'Jog',
    cc: '49cc', power: '—', price: 'xe cũ 5–12 man',
    type: 'Tay ga',
    desc: 'Dòng xe thể thao của Yamaha, tăng tốc nhanh, thân xe gọn. Nhiều đời qua các năm.',
    specs: ['Động cơ 1 xy-lanh, làm mát bằng gió', 'Thân xe gọn', 'Phụ tùng dễ kiếm'],
    fit: 'Người thích cảm giác lái nhanh, nam giới trẻ.',
    note: 'Đời cũ tem xe đơn giản — kiểm tra giấy tờ kỹ khi mua cũ.',
    url: 'https://www.yamaha-motor.co.jp/mc/lineup/jog/'
  },
  {
    id: 'vino', brand: 'Yamaha', group: 'old',
    name: 'ビーノ', romaji: 'Vino',
    cc: '49cc', power: '—', price: 'xe cũ 8–18 man',
    type: 'Tay ga',
    desc: 'Thiết kế retro dễ thương, yên tròn, nhiều màu pastel. Được các bạn nữ ưa chuộng.',
    specs: ['Yên thấp 720 mm', 'Cốp nhỏ để đồ lặt vặt', 'Đèn pha tròn'],
    fit: 'Người thích kiểu dáng mềm mại, đi trong phố.',
    note: 'Giữ giá khá tốt vì được ưa chuộng.',
    url: 'https://www.yamaha-motor.co.jp/mc/lineup/vino/'
  },
  {
    id: 'lets', brand: 'Suzuki', group: 'old',
    name: 'レッツ', romaji: "Let's",
    cc: '49cc', power: '—', price: 'xe cũ 5–12 man',
    type: 'Tay ga',
    desc: 'Một trong những xe 50cc nhẹ nhất, cốp dưới yên rộng bất ngờ, dễ điều khiển với người mới.',
    specs: ['Cốp ~20 L', 'Trọng lượng dưới 80 kg', 'Tay lái nhẹ'],
    fit: 'Người mới, sinh viên, đi chợ hằng ngày.',
    note: 'Bánh nhỏ — giảm tốc khi qua gờ giảm tốc.',
    url: 'https://www1.suzuki.co.jp/motor/lineup/'
  },
  {
    id: 'address50', brand: 'Suzuki', group: 'old',
    name: 'アドレスV50', romaji: 'Address V50',
    cc: '49cc', power: '—', price: 'xe cũ 6–14 man',
    type: 'Tay ga',
    desc: 'Bánh 12 inch, chạy êm và ổn định hơn nhóm bánh nhỏ. Cốp rộng, phù hợp đi đường dài.',
    specs: ['Bánh 12 inch', 'Cốp dưới yên rộng', 'Phanh đĩa trước (một số đời)'],
    fit: 'Người đi quãng dài, đường hơi xấu.',
    note: 'Nặng hơn nhóm còn lại — bạn nhỏ con nên thử dắt trước.',
    url: 'https://www1.suzuki.co.jp/motor/lineup/'
  }
];

window.MODEL_BRANDS = {
  Honda: { url: 'https://www.honda.co.jp/motor/', label: 'Xem trên Honda' },
  Yamaha: { url: 'https://www.yamaha-motor.co.jp/mc/lineup/', label: 'Xem trên Yamaha' },
  Suzuki: { url: 'https://www1.suzuki.co.jp/motor/lineup/', label: 'Xem trên Suzuki' }
};
