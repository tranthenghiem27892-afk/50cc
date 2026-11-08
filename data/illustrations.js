/* ============================================================
   Câu hỏi tình huống (dạng イラスト問題) — 3 tiểu hỏi mỗi câu,
   đúng cả 3 mới được 2 điểm.
   ============================================================ */
window.ILLUSTRATIONS = [
  {
    id: 'il01',
    title: 'Xe tải rẽ trái ở giao lộ',
    scene: 'Bạn chạy 原付 đến giao lộ, đèn đang xanh. Phía trước bên trái có xe tải lớn bật xi nhan trái và đang dừng chờ.',
    subs: [
      { q: 'Xe tải có thể che khuất người đi bộ đang qua đường bên trái.', a: 1 },
      { q: 'Vì đèn xanh nên bạn được đi thẳng ngay, không cần giảm tốc.', a: 0 },
      { q: 'Nên quan sát cả phía trước xe tải trước khi vượt qua.', a: 1 }
    ],
    exp: 'Xe lớn che tầm nhìn. Đèn xanh không có nghĩa là an toàn tuyệt đối — phải giảm tốc và quan sát phần đường bị khuất.'
  },
  {
    id: 'il02',
    title: 'Mưa, vạch sơn và nắp cống',
    scene: 'Trời mưa nhỏ. Làn đường bên trái có vạch sơn trắng và một nắp cống. Xe phía trước bắt đầu phanh.',
    subs: [
      { q: 'Vạch sơn trắng khi ướt có thể trơn hơn mặt đường.', a: 1 },
      { q: 'Trời mưa thì nên giảm khoảng cách với xe phía trước.', a: 0 },
      { q: 'Nên giảm tốc và phanh sớm hơn bình thường.', a: 1 }
    ],
    exp: 'Mưa làm giảm ma sát nên phải TĂNG khoảng cách. Vạch sơn và nắp cống khi ướt đặc biệt trơn.'
  },
  {
    id: 'il03',
    title: 'Đường hẹp có người đi bộ',
    scene: 'Đường hẹp, không có vỉa hè. Phía trước có người đi bộ cùng chiều và một xe đạp đang lách sang trái.',
    subs: [
      { q: 'Người đi bộ có thể bước ra đường bất ngờ, nên phải giảm tốc.', a: 1 },
      { q: 'Được bấm còi thật to để người đi bộ tránh đường.', a: 0 },
      { q: 'Khi vượt xe đạp phải giữ khoảng cách bên hông.', a: 1 }
    ],
    exp: 'Đường hẹp: giảm tốc, giữ khoảng cách bên hông, không bấm còi thúc người đi bộ.'
  },
  {
    id: 'il04',
    title: 'Ra khỏi hầm',
    scene: 'Bạn chạy trong hầm dài, phía trước là cửa hầm. Bên ngoài trời nhiều gió.',
    subs: [
      { q: 'Ra khỏi hầm có thể bị gió đẩy ngang đột ngột.', a: 1 },
      { q: 'Trong hầm không cần bật đèn vì đã có đèn điện.', a: 0 },
      { q: 'Nên giảm tốc và nắm chắc tay lái khi ra khỏi hầm.', a: 1 }
    ],
    exp: 'Trong hầm luôn phải bật đèn. Ra khỏi hầm có thể gặp gió mạnh đẩy ngang.'
  },
  {
    id: 'il05',
    title: 'Dốc dài, xe trước phanh',
    scene: 'Bạn đang xuống một con dốc dài. Xe tải phía trước bắt đầu phanh.',
    subs: [
      { q: 'Xuống dốc dài mà chỉ dùng phanh có thể bị cháy phanh.', a: 1 },
      { q: 'Nên tăng khoảng cách với xe phía trước.', a: 1 },
      { q: 'Có thể tắt máy để xe trôi cho nhanh.', a: 0 }
    ],
    exp: 'Dùng phanh động cơ, giữ khoảng cách xa hơn, tuyệt đối không tắt máy khi đang chạy.'
  },
  {
    id: 'il06',
    title: 'Đêm, đèn pha ngược chiều',
    scene: 'Ban đêm, đường không có đèn đường. Xe ngược chiều bật đèn pha rất sáng.',
    subs: [
      { q: 'Khi bị chói, nên nhìn về phía mép trái đường thay vì nhìn thẳng vào đèn.', a: 1 },
      { q: 'Nên tăng tốc để qua nhanh đoạn đó.', a: 0 },
      { q: 'Phải giảm tốc vì tầm nhìn bị hạn chế.', a: 1 }
    ],
    exp: 'Bị chói đèn: giảm tốc, nhìn mép trái để giữ hướng, không nhìn thẳng vào đèn.'
  }
];
