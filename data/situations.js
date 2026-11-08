/* ============================================================
   Sổ tay tình huống — câu tiếng Nhật dùng ngay
   ============================================================ */
window.SITUATIONS = [
  {
    id: 'police', icon: '🚓', vi: 'Bị cảnh sát dừng xe',
    tip: 'Tắt máy, xuống xe, để tay lên yên xe. Luôn bình tĩnh và lịch sự — đừng cãi.',
    phrases: [
      { ja: 'すみません。何か問題がありましたか。', r: 'sumimasen. nanika mondai ga arimashita ka', vi: 'Xin lỗi, có vấn đề gì ạ?' },
      { ja: '免許証と自賠責保険証です。', r: 'menkyoshō to jibaiseki hokenshō desu', vi: 'Đây là bằng lái và giấy bảo hiểm bắt buộc.' },
      { ja: '日本語があまり分かりません。', r: 'nihongo ga amari wakarimasen', vi: 'Tôi không hiểu tiếng Nhật lắm.' },
      { ja: 'もう一度、ゆっくり言ってください。', r: 'mō ichido, yukkuri itte kudasai', vi: 'Xin nói lại chậm hơn một lần nữa.' },
      { ja: '気をつけます。今後は守ります。', r: 'ki o tsukemasu. kongo wa mamorimasu', vi: 'Tôi sẽ chú ý. Từ giờ sẽ tuân thủ.' }
    ]
  },
  {
    id: 'parking', icon: '🅿️', vi: 'Bị phạt đỗ xe (駐車違反)',
    tip: 'Có tờ giấy vàng dán xe = đã bị ghi biên bản. Không xé bỏ, phải nộp phạt đúng hạn.',
    phrases: [
      { ja: 'この紙は何ですか。', r: 'kono kami wa nan desu ka', vi: 'Tờ giấy này là gì ạ?' },
      { ja: '駐車違反の切符ですね。', r: 'chūsha ihan no kippu desu ne', vi: 'Đây là biên bản phạt đỗ xe đúng không?' },
      { ja: 'どこで払えばいいですか。', r: 'doko de haraeba ii desu ka', vi: 'Tôi nộp phạt ở đâu?' },
      { ja: '締め切りはいつですか。', r: 'shimekiri wa itsu desu ka', vi: 'Hạn cuối là khi nào?' },
      { ja: '出頭して話をしたいです。', r: 'shuttō shite hanashi o shitai desu', vi: 'Tôi muốn đến trình diện để giải trình.' }
    ]
  },
  {
    id: 'accident', icon: '💥', vi: 'Va chạm nhẹ',
    tip: 'Dừng xe ngay, cứu người trước, gọi 110 nếu có người bị thương. Chụp ảnh hiện trường.',
    phrases: [
      { ja: '大丈夫ですか。けがはありませんか。', r: 'daijōbu desu ka. kega wa arimasen ka', vi: 'Bạn có sao không? Có bị thương không?' },
      { ja: 'すぐに警察を呼びます。', r: 'sugu ni keisatsu o yobimasu', vi: 'Tôi gọi cảnh sát ngay.' },
      { ja: '救急車を呼んでください。', r: 'kyūkyūsha o yonde kudasai', vi: 'Xin gọi xe cứu thương.' },
      { ja: '保険会社に連絡します。', r: 'hokensha ni renraku shimasu', vi: 'Tôi sẽ liên lạc công ty bảo hiểm.' },
      { ja: '連絡先を教えてください。', r: 'renrakusaki o oshiete kudasai', vi: 'Cho tôi xin thông tin liên lạc.' }
    ]
  },
  {
    id: 'lost', icon: '🪪', vi: 'Mất bằng lái',
    tip: 'Báo cảnh sát lấy 遺失物届, sau đó đến 免許センター xin cấp lại (再交付).',
    phrases: [
      { ja: '免許証をなくしました。', r: 'menkyoshō o nakushimashita', vi: 'Tôi bị mất bằng lái.' },
      { ja: '再交付の手続きをしたいです。', r: 'saikōfu no tetsuzuki o shitai desu', vi: 'Tôi muốn làm thủ tục cấp lại.' },
      { ja: '必要な書類は何ですか。', r: 'hitsuyō na shorui wa nan desu ka', vi: 'Cần những giấy tờ gì?' },
      { ja: '遺失物届は出しました。', r: 'ishitsubutsutodoke wa dashimashita', vi: 'Tôi đã nộp đơn báo mất.' },
      { ja: '手数料はいくらですか。', r: 'tesūryō wa ikura desu ka', vi: 'Lệ phí là bao nhiêu?' }
    ]
  },
  {
    id: 'address', icon: '🏠', vi: 'Chuyển nhà, đổi địa chỉ',
    tip: 'Đổi địa chỉ trên bằng lái trong thời hạn luật định; mang 在留カード mới.',
    phrases: [
      { ja: '引っ越しました。住所を変更したいです。', r: 'hikkoshimashita. jūsho o henkō shitai desu', vi: 'Tôi đã chuyển nhà. Muốn đổi địa chỉ.' },
      { ja: '新しい住所はここです。', r: 'atarashii jūsho wa koko desu', vi: 'Địa chỉ mới là ở đây.' },
      { ja: '在留カードも新しいです。', r: 'zairyū kādo mo atarashii desu', vi: 'Thẻ cư trú cũng đã đổi mới.' },
      { ja: '今日は持ち帰りますか。', r: 'kyō wa mochikaerimasu ka', vi: 'Hôm nay có nhận lại được luôn không?' },
      { ja: '手続きは無料ですか。', r: 'tetsuzuki wa muryō desu ka', vi: 'Thủ tục có miễn phí không?' }
    ]
  },
  {
    id: 'gas', icon: '⛽', vi: 'Đổ xăng',
    tip: '原付 dùng xăng thường (レギュラー). Câu nói ngắn là đủ.',
    phrases: [
      { ja: 'レギュラーを満タンでお願いします。', r: 'regyurā o mantan de onegaishimasu', vi: 'Cho tôi đổ đầy xăng thường.' },
      { ja: 'セルフでお願いします。', r: 'serufu de onegaishimasu', vi: 'Tôi tự đổ.' },
      { ja: '１リットルいくらですか。', r: 'ichi rittoru ikura desu ka', vi: 'Một lít bao nhiêu tiền?' },
      { ja: '支払いは現金です。', r: 'shiharai wa genkin desu', vi: 'Tôi trả bằng tiền mặt.' },
      { ja: 'ありがとうございました。', r: 'arigatō gozaimashita', vi: 'Cảm ơn bạn.' }
    ]
  },
  {
    id: 'repair', icon: '🔧', vi: 'Xe hỏng, thủng lốp',
    tip: 'Nói rõ hiện tượng, không cần giải thích dài. Gọi ロードサービス nếu không đi được.',
    phrases: [
      { ja: 'タイヤがパンクしました。', r: 'taiya ga panku shimashita', vi: 'Lốp bị thủng rồi.' },
      { ja: 'エンジンがかかりません。', r: 'enjin ga kakarimasen', vi: 'Máy không nổ.' },
      { ja: '修理をお願いできますか。', r: 'shūri o onegai dekimasu ka', vi: 'Có thể sửa giúp tôi không?' },
      { ja: 'いくらかかりますか。', r: 'ikura kakarimasu ka', vi: 'Hết bao nhiêu tiền?' },
      { ja: '今日中に直りますか。', r: 'kyōjū ni naorimasu ka', vi: 'Trong hôm nay sửa xong không?' }
    ]
  },
  {
    id: 'center', icon: '🏫', vi: 'Ở trung tâm thi / 原付講習',
    tip: 'Nghe kỹ các câu chỉ dẫn ngắn. Không hiểu thì giơ tay hỏi lại.',
    phrases: [
      { ja: 'すみません、もう一度お願いします。', r: 'sumimasen, mō ichido onegaishimasu', vi: 'Xin lỗi, nhắc lại giúp tôi.' },
      { ja: 'これはどういう意味ですか。', r: 'kore wa dōiu imi desu ka', vi: 'Cái này nghĩa là gì?' },
      { ja: '試験は何時に始まりますか。', r: 'shiken wa nanji ni hajimarimasu ka', vi: 'Mấy giờ bắt đầu thi?' },
      { ja: 'トイレはどこですか。', r: 'toire wa doko desu ka', vi: 'Nhà vệ sinh ở đâu?' },
      { ja: 'ありがとうございました。お世話になりました。', r: 'arigatō gozaimashita. osewa ni narimashita', vi: 'Cảm ơn đã giúp đỡ.' }
    ]
  }
];

/* Bảng đối chiếu thói quen Việt Nam – Nhật Bản */
window.COMPARE = [
  { vi: 'Đi bên phải đường', jp: 'Lái bên TRÁI đường', note: 'Sai làn là nguy hiểm nhất với người mới sang.' },
  { vi: 'Phố đông vẫn chạy 40–50 km/h', jp: 'Tối đa 30 km/h', note: '原付 không có ngoại lệ, kể cả đường rộng.' },
  { vi: 'Len lỏi giữa các làn khi tắc', jp: 'Cấm lách làn, phải xếp hàng', note: 'すり抜け bị phạt và rất dễ gây tai nạn.' },
  { vi: 'Rẽ phải bình thường', jp: 'Rẽ phải hai bước ở giao lộ ≥3 làn', note: '二段階右折 — nhớ “3 làn trở lên + có đèn”.' },
  { vi: 'Mũ bảo hiểm đội cho có', jp: 'Bắt buộc, phải cài quai', note: 'Không cài quai vẫn bị coi là vi phạm.' },
  { vi: 'Chở 2–3 người', jp: 'Chỉ 1 người', note: 'Chở thêm người là vi phạm, dù trẻ em.' }
];
