/* ============================================================
   Bổ sung đợt 7 — luật mới 2025, 特定小型原付, kỹ thuật đi xe
   ============================================================ */
window.QUESTIONS.push(
  /* ---------- 新基準原付 (luật 1/4/2025) ---------- */
  { id: 'n01', cat: 'basic', a: 1,
    q: '総排気量125cc以下で、構造上出すことができる最高出力が4.0kW以下の二輪車は、原付免許で運転できる。',
    exp: 'Đúng. Từ 1/4/2025, xe 125cc trở xuống có công suất tối đa 4.0kW (新基準原付) thuộc nhóm 原付, lái bằng bằng 原付.',
    ref: '道路交通法施行規則第1条の2' },

  { id: 'n02', cat: 'basic', a: 0,
    q: '最高出力が4.0kWを超える125cc以下の二輪車も、原付免許で運転できる。',
    exp: 'Sai. Xe 125cc không bị giới hạn công suất vẫn là 普通自動二輪, phải có bằng 普通二輪 (kể cả bản giới hạn 小型).',
    ref: '' },

  { id: 'n03', cat: 'basic', a: 1,
    q: '新基準原付にも、法定速度30km/hが適用される。',
    exp: 'Đúng. 新基準原付 vẫn là 一般原付, nên giữ nguyên giới hạn 30km/h.',
    ref: '道路交通法施行令第11条' },

  { id: 'n04', cat: 'basic', a: 1,
    q: '新基準原付も、二段階右折をしなければならない。',
    exp: 'Đúng. Quy định 二段階右折 áp dụng cho mọi 一般原付, kể cả xe 125cc công suất thấp.',
    ref: '道路交通法第34条' },

  { id: 'n05', cat: 'basic', a: 1,
    q: '新基準原付も、二人乗りをしてはいけない。',
    exp: 'Đúng. 原付 chỉ chở 1 người, không phụ thuộc dung tích 50cc hay 125cc.',
    ref: '道路交通法施行令第23条' },

  { id: 'n06', cat: 'basic', a: 0,
    q: '新基準原付のナンバープレートは薄黄色である。',
    exp: 'Sai. 新基準原付 dùng biển TRẮNG giống 原付 50cc. Biển vàng nhạt là 原付二種 50–90cc.',
    ref: '' },

  { id: 'n07', cat: 'basic', a: 1,
    q: '新基準原付は、高速自動車国道や自動車専用道路を通行できない。',
    exp: 'Đúng. Dù 125cc, xe vẫn là 原付 nên bị cấm lên đường cao tốc.',
    ref: '高速自動車国道法第17条' },

  /* ---------- 特定小型原付 ---------- */
  { id: 'n08', cat: 'basic', a: 1,
    q: '特定小型原動機付自転車の最高速度は20km/hである。',
    exp: 'Đúng. 特定小型原付 (xe điện nhỏ, ván trượt điện) giới hạn 20km/h.',
    ref: '道路交通法施行規則第1条の2' },

  { id: 'n09', cat: 'basic', a: 1,
    q: '特定小型原付を運転できるのは、満16歳以上の人である。',
    exp: 'Đúng. Đủ 16 tuổi, không cần bằng lái nhưng phải tuân thủ luật giao thông.',
    ref: '道路交通法第64条' },

  { id: 'n10', cat: 'basic', a: 0,
    q: '特定小型原付を運転するときは、ヘルメットを着用しなければならない。',
    exp: 'Sai. Với 特定小型原付, đội mũ là 努力義務 (nên làm), không bắt buộc như 原付 thường.',
    ref: '道路交通法第71条の4' },

  { id: 'n11', cat: 'basic', a: 1,
    q: '特定小型原付は、車道を通行するのが原則である。',
    exp: 'Đúng. Đi trên lòng đường; chỉ được đi vào phần đường dành cho người đi bộ khi có biển cho phép và phải chạy rất chậm.',
    ref: '' },

  { id: 'n12', cat: 'basic', a: 0,
    q: '特定小型原付は、歩道を自由に通行することができる。',
    exp: 'Sai. Mặc định là đi dưới lòng đường; muốn lên vỉa hè phải có biển cho phép và giữ tốc độ rất thấp.',
    ref: '' },

  /* ---------- Cấu trúc đề thi ---------- */
  { id: 'n13', cat: 'basic', a: 1,
    q: '原付の学科試験は、文章問題46問とイラスト問題2問の合計48問である。',
    exp: 'Đúng. 46 câu chữ × 1 điểm + 2 câu hình × 2 điểm = 50 điểm.',
    ref: '道路交通法施行規則第25条' },

  { id: 'n14', cat: 'basic', a: 1,
    q: 'イラスト問題は、1問につき3つの小問があり、3つすべて正解すると2点になる。',
    exp: 'Đúng. Sai một tiểu hỏi là mất cả 2 điểm của câu đó.',
    ref: '' },

  { id: 'n15', cat: 'basic', a: 0,
    q: '原付の学科試験は50問で、1問1点である。',
    exp: 'Sai. Chỉ 46 câu chữ là 1 điểm; 2 câu hình tính 2 điểm mỗi câu.',
    ref: '' },

  /* ---------- 二輪車の乗り方 ---------- */
  { id: 'n16', cat: 'bike', a: 1,
    q: 'カーブを曲がるときは、カーブに入る前に十分減速しておく。',
    exp: 'Đúng. Vào cua mới phanh rất dễ trượt bánh và mất lái.',
    ref: '' },

  { id: 'n17', cat: 'bike', a: 0,
    q: 'カーブの中では、ブレーキを握りながら曲がるのが基本である。',
    exp: 'Sai. Phải giảm tốc TRƯỚC cua; phanh trong cua làm bánh mất bám và dễ ngã.',
    ref: '' },

  { id: 'n18', cat: 'bike', a: 1,
    q: 'ブレーキをかけるときは、前輪と後輪を同時にかけるのがよい。',
    exp: 'Đúng. Dùng cả hai phanh giúp xe dừng êm và không bị trượt bánh.',
    ref: '' },

  { id: 'n19', cat: 'bike', a: 1,
    q: '前輪のブレーキだけを強く握ると、転倒するおそれがある。',
    exp: 'Đúng. Bánh trước bó cứng dễ làm xe trượt và ngã.',
    ref: '' },

  { id: 'n20', cat: 'bike', a: 1,
    q: 'マンホールのふたや白線の上は、雨の日に特に滑りやすい。',
    exp: 'Đúng. Kim loại và vạch sơn ướt có độ bám rất kém.',
    ref: '' },

  { id: 'n21', cat: 'bike', a: 1,
    q: '道路の溝のふた（グレーチング）は、できるだけ避けて通行する。',
    exp: 'Đúng. Bánh xe nhỏ rất dễ lọt hoặc trượt trên thanh sắt.',
    ref: '' },

  { id: 'n22', cat: 'bike', a: 0,
    q: '強い横風を受けても、速度を落とす必要はない。',
    exp: 'Sai. Phải giảm tốc và giữ lái chắc, nhất là trên cầu và lúc ra khỏi hầm.',
    ref: '' },

  { id: 'n23', cat: 'bike', a: 1,
    q: '坂道で発進するときは、後輪のブレーキを使って車体を支えるとよい。',
    exp: 'Đúng. Giữ phanh sau để xe không trôi, rồi từ từ nhả khi xe chạy.',
    ref: '' },

  { id: 'n24', cat: 'bike', a: 0,
    q: '荷物を積むときは、できるだけ高く積んだ方が安定する。',
    exp: 'Sai. Hàng phải để thấp và cân đều hai bên; chất cao làm xe chòng chành.',
    ref: '' },

  { id: 'n25', cat: 'bike', a: 1,
    q: '夜間は、ライトで照らせる範囲より先の見えない部分に注意する。',
    exp: 'Đúng. Đèn chỉ soi được một đoạn, phải giảm tốc để kịp xử lý.',
    ref: '' },

  { id: 'n26', cat: 'bike', a: 0,
    q: '雨の日は、タイヤの空気圧を高くすると安全である。',
    exp: 'Sai. Áp suất cao làm giảm diện tích tiếp xúc, càng dễ trượt.',
    ref: '' },

  { id: 'n27', cat: 'bike', a: 1,
    q: '二輪車は車体が小さいので、自動車から見落とされやすい。',
    exp: 'Đúng. Luôn giả định người khác không thấy mình mà chủ động phòng tránh.',
    ref: '' },

  /* ---------- Biển báo & quy định theo nhóm xe ---------- */
  { id: 'n28', cat: 'sign', a: 1,
    q: '補助標識に「原付を除く」とある規制は、原付には適用されない。',
    exp: 'Đúng. Biển phụ ghi rõ đối tượng loại trừ thì 原付 được đi bình thường.',
    ref: '交通の方法に関する教則 付表4' },

  { id: 'n29', cat: 'sign', a: 1,
    q: '「原付」と書かれた規制は、新基準原付にも適用される。',
    exp: 'Đúng. 新基準原付 vẫn là 一般原付, nên thuộc đối tượng của biển ghi 原付.',
    ref: '' },

  { id: 'n30', cat: 'sign', a: 0,
    q: '補助標識の「自二輪」には、新基準原付も含まれる。',
    exp: 'Sai. 自二輪 là xe 二輪 cỡ lớn và 普通二輪; 新基準原付 không nằm trong nhóm đó.',
    ref: '交通の方法に関する教則 付表4' },

  { id: 'n31', cat: 'sign', a: 0,
    q: '原付二種（51〜125cc）は、原付免許で運転できる。',
    exp: 'Sai. 原付二種 cần bằng 小型自動二輪; bằng 原付 chỉ dùng cho 原付一種 và 新基準原付.',
    ref: '道路交通法第84条' },

  { id: 'n32', cat: 'sign', a: 1,
    q: '排気量90cc超125cc以下の原付二種のナンバープレートは薄桃色である。',
    exp: 'Đúng. 50–90cc là vàng nhạt, 90–125cc là hồng nhạt, 新基準原付 là trắng.',
    ref: '' },

  { id: 'n33', cat: 'sign', a: 0,
    q: 'すべての原付は、ナンバープレートの色が同じである。',
    exp: 'Sai. Màu biển phân biệt loại xe: trắng, vàng nhạt, hồng nhạt.',
    ref: '' },

  /* ---------- Vạch kẻ & khoảng cách ---------- */
  { id: 'n34', cat: 'mark', a: 1,
    q: '安全地帯の左側と、その前後10m以内は駐停車禁止である。',
    exp: 'Đúng. Khoảng cách chuẩn quanh 安全地帯 là 10m, không phải 5m.',
    ref: '道路交通法第44条' },

  { id: 'n35', cat: 'mark', a: 0,
    q: '安全地帯の前後は、5m以内が駐停車禁止である。',
    exp: 'Sai. Là 10m. Con số 5m dành cho giao lộ và vạch qua đường.',
    ref: '' },

  { id: 'n36', cat: 'mark', a: 1,
    q: '横断歩道の前後5m以内は、駐停車禁止である。',
    exp: 'Đúng. Chừa 5m trước và sau vạch qua đường.',
    ref: '道路交通法第44条' },

  { id: 'n37', cat: 'mark', a: 0,
    q: 'バス停は、標識から5m以内が駐停車禁止である。',
    exp: 'Sai. Là 10m tính từ cột biển trạm xe buýt.',
    ref: '' },

  /* ---------- Giao lộ ---------- */
  { id: 'n38', cat: 'cross', a: 1,
    q: '環状交差点（ラウンドアバウト）では、時計回りに通行する。',
    exp: 'Đúng. Nhật đi bên trái nên vòng xuyến chạy theo chiều kim đồng hồ.',
    ref: '道路交通法第35条の2' },

  { id: 'n39', cat: 'cross', a: 0,
    q: '環状交差点では、反時計回りに通行する。',
    exp: 'Sai. Ngược chiều là cực kỳ nguy hiểm; phải đi theo chiều kim đồng hồ.',
    ref: '' },

  { id: 'n40', cat: 'cross', a: 1,
    q: '環状交差点に入るときは、すでに環内を走っている車が優先である。',
    exp: 'Đúng. Xe vào phải nhường xe đang chạy trong vòng xuyến.',
    ref: '' },

  { id: 'n41', cat: 'cross', a: 0,
    q: '新基準原付は、二段階右折をする必要がない。',
    exp: 'Sai. Vẫn phải rẽ phải 2 bước như mọi 一般原付.',
    ref: '道路交通法第34条' },

  /* ---------- Tốc độ & đường ---------- */
  { id: 'n43', cat: 'road', a: 1,
    q: '原付は、車両通行帯のない道路では道路の左側に寄って通行する。',
    exp: 'Đúng. Đi sát bên trái phần đường, không đi giữa.',
    ref: '道路交通法第18条' },

  { id: 'n44', cat: 'road', a: 1,
    q: '原付も、進路を変えるときは3秒前までに合図をしなければならない。',
    exp: 'Đúng. Đổi làn hay rẽ đều phải xi nhan trước 3 giây.',
    ref: '道路交通法施行令第21条' },

  { id: 'n45', cat: 'road', a: 0,
    q: '原付は、自動車専用道路を通行することができる。',
    exp: 'Sai. 原付 bị cấm, kể cả 新基準原付 125cc.',
    ref: '' },

  { id: 'n46', cat: 'road', a: 1,
    q: '原付は、高速自動車国道の料金所手前で引き返さなければならない。',
    exp: 'Đúng. Vì không được vào cao tốc, thấy biển cấm là phải quay lại từ trước.',
    ref: '' },

  { id: 'n47', cat: 'road', a: 0,
    q: '原付は、道路の中央寄りを走った方が自動車に目立つので安全である。',
    exp: 'Sai. Đi giữa đường vừa vi phạm vừa dễ bị ép.',
    ref: '' },

  /* ---------- An toàn & tải trọng ---------- */
  { id: 'n48', cat: 'safe', a: 1,
    q: '原付の積載物の高さは、地上から2m以内でなければならない。',
    exp: 'Đúng. Tính từ mặt đất, không phải từ yên xe.',
    ref: '道路交通法施行令第23条' },

  { id: 'n49', cat: 'safe', a: 1,
    q: '原付の積載物の長さは、積載装置の長さに0.3mを加えた範囲までである。',
    exp: 'Đúng. Vượt quá 0.3m là vi phạm.',
    ref: '' },

  { id: 'n50', cat: 'safe', a: 0,
    q: '原付は、積載量60kgまで荷物を積むことができる。',
    exp: 'Sai. Giới hạn của 原付 là 30kg; 60kg là của xe 51cc trở lên.',
    ref: '' },

  { id: 'n51', cat: 'safe', a: 1,
    q: '原付の日常点検では、タイヤの空気圧とブレーキの効きを確認する。',
    exp: 'Đúng. Hai thứ này ảnh hưởng trực tiếp đến khả năng dừng xe.',
    ref: '' },

  /* ---------- Sự cố ---------- */
  { id: 'n52', cat: 'emg', a: 0,
    q: '物損事故でけが人がいないときは、警察への通報は不要である。',
    exp: 'Sai. Vẫn phải báo cảnh sát, dù chỉ hỏng xe.',
    ref: '道路交通法第72条' },

  { id: 'n53', cat: 'emg', a: 1,
    q: '原付でも、自賠責保険への加入が義務付けられている。',
    exp: 'Đúng. Không có 自賠責 là không được lưu thông.',
    ref: '自動車損害賠償保障法' },

  { id: 'n54', cat: 'emg', a: 1,
    q: '事故のあと、けが人が動けないときは、その場を動かさずに救急を呼ぶ。',
    exp: 'Đúng. Di chuyển sai cách có thể làm chấn thương nặng hơn.',
    ref: '' },

  { id: 'n55', cat: 'emg', a: 0,
    q: '事故現場では、写真を撮ると証拠にならないので撮る必要はない。',
    exp: 'Sai. Ảnh hiện trường là bằng chứng quan trọng khi xử lý bảo hiểm.',
    ref: '' },

  { id: 'n56', cat: 'emg', a: 1,
    q: '台風で冠水した道路は、無理に走行しない。',
    exp: 'Đúng. Nước ngập che ổ gà và có thể làm chết máy giữa dòng.',
    ref: '' }
);
