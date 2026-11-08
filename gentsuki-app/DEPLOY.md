# Đưa app lên online & đóng gói thành app điện thoại

App là **web tĩnh** — không server, không database, không build. Nghĩa là đưa lên mạng chỉ là upload thư mục.

Đã chuẩn bị sẵn trong thư mục:

- `manifest.webmanifest` — khai báo tên, icon, chế độ toàn màn hình
- `sw.js` — service worker, cho phép dùng **offline** sau lần mở đầu
- `icons/` — icon 192, 512, maskable, apple-touch
- thẻ meta cho iOS (thêm vào màn hình chính)

---

## 1. Đưa lên online (chọn 1)

### Cách nhanh nhất — Netlify Drop (2 phút, miễn phí)

1. Vào <https://app.netlify.com/drop>
2. Kéo **cả thư mục `gentsuki-app`** vào trang
3. Nhận link dạng `https://ten-ngau-nhien.netlify.app`
4. Vào Site settings → đổi tên miền con nếu muốn

Không cần tài khoản để thử; muốn giữ link lâu dài thì tạo tài khoản miễn phí.

### Cloudflare Pages (miễn phí, nhanh ở Nhật)

1. <https://pages.cloudflare.com> → tạo project → **Direct Upload**
2. Upload thư mục, nhận link `*.pages.dev`

### GitHub Pages (miễn phí, dễ cập nhật về sau)

```bash
# trong thư mục gentsuki-app
git init
git add .
git commit -m "gentsuki app"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Vào repo → Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.
Link: `https://<user>.github.io/<repo>/`

> Đường dẫn trong app đều là **tương đối** nên chạy đúng cả ở thư mục con của GitHub Pages.

### Tên miền riêng

Mua ở Cloudflare Registrar / Namecheap (~10–15 USD/năm), trỏ vào Netlify hoặc Cloudflare Pages. Không bắt buộc — link miễn phí vẫn dùng tốt.

---

## 2. Cài lên điện thoại (PWA — không cần store)

Sau khi có link **https://**, mở bằng điện thoại:

**Android (Chrome):**
mở link → menu ⋮ → **Thêm vào màn hình chính** / *Install app*. Icon 原 xuất hiện, mở là chạy toàn màn hình, không có thanh địa chỉ.

**iOS (Safari — bắt buộc dùng Safari):**
mở link → nút Chia sẻ → **Thêm vào MH chính**.

Sau lần mở đầu tiên, service worker lưu toàn bộ app vào máy → **dùng offline được** (trên máy bay, trong phòng thi chờ gọi tên).

Hạn chế của PWA: không lên App Store/Play Store, không có push notification (không cần cho app này), và trên iOS đôi khi bị xoá cache nếu không mở lâu.

---

## 3. Đóng gói thành app Android / iOS

Có 2 hướng. Cả hai đều **cần máy build** (Android Studio / Xcode) — không build được trên máy Windows này.

### A. Android — TWA (Trusted Web Activity)

Cách nhẹ nhất: bọc website đã host thành app Play Store.

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://<link-app>/manifest.webmanifest
bubblewrap build
```

- Ra file `.aab` để upload Play Store
- Cần: tài khoản Google Play Developer **25 USD một lần**
- Cần thêm file `assetlinks.json` trên domain để ẩn thanh địa chỉ
- App sẽ **tải nội dung từ web** → phải có mạng lần đầu (sau đó service worker lo offline)

### B. Capacitor — đóng gói cả Android và iOS

Cách "đóng gói thật": nhúng toàn bộ file vào app, không phụ thuộc web.

```bash
npm init -y
npm i @capacitor/core @capacitor/cli
npx cap init "原付 50cc" com.example.gentsuki --web-dir=.
npx cap add android      # cần Android Studio + JDK
npx cap add ios          # cần macOS + Xcode
npx cap sync
npx cap open android     # build APK/AAB trong Android Studio
```

- **Android**: APK cài trực tiếp được (không cần store), hoặc AAB lên Play (25 USD).
- **iOS**: bắt buộc **macOS + Xcode**, và để phát hành cần **Apple Developer Program 99 USD/năm**. Không có Mac thì không làm được.
- App Store review khắt khe với app chỉ là web bọc lại (guideline 4.2 "minimum functionality") — nên thêm gì đó native hoặc dùng PWA.

### So sánh nhanh

| | Công sức | Chi phí | Lên store | Offline |
|---|---|---|---|---|
| PWA (thêm vào MH chính) | 0 | 0 | Không | Có |
| TWA (Android) | Thấp | 25 USD | Play Store | Có (sau lần đầu) |
| Capacitor (Android) | Trung bình | 25 USD nếu lên store | Play Store / APK | Có |
| Capacitor (iOS) | Cao (cần Mac) | 99 USD/năm | App Store | Có |

**Khuyến nghị:** dùng PWA trước. Chỉ khi thật sự cần có mặt trên store mới làm TWA/Capacitor.

---

## 4. Cập nhật nội dung sau khi đã public

1. Sửa `data/*.js`
2. **Tăng số version trong `sw.js`**: `const CACHE = 'gentsuki-v2';`
   (nếu không tăng, người dùng cũ vẫn thấy bản cũ do cache)
3. Upload lại thư mục

Với GitHub Pages: `git push` là xong, tự deploy.

---

## 5. Lưu ý trước khi public

- Nội dung câu hỏi là **tự biên soạn**, không phải đề chính thức — nên ghi rõ trong app (đã có ở trang chủ và mục Thông tin).
- Không đăng lại nguyên văn đề/câu hỏi từ trang khác khi chưa xin phép.
- Nếu thu thập tài khoản người dùng thì phát sinh nghĩa vụ về dữ liệu cá nhân; bản hiện tại **không thu thập gì** (chỉ localStorage trên máy người dùng) nên đơn giản hơn nhiều.
- Nếu muốn kiếm tiền: gắn quảng cáo hoặc bán bản Pro — nhưng khi đó cần trang chính sách riêng tư.
