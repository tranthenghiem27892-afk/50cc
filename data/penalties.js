/* ============================================================
   Lỗi thường gặp & khung xử phạt 原付 — vi / zh / fil
   Số liệu: 警視庁 (bảng 反則金 & 点数, cập nhật 2026/04)
   ============================================================ */
window.PENALTIES = [
  { ja: '速度超過（15km/h未満）', vi: 'Quá tốc độ dưới 15 km/h', zh: '超速不足 15km/h', fil: 'Sobra sa bilis <15 km/h', fine: 6000, points: 1 },
  { ja: '速度超過（15〜20km/h未満）', vi: 'Quá tốc độ 15–20 km/h', zh: '超速 15–20km/h', fil: 'Sobra sa bilis 15–20 km/h', fine: 7000, points: 1 },
  { ja: '速度超過（20〜25km/h未満）', vi: 'Quá tốc độ 20–25 km/h', zh: '超速 20–25km/h', fil: 'Sobra sa bilis 20–25 km/h', fine: 10000, points: 2 },
  { ja: '速度超過（25〜30km/h未満）', vi: 'Quá tốc độ 25–30 km/h', zh: '超速 25–30km/h', fil: 'Sobra sa bilis 25–30 km/h', fine: 12000, points: 3 },
  { ja: '信号無視（赤色）', vi: 'Vượt đèn đỏ', zh: '闯红灯', fil: 'Lumampas sa pulang ilaw', fine: 6000, points: 2 },
  { ja: '指定場所一時不停止', vi: 'Không dừng ở biển 止まれ', zh: '未在停车标志前停车', fil: 'Hindi tumigil sa stop sign', fine: 5000, points: 2 },
  { ja: '通行禁止違反', vi: 'Đi vào đường cấm', zh: '进入禁行道路', fil: 'Pumasok sa bawal na daan', fine: 5000, points: 2 },
  { ja: '通行区分違反', vi: 'Chạy sai làn đường', zh: '不按规定车道行驶', fil: 'Maling linya', fine: 6000, points: 2 },
  { ja: '追越し違反', vi: 'Vượt xe ở nơi cấm vượt', zh: '违规超车', fil: 'Bawal na pag-overtake', fine: 6000, points: 2 },
  { ja: '交差点右左折方法違反', vi: 'Rẽ phải kiểu 小回り (sai 二段階右折)', zh: '右转方式违规（小转弯）', fil: 'Mali ang paraan ng pagliko', fine: 3000, points: 1 },
  { ja: '携帯電話使用（保持）', vi: 'Vừa lái vừa cầm điện thoại', zh: '驾车时手持手机', fil: 'Hawak ang cellphone habang nagmamaneho', fine: 12000, points: 3 },
  { ja: '乗車積載方法違反', vi: 'Chở 2 người / chở đồ sai quy cách', zh: '违规载人或载物', fil: 'Mali ang pagkarga o pag-angkas', fine: 5000, points: 1 },
  { ja: '無灯火', vi: 'Không bật đèn khi trời tối', zh: '夜间未开灯', fil: 'Walang ilaw sa gabi', fine: 5000, points: 1 },
  { ja: '合図不履行', vi: 'Không xi-nhan khi rẽ, chuyển làn', zh: '转弯未打转向灯', fil: 'Hindi nag-signal', fine: 5000, points: 1 },
  { ja: '整備不良（尾灯等）', vi: 'Đèn, còi, thiết bị chiếu sáng hỏng', zh: '灯光、喇叭故障', fil: 'Sira ang ilaw o busina', fine: 5000, points: 1 },
  { ja: '整備不良（制動装置等）', vi: 'Phanh hỏng hoặc không ăn', zh: '刹车故障', fil: 'Sira ang preno', fine: 6000, points: 2 },
  { ja: '安全運転義務違反', vi: 'Lái không an toàn, gây nguy hiểm', zh: '违反安全驾驶义务', fil: 'Hindi safe ang pagmamaneho', fine: 6000, points: 2 },
  { ja: '横断歩行者等妨害', vi: 'Không nhường người đi bộ ở vạch', zh: '妨碍行人过街', fil: 'Hindi nagbigay sa pedestrian', fine: 6000, points: 2 },
  { ja: '免許証不携帯', vi: 'Không mang theo bằng lái', zh: '未携带驾照', fil: 'Walang dalang lisensya', fine: 3000, points: 0 },
  { ja: '乗車用ヘルメット着用義務違反', vi: 'Không đội mũ bảo hiểm', zh: '未戴头盔', fil: 'Walang helmet', fine: 0, points: 1,
    note: { vi: 'Không có 反則金 — bị phạt tới 50.000 ¥ qua tòa', zh: '没有反則金 — 可能被处以最高 5 万日元罚金', fil: 'Walang 反則金 — multa hanggang ¥50,000 sa korte' } }
];

