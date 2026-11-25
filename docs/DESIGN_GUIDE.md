# Quy ước Giao diện Chung — VietNamExplore

Tài liệu này giúp 6 thành viên thống nhất cấu trúc HTML, đường dẫn file và bảng màu chung cho website **VietNamExplore**.

## 1. Cấu trúc đường dẫn file

Mọi trang HTML đặt ở thư mục gốc và nhúng `assets/css/style.css` trước file CSS riêng của từng trang:

```html
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/<ten-trang>.css">
<script src="assets/js/<ten-trang>.js" defer></script>
```

| Thành viên | Trang HTML | File CSS | File JS | Thư mục ảnh |
| :--- | :--- | :--- | :--- | :--- |
| TV 1 | `index.html` | `assets/css/home.css` | `assets/js/home.js` | `assets/images/banners/` |
| TV 2 | `destinations.html` | `assets/css/destinations.css` | `assets/js/destinations.js` | `assets/images/destinations/` |
| TV 3 | `food.html` | `assets/css/food.css` | `assets/js/food.js` | `assets/images/food/` |
| TV 4 | `culture.html` | `assets/css/culture.css` | `assets/js/culture.js` | `assets/images/culture/` |
| TV 5 | `tips.html` | `assets/css/tips.css` | `assets/js/tips.js` | *(nếu có)* |
| TV 6 | `about.html` | `assets/css/about.css` | `assets/js/about.js` | `assets/images/team/` |

## 2. Biến màu và Layout trong `assets/css/style.css`

- `--ink: #1e2830` (màu chữ chính)
- `--muted: #46545d` (màu chữ phụ / mô tả)
- `--nav: #23313b` (nền Header & Footer)
- `--green: #28683c` (màu nhấn chính / nút bấm)
- `--green-hover: #1f5230` (màu khi rê chuột)
- `--line: #d5dde0` (viền thẻ / khung)
- `--surface: #ffffff` (nền thẻ)
- `--bg: #f0f3f3` (nền chung toàn trang)
- Class `.page-width` giới hạn chiều rộng tối đa `74rem` và tự căn lề hai bên.
- Breakpoints responsive chung: `50rem` (tablet) và `35rem` (mobile).

## 3. Khung Header & Footer chuẩn

Đặt `aria-current="page"` vào đúng thẻ `<a>` của trang mình phụ trách:

```html
<a class="skip-link" href="#noi-dung">Đến nội dung chính</a>
<header class="site-header">
  <div class="page-width header-inner">
    <a class="wordmark" href="index.html">VietNamExplore</a>
    <nav class="site-nav" aria-label="Điều hướng chính">
      <a href="index.html">Trang chủ</a>
      <a href="destinations.html">Địa điểm</a>
      <a href="food.html">Ẩm thực</a>
      <a href="culture.html">Văn hóa</a>
      <a href="tips.html">Kinh nghiệm</a>
      <a href="about.html">Giới thiệu</a>
    </nav>
  </div>
</header>

<main id="noi-dung">
  <!-- Nội dung riêng của từng trang -->
</main>

<footer class="site-footer">
  <div class="page-width footer-inner">
    <a class="wordmark" href="index.html">VietNamExplore</a>
    <div class="footer-meta">
      <p>Đồ án W07 — Version Control with Git &amp; GitHub · Nhóm VietNamExplore</p>
      <ul class="footer-links">
        <li><a href="destinations.html">Địa điểm</a></li>
        <li><a href="food.html">Ẩm thực</a></li>
        <li><a href="culture.html">Văn hóa</a></li>
        <li><a href="tips.html">Kinh nghiệm</a></li>
        <li><a href="about.html">Giới thiệu nhóm</a></li>
      </ul>
    </div>
  </div>
</footer>
```
