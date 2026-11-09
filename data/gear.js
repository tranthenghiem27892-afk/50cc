/* ============================================================
   Trang phục tiêu chuẩn khi đi 原付
   ============================================================ */
window.GEAR = [
  {
    icon: '🪖', must: true,
    ja: 'ヘルメット', vi: 'Mũ bảo hiểm',
    desc: 'Bắt buộc theo luật. Chọn loại có tem PSC, vừa đúng cỡ đầu.',
    tip: 'Loại che cả hàm (フルフェイス) an toàn hơn loại nửa đầu. Nhớ cài quai.'
  },
  {
    icon: '🧤', must: true,
    ja: 'グローブ', vi: 'Găng tay',
    desc: 'Giữ tay khô ráo, không trượt tay ga khi mưa.',
    tip: 'Khi ngã, găng tay là thứ đầu tiên bảo vệ lòng bàn tay.'
  },
  {
    icon: '🧥', must: true,
    ja: 'ジャケット', vi: 'Áo khoác dài tay',
    desc: 'Che kín tay và vai, tốt nhất là màu sáng hoặc có phản quang.',
    tip: 'Màu tối khó thấy ban đêm — thêm dải phản quang nếu áo tối.'
  },
  {
    icon: '👖', must: true,
    ja: '長ズボン', vi: 'Quần dài',
    desc: 'Tránh trầy da khi ngã, tránh bỏng ống pô.',
    tip: 'Quần quá rộng dễ cuốn vào xích — nên mặc vừa hoặc cài gọn.'
  },
  {
    icon: '👟', must: true,
    ja: '靴', vi: 'Giày kín',
    desc: 'Giữ chân chắc trên sàn xe, bảo vệ mắt cá.',
    tip: 'Không đi dép lê, guốc hay giày cao gót khi lái xe.'
  },
  {
    icon: '☔', must: false,
    ja: 'レインウェア', vi: 'Áo mưa bộ',
    desc: 'Áo mưa kiểu áo + quần giúp lái an toàn trong mưa.',
    tip: 'Không dùng ô khi lái — một tay cầm ô là mất kiểm soát phanh.'
  },
  {
    icon: '🧣', must: false,
    ja: '防寒具', vi: 'Đồ chống lạnh',
    desc: 'Mùa đông Nhật rất lạnh: găng dày, khăn, áo gió, túi sưởi.',
    tip: 'Lạnh làm tay cứng, phản xạ phanh chậm hơn — cần giữ ấm cổ tay.'
  },
  {
    icon: '🎒', must: false,
    ja: 'バッグ', vi: 'Túi đeo chéo',
    desc: 'Đeo chéo người hoặc để trong cốp, cố định chắc chắn.',
    tip: 'Không treo túi vào tay lái — sẽ vướng khi xoay lái.'
  }
];

window.GEAR_AVOID = [
  'Dép lê, guốc, giày cao gót — trượt và không giữ được chân',
  'Quần đùi, áo ba lỗ — bỏng pô và trầy da khi ngã',
  'Áo mưa trùm kín đầu — che mất tầm nhìn hai bên',
  'Tai nghe cả hai tai — không nghe được còi và tín hiệu',
  'Mũ bảo hiểm lỏng, không cài quai — va đập là văng ra',
  'Treo đồ nặng trên tay lái — mất thăng bằng'
];
