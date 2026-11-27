# VietNamExplore

Website du lịch tĩnh giới thiệu địa điểm, ẩm thực, văn hóa và kinh nghiệm đi lại ở Việt Nam. Đây là sản phẩm thực hành **W07 – Version Control with Git & GitHub** của nhóm 6 thành viên.

- **Repository:** [DauCaoDung132/VietNamExplore](https://github.com/DauCaoDung132/VietNamExplore)
- **GitHub Pages:** URL dự kiến `https://daucaodung132.github.io/VietNamExplore/` hiện trả HTTP 404 (kiểm tra 25/11/2026); chưa phát hành.
- **Báo cáo:** [docs/REPORT.md](docs/REPORT.md)
- **Nhật ký thay đổi:** [CHANGELOG.md](CHANGELOG.md)
- **Slide release/demo:** [docs/RELEASE_DEMO.html](docs/RELEASE_DEMO.html)
- **Phiên bản:** chuẩn bị `v1.0.0`; chưa có tag/release trên GitHub.

## Các trang

| Trang | File | Nội dung |
|---|---|---|
| Trang chủ | `index.html` | Giới thiệu dự án và điều hướng tới các nội dung chính |
| Địa điểm | `destinations.html` | Điểm đến du lịch theo vùng miền |
| Ẩm thực | `food.html` | Món ăn và đặc trưng ẩm thực Việt Nam |
| Văn hóa | `culture.html` | Lễ hội, trang phục và phong tục |
| Kinh nghiệm | `tips.html` | Hành lý, chi phí, di chuyển và checklist |
| Giới thiệu | `about.html` | Nhóm thực hiện, công nghệ và quy trình phát hành |

## Thành viên

| # | Mã sinh viên | Họ tên | GitHub | Phân công |
|---|---|---|---|---|
| 1 | 25127373 | Nguyễn Nhật Thùy Khanh | [@Yuru2812](https://github.com/Yuru2812) | Trang chủ, quy ước giao diện, Project Overview |
| 2 | 25127301 | Đậu Cao Dũng | [@DauCaoDung132](https://github.com/DauCaoDung132) | Địa điểm, branches, conflict |
| 3 | 25127366 | Nguyễn Diệp Vĩnh Khang | [@KhangNguyendotcpp](https://github.com/KhangNguyendotcpp) | Ẩm thực, Pull Request/review, conflict |
| 4 | 25127020 | Nguyễn Phi Bảo Bình | [@npbbinh2511-arch](https://github.com/npbbinh2511-arch) | Văn hóa, phối hợp Task 5 |
| 5 | 25127427 | Trương Cẩm Tú Nga | [@tunnnga2605-png](https://github.com/tunnnga2605-png) | Kinh nghiệm, revert và kiểm thử liên kết |
| 6 | 25127062 | Nguyễn Minh Huy | [@nmhuy1211](https://github.com/nmhuy1211) | Giới thiệu nhóm, release và GitHub Pages |

## Công nghệ và cấu trúc

HTML5, CSS3 và JavaScript thuần; không yêu cầu framework, backend hay cơ sở dữ liệu. Mã nguồn được quản lý bằng Git/GitHub. Cấu trúc hiện tại dùng `assets/css/`, `assets/js/` và `assets/images/` theo [quy ước giao diện](docs/DESIGN_GUIDE.md).

## Chạy và kiểm tra trên máy

Clone repository rồi mở `index.html` bằng trình duyệt hoặc chạy máy chủ tĩnh tại thư mục gốc:

```bash
git clone https://github.com/DauCaoDung132/VietNamExplore.git
cd VietNamExplore
python -m http.server 8000
```

Sau đó mở `http://localhost:8000`. Công cụ kiểm tra liên kết dùng thư viện chuẩn Python:

```bash
python tools/check_links.py
python tools/check_links.py --base https://daucaodung132.github.io/VietNamExplore/
```

Lệnh kiểm tra toàn site chỉ đạt khi cả sáu trang, tài liệu và liên kết nội bộ đã được hoàn thiện. URL Pages ở trên là URL dự kiến, không phải xác nhận rằng dịch vụ đã được bật.

## Quy trình cộng tác

- Làm tính năng trên feature branch và đưa thay đổi vào `main` qua Pull Request có review.
- Dùng commit nhỏ, thông điệp mô tả đúng thay đổi; thực hành `git status`, `git diff`, `git log` và `git show`.
- Không `git push --force` lên `main`, không viết lại lịch sử để che lỗi, không đưa token hoặc thông tin nhạy cảm vào commit.

## Phát hành và báo cáo

Các thay đổi Task 6 đang ở branch `feature/introduction`; chưa hợp nhất vào `main`. Các PR của nhóm #1, #3, #4 và #5 vẫn đang mở; tag `v1.0.0` chưa tồn tại và URL Pages hiện trả HTTP 404. Chỉ cập nhật trạng thái “đã phát hành” sau khi các PR được review/merge, website được triển khai và URL công khai được xác minh.

Báo cáo Markdown chính thức nằm tại `docs/REPORT.md`; slide demo nằm tại `docs/RELEASE_DEMO.html`; ảnh minh chứng lưu trong `docs/images/`.

### Cấu trúc thư mục

```text
VietNamExplore/
├── index.html, destinations.html, food.html, culture.html, tips.html, about.html
├── assets/
│   ├── css/       # stylesheet chung và stylesheet từng trang
│   ├── js/        # JavaScript từng trang
│   └── images/    # ảnh website
├── docs/
│   ├── DESIGN_GUIDE.md
│   ├── GIT_WORKFLOW.md
│   ├── REPORT.md
│   ├── RELEASE_DEMO.html
│   └── images/   # ảnh minh chứng
├── tools/check_links.py
├── README.md
├── CHANGELOG.md
└── .gitignore
```
