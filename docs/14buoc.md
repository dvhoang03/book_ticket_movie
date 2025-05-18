# Các bước phân tích thiết kế
## Bước 1: Phân rã quy trình kinh doanh

Phân chia quy trình đặt vé xem phim thành các hành động chi tiết:

 1. **Khởi tạo quy trình đặt vé**: Khách hàng truy cập hệ thống và bắt đầu đặt vé.
 2. **Lấy danh sách phim và suất chiếu**: Hệ thống cung cấp danh sách phim, suất chiếu và rạp phim.
 3. **Chọn phim, suất chiếu và rạp**: Khách hàng chọn phim, suất chiếu và rạp cụ thể.
 4. **Lấy danh sách ghế ngồi**: Hệ thống hiển thị danh sách ghế còn trống cho suất chiếu đã chọn.
 5. **Chọn ghế ngồi**: Khách hàng chọn ghế từ danh sách.
 6. **Nhập thông tin khách hàng**: Khách hàng cung cấp họ tên, số điện thoại, email.
 7. **Xác minh thông tin vé**: Hệ thống kiểm tra thông tin vé (phim, suất chiếu, ghế, rạp).
 8. **Xác minh tình trạng ghế ngồi**: Hệ thống kiểm tra xem ghế đã chọn còn trống hay đã được đặt.
 9. **Kết thúc nếu ghế không còn trống**: Nếu ghế đã được đặt, thông báo và dừng quy trình.
10. **Khởi tạo thanh toán**: Hệ thống chuyển thông tin thanh toán đến cổng thanh toán.
11. **Thực hiện thanh toán**: Khách hàng thanh toán qua cổng thanh toán.
12. **Xác minh thanh toán**: Hệ thống kiểm tra trạng thái giao dịch từ cổng thanh toán.
13. **Gửi thông báo xác nhận**: Nếu thanh toán thành công, gửi email xác nhận vé.
14. **Cập nhật tình trạng ghế ngồi**: Cập nhật ghế đã chọn thành trạng thái “đã đặt”.
15. **Lưu thông tin vé**: Lưu chi tiết vé vào cơ sở dữ liệu.
16. **Lưu thông tin khách hàng**: Lưu thông tin khách hàng vào cơ sở dữ liệu.

## Bước 2: Lọc bỏ các hành động không phù hợp

Xác định các hành động không phù hợp để tự động hóa bằng REST hoặc không thể đóng gói thành dịch vụ:

- **Nhập thông tin khách hàng**: Yêu cầu tương tác trực tiếp từ người dùng, không tự động hóa hoàn toàn.
- **Thực hiện thanh toán**: Phụ thuộc vào cổng thanh toán bên thứ ba, không phải logic nội tại của hệ thống.

**Danh sách hành động sau khi lọc**:

 1. Khởi tạo quy trình đặt vé.
 2. Lấy danh sách phim và suất chiếu.
 3. Chọn phim, suất chiếu và rạp.
 4. Lấy danh sách ghế ngồi.
 5. Chọn ghế ngồi.
 6. Xác minh tình trạng ghế ngồi.
 7. Kết thúc nếu ghế không còn trống.
 8. Xác minh thông tin vé.
 9. Khởi tạo thanh toán.
10. Xác minh thanh toán.
11. Gửi thông báo xác nhận.
12. Cập nhật tình trạng ghế ngồi.
13. Lưu thông tin vé.
14. Lưu thông tin khách hàng.

## Bước 3: Xác định các ứng viên dịch vụ thực thể

Phân loại hành động thành logic độc lập (agnostic) (có thể tái sử dụng) và không độc lập (non-agnostic) (đặc thù cho quy trình):

- Khởi tạo quy trình đặt vé (non-agnostic).
- Lấy danh sách phim và suất chiếu (agnostic).
- Chọn phim, suất chiếu và rạp (non-agnostic).
- Lấy danh sách ghế ngồi (agnostic).
- Chọn ghế ngồi (non-agnostic).
- Xác minh tình trạng ghế ngồi (agnostic).
- Kết thúc nếu ghế không còn trống (non-agnostic).
- Xác minh thông tin vé (agnostic).
- Khởi tạo thanh toán (non-agnostic).
- Xác minh thanh toán (agnostic).
- Gửi thông báo xác nhận (non-agnostic).
- Cập nhật tình trạng ghế ngồi (agnostic).
- Lưu thông tin vé (agnostic).
- Lưu thông tin khách hàng (agnostic).

**Ứng viên dịch vụ thực thể**:

- **Dịch vụ Phim (MovieService)**:
  - Lấy danh sách phim, rạp phim, phòng chiếu và suất chiếu.
