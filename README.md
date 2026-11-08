# 原付免許 50cc — App luyện thi bằng lái xe 50cc tại Nhật

Web app tĩnh, không cần server, không cần cài đặt. Mở `index.html` là chạy.

![Trang chủ](preview-home.png)

## Nội dung

- **278 câu hỏi ○×** tiếng Nhật, chia 7 nhóm (92 câu biển báo, 24 câu vạch kẻ đường).
- **Giải thích cả hai đáp án**: mỗi câu có 2 phần — vì sao đáp án đúng là đúng, và vì sao đáp án còn lại là sai.
- **Tra từ vựng khi chạm**: thuật ngữ tiếng Nhật trong câu hỏi được gạch chân; chạm vào sẽ hiện popup có cách đọc, nghĩa tiếng Việt. **128 từ**, trong đó 31 động từ nhận cả dạng chia (bấm 妨げて vẫn ra mục 妨げる).
- **Giao diện sáng/tối**: tự theo cài đặt máy lần đầu, có nút chuyển ở góc phải mọi màn hình, nhớ lựa chọn.
- **Credit tác giả** cuối trang chủ (ảnh, tên, link) — sửa trong `data/author.js`.
- **201 câu nói động lực** ngẫu nhiên ở cuối trang chủ, bấm ↻ để đổi câu khác.
- **Mức sẵn sàng**: dựa trên 5 đề thi thử gần nhất, app tự báo Đủ / Gần đạt / Chưa sẵn sàng.
- **Thi thử**: 50 câu ngẫu nhiên, đếm ngược 30 phút, chấm theo đúng luật (45/50 là đỗ).
- **Luyện theo nhóm**, **ôn câu sai**, **thống kê tiến độ**, lịch sử thi thử.
- Tiến độ lưu bằng `localStorage` — chỉ trên máy đang dùng, không gửi đi đâu.
- **Cài được lên điện thoại** (PWA): thêm vào màn hình chính, chạy toàn màn hình, dùng offline.
- **24 biển báo** minh hoạ vẽ bằng SVG (tự vẽ, không dùng ảnh của ai): 止まれ, 徐行, 一方通行, 駐車禁止, 駐停車禁止, 最高速度, 最低速度, 車両進入禁止, 車両通行止め, 通行止め, 追越し禁止, 転回禁止, 車両横断禁止, 二段階右折, 小回り右折, 指定方向外進行禁止, 歩行者専用, 歩行者等通行止め, 自転車専用, 横断歩道, 駐車可, 警笛鳴らせ, 高さ制限, 重量制限.

## Chạy

```
mở trực tiếp: gentsuki-app/index.html
```

Hoặc đưa lên hosting tĩnh (GitHub Pages, Netlify Drop, Cloudflare Pages) — chỉ cần upload cả thư mục.

## Cấu trúc

```
gentsuki-app/
├─ index.html
├─ manifest.webmanifest  # khai báo PWA (tên, icon, màn hình chính)
├─ sw.js                 # service worker — cache để dùng offline
├─ icons/                # icon 192/512/maskable/apple-touch
├─ assets/               # nơi để ảnh đại diện tác giả
├─ DEPLOY.md             # hướng dẫn public + đóng gói Android/iOS
├─ css/style.css
├─ js/app.js            # toàn bộ logic, vanilla JS, không build step
└─ data/
   ├─ questions.js      # 148 câu gốc
   ├─ q2.js             # 52 câu bổ sung (push vào mảng trên)
   ├─ q3.js             # 36 câu biển báo có hình
   ├─ q4.js             # 8 câu cho 4 biển bổ sung
   ├─ q5.js             # 24 câu vạch kẻ đường + 10 câu 5 biển mới
   ├─ traps.js          # "vì sao sai" cho từng câu, theo id
   ├─ vocab.js          # từ điển thuật ngữ: cách đọc + nghĩa
   ├─ vocab2.js         # bổ sung: từ khó + động từ (kèm dạng chia)
   ├─ author.js         # thông tin tác giả (credit cuối trang chủ)
   ├─ quotes.js         # 201 câu nói động lực (emoji + nội dung)
   └─ signs.js          # SVG biển báo
```

## Thêm / sửa câu hỏi

Mở `data/q2.js` (hoặc `questions.js`), thêm một object:

```js
{ id: 'x01', cat: 'sign', a: 1,
  q: '「止まれ」の標識がある交差点では、必ず一時停止しなければならない。',
  exp: 'Giải thích vì sao đáp án đúng là đúng.',
  ref: '道路交通法第43条' }        // ref tuỳ chọn
```

Rồi thêm dòng tương ứng vào `data/traps.js`:

```js
x01: 'Vì sao đáp án còn lại là sai.',
```

`cat` nhận một trong: `basic | sign | cross | road | safe | emg`.
`a`: `1` = câu đúng (○), `0` = câu sai (×).
`img` (tuỳ chọn): xem danh sách khoá trong `data/signs.js`.

Lưu file rồi tải lại trang. Không cần build.

## Về chuyện lấy dữ liệu từ trang web khác

**Được phép / an toàn**

- Câu hỏi do bạn tự viết lại từ **luật** (道路交通法, 施行令, 施行規則). Ở Nhật, văn bản luật không thuộc đối tượng được bảo hộ bản quyền (著作権法第13条), nên diễn giải lại từ luật là cách sạch nhất.
- Câu hỏi mẫu do cơ quan công quyền công bố (警察庁, 都道府県警察) — vẫn nên ghi nguồn.
- Nội dung bạn tự biên soạn hoặc mua bản quyền.

**Rủi ro**

- Copy nguyên văn câu hỏi/lời giải từ các trang luyện thi là xâm phạm bản quyền, kể cả khi trang đó miễn phí.
- Nhiều trang cấm crawl trong `robots.txt` hoặc điều khoản sử dụng.

## Độ chính xác

Bộ câu hỏi được biên soạn từ nội dung luật và các nguồn công khai, nhưng **không phải đề thi chính thức**. Đề thi thật do từng 都道府県 tổ chức và không công bố đầy đủ.

Thông tin kỳ thi dùng trong app:

- 50 câu ○×, 30 phút, 50 điểm, **45 điểm trở lên là đỗ** — theo [高知県警察: 学科試験上の注意事項](https://www.police.pref.kochi.lg.jp/docs/2023110700484/).
- 原付講習 bắt buộc, khoảng 3 giờ — theo [宮崎県警察: 原付講習](https://www.pref.miyazaki.lg.jp/police/licence/gentukikosyuu.html) và [高知県警察: 原付免許「学科試験」の案内](https://www.police.pref.kochi.lg.jp/docs/2024112700021/).
- Quy tắc 二段階右折 — theo [JAF](https://jaf.or.jp/common/kuruma-qa/category-bike/subcategory-technic/faq384).

Lệ phí, giấy tờ và lịch thi **khác nhau theo tỉnh** — luôn kiểm tra trang của 免許センター nơi bạn thi.

## Ghi chú kỹ thuật

- Không dùng thư viện ngoài, không fetch, nên chạy được cả bằng `file://`.
- Câu hỏi nằm trong file JS (không phải JSON) để tránh lỗi CORS khi mở trực tiếp.
- Từ vựng được bọc bằng regex một lượt (khớp dài nhất trước) nên không lồng nhau.
- `?demo=quiz|answered|exam|result|stats|word|q&id=s01` chỉ dùng để chụp ảnh/giới thiệu.
