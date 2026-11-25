# Báo cáo dự án VietNamExplore — W07

> **Trạng thái bản nháp:** Danh sách thành viên đã được cập nhật theo thông tin nhóm cung cấp. Lịch sử Git, PR, tag, triển khai Pages và ảnh minh chứng vẫn cần xác nhận bằng bằng chứng thật trước khi nộp.

## Project Overview

VietNamExplore là website tĩnh giới thiệu du lịch Việt Nam, gồm sáu phần nội dung dự kiến: trang chủ, địa điểm, ẩm thực, văn hóa, kinh nghiệm và giới thiệu nhóm. Dự án dùng HTML, CSS, JavaScript cơ bản; mã nguồn được quản lý bằng Git/GitHub.

| Thông tin | Giá trị |
|---|---|
| Repository | [DauCaoDung132/VietNamExplore](https://github.com/DauCaoDung132/VietNamExplore) |
| GitHub Pages | Chưa xác nhận đã bật; URL dự kiến: `https://daucaodung132.github.io/VietNamExplore/` |
| Báo cáo | `docs/REPORT.md` |
| Ảnh minh chứng | `docs/images/` |

## Team Contributions

| # | Mã sinh viên | Họ tên | GitHub | Phân công |
|---|---|---|---|---|
| 1 | 25127373 | Nguyễn Nhật Thùy Khanh | [@Yuru2812](https://github.com/Yuru2812) | Trang chủ, quy ước giao diện, Project Overview |
| 2 | 25127301 | Đậu Cao Dũng | [@DauCaoDung132](https://github.com/DauCaoDung132) | Địa điểm, branches, conflict |
| 3 | 25127366 | Nguyễn Diệp Vĩnh Khang | [@KhangNguyendotcpp](https://github.com/KhangNguyendotcpp) | Ẩm thực, Pull Request/review, conflict |
| 4 | 25127020 | Nguyễn Phi Bảo Bình | [@npbbinh2511-arch](https://github.com/npbbinh2511-arch) | Văn hóa, phối hợp Task 5 |
| 5 | 25127427 | Trương Cẩm Tú Nga | [@tunnnga2605-png](https://github.com/tunnnga2605-png) | Kinh nghiệm, revert và kiểm thử liên kết |
| 6 | 25127062 | Nguyễn Minh Huy | [@nmhuy1211](https://github.com/nmhuy1211) | Trang About và tài liệu Task 6 đã được chuẩn bị trong workspace; bằng chứng Git/release còn cần bổ sung |

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

#### Phần đã chuẩn bị trong workspace

- Hoàn thiện `about.html`, `assets/css/about.css` và `assets/js/about.js`: sáu hồ sơ thành viên theo thông tin nhóm cung cấp, tuyến hành trình tương tác, cửa sổ chi tiết, điều hướng bàn phím, giới thiệu dự án/công nghệ và bố cục responsive.
- Cập nhật README và CHANGELOG theo cấu trúc `assets/` đang dùng trong repository.
- Thêm `tools/check_links.py` để kiểm tra liên kết cục bộ hoặc các trang/tài nguyên tại URL công khai.
- Thêm thông tin họ tên/tài khoản GitHub của sáu thành viên; URL Pages/tag để trống cho tới khi nhóm xác nhận đã phát hành.

#### Việc chưa thể xác nhận

- Workspace hiện không có lịch sử Git/remote khả dụng; chưa tạo branch, commit, Pull Request, tag hoặc thay đổi cài đặt GitHub Pages.
- Các file `index.html`, `destinations.html`, `food.html`, `culture.html` và `tips.html` hiện là file rỗng trong workspace này. Vì vậy chưa thể xác nhận điều hướng toàn site hoặc chạy kiểm tra liên kết toàn dự án đạt.
- Chưa có ảnh chụp giao diện, tag/release hoặc deployment trong `docs/images/`.
- Chưa ghi ngày phát hành và chưa đưa các mục conflict/revert vào CHANGELOG, do chưa đối chiếu được lịch sử Git thực tế.

#### Bằng chứng cần bổ sung sau khi thực hiện trên GitHub

| Nội dung | Bằng chứng |
|---|---|
| PR trang About/tài liệu | Cần bổ sung URL PR |
| Tag `v1.0.0` và commit được tag | Cần bổ sung URL tag và ảnh `git show v1.0.0` |
| Cấu hình Pages và deployment thành công | Cần bổ sung ảnh từ Settings → Pages và Actions |
| Kiểm tra liên kết công khai | Cần bổ sung kết quả `python tools/check_links.py --base <URL Pages>` |
| About trên desktop/điện thoại, dialog mở | Cần bổ sung ảnh vào `docs/images/` |

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
| Tag `v1.0.0` / GitHub Pages | Đã push / hoạt động | Chưa xác minh | Tag và URL Pages |
| Commit liên quan báo cáo | Tối thiểu 3 | Chưa xác minh | Lịch sử commit |

## Kiểm thử

Sau khi các trang còn lại được hoàn thiện, chạy:

```bash
python tools/check_links.py
python tools/check_links.py --base https://daucaodung132.github.io/VietNamExplore/
```

Chỉ ghi “đạt” khi lệnh trả mã thoát 0, các trang hoạt động và ảnh/bằng chứng tương ứng đã được lưu.