- **Dịch vụ Ghế ngồi (SeatService)**:
  - Lấy danh sách ghế ngồi.
  - Xác minh tình trạng ghế ngồi.
  - Cập nhật tình trạng ghế ngồi.
- **Dịch vụ Vé (TicketService)**:
  - Xác minh thông tin vé.
  - Lưu thông tin vé.
- **Dịch vụ Khách hàng (CustomerService)**:
  - Lưu thông tin khách hàng.

## Bước 4: Xác định logic đặc thù cho quy trình

Logic đặc thù cho quy trình đặt vé được tách thành dịch vụ nhiệm vụ riêng:

- Khởi tạo quy trình đặt vé.
- Chọn phim, suất chiếu và rạp.
- Chọn ghế ngồi.
- Kết thúc nếu ghế không còn trống.
- Khởi tạo thanh toán.
- Gửi thông báo xác nhận.

**Ứng viên dịch vụ nhiệm vụ (BookingService)**:

- **Dịch vụ Đặt vé**:
  - Khởi tạo quy trình đặt vé.
  - Chọn phim, suất chiếu và rạp.
  - Chọn ghế ngồi.
  - Kết thúc nếu ghế không còn trống.
  - Khởi tạo thanh toán.
  - Gửi thông báo xác nhận.

## Bước 5: Xác định tài nguyên

Xác định các tài nguyên dựa trên ngữ cảnh chức năng và phân loại chúng là độc lập (agnostic) hoặc không độc lập (non-agnostic):

- `/Movie/` (Phim) – Độc lập.
- `/Showtime/` (Suất chiếu) – Độc lập.
- `/Seat/` (Ghế ngồi) – Độc lập.
- `/Ticket/` (Vé) – Độc lập.
- `/Customer/` (Khách hàng) – Độc lập.
- `/Booking/` (Đặt vé) – Không độc lập.

**Ánh xạ thực thể sang tài nguyên**:

| Thực thể | Tài nguyên |
| --- | --- |
| Phim | `/Movie/` |
| Rạp phim | `/Cinema/` |
| Phòng chiếu | `/Theater/` |
| Ghế | `/Chair/` |
| Suất chiếu | `/Showtime/` |
| Ghế ngồi | `/Seat/` |
| Vé | `/Ticket/` |
| Khách hàng | `/Customer/` |
| Đặt vé | `/Booking/` |

## Bước 6: Liên kết các khả năng dịch vụ với tài nguyên và phương thức

Liên kết các ứng viên dịch vụ với tài nguyên và các phương thức HTTP:

- **Dịch vụ Phim**:
  1. Lấy danh sách phim: `GET /movie/`.
  2. Lấy danh sách rạp phim: `GET /cinema/`.
  3. Lấy danh sách suất chiếu theo phim hoặc rạp: `GET /showtime?movieId={movieId}&cinemaId={cinemaId}`.
  4. Lấy thông tin suất chiếu: `GET /showtime/{showtimeId}`.
- **Dịch vụ Ghế ngồi**: 5. Lấy danh sách ghế theo suất chiếu: `GET /seat?showtimeId={showtimeId}`. 6. Kiểm tra trạng thái ghế: `GET /seat/{seatId}/status`. 7. Cập nhật trạng thái ghế: `PATCH /seat/{seatId}`.
- **Dịch vụ Vé**: 8. Xác minh thông tin vé: `POST /ticket/validate`. 9. Lưu thông tin vé: `POST /ticket/`.
- **Dịch vụ Khách hàng**: 10. Lưu thông tin khách hàng: `POST /customer/`.
- **Dịch vụ Đặt vé**: 11. Khởi tạo quy trình đặt vé: `POST /booking/`. 12. Chọn phim, suất chiếu, ghế: `POST /booking/{bookingId}/select`. 13. Khởi tạo thanh toán: `POST /booking/{bookingId}/payment`. 14. Gửi xác nhận đặt vé: `POST /booking/{bookingId}/confirm`.
- **Dịch vụ Thông báo**: 15. Gửi email xác nhận: `POST /notification/email`.
- **Dịch vụ Thanh toán**: 16. Xác minh trạng thái thanh toán: `POST /payment/verify`.

## Bước 7: Áp dụng định hướng dịch vụ

Áp dụng các nguyên tắc định hướng dịch vụ (SOA):

- **Tính tái sử dụng**: Dịch vụ Phim, Ghế ngồi, Vé, Khách hàng được thiết kế để sử dụng trong các quy trình khác (ví dụ: kiểm tra lịch chiếu, quản lý khách hàng).
- **Tính tự trị**: Mỗi dịch vụ hoạt động độc lập, giảm sự phụ thuộc giữa các dịch vụ.
- **Tính chuẩn hóa**: Sử dụng các phương thức HTTP chuẩn (GET, POST, PATCH) và định dạng JSON cho dữ liệu.

