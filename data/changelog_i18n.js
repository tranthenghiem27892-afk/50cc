/* ============================================================
   Bản dịch Lịch sử cập nhật — zh / fil (khớp 1:1 với changelog.js)
   ============================================================ */
window.CHANGELOG_I18N = {
  zh: [
    { t: '第一个版本', i: ['278 道日语 ○× 题，分 8 个分类', '模拟考试同真实：46 文字题 + 2 图题，50 分，45 合格，30 分钟', '进度与考试记录保存在本机'] },
    { t: '扩充题库', i: ['题库 278 → 503 → 619 题', '对正确与错误答案都给出说明', '新增 危険予測 图题（2 分，3 个判断）', '62 道语言陷阱题', '更新 2025 法规：新基準原付、特定小型原付'] },
    { t: '查词与读音', i: ['点句中任意日语词即可查义', '400+ 词条，含平假名读音与汉越音', 'あ 读音：汉字上方显示假名', '🔊 朗读：用手机自带日语发音读题'] },
    { t: '界面与工具', i: ['粉彩界面、8 色功能格、深色模式', '字体自托管，不依赖 Google', '201 条名言轮播', '日元 → 越南盾汇率卡与 90 天走势', '安装二维码、成绩分享图、PWA 安装按钮', '滑动与返回手势如原生 App'] },
    { t: '全量翻译', i: ['手译 681 道题与说明为越南语', '🌐 翻译按钮 3D 翻卡查看译文', '手译题目标注「人工翻译」'] },
    { t: '修复更新机制', i: ['CSS/JS 加 ?v= 强制加载新版', 'Service worker 对 HTML 改为网络优先', '升级时自动清理旧 SW 与缓存', '服务器 CSS 未更新时显示红色警告'] },
    { t: '单词卡、词汇与两个新页面', i: ['3D 翻转卡：正面日语，背面读音 + 释义', '补 26 个缺读音的复合词', '12 款常见车型，附厂商链接', '骑行装备：8 件必备/建议 + 6 项不要', '「重点词汇」固定高度，换词不跳动'] },
    { t: '换算、处罚表与模拟考', i: ['汇率卡翻转为 ¥ ↔ ₫ 换算器，自动千分位', '修复越南语输入法重复数字、光标跳动', '新增违规与 原付 处罚表', '修复第 47 题卡住：无法进入 48 题、无法交卷', '练习时左右滑动换题'] },
    { t: '插图与全面校对', i: ['为 12 个 危険予測 绘制插图，题目改为日语', '修正人行横道、路中线、路口、隧道口透视', '重读 619 题 + 36 条判断，修正 6 处法规错误', '图题译文预留位置，开关不改变布局', '翻译、选项、翻卡、主题均不再跳回顶部'] },
    { t: '紧急电话与更新记录', i: ['紧急电话页：110、119、118、171、#9110、大使馆、保护热线', '点号码直接拨打，附「打电话时说什么」', '在「安装与反馈」加入可展开的更新记录', '练习换题加入与单词卡相同的滑动效果'] },
    { t: '多语言与全内容翻译', i: ['移除韩语，保留越南语、中文、Filipino', '翻译界面、619 题解释、293 条「为什么错」、62 道语法', '翻译紧急电话、处罚表、车型、装备、情境、清单、手续、更新记录', '翻译 406 条词义与 201 条名言', '题目「翻译」按钮随语言显示'] },
    { t: '深化翻译与界面清理', i: ['翻译新法规页与 12 条插图解说', '翻译统计、语法、车型、汇率卡标签', '选择中文 / Filipino 时隐藏汉越音与越南语译文', 'meta 描述随语言变化'] },
    { t: '完成「为什么错」并修复翻译按钮', i: ['293/293 条「为什么错」已翻译', '修复 expTxt：解释按所选语言显示', '翻译按钮不再翻出空白；图题选满 3 个判断才显示解说', '补译练习页与反馈标签'] },
    { t: '翻译全部 619 道题', i: ['619/619 道题翻成中文与 Filipino（6 批）', '翻译按钮恢复：翻卡显示题目译文', '没有译文的题自动隐藏按钮', '选择 Tiếng Việt 时仍优先越南语'] }
,
    { t: '货币随语言变化', i: [
      '合并 v104–v119 更新记录，从 40 条精简到 14 条',
      '汇率卡与换算器按语言切换币种：越南语 → VND，中文 → CNY，Filipino → PHP',
      '汇率、90 天图表与缓存按币种分开保存',
      '切换语言时自动加载新币种的汇率'
    ] },
    { t: '应用内对话框与手机滑动', i: ['提前交卷改用应用内对话框 — 不再显示网址', '交卷、退出考试、清除进度提示按语言显示', '修复手机滑动换题：可从题干文字开始滑，补 touch-action 与触摸处理', '单词卡也启用 touch-action，手机上更顺'] },
    { t: '对话框对比度', i: ['深色模式下确认框改用浅色底，更易阅读'] },
    { t: '页脚、语言选择与自动主题', i: ['保留页脚「仅供个人使用，请勿复制、转载」', '全新语言选择：SVG 国旗按钮、圆角菜单、勾选当前语言', '切换语言同时更新标签页标题与描述', '明暗按钮新增「跟随系统」，系统切换时自动跟随'] },
    { t: '时钟、天气与问答助手', i: ['首页大卡新增时钟与按位置的天气，每 30 分钟自动更新，IP 兜底', '离线问答助手：19 个常见主题 + 搜索 619 道题，可打开对应页面或题目', '可选 AI（Gemini / OpenRouter），key 只存本机；出错自动回退到应用数据', '使用 key 时有安全提示，不发送个人数据'] },
    { t: '聊天按钮与交通法扩展', i: ['聊天按钮直接写在 HTML 并有备用样式，即使 JS/CSS 旧版也会显示', '重新设计按钮：电脑为带文字的胶囊，手机为圆形，带柔和光晕', '问答扩展到 45 个交通法主题：信号灯、标志、优先、超车、限速、铁路、载人、载货、高速、扣分、特定小型原付…', '未匹配的问题会推荐 4 个相近主题，方便继续点'] },
    { t: '扩展问答知识库', i: ['新增 26 个交通法主题：信号灯、标志、优先、超车、限速、铁路、载人、高速、扣分…', '按 反則金 表查罚款：闯红灯、超速、手机、头盔、载人、未开灯、转向灯、酒驾、无证、保险', '新增 16 种故障处理：爆胎、没油、电瓶、油门卡住、断链、摔倒、JAF 救援…', '新增 19 个保养与自助维修主题：机油、胎压、刹车片、火花塞、保险丝、磨合、临时补胎', '问答支持中文/Filipino 提问；共 80 个主题'] },
    { t: '修错与界面精简', i: ['修复「下一题」按钮失效（变量 next 覆盖函数）', '补全 619/619 条「为什么错」的中文与 Filipino 译文', '除首页外禁止下拉刷新', '换算器输入时立即显示千位分隔点', '首屏大卡缩小约 30%，三种语言标题都保持一行'] },
    { t: '新增印尼语和尼泊尔语', i: ['5 种语言：越南语 · 中文 · Filipino · Bahasa Indonesia · नेपाली', '翻译全部界面、619 道题、解释、「为什么错」、词汇、名言', '翻译问答、处罚表、紧急电话、情境手册、车型、保养', '汇率随币种切换：Rupiah (IDR) 与 Rupee (NPR)', 'id/ne 译文为自动生成，建议母语者复核'] }
  ],
  fil: [
    { t: 'Unang bersyon', i: ['278 ○× na tanong sa Hapon, 8 kategorya', 'Mock exam tulad ng tunay: 46 text + 2 larawan, 50 puntos, 45 passing, 30 minuto', 'Naka-save sa device ang progreso at history'] },
    { t: 'Pinalaki ang bank', i: ['278 → 503 → 619 tanong', 'Paliwanag sa tama at maling sagot', 'May 危険予測 larawan (2 puntos, 3 pahayag)', '62 bitag sa wika', 'Update sa batas 2025: 新基準原付, 特定小型原付'] },
    { t: 'Tingin-salita at bigkas', i: ['Pindutin ang salitang Hapon para sa kahulugan', '400+ salita, may hiragana at Hán-Việt', 'あ bigkas: furigana sa ibabaw ng kanji', '🔊 Basahin: boses Hapon ng device'] },
    { t: 'Disenyo at tools', i: ['Pastel na UI, 8 kulay na tile, dark mode', 'Self-host ang font, walang Google', '201 quote na umiikot', 'JPY → VND card na may 90-araw na chart', 'QR install, share ng resulta, PWA button', 'Swipe at back gesture na parang native'] },
    { t: 'Kumpletong salin', i: ['Manu-manong isinalin ang 681 tanong at paliwanag', '🌐 Salin: 3D flip para sa translation', 'May label na “manual translation”'] },
    { t: 'Ayos sa update', i: ['?v= sa CSS/JS para pilitin ang bagong file', 'Service worker: network-first sa HTML', 'Awtomatikong linisin ang lumang SW at cache', 'Pulang babala kung luma pa ang CSS sa server'] },
    { t: 'Flashcard, bokabularyo at dalawang bagong screen', i: ['3D flip card: Hapon sa harap, bigkas + kahulugan sa likod', '26 compound word na may bigkas', '12 modelong sasakyan, may link ng brand', 'Gear: 8 kailangan/dagdag + 6 dapat iwasan', 'Fixed ang taas ng “mahalagang salita”'] },
    { t: 'Converter, multa at mock exam', i: ['Rate card na ¥ ↔ ₫ converter, auto separator', 'Ayos sa Vietnamese IME na nagdodoble ng digit', 'Talaan ng paglabag at multa ng 原付', 'Ayos sa stuck sa #47: hindi makalipat sa 48, hindi makapag-submit', 'Swipe para lumipat habang nagpapraktis'] },
    { t: 'Larawan at buong audit', i: ['12 larawan para sa 危険予測, Hapon ang tanong', 'Ayos sa crosswalk, center line, kanto, tunnel', 'Binasa muli ang 619 + 36, 6 pagkakamali sa batas', 'May reserbang espasyo ang salin, hindi gumagalaw', 'Walang pagtalon sa itaas kapag nag-translate o pumili'] },
    { t: 'Emergency numbers at changelog', i: ['110, 119, 118, 171, #9110, embahada, hotline', 'Pindutin ang numero para tumawag, may “ano ang sasabihin”', 'May expandable changelog sa “I-install at feedback”', 'Pareho na ang swipe effect sa practice at flashcard'] },
    { t: 'Multi-language at buong salin', i: ['Tinanggal ang Korean; natira Việt, 中文, Filipino', 'Isinalin ang UI, 619 paliwanag, 293 “bakit mali”, 62 grammar', 'Isinalin ang emergency, multa, modelo, gear, sitwasyon, checklist, proseso, changelog', 'Isinalin ang 406 kahulugan at 201 quote', 'Ang “Salin” button ay ayon sa wika'] },
    { t: 'Malalim na salin at paglilinis', i: ['Isinalin ang bagong batas at 12 ilustrasyon', 'Isinalin ang label ng Stats, Grammar, modelo, rate card', 'Itinago ang Hán-Việt at Vietnamese kapag 中文 / Filipino', 'Meta description ayon sa wika'] },
    { t: 'Tapos ang “bakit mali” at ayos sa Salin button', i: ['293/293 “bakit mali” naisalin', 'Naayos ang expTxt: paliwanag ayon sa wika', 'Hindi na blangko ang Salin; larawan pagkatapos ng 3 sagot', 'Dinagdag ang salin sa practice page at feedback'] },
    { t: 'Isinalin lahat ng 619 tanong', i: ['619/619 tanong sa 中文 at Filipino (6 batch)', 'Bumalik ang Salin button: salin ng tanong sa likod', 'Kung walang salin, nakatago ang button', 'Vietnamese pa rin kapag Tiếng Việt'] },
    { t: 'Pera ayon sa wika', i: ['Pinagsama ang v104–v119 changelog, 40 naging 14', 'Rate card at converter ayon sa wika: Vietnamese → VND, 中文 → CNY, Filipino → PHP', 'Hiwalay ang rate, 90-araw na chart at cache kada pera', 'Pagpalit ng wika, awtomatikong naglo-load ng bagong rate'] },
    { t: 'Dialog sa app at swipe sa mobile', i: ['Ang paalala sa maagang submit ay dialog na sa app — wala nang URL', 'Isinalin ang submit, exit at reset na paalala ayon sa wika', 'Ayos sa swipe sa mobile: puwedeng magsimula sa salita sa tanong, may touch-action at touch handling', 'May touch-action din ang flashcard para swabe sa phone'] },
    { t: 'Kontrast ng dialog', i: ['Maliwanag ang background ng confirm sa dark mode, mas madaling basahin'] },
    { t: 'Footer, language picker at auto theme', i: ['Pinanatili ang footer na “personal use lamang, huwag kopyahin”', 'Bagong language picker: SVG flag na button, bilugan na menu, check sa napili', 'Pagpalit ng wika, naa-update din ang tab title at description', 'May “Ayon sa system” na mode ang light/dark button; awtomatikong sumasabay'] },
    { t: 'Orasan, panahon at chat assistant', i: ['May orasan at weather sa malaking card, 30 minuto ang update, IP fallback', 'Offline Q&A: 19 paksa + paghahanap sa 619 tanong, bukas ang tamang screen o tanong', 'Opsyonal na AI (Gemini / OpenRouter), key sa device lang; kapag error, balik sa app data', 'May babala sa seguridad at walang personal na datos na ipinapadala'] },
    { t: 'Chat button at batas trapiko', i: ['Nasa HTML na ang chat button at may backup style, lalabas kahit luma ang JS/CSS', 'Bagong disenyo: pill na may text sa desktop, bilog sa phone, may glow', 'Pinalawak sa 45 paksa ng batas trapiko: ilaw, senyales, priority, pag- overtake, speed, riles, pasahero, karga, expressway, puntos, 特定小型原付…', 'Kapag walang tugma, may 4 na suhestiyon na paksa'] },
    { t: 'Pinalawak ang Q&A', i: ['26 bagong paksa sa batas: ilaw, senyales, priority, overtake, speed, riles, pasahero, expressway, puntos…', 'Paghahanap ng multa mula sa 反則金: red light, speed, cellphone, helmet, pasahero, walang ilaw, signal, alak, walang lisensya, insurance', '16 na sitwasyon ng sira: flat, gas, battery, stuck throttle, putol chain, semplang, JAF rescue…', '19 paksa sa maintenance at DIY: langis, tire pressure, brake pad, spark plug, fuse, break-in, temporary patch', 'Sinusuportahan ang tanong sa 中文/Filipino; 80 paksa sa kabuuan'] },
    { t: 'Pag-aayos at pinaikling UI', i: ['Naayos ang “Susunod” na button (variable next sumasapaw sa function)', 'Kumpleto na ang 619/619 na “bakit mali” sa 中文 at Filipino', 'Naka-block ang pull-to-refresh maliban sa home', 'Agad lumalabas ang thousand separator habang nagta-type sa converter', 'Mas maliit ang hero (~30%), isang linya ang pamagat sa 3 wika'] },
    { t: 'Dagdag na Indonesian at Nepali', i: ['5 wika: Vietnamese · 中文 · Filipino · Bahasa Indonesia · नेपाली', 'Isinalin ang buong UI, 619 tanong, paliwanag, “bakit mali”, bokabularyo, quotes', 'Isinalin ang chatbox, multa, emergency, sitwasyon, modelo, maintenance', 'Rate ayon sa pera: Rupiah (IDR) at Rupee (NPR)', 'Machine-translated ang id/ne — ipasuri sa native speaker'] }
  ]
};
