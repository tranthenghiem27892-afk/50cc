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

  ,{
    id: 'il07',
    title: 'Xe tải quay đầu giữa đường',
    scene: 'Đường hai làn, bạn chạy phía sau một xe tải đang bật xi nhan trái và bắt đầu quay đầu (転回) ngay giữa đường, nơi không có biển cấm.',
    subs: [
      { q: 'Xe tải có thể chiếm hết cả hai làn khi quay đầu.', a: 1 },
      { q: 'Bạn nên vượt bên trái cho nhanh vì xe tải đang quay đầu.', a: 0 },
      { q: 'Nên giảm tốc và chờ xe tải hoàn tất việc quay đầu.', a: 1 }
    ],
    exp: 'Xe dài khi quay đầu sẽ quét qua cả hai làn. Vượt lúc này là lao vào vùng xe đang di chuyển — phải chậm lại và chờ.'
  }
  ,{
    id: 'il08',
    title: 'Học sinh băng qua đường mưa',
    scene: 'Mưa to, tầm nhìn kém. Phía trước có vạch qua đường và một nhóm học sinh đang chuẩn bị băng qua, một số che ô nên không thấy xe.',
    subs: [
      { q: 'Trẻ em che ô có thể không nhìn thấy bạn.', a: 1 },
      { q: 'Vì có vạch qua đường nên bạn được ưu tiên đi trước.', a: 0 },
      { q: 'Nên giảm tốc sớm và sẵn sàng dừng hẳn.', a: 1 }
    ],
    exp: 'Người đi bộ được ưu tiên tại vạch qua đường. Mưa và ô làm giảm khả năng quan sát của cả hai bên — phải chậm và chủ động nhường.'
  }
  ,{
    id: 'il09',
    title: 'Người bước ra từ sau xe buýt',
    scene: 'Xe buýt đang dừng ở trạm bên trái, đèn xi nhan bật. Bạn chạy sát bên phải xe buýt để vượt qua.',
    subs: [
      { q: 'Có thể có người bước ra từ phía trước xe buýt.', a: 1 },
      { q: 'Chạy sát xe buýt giúp bạn thoát khỏi khu vực đông người nhanh hơn.', a: 0 },
      { q: 'Nên giảm tốc và giữ khoảng cách với xe buýt.', a: 1 }
    ],
    exp: 'Xe buýt che khuất hoàn toàn người bước ra. Đây là kiểu tai nạn rất phổ biến — phải chậm lại và giữ khoảng cách.'
  }
  ,{
    id: 'il10',
    title: 'Đường hẹp có xe ngược chiều',
    scene: 'Đường nông thôn hẹp, không có vạch giữa. Phía trước có xe con đi ngược chiều, bên trái bạn là rãnh thoát nước.',
    subs: [
      { q: 'Nên giảm tốc và tấp sát trái để nhường đường.', a: 1 },
      { q: 'Cứ giữ tốc độ vì đường hẹp thì xe kia phải né.', a: 0 },
      { q: 'Cần chú ý mép đường vì có thể trượt xuống rãnh.', a: 1 }
    ],
    exp: 'Đường hẹp phải giảm tốc và nhường. Tấp sát mép có rãnh rất dễ trượt bánh — vừa nhường vừa giữ an toàn cho mình.'
  }
  ,{
    id: 'il11',
    title: 'Người đi bộ áo tối ban đêm',
    scene: 'Trời tối, đoạn đường không có đèn đường. Phía trước có người đi bộ mặc áo tối màu, đi cùng chiều, không có phản quang.',
    subs: [
      { q: 'Người mặc áo tối rất khó thấy dưới ánh đèn pha.', a: 1 },
      { q: 'Nên bật đèn pha xa (上向き) và giữ nguyên khi có người phía trước.', a: 0 },
      { q: 'Nên giảm tốc độ để kịp xử lý nếu người đó bất ngờ đổi hướng.', a: 1 }
    ],
    exp: 'Ban đêm phải chạy chậm hơn và quan sát kỹ. Đèn pha xa làm chói người phía trước — cần hạ đèn khi đến gần.'
  }
  ,{
    id: 'il12',
    title: 'Dốc xuống, xe trước phanh gấp',
    scene: 'Bạn đang xuống một con dốc dài. Xe phía trước bất ngờ bật đèn phanh và giảm tốc mạnh.',
    subs: [
      { q: 'Xuống dốc làm quãng đường phanh dài hơn bình thường.', a: 1 },
      { q: 'Nên giữ nguyên ga và bám sát để kịp vượt khi xe trước dừng.', a: 0 },
      { q: 'Nên giữ khoảng cách xa hơn và dùng phanh động cơ.', a: 1 }
    ],
    exp: 'Xuống dốc, xe lao nhanh hơn và phanh ì hơn. Giữ khoảng cách rộng, kết hợp phanh động cơ, không bám đuôi.'
  }
];