## Bước 8: Xác định các ứng viên tổ hợp dịch vụ

Xác định các tương tác dịch vụ trong quy trình đặt vé:

**Kịch bản thành công**:

1. Dịch vụ Đặt vé gọi Dịch vụ Phim để lấy danh sách phim và suất chiếu.
2. Dịch vụ Đặt vé gọi Dịch vụ Ghế ngồi để lấy danh sách ghế và xác minh tình trạng.
3. Dịch vụ Đặt vé gọi Dịch vụ Vé để xác minh thông tin vé.
4. Dịch vụ Đặt vé gọi Dịch vụ Khách hàng để lưu thông tin khách hàng.
5. Dịch vụ Đặt vé gọi Dịch vụ Ghế ngồi để cập nhật trạng thái ghế.
6. Dịch vụ Đặt vé gửi thông báo xác nhận qua email.

**Kịch bản thất bại**:

1. Nếu ghế không còn trống, Dịch vụ Đặt vé thông báo và dừng quy trình.
2. Nếu thanh toán thất bại, Dịch vụ Đặt vé thông báo lỗi.

**Tổ hợp dịch vụ**: Dịch vụ Đặt vé là trung tâm, phối hợp với các dịch vụ Phim, Ghế ngồi, Vé, Khách hàng.

## Bước 9: Phân tích yêu cầu xử lý

Phân tích logic ứng dụng cơ bản:

- **Logic tập trung vào kinh doanh**:
  - Xác minh ghế ngồi, xác minh vé, lưu thông tin vé/khách hàng.
- **Logic tập trung vào tiện ích**:
  - Gửi email thông báo xác nhận.
  - Kết nối với cổng thanh toán.
- **Vấn đề tiềm ẩn**:
  - Xác minh thanh toán phụ thuộc vào cổng thanh toán bên thứ ba, có thể gây độ trễ.
  - **Giải pháp**: Tạo microservice riêng để xử lý thanh toán, đảm bảo hiệu suất và độ tin cậy.

## Bước 10: Xác định các ứng viên dịch vụ tiện ích

Xác định các dịch vụ tiện ích:

- **Dịch vụ Thông báo**:
  - Gửi email xác nhận vé.
- **Dịch vụ Thanh toán**:
  - Kết nối với cổng thanh toán để xác minh giao dịch.

**Liên kết tài nguyên và phương thức**:

- Dịch vụ Thông báo: `POST /notification/email` – Gửi email.
- Dịch vụ Thanh toán: `POST /payment/verify` – Xác minh thanh toán.

## Bước 11: Xác định các ứng viên microservice

Xác định logic không độc lập phù hợp cho microservice:

- **Microservice Xác minh Thanh toán**:
  - Xử lý giao tiếp với cổng thanh toán.
  - Đảm bảo tính tự trị, hiệu suất cao, và khả năng xử lý lỗi.
- **Microservice Gửi Thông báo**:
  - Xử lý gửi email xác nhận, độc lập với quy trình chính.

**Lý do sử dụng microservice**:

- Thanh toán và thông báo là các chức năng quan trọng, cần độ tin cậy và khả năng mở rộng riêng.

## Bước 12: Áp dụng định hướng dịch vụ

Tinh chỉnh các dịch vụ dựa trên nguyên tắc SOA:

- **Dịch vụ Đặt vé**: Đóng vai trò điều phối, không lưu trữ trạng thái (stateless).
- **Dịch vụ Phim, Ghế ngồi, Vé, Khách hàng**: Tối ưu hóa để tái sử dụng trong các ngữ cảnh khác.
- **Microservice Thanh toán và Thông báo**: Đảm bảo tính tự trị và khả năng triển khai độc lập.

## Bước 13: Sửa đổi các tổ hợp dịch vụ ứng viên

Tổ hợp hiện tại (Dịch vụ Đặt vé phối hợp với Phim, Ghế ngồi, Vé, Khách hàng, Thanh toán, Thông báo) là hợp lý.

## Bước 14: Sửa đổi định nghĩa tài nguyên và nhóm ứng viên khả năng

Xem xét lại tài nguyên và khả năng dịch vụ:

- Bổ sung tài nguyên `/Theater/` (Phòng chiếu), `/Cinema/` (Rạp phim), `/Chair/` (Ghế) để quản lý thông tin rạp độc lập.

**Tóm tắt các dịch vụ cuối cùng**:

- **Dịch vụ thực thể**: Phim, Ghế ngồi, Vé, Khách hàng.
- **Dịch vụ nhiệm vụ**: Đặt vé.
- **Dịch vụ tiện ích**: Thông báo, Thanh toán.
- **Microservices**: Xác minh Thanh toán, Gửi Thông báo.