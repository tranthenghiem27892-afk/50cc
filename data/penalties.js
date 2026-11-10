/* ============================================================
   Lỗi thường gặp & khung xử phạt cho 原付 (50cc / 新基準原付)
   Số liệu: 警視庁 — bảng 反則金 và 点数, cập nhật 2026/04/01
   ============================================================ */
window.PENALTIES = [
  { ja: '速度超過（15km/h未満）', vi: 'Quá tốc độ dưới 15 km/h', fine: 6000, points: 1 },
  { ja: '速度超過（15〜20km/h未満）', vi: 'Quá tốc độ 15–20 km/h', fine: 7000, points: 1 },
  { ja: '速度超過（20〜25km/h未満）', vi: 'Quá tốc độ 20–25 km/h', fine: 10000, points: 2 },
  { ja: '速度超過（25〜30km/h未満）', vi: 'Quá tốc độ 25–30 km/h', fine: 12000, points: 3 },
  { ja: '信号無視（赤色）', vi: 'Vượt đèn đỏ', fine: 6000, points: 2 },
  { ja: '指定場所一時不停止', vi: 'Không dừng ở biển 止まれ / vạch dừng', fine: 5000, points: 2 },
  { ja: '通行禁止違反', vi: 'Đi vào đường cấm', fine: 5000, points: 2 },
  { ja: '通行区分違反', vi: 'Chạy sai làn đường', fine: 6000, points: 2 },
  { ja: '追越し違反', vi: 'Vượt xe ở nơi cấm vượt', fine: 6000, points: 2 },
  { ja: '交差点右左折方法違反', vi: 'Rẽ phải kiểu 小回り (sai 二段階右折)', fine: 3000, points: 1 },
  { ja: '携帯電話使用（保持）', vi: 'Vừa lái vừa cầm điện thoại', fine: 12000, points: 3 },
  { ja: '乗車積載方法違反', vi: 'Chở 2 người / chở đồ sai quy cách', fine: 5000, points: 1 },
  { ja: '無灯火', vi: 'Không bật đèn khi trời tối', fine: 5000, points: 1 },
  { ja: '合図不履行', vi: 'Không xi-nhan khi rẽ, chuyển làn', fine: 5000, points: 1 },
  { ja: '整備不良（尾灯等）', vi: 'Đèn, còi, thiết bị chiếu sáng hỏng', fine: 5000, points: 1 },
  { ja: '整備不良（制動装置等）', vi: 'Phanh hỏng hoặc không ăn', fine: 6000, points: 2 },
  { ja: '安全運転義務違反', vi: 'Lái không an toàn, gây nguy hiểm', fine: 6000, points: 2 },
  { ja: '横断歩行者等妨害', vi: 'Không nhường người đi bộ ở vạch', fine: 6000, points: 2 },
  { ja: '免許証不携帯', vi: 'Không mang theo bằng lái', fine: 3000, points: 0 },
  { ja: '乗車用ヘルメット着用義務違反', vi: 'Không đội mũ bảo hiểm', fine: 0, points: 1, note: 'Không có 反則金 — bị phạt tới 50.000 ¥ qua tòa' }
];

/* Lỗi nặng: không còn là 反則金, chuyển sang truy tố hình sự */
window.PENALTIES_HEAVY = [
  { ja: '酒気帯び運転（0,15〜0,25mg未満）', vi: 'Trong người có cồn (mức nhẹ)', punish: '3 năm tù hoặc 500.000 ¥', points: '13 điểm — đình chỉ 90 ngày' },
  { ja: '酒気帯び運転（0,25mg以上）', vi: 'Trong người có cồn (mức nặng)', punish: '3 năm tù hoặc 500.000 ¥', points: '25 điểm — tước bằng' },
  { ja: '酒酔い運転', vi: 'Say rượu không lái nổi', punish: '5 năm tù hoặc 1.000.000 ¥', points: '35 điểm — tước bằng' },
  { ja: '無免許運転', vi: 'Không có bằng lái', punish: '3 năm tù hoặc 500.000 ¥', points: '25 điểm — tước bằng' },
  { ja: '無保険運行（自賠責切れ）', vi: 'Hết bảo hiểm bắt buộc', punish: '1 năm tù hoặc 500.000 ¥', points: '6 điểm + tiền phạt chậm nộp' },
  { ja: '救護義務違反（ひき逃げ）', vi: 'Gây tai nạn rồi bỏ chạy', punish: '10 năm tù hoặc 1.000.000 ¥', points: 'Xử lý hình sự, tước bằng' }
];

window.PENALTY_NOTES = [
  '反則金 là tiền phạt hành chính khi bị lập biên bản (青切符). Nộp trong thời hạn thì không bị truy tố hình sự.',
  'Không nộp 反則金 đúng hạn → chuyển sang tòa, thành án hình sự và mức tiền cao hơn nhiều.',
  'Điểm (点数) cộng dồn: 6 điểm → đình chỉ bằng 30 ngày; 15 điểm → tước bằng.',
  'Người mới lấy bằng trong 1 năm: chỉ 3 điểm là phải đi 初心者講習.',
  '原付 giới hạn 30 km/h — nên "quá 15 km/h" nghĩa là chạy 45 km/h.'
];
