/* ============================================================
   Sự cố thường gặp với xe 50cc & cách xử lý (cho chatbox)
   ============================================================ */
(function () {
  var extra = [
    {
      id: 't_start', screen: 'gear',
      kw: ['khong no may', 'xe khong no', 'khoi dong', 'de khong no', 'エンジン', 'won t start', 'ayaw mag start', 'starter'],
      a: {
        vi: 'Xe không nổ: kiểm tra công tắc tắt máy (kill switch), chân chống có bật lên chưa, còn xăng không, rồi mới đến ắc quy (đề yếu) và bugi. Nếu đề không quay: ắc quy yếu. Đẩy xe ra lề, bật đèn cảnh báo trước khi kiểm tra.',
        zh: '打不着火：先查熄火开关、侧支架是否收起、有没有油，再看电瓶（启动无力）与火花塞。启动马达不转＝电瓶弱。先把车推到路边并开危险灯再检查。',
        fil: 'Ayaw mag-start: tingnan ang kill switch, side stand, gasolina, tapos battery (mahina ang starter) at spark plug. Itulak sa gilid at buksan ang hazard bago mag-check.'
      }
    },
    {
      id: 't_fuel', screen: 'gear',
      kw: ['het xang', 'gas ku', 'ガス欠', 'out of fuel', 'naubusan'],
      a: {
        vi: 'Hết xăng: gạt van xăng sang vị trí dự trữ (RES/PRI) nếu có, chạy tới cây xăng gần nhất. Không có dự trữ thì dắt bộ trên lề, không đẩy xe giữa làn đường. Đổ đầy rồi trả van về ON.',
        zh: '没油：把油阀转到备用位置（RES/PRI，若有）再骑到最近加油站。没有备用就推车靠边，别停在车道中间。加满后把油阀转回 ON。',
        fil: 'Naubusan: ilipat ang fuel valve sa RES/PRI kung meron, tapos tumungo sa pinakamalapit na gas station. Kung wala, itulak sa gilid. Ib alik sa ON pagkatapos.'
      }
    },
    {
      id: 't_flat', screen: 'gear',
      kw: ['thung lop', 'xep lop', 'no lop', 'パンク', 'flat tire', 'flat', 'sabog gulong'],
      a: {
        vi: 'Thủng lốp: không bóp phanh gấp, giữ chắc tay lái, giảm ga từ từ rồi tấp vào lề. Bật đèn cảnh báo, dắt bộ tới tiệm hoặc gọi cứu hộ. Không chạy tiếp vì vành sẽ hỏng.',
        zh: '爆胎：不要急刹，握稳车把，慢慢收油靠边。开危险灯，推到车行或叫救援。不要继续骑，会毁轮圈。',
        fil: 'Flat: huwag biglang preno, humawak nang mahigpit, dahan-dahang magbagal at tumabi. Buksan ang hazard, itulak sa shop o tumawag ng tulong. Huwag ituloy, masisira ang rim.'
      }
    },
    {
      id: 't_battery', screen: 'gear',
      kw: ['ac quy', 'binh dien', 'battery', 'バッテリー', 'yeu binh', 'kho de'],
      a: {
        vi: 'Ắc quy yếu: đèn mờ, đề quay chậm hoặc chỉ kêu tạch tạch. Không đẩy nổ được với xe tay ga. Gọi cứu hộ hoặc nhờ kích bình đúng cực. Tuổi thọ thường 2–3 năm, thay khi đề yếu dần.',
        zh: '电瓶弱：灯变暗、启动马达转得慢或只响「哒哒」。踏板车不能推车启动。叫救援或用正确极性搭电。寿命一般 2–3 年。',
        fil: 'Mahina battery: malabo ang ilaw, mabagal ang starter o tumutunog lang. Hindi kayang itulak-start ang scooter. Tumawag ng tulong o magpa-jump start nang tama ang polarity. 2–3 taon ang buhay.'
      }
    },
    {
      id: 't_stall', screen: 'gear',
      kw: ['chet may', 'engst', 'エンスト', 'stall', 'namatay makina'],
      a: {
        vi: 'Chết máy giữa đường: bật đèn cảnh báo, tấp vào lề, về số thấp rồi thử đề lại. Kiểm tra xăng, chân chống, công tắc tắt máy. Nếu chết máy liên tục, dắt xe tới tiệm, đừng cố chạy tiếp.',
        zh: '途中熄火：开危险灯，靠边，回低挡再试着启动。检查油量、侧支架、熄火开关。反复熄火就推去车行，不要硬骑。',
        fil: 'Namatayan sa daan: buksan ang hazard, tumabi, ibaba ang gear at subukang i-start. Tingnan ang gas, side stand, kill switch. Kung paulit-ulit, itulak sa shop.'
      }
    },
    {
      id: 't_brake', screen: 'gear',
      kw: ['phanh hong', 'mat phanh', 'brake failure', 'ブレーキ', 'preno sira', 'phanh khong an'],
      a: {
        vi: 'Phanh kém hoặc mất phanh: dùng phanh còn lại, về số thấp để hãm bằng máy, bóp phanh từ từ chứ không bóp mạnh một lần. Dừng ở nơi an toàn rồi gọi cứu hộ. Tuyệt đối không tắt máy khi đang chạy.',
        zh: '刹车变弱或失灵：用还剩的一侧刹车，降挡用发动机制动，缓慢而持续地捏，不要一次捏死。停到安全处再叫救援。行驶中绝不能关钥匙。',
        fil: 'Mahina o nawalan ng preno: gamitin ang natitirang preno, ibaba ang gear para engine brake, dahan-dahang piga. Huminto sa safe at tumawag ng tulong. Huwag patayin ang makina habang tumatakbo.'
      }
    },
    {
      id: 't_throttle', screen: 'gear',
      kw: ['ket ga', 'ga tu tang', 'throttle', 'アクセル', 'stuck throttle', 'ayaw bumaba ng ga'],
      a: {
        vi: 'Kẹt ga (xe tự tăng tốc): bóp phanh, tắt công tắc tắt máy hoặc rút chìa, giữ lái và tấp lề. Không cúi xuống nhìn tay ga khi xe đang chạy. Sau đó gọi cứu hộ, không tự chạy tiếp.',
        zh: '油门卡住（自己加速）：捏刹车，按熄火开关或关钥匙，握稳车把靠边。行驶中不要低头看油门。之后叫救援，不要继续骑。',
        fil: 'Sumabit ang throttle (kusang bumibilis): pindutin ang preno, patayin ang kill switch o susi, humawak at tumabi. Huwag yumuko habang tumatakbo. Tumawag ng tulong.'
      }
    },
    {
      id: 't_chain', screen: 'gear',
      kw: ['dut xich', 'xich tung', 'chain', 'チェーン', 'chain off', 'kadena'],
      a: {
        vi: 'Xích tuột hoặc đứt: dừng ngay, không cố chạy. Xích đứt có thể khóa bánh sau. Dắt xe ra khỏi làn, gọi cứu hộ hoặc thợ. Kiểm tra độ căng xích mỗi 500 km và bôi trơn đều.',
        zh: '链条脱落或断裂：立即停车，不要硬骑。断链可能锁死后轮。推出车道，叫救援或车行。每 500 km 检查松紧并上油。',
        fil: 'Nalaglag o naputol ang chain: huminto agad, huwag ituloy. Puwedeng mag-lock ang rear wheel. Itulak palabas ng lane at tumawag ng tulong. Check tension every 500 km.'
      }
    },
    {
      id: 't_light', screen: 'gear',
      kw: ['chay den', 'den pha hong', 'headlight', 'ヘッドライト', 'ilaw sira', 'den khong sang'],
      a: {
        vi: 'Đèn pha cháy: ban đêm không được chạy tiếp vì vừa vi phạm vừa nguy hiểm. Tấp lề, bật đèn cảnh báo, thay bóng nếu có hoặc gọi cứu hộ. Ban ngày vẫn phải sửa trước khi đi tiếp vì luật bắt buộc bật đèn khi thiếu sáng.',
        zh: '大灯坏了：夜间不能继续骑，既违法又危险。靠边开危险灯，能换灯泡就换，否则叫救援。白天也要先修好，法律要求光线不足时开灯。',
        fil: 'Sira ang headlight: bawal tumuloy sa gabi, delikado at labag sa batas. Tumabi, hazard, palitan ang bulb o tumawag ng tulong. Sa umaga rin, dapat ayusin bago tumuloy.'
      }
    },
    {
      id: 't_overheat', screen: 'gear',
      kw: ['qua nhiet', 'nong may', 'overheat', 'オーバーヒート', 'sobrang init'],
      a: {
        vi: 'Máy quá nóng: dừng xe, tắt máy, chờ nguội 15–20 phút. Không mở nắp két nước khi còn nóng. Kiểm tra dầu máy và két nước (nếu có). Chạy tiếp khi vẫn còn nóng sẽ hại máy.',
        zh: '发动机过热：停车、熄火，等 15–20 分钟冷却。热时不要开水箱盖。检查机油与冷却液（若有）。还热就继续骑会伤发动机。',
        fil: 'Overheat: huminto, patayin ang makina, hintayin 15–20 minuto. Huwag buksan ang radiator cap kapag mainit. Check langis at coolant. Masisira ang makina kung ituloy.'
      }
    },
    {
      id: 't_fall', screen: 'gear',
      kw: ['nga xe', 'te xe', 'tai nan nga', 'fall', '転倒', 'natumba'],
      a: {
        vi: 'Bị ngã: kiểm tra thương tích của mình trước, sau đó tắt máy, bật đèn cảnh báo, dựng xe ra khỏi làn. Kiểm tra rò rỉ xăng, gương, phanh, tay lái. Nếu người đau hoặc xe hỏng nặng, gọi 119/110 và cứu hộ.',
        zh: '摔倒：先检查自己有没有受伤，再熄火、开危险灯、把车移到车道外。检查漏油、后视镜、刹车、车把。有人受伤或车坏得重，打 119/110 并叫救援。',
        fil: 'Natumba: tingnan muna ang sarili, tapos patayin ang makina, hazard, itabi ang motor. Check gas leak, salamin, preno, manibela. Kung may injury o malaking sira, tumawag ng 119/110 at rescue.'
      }
    },
    {
      id: 't_rain', screen: 'gear',
      kw: ['troi mua', 'duong tron', 'truot', 'rain', 'ulan', 'madulas'],
      a: {
        vi: 'Trời mưa trơn: giảm tốc 20–30%, tránh vạch kẻ trắng, nắp cống và vũng nước. Phanh sớm và nhẹ, tăng khoảng cách gấp đôi, bật đèn. Không nghiêng xe nhiều khi vào cua.',
        zh: '雨天路滑：减速 20–30%，避开白线、井盖和积水。提前轻刹，车距加倍，开灯。转弯不要压得太低。',
        fil: 'Maulan at madulas: bagalan ng 20–30%, iwasan ang puting linya, manhole at baha. Maagang magpreno nang mahina, doblehin ang distansya, buksan ang ilaw.'
      }
    },
    {
      id: 't_key', screen: 'gear',
      kw: ['mat chia khoa', 'quen chia khoa', 'key lost', '鍵', 'nawala susi', 'kunci'],
      a: {
        vi: 'Mất chìa khóa: không tự phá ổ hay đấu dây. Gọi thợ khóa chuyên xe máy, mang giấy tờ xe và bằng lái để chứng minh. Nếu xe còn bảo hiểm cứu hộ, gọi dịch vụ của họ trước.',
        zh: '钥匙丢了：不要自己撬锁或接线。叫专业摩托车开锁师傅，带上车辆证件与驾照证明身份。若保险含道路救援，先打救援电话。',
        fil: 'Nawala ang susi: huwag sirain ang susian o mag-jumper. Tumawag ng locksmith para sa motor, dalhin ang rehistro at lisensya. Kung may road rescue ang insurance, tumawag muna.'
      }
    },
    {
      id: 't_lock', screen: 'gear',
      kw: ['khoa co', 'tay lai bi khoa', 'handle lock', 'ハンドルロック', 'naka lock manibela'],
      a: {
        vi: 'Tay lái bị khóa cổ: cắm chìa, lắc nhẹ tay lái qua lại trong lúc xoay chìa. Không dùng lực mạnh làm cong chìa. Nếu vẫn không mở, xịt chút dầu bôi trơn vào ổ rồi thử lại.',
        zh: '车把锁死：插钥匙，一边左右轻晃车把一边转钥匙。不要用蛮力，会把钥匙弄弯。还不行就喷一点润滑剂进锁孔再试。',
        fil: 'Naka-lock ang manibela: isaksak ang susi, iwiggle nang bahagya ang manibela habang iniikot. Huwag pwersahin. Kung ayaw pa rin, maglagay ng lubricant sa susian.'
      }
    },
    {
      id: 't_rescue', screen: 'emg',
      kw: ['cuu ho', 'road service', 'jaf', 'ロードサービス', 'tulong', 'rescate'],
      a: {
        vi: 'Cần cứu hộ: bật đèn cảnh báo, đặt xe sát lề, đứng sau lan can nếu ở đường lớn. Gọi JAF (0570-00-8139) hoặc tổng đài cứu hộ của bảo hiểm. Chi phí thường 10.000–30.000 ¥ tuỳ quãng đường; nhiều gói 任意保険 có miễn phí.',
        zh: '需要救援：开危险灯，靠边停车，在大路上站到护栏后。打 JAF（0570-00-8139）或保险公司的救援电话。费用一般 1–3 万日元，视距离而定；不少 任意保険 含免费救援。',
        fil: 'Kailangan ng rescue: hazard, itabi, tumayo sa likod ng barrier sa malaking daan. Tumawag sa JAF (0570-00-8139) o road service ng insurance. Karaniwang ¥10,000–30,000; maraming 任意保険 may libreng rescue.'
      }
    },
    {
      id: 't_maint', screen: 'gear',
      kw: ['bao duong', 'thay dau', 'oil change', 'メンテ', 'maintenance', 'change oil'],
      a: {
        vi: 'Bảo dưỡng định kỳ: thay dầu máy mỗi 3.000 km hoặc 6 tháng; kiểm tra áp suất lốp mỗi 2 tuần; xích căng đúng và bôi trơn mỗi 500 km; má phanh mòn quá 3 mm thì thay; ắc quy 2–3 năm. Trước khi đi xa kiểm tra 5 mục: lốp, phanh, đèn, xích, dầu.',
        zh: '定期保养：机油每 3,000 km 或 6 个月换；胎压每两周查；链条每 500 km 上油并调紧；刹车片磨损超过 3 mm 就换；电瓶 2–3 年。长途前检查五项：轮胎、刹车、灯、链条、机油。',
        fil: 'Maintenance: langis every 3,000 km o 6 buwan; tire pressure every 2 linggo; chain lubricate at tension every 500 km; brake pad palitan kapag lampas 3 mm; battery 2–3 taon. Bago bumiyahe: gulong, preno, ilaw, chain, langis.'
      }
    }
  ];
  window.FAQ = (window.FAQ || []).concat(extra);
})();
