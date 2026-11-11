/* ============================================================
   Bản dịch Sổ tay tình huống + Checklist — zh / fil
   ============================================================ */
window.SITUATIONS_I18N = {
  police: {
    zh: { title: '被警察拦下', tip: '熄火、下车、双手放在坐垫上。保持冷静礼貌——不要争辩。',
      phrases: ['不好意思，有什么问题吗？', '这是驾照和强制保险证。', '我不太懂日语。', '请再说慢一点。', '我会注意，今后会遵守。'] },
    fil: { title: 'Hininto ng pulis', tip: 'Patayin ang makina, bumaba, ilagay ang kamay sa upuan. Kalmado at magalang — huwag makipagtalo.',
      phrases: ['Pasensya na, may problema ba?', 'Ito ang lisensya at compulsory insurance.', 'Hindi ako masyadong marunong ng Hapon.', 'Pakiulit nang dahan-dahan.', 'Mag-iingat ako. Susunod ako mula ngayon.'] }
  },
  parking: {
    zh: { title: '违章停车被罚', tip: '车上贴黄纸＝已被开单。不要撕掉，要按期缴纳。',
      phrases: ['这张纸是什么？', '这是违章停车的罚单吗？', '在哪里缴罚款？', '截止日期是什么时候？', '我想去说明情况。'] },
    fil: { title: 'Na-multa sa paradahan', tip: 'May dilaw na papel sa motor = naisyuhan. Huwag punitin, bayaran sa takdang oras.',
      phrases: ['Ano ang papel na ito?', 'Ito ba ang multa sa parking?', 'Saan ako magbabayad?', 'Kailan ang deadline?', 'Gusto kong pumunta para magpaliwanag.'] }
  },
  accident: {
    zh: { title: '轻微碰撞', tip: '立即停车，先救人，有人受伤打 110。拍现场照片。',
      phrases: ['你没事吧？受伤了吗？', '我马上报警。', '请叫救护车。', '我会联系保险公司。', '请给我联系方式。'] },
    fil: { title: 'Magaan na banggaan', tip: 'Huminto agad, unahin ang tao, tumawag ng 110 kung may sugatan. Kunan ng litrato.',
      phrases: ['Okay ka lang? Nasugatan ka ba?', 'Tatawag ako ng pulis agad.', 'Pakitawag ang ambulansya.', 'Tatawagan ko ang insurance.', 'Pakisuyo ang contact info.'] }
  },
  lost: {
    zh: { title: '驾照丢失', tip: '先报警拿 遺失物届，再去 免許センター 申请补发（再交付）。',
      phrases: ['我的驾照丢了。', '我想办补发。', '需要哪些材料？', '我已经报了失。', '手续费多少？'] },
    fil: { title: 'Nawala ang lisensya', tip: 'Mag-report sa pulis para sa 遺失物届, tapos sa 免許センター para sa 再交付.',
      phrases: ['Nawala ang lisensya ko.', 'Gusto kong mag-apply ng kapalit.', 'Anong dokumento ang kailangan?', 'Naka-report na ako.', 'Magkano ang bayad?'] }
  },
  address: {
    zh: { title: '搬家、改地址', tip: '在法定期限内改驾照地址；带上新的 在留カード。',
      phrases: ['我搬家了，想改地址。', '新地址在这里。', '在留卡也换了新的。', '今天能当场拿到吗？', '手续免费吗？'] },
    fil: { title: 'Paglipat ng bahay, palit address', tip: 'Palitan ang address sa lisensya sa loob ng takdang panahon; dalhin ang bagong 在留カード.',
      phrases: ['Naglipat ako ng bahay. Gusto kong palitan ang address.', 'Ito ang bagong address.', 'Napalitan na rin ang residence card.', 'Makukuha ba agad ngayon?', 'Libre ba ang proseso?'] }
  },
  gas: {
    zh: { title: '加油', tip: '原付 用普通汽油（レギュラー）。短语就够。',
      phrases: ['请加满普通汽油。', '我自己加。', '一升多少钱？', '我付现金。', '谢谢。'] },
    fil: { title: 'Pagpa-gas', tip: 'Regular na gasolina (レギュラー) ang 原付. Maikling pangungusap lang.',
      phrases: ['Pakipuno ng regular.', 'Ako na ang maglalagay.', 'Magkano kada litro?', 'Cash ako magbabayad.', 'Salamat.'] }
  },
  repair: {
    zh: { title: '车坏、爆胎', tip: '说清现象，不用长篇解释。走不了就叫 ロードサービス。',
      phrases: ['轮胎爆了。', '发动机打不着。', '能帮我修吗？', '多少钱？', '今天能修好吗？'] },
    fil: { title: 'Sira ang motor, flat na gulong', tip: 'Sabihin ang sintomas, hindi kailangang mahaba. Kung hindi kaya, tumawag ng ロードサービス.',
      phrases: ['Flat ang gulong.', 'Ayaw mag-start ng makina.', 'Puwede ninyo bang ayusin?', 'Magkano?', 'Matatapos ba ngayon?'] }
  },
  center: {
    zh: { title: '在考试中心 / 原付講習', tip: '注意听简短指示。不懂就举手再问。',
      phrases: ['不好意思，请再说一次。', '这是什么意思？', '考试几点开始？', '洗手间在哪里？', '谢谢你的帮助。'] },
    fil: { title: 'Sa exam center / 原付 seminar', tip: 'Makinig sa maiikling tagubilin. Kung hindi maintindihan, itaas ang kamay.',
      phrases: ['Pasensya, pakiulit.', 'Ano ang ibig sabihin nito?', 'Anong oras magsisimula ang exam?', 'Nasaan ang CR?', 'Salamat sa tulong.'] }
  }
};

window.CHECKLIST_I18N = {
  zh: [
    '满 16 岁', '已在驾校报名 原付講習', '有带本籍的 住民票（在市役所办理）', '有有效的 在留カード',
    '照片 3×2.4cm（2 张）', '现金 ~1,600 日元考试 + ~2,350 日元发证', '已练完题库且模拟考试 ≥45 分',
    '知道 免許センター 的路线和营业时间', '拿到驾照后：购买 自賠責 强制保险', '在市役所登记 原付 车牌',
    '有合格且合头的头盔', '已掌握 30km/h 和二段式右转'
  ],
  fil: [
    'Sapat na 16 taong gulang', 'Nakapag-enroll ng 原付 seminar sa driving school', 'May 住民票 na may 本籍 (sa 市役所)', 'May valid na 在留カード',
    'Litrato 3×2.4cm (2 piraso)', 'Cash ~¥1,600 exam + ~¥2,350 lisensya', 'Natapos ang buong bank at ≥45 sa mock exam',
    'Alam ang ruta at oras ng 免許センター', 'Pagkatapos ng lisensya: kumuha ng 自賠責', 'I-register ang 原付 plate sa 市役所',
    'May helmet na pasado at tamang sukat', 'Alam ang 30km/h at two-step right turn'
  ]
};
