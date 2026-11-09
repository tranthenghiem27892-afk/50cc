/* ============================================================
   Đợt 5 — bù các từ ghép còn thiếu phiên âm (fu-ri-ga-na)
   ============================================================ */
(function () {
  var V = window.VOCAB || (window.VOCAB = {});
  Object.assign(V, {
    '新基準原付': { r: 'しんきじゅんげんつき', m: '原付 tiêu chuẩn mới (≤125cc và ≤4,0 kW), lái bằng bằng 原付.' },
    '特定小型原付': { r: 'とくていこがたげんつき', m: 'Xe điện cỡ nhỏ (≤20 km/h) — không cần bằng, từ 16 tuổi.' },
    '一方通行': { r: 'いっぽうつうこう', m: 'Đường một chiều.' },
    '一方': { r: 'いっぽう', m: 'Một mặt, một phía; (〜一方で) trong khi đó.' },
    '雨天': { r: 'うてん', m: 'Trời mưa.' },
    '雨天時': { r: 'うてんじ', m: 'Khi trời mưa.' },
    '晴天時': { r: 'せいてんじ', m: 'Khi trời nắng, trời quang.' },
    '時間': { r: 'じかん', m: 'Thời gian, giờ.' },
    '自由': { r: 'じゆう', m: 'Tự do, thoải mái.' },
    '大丈夫': { r: 'だいじょうぶ', m: 'Không sao, ổn.' },
    '二次事故': { r: 'にじじこ', m: 'Tai nạn thứ cấp (xe sau đâm vào hiện trường).' },
    '国道': { r: 'こくどう', m: 'Quốc lộ.' },
    '無理': { r: 'むり', m: 'Không thể, quá sức — 無理に = cố quá.' },
    '反射材料': { r: 'はんしゃざいりょう', m: 'Vật liệu phản quang.' },
    '手数料': { r: 'てすうりょう', m: 'Lệ phí, phí thủ tục.' },
    '小回り': { r: 'こまわり', m: 'Rẽ tắt, quay đầu nhỏ (小回り右折).' },
    '文章問題': { r: 'ぶんしょうもんだい', m: 'Câu hỏi dạng chữ (không phải câu hình).' },
    '合計': { r: 'ごうけい', m: 'Tổng cộng.' },
    '小問': { r: 'しょうもん', m: 'Câu hỏi nhỏ, ý nhỏ trong một câu.' },
    '同時': { r: 'どうじ', m: 'Cùng lúc, đồng thời.' },
    '時計回り': { r: 'とけいまわり', m: 'Theo chiều kim đồng hồ.' },
    '三角形': { r: 'さんかくけい', m: 'Hình tam giác.' },
    '四角形': { r: 'しかくけい', m: 'Hình tứ giác, hình vuông.' },
    '標識板': { r: 'ひょうしきばん', m: 'Tấm biển báo.' },
    '路側帯': { r: 'ろそくたい', m: 'Dải lề đường dành cho người đi bộ.' }
  });
})();
