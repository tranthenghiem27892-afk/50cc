/* ============================================================
   Câu hỏi tình huống 危険予測 (câu 47–48) — 3 ý mỗi câu,
   đúng cả 3 mới được 2 điểm.
   Nội dung tiếng Nhật như đề thật; tiếng Việt hiện khi bật "Dịch".
   ============================================================ */
window.ILLUSTRATIONS = [
  {
    id: 'il01',
    title: '交差点と左折トラック',
    titleVi: 'Xe tải rẽ trái ở giao lộ',
    scene: '原付で交差点に近づいた。信号は青。前方の左側に大型トラックが左折のウインカーを出して止まっている。',
    sceneVi: 'Bạn chạy 原付 đến giao lộ, đèn xanh. Phía trước bên trái có xe tải lớn bật xi-nhan trái đang dừng chờ.',
    subs: [
      { q: 'トラックの陰から横断してくる歩行者が見えないことがある。', vi: 'Người đi bộ băng qua có thể bị xe tải che khuất.', a: 1 },
      { q: '青信号なので、減速せずにそのまま直進してよい。', vi: 'Đèn xanh nên cứ thẳng mà đi, không cần giảm tốc.', a: 0 },
      { q: 'トラックの前方を確認してから通過したほうがよい。', vi: 'Nên quan sát phía trước xe tải rồi hãy đi qua.', a: 1 }
    ],
    exp: 'Xe lớn che tầm nhìn. Đèn xanh không có nghĩa là an toàn tuyệt đối — phải giảm tốc và quan sát phần đường bị khuất.'
  },
  {
    id: 'il02',
    title: '雨の日の白線とマンホール',
    titleVi: 'Mưa, vạch sơn và nắp cống',
    scene: '小雨が降っている。左側の車線に白いペイントとマンホールがある。前の車がブレーキをかけ始めた。',
    sceneVi: 'Trời mưa nhỏ. Làn bên trái có vạch sơn trắng và một nắp cống. Xe phía trước bắt đầu phanh.',
    subs: [
      { q: '濡れた白線は路面より滑りやすい。', vi: 'Vạch sơn trắng khi ướt trơn hơn mặt đường.', a: 1 },
      { q: '雨の日は前の車との車間距離を詰めたほうがよい。', vi: 'Trời mưa nên rút ngắn khoảng cách với xe trước.', a: 0 },
      { q: 'いつもより早めに減速し、ブレーキをかけたほうがよい。', vi: 'Nên giảm tốc và phanh sớm hơn bình thường.', a: 1 }
    ],
    exp: 'Mưa làm giảm ma sát nên phải TĂNG khoảng cách. Vạch sơn và nắp cống khi ướt đặc biệt trơn.'
  },
  {
    id: 'il03',
    title: '狭い道の歩行者と自転車',
    titleVi: 'Đường hẹp có người đi bộ',
    scene: '歩道のない狭い道。前方に同じ方向へ歩く歩行者がいて、自転車が左へふくらんでいる。',
    sceneVi: 'Đường hẹp, không có vỉa hè. Phía trước có người đi bộ cùng chiều và một xe đạp đang lách sang trái.',
    subs: [
      { q: '歩行者が急に道路に出てくるおそれがあるので、減速する。', vi: 'Người đi bộ có thể bất ngờ bước ra, nên phải giảm tốc.', a: 1 },
      { q: 'クラクションを大きく鳴らして歩行者をどかせてよい。', vi: 'Được bấm còi thật to để người đi bộ tránh đường.', a: 0 },
      { q: '自転車を追い越すときは側方の間隔をあける。', vi: 'Khi vượt xe đạp phải giữ khoảng cách bên hông.', a: 1 }
    ],
    exp: 'Đường hẹp: giảm tốc, giữ khoảng cách bên hông, không bấm còi thúc người đi bộ.'
  },
  {
    id: 'il04',
    title: 'トンネルの出口と横風',
    titleVi: 'Ra khỏi hầm',
    scene: '長いトンネルの中を走っている。前方が出口になっている。外は風が強く、木の葉が舞っている。',
    sceneVi: 'Bạn chạy trong hầm dài, phía trước là cửa hầm. Bên ngoài trời nhiều gió, lá cây bay.',
    subs: [
      { q: 'トンネルを出る瞬間に横風を受けて、ハンドルを取られるおそれがある。', vi: 'Ra khỏi hầm có thể bị gió ngang làm lệch tay lái.', a: 1 },
      { q: '出口が見えたら、すぐに速度を上げてよい。', vi: 'Thấy cửa hầm là được tăng tốc ngay.', a: 0 },
      { q: '出口の先の落下物や車の流れにも注意する。', vi: 'Cũng phải chú ý vật rơi và dòng xe phía sau cửa hầm.', a: 1 }
    ],
    exp: 'Ra khỏi hầm bị gió ngang đột ngột, mắt chưa quen ánh sáng. Phải giữ tốc độ thấp và nắm chắc tay lái.'
  },
  {
    id: 'il05',
    title: '長い下り坂と前車のブレーキ',
    titleVi: 'Dốc dài, xe trước phanh',
    scene: '長い下り坂を走っている。前方のトラックがブレーキランプを点けて減速し始めた。',
    sceneVi: 'Bạn đang xuống một con dốc dài. Xe tải phía trước bật đèn phanh và bắt đầu giảm tốc.',
    subs: [
      { q: '下り坂では停止距離が長くなる。', vi: 'Xuống dốc thì quãng đường phanh dài hơn.', a: 1 },
      { q: '前の車との距離を詰めれば空気抵抗が減って安全だ。', vi: 'Bám sát xe trước sẽ giảm cản gió và an toàn hơn.', a: 0 },
      { q: 'エンジンブレーキも使って速度を抑える。', vi: 'Nên dùng cả phanh động cơ để hãm tốc.', a: 1 }
    ],
    exp: 'Dốc làm xe trôi nhanh hơn, phanh phải làm việc nhiều. Giữ khoảng cách rộng và dùng phanh động cơ.'
  },
  {
    id: 'il06',
    title: '夜間の対向車のハイビーム',
    titleVi: 'Đêm, đèn pha ngược chiều',
    scene: '夜間、街灯のない道を走っている。対向車がハイビームを点けている。',
    sceneVi: 'Ban đêm, đường không có đèn đường. Xe ngược chiều bật đèn pha rất sáng.',
    subs: [
      { q: '対向車のライトで前方が見えにくくなる。', vi: 'Đèn xe ngược chiều làm khó nhìn phía trước.', a: 1 },
      { q: '自分もハイビームにして対抗してよい。', vi: 'Mình cũng bật pha để đối lại.', a: 0 },
      { q: '速度を落とし、左側の路肩を意識して走る。', vi: 'Giảm tốc và bám mép trái để chạy.', a: 1 }
    ],
    exp: 'Chói mắt thì phải giảm tốc, nhìn về mép trái đường, tuyệt đối không bật pha trả đũa.'
  },
  {
    id: 'il07',
    title: '道路の途中で転回するトラック',
    titleVi: 'Xe tải quay đầu giữa đường',
    scene: '二車線の道。前方のトラックが方向指示器を出して、道路の途中で転回を始めた。',
    sceneVi: 'Đường hai làn. Xe tải phía trước bật xi-nhan và bắt đầu quay đầu ngay giữa đường.',
    subs: [
      { q: 'トラックの進路が急に変わるおそれがある。', vi: 'Xe tải có thể đổi hướng đột ngột.', a: 1 },
      { q: '転回しているトラックの横をすり抜けてよい。', vi: 'Được lách qua bên hông xe đang quay đầu.', a: 0 },
      { q: 'トラックの動きを見ながら、止まれる速度まで落とす。', vi: 'Vừa nhìn xe tải vừa giảm tốc độ đủ để dừng.', a: 1 }
    ],
    exp: 'Xe quay đầu chiếm cả hai làn. Không được lách qua — phải giảm tốc và chờ.'
  },
  {
    id: 'il08',
    title: '大雨の横断歩道と児童',
    titleVi: 'Học sinh băng qua đường mưa',
    scene: '強い雨で見通しが悪い。前方に横断歩道があり、傘をさした児童の集団が渡ろうとしている。',
    sceneVi: 'Mưa to, tầm nhìn kém. Phía trước có vạch qua đường và một nhóm học sinh đang chuẩn bị băng qua, che ô.',
    subs: [
      { q: '雨で児童が見えにくいので、特に注意する。', vi: 'Mưa làm khó thấy trẻ em nên phải chú ý đặc biệt.', a: 1 },
      { q: '横断歩道の手前で止まらなくてもよい。', vi: 'Không cần dừng trước vạch qua đường.', a: 0 },
      { q: '横断歩道の手前で減速し、いつでも止まれる速度で進む。', vi: 'Giảm tốc trước vạch và đi với tốc độ luôn dừng được.', a: 1 }
    ],
    exp: 'Mưa + trẻ em + vạch qua đường: phải giảm tốc, sẵn sàng dừng. Không dừng cho người đi bộ là vi phạm.'
  },
  {
    id: 'il09',
    title: 'バス停に止まるバスの陰',
    titleVi: 'Người bước ra từ sau xe buýt',
    scene: '左側のバス停にバスが止まっている。ウインカーが点いている。あなたはバスの右側を通過しようとしている。',
    sceneVi: 'Xe buýt đang dừng ở trạm bên trái, đèn xi-nhan bật. Bạn chạy sát bên phải xe buýt để vượt qua.',
    subs: [
      { q: 'バスの陰から人が出てくるおそれがある。', vi: 'Có thể có người bước ra từ phía trước xe buýt.', a: 1 },
      { q: 'バスのすぐ横をすり抜けると、早く安全に抜けられる。', vi: 'Chạy sát hông xe buýt sẽ thoát khỏi khu vực đông nhanh hơn.', a: 0 },
      { q: 'バスとの間隔をあけ、減速して通過する。', vi: 'Giữ khoảng cách với xe buýt và giảm tốc khi vượt.', a: 1 }
    ],
    exp: 'Xe buýt che khuất người đi bộ. Phải giữ khoảng cách bên hông và giảm tốc để kịp dừng.'
  },
  {
    id: 'il10',
    title: '狭い農道の対向車と側溝',
    titleVi: 'Đường hẹp có xe ngược chiều',
    scene: '中央線のない狭い田舎道。前方から対向車が来ている。左側には側溝がある。',
    sceneVi: 'Đường nông thôn hẹp, không có vạch giữa. Phía trước có xe đi ngược chiều, bên trái là rãnh thoát nước.',
    subs: [
      { q: '対向車とすれ違うときは速度を落とす。', vi: 'Khi tránh xe ngược chiều phải giảm tốc.', a: 1 },
      { q: '側溝に落ちないように、道路の中央寄りを走ればよい。', vi: 'Chạy giữa đường để không rơi xuống rãnh là được.', a: 0 },
      { q: '左に寄りすぎると側溝に落ちるおそれがある。', vi: 'Bám trái quá sát có thể rơi xuống rãnh.', a: 1 }
    ],
    exp: 'Đường hẹp: giảm tốc, canh đúng phần đường, đừng bám trái quá sát rãnh.'
  },
  {
    id: 'il11',
    title: '夜間の黒い服の歩行者',
    titleVi: 'Người đi bộ áo tối ban đêm',
    scene: '夜間、街灯のない道。前方に黒っぽい服を着た歩行者が同じ方向に歩いている。反射材は見えない。',
    sceneVi: 'Trời tối, không đèn đường. Phía trước có người mặc áo tối đi cùng chiều, không có phản quang.',
    subs: [
      { q: '歩行者に気づくのが遅れるおそれがある。', vi: 'Có thể nhận ra người đi bộ muộn.', a: 1 },
      { q: '反射材を着けていない歩行者は、特に見えにくい。', vi: 'Người không có phản quang đặc biệt khó thấy.', a: 1 },
      { q: '前照灯を上向きにすれば、歩行者によく見える。', vi: 'Bật pha lên là thấy người đi bộ rõ.', a: 0 }
    ],
    exp: 'Áo tối ban đêm gần như tàng hình. Phải giảm tốc, bật đèn chiếu gần và quan sát mép đường.'
  },
  {
    id: 'il12',
    title: '下り坂で前車が急ブレーキ',
    titleVi: 'Dốc xuống, xe trước phanh gấp',
    scene: '長い下り坂。前方の車が急にブレーキランプを点け、急減速した。',
    sceneVi: 'Bạn đang xuống dốc dài. Xe phía trước bất ngờ bật đèn phanh và giảm tốc mạnh.',
    subs: [
      { q: '下り坂では停止距離が長くなる。', vi: 'Xuống dốc thì quãng đường phanh dài hơn.', a: 1 },
      { q: '前の車との車間距離を詰めても問題ない。', vi: 'Bám sát xe trước cũng không sao.', a: 0 },
      { q: '早めにブレーキをかけて速度を落とす。', vi: 'Phanh sớm để giảm tốc.', a: 1 }
    ],
    exp: 'Dốc + phanh gấp: phải giữ khoảng cách rộng, phanh sớm, không bám đuôi.'
  }
];
