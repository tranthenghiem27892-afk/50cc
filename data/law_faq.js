/* ============================================================
   Bổ sung kiến thức luật giao thông Nhật cho chatbox
   (được nối vào window.FAQ trong data/faq.js)
   ============================================================ */
(function () {
  var extra = [
    {
      id: 'signal', screen: 'practice',
      kw: ['den tin hieu', 'den do', 'den vang', 'den xanh', 'nhap nhay', 'tin hieu', '信号'],
      a: {
        vi: 'Đèn xanh: đi được. Vàng: dừng trước vạch, chỉ đi tiếp nếu dừng sẽ nguy hiểm. Đỏ: phải dừng. Vàng nhấp nháy: đi chậm, nhường đường ưu tiên. Đỏ nhấp nháy: dừng hẳn rồi mới đi khi an toàn.',
        zh: '绿灯可行；黄灯须在停止线前停车（急停危险时例外）；红灯必须停。黄闪：减速让行；红闪：停车确认安全后再走。',
        fil: 'Berde: puwede. Dilaw: huminto bago ang linya maliban kung delikado. Pula: bawal. Dilaw na kumikislap: bagalan at magbigay. Pulang kumikislap: huminto muna, tapos magpatuloy kung safe.'
      }
    },
    {
      id: 'signshape', screen: 'practice',
      kw: ['bien bao', 'hinh tron', 'hinh tam giac', 'mau xanh', 'mau vang', 'bien cam', '標識'],
      a: {
        vi: 'Biển tròn viền đỏ: cấm hoặc giới hạn. Biển tròn xanh: chỉ dẫn bắt buộc. Biển tam giác vàng: cảnh báo nguy hiểm. Biển chữ nhật xanh: thông tin, hướng dẫn.',
        zh: '红圈圆牌＝禁止/限制；蓝圆牌＝指示；黄三角＝警告；蓝长方牌＝信息指引。',
        fil: 'Pulang bilog na may border: bawal/limitasyon. Asul na bilog: utos. Dilaw na tatsulok: babala. Asul na parihaba: impormasyon.'
      }
    },
    {
      id: 'stopline', screen: 'practice',
      kw: ['vach dung', 'vach qua duong', 'stop line', 'vach trang', 'dung truoc vach'],
      a: {
        vi: 'Vạch dừng là vạch trắng ngang đường. Khi đèn đỏ hoặc có biển 止まれ, phải dừng hẳn trước vạch, không được nhô bánh qua. Vạch qua đường dành cho người đi bộ — phải nhường.',
        zh: '停止线是横向白线。红灯或「止まれ」时必须在线前完全停住，车轮不得越线。人行横道必须让行。',
        fil: 'Ang stop line ay puting linya. Sa pulang ilaw o 止まれ, huminto bago ang linya. Magbigay sa crosswalk.'
      }
    },
    {
      id: 'priorityroad', screen: 'practice',
      kw: ['duong uu tien', '優先道路', 'nhuong duong', 'uu tien'],
      a: {
        vi: 'Ở giao lộ không có đèn, xe trên đường ưu tiên (có biển 優先道路 hoặc đường rộng hơn) được đi trước. Nếu ngang nhau, nhường xe bên phải.',
        zh: '无信号路口，优先道路（有 優先道路 标志或道路较宽）先行；条件相同时让右方来车。',
        fil: 'Sa walang signal, priority ang nasa 優先道路 o mas malawak na daan. Kung pareho, bigay sa galing kanan.'
      }
    },
    {
      id: 'turnsignal', screen: 'practice',
      kw: ['xi nhan', 'bat den', 'turn signal', 're trai', 're phai', 'bao nhieu met'],
      a: {
        vi: 'Bật xi nhan trước khi rẽ hoặc chuyển làn ít nhất 30 m trên đường thường (khoảng 3 giây trên đường cao tốc), tắt sau khi xong. Phải quan sát gương và điểm mù.',
        zh: '转弯或变道前至少 30 米打灯（高速约 3 秒），完成后关灯。要确认后视镜与盲区。',
        fil: 'Mag-signal mga 30 m bago lumiko o lumipat ng lane, patayin pagkatapos. Tiyakin ang salamin at blind spot.'
      }
    },
    {
      id: 'overtake', screen: 'practice',
      kw: ['vuot xe', 'overtake', 'cam vuot', 'vuot ben phai'],
      a: {
        vi: 'Vượt bên phải bị cấm (trừ xe đang rẽ trái). Cấm vượt ở giao lộ, đường sắt, chỗ khuất tầm nhìn, nơi có biển 追越し禁止. Vượt xong phải về làn ngay.',
        zh: '禁止右侧超车（前车左转时除外）。路口、铁路道口、视线不良处及有 追越し禁止 标志处禁止超车。',
        fil: 'Bawal lumampas sa kanan (maliban sa lumiliko sa kaliwa). Bawal sa kanto, riles, at may 追越し禁止.'
      }
    },
    {
      id: 'speedlimit', screen: 'practice',
      kw: ['toc do toi da', '60km', '50km', '40km', 'gioi han toc do', 'bien toc do'],
      a: {
        vi: 'Đường thường không có biển: tối đa 60 km/h (một số đường quy định 30–50). 原付 luôn tối đa 30 km/h. Biển 最高速度 ghi số cụ thể thì theo số đó, nhưng 原付 không bao giờ vượt 30.',
        zh: '无标志的一般道路上限 60 km/h（部分道路 30–50）。原付 始终不超过 30 km/h。最高速度 标志以标示值为准，但原付 不超过 30。',
        fil: 'Walang senyales: max 60 km/h (may 30–50). Ang 原付 ay laging max 30 km/h.'
      }
    },
    {
      id: 'distance', screen: 'practice',
      kw: ['khoang cach', 'giu khoang cach', 'bao xa', 'an toan'],
      a: {
        vi: 'Giữ khoảng cách đủ để dừng kịp: trên đường khô ít nhất bằng quãng đường phanh; trời mưa tăng gấp đôi. Không bám đuôi xe tải lớn vì bị che tầm nhìn.',
        zh: '保持足以刹停的车距：干燥路面至少等于刹车距离，雨天加倍。不要紧跟大货车，会挡住视线。',
        fil: 'Panatilihin ang distansyang sapat para huminto; doble sa ulan. Huwag dumikit sa malaking truck.'
      }
    },
    {
      id: 'railway', screen: 'practice',
      kw: ['duong sat', 'tac chan', '踏切', 'tau hoa', 'railway'],
      a: {
        vi: 'Trước 踏切 phải giảm tốc, dừng trước vạch, hạ kính nghe và nhìn hai phía. Không dừng xe trên đường ray. Có chuông báo hoặc rào chắn thì tuyệt đối không đi qua.',
        zh: '过 踏切 要减速，在线前停车，开窗听声并左右确认。不得在轨道上停车；警报响或栏杆放下时绝不能通过。',
        fil: 'Sa 踏切, bagalan, huminto bago ang linya, buksan ang bintana at tumingin. Bawal huminto sa riles.'
      }
    },
    {
      id: 'oneway', screen: 'practice',
      kw: ['duong mot chieu', '一方通行', 'nguoc chieu', 'one way'],
      a: {
        vi: 'Đường một chiều chỉ được đi đúng chiều. Xe đạp có thể được đi ngược nếu có biển phụ cho phép, nhưng 原付 thì không.',
        zh: '单行道只能按规定方向行驶。自行车在有辅助标志许可时可逆行，原付 不行。',
        fil: 'One-way: isang direksyon lang. Bisikleta lang ang may exemption kung may senyales; 原付 wala.'
      }
    },
    {
      id: 'buslane', screen: 'practice',
      kw: ['lan xe buyt', 'bus lane', 'lan danh rieng', 'xe buyt'],
      a: {
        vi: 'Làn xe buýt (bus lane) thường cấm 原付 đi vào trong giờ quy định. Nếu buộc phải đi vào để rẽ, phải ra ngay khi có thể.',
        zh: '公交专用道在规定时段禁止 原付 进入。若必须进入才能转弯，应尽快驶出。',
        fil: 'Bawal ang 原付 sa bus lane sa takdang oras. Kung kailangan para lumiko, lumabas agad.'
      }
    },
    {
      id: 'emergencyveh', screen: 'practice',
      kw: ['xe uu tien', 'cuu thuong', 'ambulance', 'canh sat', 'chua chay'],
      a: {
        vi: 'Khi xe ưu tiên (cứu thương, cứu hỏa, cảnh sát) phát tín hiệu, phải nhường đường: tấp vào trái, giảm tốc hoặc dừng. Không bám theo xe ưu tiên.',
        zh: '遇救护车、消防车、警车鸣笛闪灯，必须让路：向左靠、减速或停车。不要紧跟其后。',
        fil: 'Kapag may emergency vehicle, magbigay: dumikit sa kaliwa, bagalan o huminto. Huwag sumunod dito.'
      }
    },
    {
      id: 'pedestrian', screen: 'practice',
      kw: ['nguoi di bo', 'qua duong', 'crosswalk', 'nhuong nguoi'],
      a: {
        vi: 'Phải nhường người đi bộ đang qua hoặc chuẩn bị qua vạch. Không được vượt xe đang dừng trước vạch vì có thể có người đi bộ bị che khuất.',
        zh: '必须让正在或准备过人行横道的行人。不得超越停在横道前的车辆，可能有人被挡住。',
        fil: 'Magbigay sa tumatawid o malapit nang tumawid. Huwag lumampas sa nakatigil na sasakyan sa crosswalk.'
      }
    },
    {
      id: 'passenger', screen: 'practice',
      kw: ['cho nguoi', 'cho ban', '2 nguoi', 'nguoi ngoi sau', 'cho tre em'],
      a: {
        vi: '原付 50cc (原付一種) không được chở thêm người, kể cả trẻ em. Chỉ 原付二種 (51–125cc) mới được chở 1 người.',
        zh: '50cc 原付（原付一種）不得载人，包括儿童。只有 51–125cc 的 原付二種 可载 1 人。',
        fil: 'Ang 50cc 原付 ay bawal magsakay, kasama ang bata. 原付二種 (51–125cc) lang ang puwedeng isa.'
      }
    },
    {
      id: 'load', screen: 'practice',
      kw: ['cho hang', 'cho do', 'khoi luong', '30kg', 'chieu cao', 'cho cong kenh'],
      a: {
        vi: 'Chở hàng tối đa 30 kg, cao không quá 2 m tính từ mặt đất, không che biển số/đèn, phải buộc chắc chắn. Chở quá tải dễ mất thăng bằng.',
        zh: '载货不超过 30 kg，高度从地面不超过 2 m，不得遮挡车牌与灯，必须捆牢。超载会失去平衡。',
        fil: 'Max 30 kg, taas hindi lalampas 2 m, huwag takpan ang plaka/ilaw, dapat nakatali. Delikado ang sobra.'
      }
    },
    {
      id: 'lights', screen: 'practice',
      kw: ['bat den', 'den pha', 'ban dem', 'chieu sang', 'den xe'],
      a: {
        vi: 'Trời tối, trong hầm hoặc khi mưa dày phải bật đèn pha. Ban đêm bật đèn chiếu xa khi đường vắng, chuyển chiếu gần khi có xe ngược chiều.',
        zh: '夜间、隧道内、大雨时必须开灯。空旷路可用远光，会车时切近光。',
        fil: 'Sa gabi, tunnel, malakas na ulan: buksan ang ilaw. High beam sa bakante, low beam kapag may kasalubong.'
      }
    },
    {
      id: 'horn', screen: 'practice',
      kw: ['coi', 'bam coi', 'horn', '警笛'],
      a: {
        vi: 'Chỉ dùng còi khi cần cảnh báo nguy hiểm hoặc ở nơi có biển 警笛区. Không bấm còi để giục xe trước hay trong khu dân cư ban đêm.',
        zh: '只在危险警示或「警笛区」使用喇叭。不要用来催促前车，夜间住宅区更不要按。',
        fil: 'Gamitin ang busina sa peligro o sa 警笛区. Huwag sa pagmamadali o sa gabi sa tirahan.'
      }
    },
    {
      id: 'parkingtow', screen: 'law',
      kw: ['keo xe', 'bi keo', 'phat do xe', '驻车違反', 'do xe sai'],
      a: {
        vi: 'Đỗ xe sai quy định có thể bị phạt tiền và bị kéo xe (レッカー移動). Chi phí kéo xe và lưu bãi do chủ xe trả. 原付 cũng bị áp dụng.',
        zh: '违法停车会被罚款并可能被拖车（レッカー移動），拖车与保管费由车主承担，原付 同样适用。',
        fil: 'Multa at posibleng hilahin (レッカー移動) ang maling paradahan; bayad ng may-ari. Kasama ang 原付.'
      }
    },
    {
      id: 'accident', screen: 'emg',
      kw: ['tai nan', 'va cham', 'bi thuong', 'accident', 'su co'],
      a: {
        vi: 'Gặp tai nạn: dừng ngay, cứu người trước, gọi 110 (cảnh sát) và 119 (cấp cứu), bật đèn cảnh báo, không rời hiện trường. Trao đổi thông tin và báo công ty bảo hiểm.',
        zh: '发生事故：立即停车，先救人，拨 110（警察）与 119（急救），开危险灯，不得离开现场。交换信息并通知保险公司。',
        fil: 'Aksidente: huminto, unahin ang tao, tumawag sa 110 at 119, buksan ang hazard, huwag umalis. Magpalitan ng info at tawagan ang insurance.'
      }
    },
    {
      id: 'points', screen: 'stats',
      kw: ['diem phat', 'tru diem', 'dinh diem', 'tich luy', 'dinh chi', 'huy bang'],
      a: {
        vi: 'Vi phạm bị trừ điểm (点). Tích lũy tới 6 điểm trong 3 tháng có thể bị đình chỉ bằng (免停); vi phạm nặng như lái khi say có thể bị huỷ bằng ngay. Điểm sẽ được xóa sau thời gian không vi phạm.',
        zh: '违规会扣分。3 个月内累计 6 分可能被停驾（免停）；酒驾等严重违规可当场吊销。无违规一段时间后分数清零。',
        fil: 'May puntos ang paglabag. 6 puntos sa 3 buwan: posibleng masuspinde (免停). Lasing: agad na revoke. Nabubura ang puntos pagkatapos ng panahon na walang violation.'
      }
    },
    {
      id: 'doccheck', screen: 'info',
      kw: ['mang bang lai', 'giay to khi lai', 'kiem tra giay to', 'khong mang bang'],
      a: {
        vi: 'Khi lái xe phải mang theo 免許証 (bằng lái). Không mang theo có thể bị phạt. 原付 cũng cần 自賠責 và đăng ký xe hợp lệ.',
        zh: '驾驶时必须随身携带 免許証（驾照）。未携带会被处罚。原付 还需有效的 自賠責 与车辆登记。',
        fil: 'Dapat dala ang 免許証. May multa kung wala. Kailangan din ng 自賠責 at valid na rehistro.'
      }
    },
    {
      id: 'expressway', screen: 'practice',
      kw: ['duong cao toc', 'expressway', 'cao toc', '高速道路'],
      a: {
        vi: '原付 không được chạy trên đường cao tốc (高速道路) và đường dành cho xe ô tô. Nếu đi nhầm, phải dừng ở nơi an toàn và gọi cứu hộ, không tự lùi xe.',
        zh: '原付 不得行驶高速公路（高速道路）及汽车专用道。误入时应停在安全处求助，不要自行倒车。',
        fil: 'Bawal ang 原付 sa expressway at car-only roads. Kung napasok, huminto sa safe at tumawag ng tulong; huwag umatras.'
      }
    },
    {
      id: 'tokutei', screen: 'law',
      kw: ['特定小型', 'xe dien', '20km', 'kickboard', 'xe scooter dien'],
      a: {
        vi: '特定小型原付 (xe điện ≤20 km/h): đủ 16 tuổi, không cần bằng, phải đăng ký biển, có 自賠責, đội mũ là nỗ lực. Trên vỉa hè chỉ được chạy chế độ 6 km/h và nhường người đi bộ.',
        zh: '特定小型原付（电动 ≤20 km/h）：满 16 岁、不需驾照、必须上牌与 自賠責，戴头盔是努力义务。人行道上只能 6 km/h 模式并让行人。',
        fil: '特定小型原付 (e-scooter ≤20 km/h): 16+, walang lisensya, may plaka at 自賠責, helmet ay 努力義務. Sa sidewalk, 6 km/h mode lang at magbigay sa tao.'
      }
    },
    {
      id: 'shinkijun', screen: 'law',
      kw: ['新基準原付', '125cc', '4kw', 'xe 125'],
      a: {
        vi: '新基準原付 (≤125cc và ≤4.0 kW, từ 2025): vẫn xếp như 原付一種 — tối đa 30 km/h, phải 二段階右折, đội mũ, biển trắng, cần bằng 原付.',
        zh: '新基準原付（≤125cc 且 ≤4.0kW，2025 年起）仍按 原付一種：限速 30 km/h、需二段階右折、戴头盔、白牌、需原付驾照。',
        fil: '新基準原付 (≤125cc at ≤4.0kW): parang 原付一種 — 30 km/h, 二段階右折, helmet, puting plaka, 原付 license.'
      }
    },
    {
      id: 'helmetpsc', screen: 'gear',
      kw: ['psc', 'tem', 'mui bao hiem loai', 'chon mu'],
      a: {
        vi: 'Chọn mũ có tem PSC, vừa đầu (lắc đầu không lỏng), cài quai sát cằm. Mũ đã bị va đập mạnh nên thay dù nhìn còn tốt.',
        zh: '选有 PSC 标志、尺寸合适的头盔，扣紧下颏带。受过强烈撞击的头盔即使外观完好也应更换。',
        fil: 'Pumili ng may PSC mark, tamang sukat, mahigpit ang strap. Palitan ang helmet na naipit sa malakas na impact.'
      }
    },
    {
      id: 'grammarq', screen: 'gram',
      kw: ['ngu phap', 'なければならない', 'てはならない', 'なくてもよい', 'cau bay'],
      a: {
        vi: 'Ba mẫu hay gài bẫy: 〜なければならない = phải; 〜てはならない = không được; 〜なくてもよい = không cần. Đọc kỹ đuôi câu trước khi chọn ○×.',
        zh: '三个常见陷阱：〜なければならない＝必须；〜てはならない＝不得；〜なくてもよい＝不必。先看清句尾再选○×。',
        fil: 'Tatlong bitag: 〜なければならない = dapat; 〜てはならない = bawal; 〜なくてもよい = hindi kailangan.'
      }
    }
  ];
  window.FAQ = (window.FAQ || []).concat(extra);
})();
