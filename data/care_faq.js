/* ============================================================
   Bảo dưỡng, cách sử dụng & tự sửa lỗi nhỏ cho xe 50cc (chatbox)
   ============================================================ */
(function () {
  var extra = [
    {
      id: 'c_daily', screen: 'gear',
      kw: ['kiem tra truoc khi di', 'bao duong hang ngay', '日常点検', 'daily check', 'pre ride', 'kiem tra xe'],
      a: {
        vi: 'Trước mỗi lần đi, kiểm tra 5 mục trong 1 phút: lốp (căng, không dính đinh), phanh (bóp thấy ăn), đèn + còi, dầu máy/xích, gương và ốc. Thiếu 1 mục cũng có thể thành 整備不良 khi bị kiểm tra.',
        zh: '每次出行前 1 分钟查 5 项：轮胎（气压、有无钉子）、刹车（捏得动且有阻力）、灯与喇叭、机油/链条、后视镜与螺丝。少一项都可能被认定为 整備不良。',
        fil: 'Bago bumiyahe, 1 minutong check ng 5: gulong (pressure, pako), preno, ilaw at busina, langis/chain, salamin at turnilyo. Kapag may kulang, puwedeng maging 整備不良.'
      }
    },
    {
      id: 'c_oil', screen: 'gear',
      kw: ['thay dau', 'dau may', 'oil change', 'オイル', 'langis', 'thay nhot'],
      a: {
        vi: 'Thay dầu máy mỗi 3.000 km hoặc 6 tháng (xe chạy nhiều/đường bụi thì 2.000 km). Dùng 10W-30 hoặc 10W-40 theo sách xe, đổ đúng mức que thăm — thừa dầu cũng hại máy. Kiểm tra mức dầu mỗi 2 tuần khi máy nguội.',
        zh: '机油每 3,000 km 或 6 个月换（多尘/骑得多则 2,000 km）。按说明书用 10W-30 或 10W-40，油尺到刻度即可，过多也伤发动机。每两周冷车检查油位。',
        fil: 'Palitan ang langis every 3,000 km o 6 buwan (2,000 km kung maalikabok). Gumamit ng 10W-30 o 10W-40 ayon sa manual, tama lang sa dipstick. Check level every 2 linggo, malamig ang makina.'
      }
    },
    {
      id: 'c_tire', screen: 'gear',
      kw: ['ap suat lop', 'bom lop', 'tire pressure', 'タイヤ', 'gulong', 'lop non'],
      a: {
        vi: 'Áp suất lốp theo tem dán trên xe (thường 1,5–2,0 kgf/cm²). Kiểm tra 2 tuần/lần khi lốp nguội. Gai lốp mòn dưới 1,6 mm hoặc nứt chân gai thì thay. Lốp non làm xe nặng tay lái và dễ trượt khi mưa.',
        zh: '胎压按车身贴纸（一般 1.5–2.0 kgf/cm²），每两周冷胎检查。胎纹低于 1.6 mm 或胎侧有裂纹就换。气压不足会变重、雨天易滑。',
        fil: 'Pressure ayon sa sticker (karaniwang 1.5–2.0 kgf/cm²), check every 2 linggo habang malamig. Palitan kapag tread <1.6 mm o may bitak. Mahina ang hangin = mabigat at madulas sa ulan.'
      }
    },
    {
      id: 'c_brakepad', screen: 'gear',
      kw: ['ma phanh', 'brake pad', 'ブレーキパッド', 'brake shoe', 'thay phanh'],
      a: {
        vi: 'Má phanh mòn còn dưới 3 mm thì thay. Dấu hiệu: bóp phanh thấy trơn, phải bóp sâu hơn trước, hoặc nghe tiếng rít kim loại. Kiểm tra cùng lúc phanh trước và sau, và chỉnh độ căng dây phanh sau nếu cần.',
        zh: '刹车片磨损到 3 mm 以下就换。征兆：刹车变软、要捏得更深、出现金属摩擦声。前后一起检查，必要时调后刹拉线松紧。',
        fil: 'Palitan ang brake pad kapag <3 mm. Senyales: malambot, kailangan mas malalim ang piga, may metal na ingay. Sabay check ang harap at likod, adjust ang cable kung kailangan.'
      }
    },
    {
      id: 'c_chainmaint', screen: 'gear',
      kw: ['cang xich', 'boi tron xich', 'chain lube', 'チェーン', 'chain tension', 'xich keu'],
      a: {
        vi: 'Xích đúng độ căng khi bấm giữa xích thấy lún khoảng 2–3 cm. Bôi dầu xích mỗi 500 km hoặc sau khi mưa; rửa sạch trước khi tra. Xích khô kêu lạch cạch, nhanh mòn nhông và có thể tuột.',
        zh: '链条中段压下约 2–3 cm 为正常松紧。每 500 km 或雨后上链条油，先清洁再上。太干会响、加速齿轮磨损甚至脱落。',
        fil: 'Tamang tension: 2–3 cm ang lubog sa gitna. Lagyan ng chain oil every 500 km o pagkatapos ng ulan, linisin muna. Kapag tuyo, maingay at mabilis masira ang sprocket.'
      }
    },
    {
      id: 'c_battcare', screen: 'gear',
      kw: ['sac ac quy', 'cham ac quy', 'battery charge', 'バッテリー', 'baterya', 'ac quy yeu'],
      a: {
        vi: 'Ắc quy: giữ cọc sạch, thỉnh thoảng bôi mỡ chống oxy hóa. Xe ít đi thì sạc mỗi 1–2 tháng bằng sạc 12V nhỏ. Tuổi thọ 2–3 năm; đề yếu dần, đèn mờ là dấu hiệu phải thay.',
        zh: '电瓶：保持接线柱清洁，偶尔涂防氧化油脂。很少骑就每 1–2 个月用 12V 小充电器补电。寿命 2–3 年；启动变弱、灯变暗就该换。',
        fil: 'Battery: malinis ang terminals, lagyan ng grease paminsan. Kung bihira gamitin, i-charge every 1–2 buwan gamit 12V charger. 2–3 taon ang buhay; mahinang starter o malabong ilaw = palitan na.'
      }
    },
    {
      id: 'c_plug', screen: 'gear',
      kw: ['bugi', 'spark plug', 'プラグ', 'sparkplug', 'bugi den'],
      a: {
        vi: 'Bugi: tháo kiểm tra mỗi 3.000 km. Sứ trắng/ nâu nhạt là tốt, đen ướt là thừa xăng, trắng xám là thiếu xăng. Khe hở 0,6–0,7 mm, siết vừa tay tránh cháy ren. Bugi mòn làm khó nổ và tốn xăng.',
        zh: '火花塞：每 3,000 km 拆检。瓷芯浅褐正常，湿黑＝混合气过浓，灰白＝过稀。间隙 0.6–0.7 mm，拧紧但别过度以免滑牙。',
        fil: 'Spark plug: check every 3,000 km. Light brown = okay; basa at itim = sobrang gas; puti/abo = kulang. Gap 0.6–0.7 mm, huwag sobrang higpitan.'
      }
    },
    {
      id: 'c_filter', screen: 'gear',
      kw: ['loc gio', 'air filter', 'エアフィルター', 'filter', 'loc bui'],
      a: {
        vi: 'Lọc gió bẩn làm xe yếu, tốn xăng. Mỗi 3.000 km tháo ra thổi bụi; loại mút thì rửa xà phòng, khô rồi tra chút dầu lọc. Rách hoặc biến dạng thì thay (khoảng 1.000–2.000 ¥).',
        zh: '空滤脏会导致无力、费油。每 3,000 km 拆下吹尘；海绵式可用肥皂洗、晾干后少量上油。破损变形就换（约 1,000–2,000 日元）。',
        fil: 'Maruming air filter = mahina at malakas sa gas. Every 3,000 km hipan; kung foam, hugasan at tuyoin tapos lagyan ng konting oil. Palitan kung punit (¥1,000–2,000).'
      }
    },
    {
      id: 'c_fuse', screen: 'gear',
      kw: ['cau chi', 'fuse', 'ヒューズ', 'puse', 'mat dien'],
      a: {
        vi: 'Mất điện toàn xe: kiểm tra cầu chì trong hộp gần ắc quy. Cầu chì cháy thì thay đúng số A (thường 10A hoặc 15A) — không thay dây hay giấy bạc. Nếu thay rồi cháy lại, có chập điện, cần thợ.',
        zh: '全车没电：先查电瓶旁保险盒。熔断就换同安培数（常见 10A/15A），不要用铜丝或锡纸代替。换了又断说明短路，要找师傅。',
        fil: 'Walang kuryente: tingnan ang fuse malapit sa battery. Palitan ng parehong A (10A/15A), huwag wire o foil. Kung paulit-ulit, may short — kailangan ng mekaniko.'
      }
    },
    {
      id: 'c_bulb', screen: 'gear',
      kw: ['thay bong den', 'bong den', 'bulb', '電球', 'ilaw palit', 'den khong sang'],
      a: {
        vi: 'Thay bóng đèn: xác định loại (thường 12V 35/35W hoặc LED), tháo ốc/chụp nhựa, rút giắc, lắp bóng mới không chạm tay vào phần thủy tinh. Siết lại và thử đèn trước khi chạy. Đèn sai công suất có thể cháy cầu chì.',
        zh: '换灯泡：确认规格（常见 12V 35/35W 或 LED），拆螺丝/灯罩，拔插头，装新灯泡时不要摸玻璃部分。装回后先试灯再上路。功率不对可能烧保险。',
        fil: 'Palit bulb: alamin ang type (12V 35/35W o LED), tanggalin ang tornilyo/cover, hugutin ang socket, huwag hawakan ang salamin ng bulb. Subukan bago bumiyahe. Maling wattage, puwedeng sumunog ng fuse.'
      }
    },
    {
      id: 'c_wash', screen: 'gear',
      kw: ['rua xe', 'wash', '洗车', 'hugas motor', 've sinh xe'],
      a: {
        vi: 'Rửa xe: tránh xịt thẳng vào bugi, ống xả, ổ khóa và đầu nối điện. Dùng vòi áp lực thấp, xa 30 cm. Rửa xong lau khô, chạy một vòng cho nước bay hết. Không rửa khi máy còn nóng.',
        zh: '洗车：不要直冲火花塞、排气管、锁孔和电线接头。水压调低，距离 30 cm。洗完擦干，骑一小段把水震掉。发动机热时不要洗。',
        fil: 'Hugas: huwag direktahin ang tubig sa spark plug, tambutso, susian at wiring. Mahinang pressure, 30 cm layo. Patuyuin at paandarin sandali. Huwag hugasan kapag mainit ang makina.'
      }
    },
    {
      id: 'c_store', screen: 'gear',
      kw: ['de lau', 'khong di', 'storage', '長期保管', 'itago', 'bodega'],
      a: {
        vi: 'Để xe lâu không đi: đổ đầy xăng (giảm đọng nước), xả bớt hơi lốp hoặc kê chân, sạc ắc quy đầy, rửa sạch và bôi dầu xích, đậy bạt nơi khô. Mỗi 1–2 tháng nổ máy 10 phút hoặc sạc bình.',
        zh: '长期停放：加满油（减少水汽）、轮胎稍微放气或架起、电瓶充满、清洁并上链条油、盖车衣放干燥处。每 1–2 个月启动 10 分钟或补电。',
        fil: 'Itatago nang matagal: punuin ang gas, bahagyang palambutin ang gulong o i-stand, i-charge ang battery, linisin at lagyan ng chain oil, takpan sa tuyong lugar. I-start 10 minuto every 1–2 buwan.'
      }
    },
    {
      id: 'c_breakin', screen: 'gear',
      kw: ['chay roda', 'nhuong may', 'break in', '慣らし', 'break-in', 'bagong makina'],
      a: {
        vi: 'Xe mới hoặc vừa làm máy: 500 km đầu chạy dưới 30–40 km/h, tránh ga đột ngột và chở nặng. Thay dầu sau 500–1.000 km đầu. Đây là giai đoạn quyết định độ bền máy.',
        zh: '新车或刚大修：前 500 km 控制在 30–40 km/h，避免急加速和重载。500–1,000 km 时换第一次机油。这段决定发动机寿命。',
        fil: 'Bagong motor o bagong overhaul: unang 500 km, 30–40 km/h lang, iwasan biglang ga at mabigat na karga. Palitan ang langis after 500–1,000 km.'
      }
    },
    {
      id: 'c_fueltype', screen: 'gear',
      kw: ['loai xang', 'regular', 'レギュラー', 'gasolina', 'xang gi'],
      a: {
        vi: 'Đổ xăng レギュラー (regular) đúng loại ghi trên nắp bình. Không đổ ハイオク (high-octane) vì không cần và tốn tiền; tuyệt đối không pha dầu hay phụ gia lạ. Đổ tràn ra ngoài lau ngay để tránh hỏng sơn và cháy.',
        zh: '按油箱盖标注加 レギュラー（普通汽油）。不必加 ハイオク（高辛烷值），别混机油或来路不明的添加剂。溢出要马上擦干，避免伤漆和起火。',
        fil: 'Gamitin ang レギュラー (regular) ayon sa takip ng tangke. Hindi kailangan ang ハイオク. Huwag maghalo ng langis o kakaibang additive. Punasan agad ang tumapon.'
      }
    },
    {
      id: 'c_downhill', screen: 'gear',
      kw: ['xuong doc', 'do doc', 'downhill', '下り坂', 'pababa', 'phanh xuong doc'],
      a: {
        vi: 'Xuống dốc: dùng cả phanh trước và sau, bóp nhẹ và nhả đều (không giữ chặt liên tục gây cháy má phanh). Về số thấp để hãm bằng máy. Tuyệt đối không tắt máy khi xuống dốc vì mất phanh động cơ và đèn.',
        zh: '下坡：前后刹一起、轻捏轻放（长时间死捏会烧刹车片）。降挡用发动机制动。下坡绝不能熄火，会失去发动机制动与灯光。',
        fil: 'Pababa: gamitin parehong preno, piga at bitaw ng bahagya (huwag tuloy-tuloy para hindi masunog ang pad). Ibaba ang gear para engine brake. Huwag patayin ang makina.'
      }
    },
    {
      id: 'c_rust', screen: 'gear',
      kw: ['ri set', 'oc long', 'rust', 'サビ', 'kalawang', 'xiết ốc'],
      a: {
        vi: 'Ốc rung lỏng và rỉ sét: siết lại ốc gương, gác chân, ốp nhựa mỗi tháng. Xịt RP7/WD-40 vào ốc rỉ, để 10 phút rồi tháo. Tra mỡ vào cọc ắc quy và chân chống. Ốc gương lỏng là lỗi hay gặp và nguy hiểm.',
        zh: '螺丝松动与生锈：每月检查后视镜、脚踏、塑料外壳螺丝。生锈处喷 RP7/WD-40，等 10 分钟再拆。电瓶柱与侧支架涂黄油。后视镜松是常见且危险的隐患。',
        fil: 'Maluwag at kinakalawang na turnilyo: higpitan ang salamin, footrest, fairing buwan-buwan. Mag-spray ng RP7/WD-40, hintayin 10 minuto. Lagyan ng grease ang battery terminal at side stand.'
      }
    },
    {
      id: 'c_diylimit', screen: 'gear',
      kw: ['tu sua', 'tu thay', 'diy', '整備不良', 'self repair', 'ayusin ko'],
      a: {
        vi: 'Tự sửa được những việc nhỏ: thay bóng, cầu chì, bơm lốp, tra dầu xích, siết ốc, vệ sinh bugi. Việc liên quan phanh, tay lái, khung, điện cao áp nên để thợ. Tự sửa sai dẫn tới 整備不良 — vừa bị phạt vừa nguy hiểm, và bảo hiểm có thể từ chối.',
        zh: '可以自己做的：换灯泡、保险丝、打气、上链条油、拧螺丝、清火花塞。刹车、车把、车架、高压电路应交给师傅。修错会构成 整備不良，既罚款又危险，保险也可能拒赔。',
        fil: 'Puwedeng DIY: bulb, fuse, hangin ng gulong, chain oil, turnilyo, spark plug. Ang preno, manibela, frame, high-voltage ay sa mekaniko. Maling DIY = 整備不良, multa at delikado, puwedeng tanggihan ng insurance.'
      }
    },
    {
      id: 'c_toolkit', screen: 'gear',
      kw: ['dung cu', 'bo do nghe', 'do nghe', 'toolkit', '工具', 'gamit', 'mang gi', 'mang theo gi'],
      a: {
        vi: 'Bộ đồ nghề nên mang theo: cờ lê 8–10–12, tua vít 2 đầu, kìm, bơm nhỏ hoặc bình keo vá, đèn pin, găng tay, dây rút. Kiểm tra áp suất bằng đồng hồ nhỏ nếu có. Tổng trọng lượng dưới 1 kg, để dưới yên.',
        zh: '随身工具：8–10–12 扳手、双头螺丝刀、钳子、小打气筒或补胎胶、手电、手套、扎带。有小胎压表更好。总重 1 kg 内，放座桶。',
        fil: 'Mga dalhin: 8–10–12 wrench, screwdriver, pliers, maliit na pump o tire sealant, flashlight, gloves, zip ties. Kung meron, tire gauge. Under 1 kg, sa ilalim ng upuan.'
      }
    },
    {
      id: 'c_tubeless', screen: 'gear',
      kw: ['va lop', 'keo va', 'tire sealant', 'パンク修理', 'tagpi gulong', 'temporary patch'],
      a: {
        vi: 'Vá tạm bằng keo: xịt keo vào van, bơm lên, chạy chậm tới tiệm gần nhất (dưới 5 km, dưới 30 km/h). Keo chỉ để về tiệm, không chạy lâu. Lốp có săm thì phải tháo vá, keo không hiệu quả.',
        zh: '补胎胶临时处理：从气门注入，打气后慢骑到最近车行（5 km 内、30 km/h 以下）。胶只用于应急，不能长期跑。有内胎的轮胎必须拆补。',
        fil: 'Temporary sealant: ilagay sa valve, pump, dahan-dahang tumungo sa shop (<5 km, <30 km/h). Pang-emergency lang. Kung may interior, kailangan tanggalin at tapalan.'
      }
    }
  ];
  window.FAQ = (window.FAQ || []).concat(extra);
})();