window.PENALTIES_HEAVY = [
  { ja: '酒気帯び運転（0,15〜0,25mg未満）', vi: 'Trong người có cồn (mức nhẹ)', zh: '酒后驾驶（轻度）', fil: 'May alkohol (magaan)',
    punish: { vi: '3 năm tù hoặc 500.000 ¥', zh: '3 年以下有期徒刑或 50 万日元罚金', fil: '3 taon pagkakabilanggo o ¥500,000' },
    points: { vi: '13 điểm — đình chỉ 90 ngày', zh: '13 分 — 停驾 90 天', fil: '13 puntos — 90 araw suspensyon' } },
  { ja: '酒気帯び運転（0,25mg以上）', vi: 'Trong người có cồn (mức nặng)', zh: '酒后驾驶（重度）', fil: 'May alkohol (mabigat)',
    punish: { vi: '3 năm tù hoặc 500.000 ¥', zh: '3 年以下有期徒刑或 50 万日元罚金', fil: '3 taon pagkakabilanggo o ¥500,000' },
    points: { vi: '25 điểm — tước bằng', zh: '25 分 — 吊销驾照', fil: '25 puntos — revoke' } },
  { ja: '酒酔い運転', vi: 'Say rượu không lái nổi', zh: '醉酒驾驶', fil: 'Lasing',
    punish: { vi: '5 năm tù hoặc 1.000.000 ¥', zh: '5 年以下有期徒刑或 100 万日元罚金', fil: '5 taon pagkakabilanggo o ¥1,000,000' },
    points: { vi: '35 điểm — tước bằng', zh: '35 分 — 吊销驾照', fil: '35 puntos — revoke' } },
  { ja: '無免許運転', vi: 'Không có bằng lái', zh: '无证驾驶', fil: 'Walang lisensya',
    punish: { vi: '3 năm tù hoặc 500.000 ¥', zh: '3 年以下有期徒刑或 50 万日元罚金', fil: '3 taon pagkakabilanggo o ¥500,000' },
    points: { vi: '25 điểm — tước bằng', zh: '25 分 — 吊销驾照', fil: '25 puntos — revoke' } },
  { ja: '無保険運行（自賠責切れ）', vi: 'Hết bảo hiểm bắt buộc', zh: '未投保强制险', fil: 'Walang compulsory insurance',
    punish: { vi: '1 năm tù hoặc 500.000 ¥', zh: '1 年以下有期徒刑或 50 万日元罚金', fil: '1 taon pagkakabilanggo o ¥500,000' },
    points: { vi: '6 điểm + tiền phạt chậm nộp', zh: '6 分 + 滞纳金', fil: '6 puntos + multa sa huli' } },
  { ja: '救護義務違反（ひき逃げ）', vi: 'Gây tai nạn rồi bỏ chạy', zh: '肇事逃逸', fil: 'Hit-and-run',
    punish: { vi: '10 năm tù hoặc 1.000.000 ¥', zh: '10 年以下有期徒刑或 100 万日元罚金', fil: '10 taon pagkakabilanggo o ¥1,000,000' },
    points: { vi: 'Xử lý hình sự, tước bằng', zh: '刑事处罚、吊销驾照', fil: 'Kriminal na kaso, revoke' } }
];

window.PENALTY_NOTES = [
  { vi: '反則金 là tiền phạt hành chính khi bị lập biên bản (青切符). Nộp trong thời hạn thì không bị truy tố hình sự.',
    zh: '反則金是被开单（青切符）时的行政罚款。按期缴纳则不会被追究刑事责任。',
    fil: 'Ang 反則金 ay administrative fine kapag naisyuhan ng 青切符. Kung babayaran sa takdang oras, walang criminal case.' },
  { vi: 'Không nộp 反則金 đúng hạn → chuyển sang tòa, thành án hình sự và mức tiền cao hơn nhiều.',
    zh: '逾期不缴 → 移交法院，成为刑事案件，金额高得多。',
    fil: 'Hindi nagbayad sa takdang oras → dadalhin sa korte, criminal case at mas malaking multa.' },
  { vi: 'Điểm (点数) cộng dồn: 6 điểm → đình chỉ bằng 30 ngày; 15 điểm → tước bằng.',
    zh: '分数（点数）累计：6 分 → 停驾 30 天；15 分 → 吊销驾照。',
    fil: 'Puntos (点数): 6 puntos → 30 araw suspensyon; 15 puntos → revoke.' },
  { vi: 'Người mới lấy bằng trong 1 năm: chỉ 3 điểm là phải đi 初心者講習.',
    zh: '取得驾照 1 年内：仅 3 分就须参加 初心者講習。',
    fil: 'Bagong lisensya sa loob ng 1 taon: 3 puntos lang ay kailangan ng 初心者講習.' },
  { vi: '原付 giới hạn 30 km/h — nên "quá 15 km/h" nghĩa là chạy 45 km/h.',
    zh: '原付限速 30km/h — 所以「超速 15」就是跑到 45km/h。',
    fil: 'Limit ng 原付 ay 30 km/h — kaya “sobra 15” ay 45 km/h.' }
];
