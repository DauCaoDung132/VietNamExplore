# Báo cáo dự án VietNamExplore — W07

> **Trạng thái cập nhật 25/11/2026:** Task 6 đã có code và tài liệu trên branch `feature/introduction` (commit `cb39ba9`). Chưa phải bản phát hành: chưa có PR của branch này, tag `v1.0.0` chưa tồn tại, GitHub Pages trả HTTP 404 và các PR nội dung của nhóm vẫn đang mở.

## Project Overview

VietNamExplore là website tĩnh giới thiệu du lịch Việt Nam, gồm sáu phần nội dung dự kiến: trang chủ, địa điểm, ẩm thực, văn hóa, kinh nghiệm và giới thiệu nhóm. Dự án dùng HTML, CSS, JavaScript cơ bản; mã nguồn được quản lý bằng Git/GitHub.

| Thông tin | Giá trị |
|---|---|
| Repository | [DauCaoDung132/VietNamExplore](https://github.com/DauCaoDung132/VietNamExplore) |
| GitHub Pages | URL dự kiến `https://daucaodung132.github.io/VietNamExplore/` trả HTTP 404 khi kiểm tra ngày 25/11/2026 |
| Báo cáo | `docs/REPORT.md` |
| Slide release/demo | `docs/RELEASE_DEMO.html` |
| Ảnh minh chứng | `docs/images/` |

## Team Contributions

| # | Mã sinh viên | Họ tên | GitHub | Phân công |
|---|---|---|---|---|
| 1 | 25127373 | Nguyễn Nhật Thùy Khanh | [@Yuru2812](https://github.com/Yuru2812) | Trang chủ, quy ước giao diện, Project Overview |
| 2 | 25127301 | Đậu Cao Dũng | [@DauCaoDung132](https://github.com/DauCaoDung132) | Địa điểm, branches, conflict |
| 3 | 25127366 | Nguyễn Diệp Vĩnh Khang | [@KhangNguyendotcpp](https://github.com/KhangNguyendotcpp) | Ẩm thực, Pull Request/review, conflict |
| 4 | 25127020 | Nguyễn Phi Bảo Bình | [@npbbinh2511-arch](https://github.com/npbbinh2511-arch) | Văn hóa, phối hợp Task 5 |
| 5 | 25127427 | Trương Cẩm Tú Nga | [@tunnnga2605-png](https://github.com/tunnnga2605-png) | Kinh nghiệm, revert và kiểm thử liên kết |
| 6 | 25127062 | Nguyễn Minh Huy | [@nmhuy1211](https://github.com/nmhuy1211) | Trang About, báo cáo và slide Task 6 trên branch `feature/introduction`; release còn chờ review/merge và deploy |

## Implementation and Evidence

### Task 1 — Repository và commit

- Kết quả/bằng chứng: nhóm bổ sung link repository, danh sách commit và cấu hình Git identity thực tế.

### Task 2 — Branches

- Kết quả/bằng chứng: nhóm bổ sung danh sách feature branch và commit tương ứng của từng thành viên.

### Task 3 — Pull Request và review

- Kết quả/bằng chứng: nhóm bổ sung link PR đã merge, người review và nhận xét review cụ thể.

### Task 4 — Merge conflict

- Kết quả/bằng chứng: nhóm bổ sung link/commit conflict, người tham gia và ảnh giải quyết conflict trong `docs/images/`.

### Task 5 — Git revert

- Kết quả/bằng chứng: nhóm bổ sung hash commit gây lỗi, hash commit revert và ảnh kiểm tra liên kết sau khi hoàn tác.

### Task 6 — Release và GitHub Pages (Thành viên 6)

#### Đã hoàn thành trên branch `feature/introduction`

- `about.html`, `assets/css/about.css`, `assets/js/about.js`: sáu hồ sơ thành viên, giới thiệu dự án/công nghệ, hộp thoại chi tiết, điều hướng giữa thành viên, điều khiển bàn phím và bố cục responsive.
- Cập nhật README/CHANGELOG theo cấu trúc repository; thêm `tools/check_links.py`.
- Viết báo cáo này và tạo slide trình bày/demo tại `docs/RELEASE_DEMO.html`.
- Đã kiểm tra tương tác mở chi tiết một thành viên trên trình duyệt local.

#### Trạng thái GitHub và các điểm chặn đã xác minh

- Branch `feature/introduction` đã được push; commit hiện tại là `cb39ba9` (`Sync completed project`). Chưa thấy PR cho branch này.
- PR nhóm đang mở: [#1](https://github.com/DauCaoDung132/VietNamExplore/pull/1), [#3](https://github.com/DauCaoDung132/VietNamExplore/pull/3), [#4](https://github.com/DauCaoDung132/VietNamExplore/pull/4) và [#5](https://github.com/DauCaoDung132/VietNamExplore/pull/5). Cần review/merge theo quy trình nhóm trước khi phát hành.
- Trên `main`, sáu file trang HTML hiện vẫn là placeholder rỗng 1 byte; branch home/culture/food/tips có PR đang chờ. Trang destination chưa có branch/PR tương ứng trong danh sách hiện tại.
- Không có tag local hoặc remote; `v1.0.0` chưa được tạo.
- URL Pages dự kiến trả HTTP 404; chưa có deployment công khai hoạt động.
- `docs/images/` hiện chỉ có `.gitkeep`; chưa có ảnh minh chứng. Chưa có kết quả chạy link checker.

#### Việc còn lại để đủ điều kiện phát hành

| Việc cần làm | Trạng thái/bằng chứng cần có |
|---|---|
| Review/merge các PR và hoàn thiện trang destination | PR đã merge; toàn bộ trang có nội dung |
| Mở PR cho `feature/introduction` và merge vào `main` | URL PR và trạng thái merged |
| Kiểm tra website local | `python tools/check_links.py` trả mã thoát 0 |
| Tạo/push tag `v1.0.0` sau khi merge | Tag trỏ đúng commit release trên `main` |
| Bật GitHub Pages và kiểm tra URL | Deployment thành công; trang công khai trả HTTP 200 |
| Kiểm tra liên kết công khai | `python tools/check_links.py --base https://daucaodung132.github.io/VietNamExplore/` trả mã thoát 0 |
| Lưu ảnh About desktop/mobile và dialog | Ảnh thật trong `docs/images/` |

Không ghi release là hoàn tất cho tới khi các mục trên có bằng chứng xác minh.

### Task 7 — Báo cáo Markdown

- Báo cáo đặt tại `docs/REPORT.md`; nhóm cần cập nhật bằng chứng của Tasks 1–6, kiểm tra lại nội dung và lưu ảnh vào `docs/images/`.

## Kết quả cuối cùng

Chưa thể xác nhận các chỉ tiêu nghiệm thu khi thiếu trạng thái GitHub và bằng chứng nhóm. Hoàn tất các ô sau bằng số liệu/URL thật trước khi nộp:

| Chỉ tiêu | Yêu cầu | Kết quả thực tế | Bằng chứng |
|---|---:|---|---|
| Trang HTML có nội dung và điều hướng | Tối thiểu 5 | Chưa xác minh | Link từng trang |
| Commit cá nhân | 3/người; tối thiểu 18 tổng | Chưa xác minh | Lịch sử commit |
| Feature branch | Tối thiểu 6 | Chưa xác minh | Danh sách branch |
| PR đã merge / có review | Tối thiểu 4 / 3 | Chưa xác minh | Danh sách PR và review |
| Cả 6 người tham gia PR | 6/6 | Chưa xác minh | PR theo thành viên |
| Conflict / revert | Có, đủ người tham gia | Chưa xác minh | Commit và ảnh |
| Tag `v1.0.0` / GitHub Pages | Đã push / hoạt động | Chưa hoàn tất; chưa có tag, URL trả 404 | Tag và URL Pages sau deployment |
| Commit liên quan báo cáo | Tối thiểu 3 | Chưa xác minh | Lịch sử commit |

## Kiểm thử và xác minh

| Kiểm tra | Kết quả |
|---|---|
| `python tools/check_links.py` | **FAIL (10 errors):** năm trang `index.html`, `destinations.html`, `food.html`, `culture.html`, `tips.html` rỗng; các trang đó cũng thiếu liên kết điều hướng tới năm trang còn lại. |
| `git diff --check` | PASS; không phát hiện lỗi whitespace trong thay đổi tài liệu hiện tại. |
| About trên trình duyệt ở viewport 390×844 | PASS: hiển thị 6 thẻ, mở được dialog thành viên, không tràn ngang. |
| Slide `docs/RELEASE_DEMO.html` | PASS: 6 slide, điều khiển nút và phím `End`/`PageUp` chuyển đúng. |
| `https://daucaodung132.github.io/VietNamExplore/` | **HTTP 404** khi kiểm tra; chưa có website công khai để chạy remote link checker. |

Sau khi các PR được hợp nhất và toàn bộ trang có nội dung, chạy lại:

```bash
python tools/check_links.py
python tools/check_links.py --base https://daucaodung132.github.io/VietNamExplore/
```

Chỉ ghi “đạt” khi cả hai lệnh trả mã thoát 0, URL công khai hoạt động và ảnh/bằng chứng tương ứng đã được lưu.
