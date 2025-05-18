# 📊 Microservices System - Analysis and Design

## 1. 🎯 Problem Statement

Hệ thống đặt vé xem phim cho phép khách hàng chọn phim, suất chiếu, ghế ngồi và tiến hành đặt vé trực tuyến.
Sau khi khách hàng chọn phim,hệ thống sẽ kiểm tra tình trạng chỗ ngồi, xác minh thông tin vé, và xử lý thanh toán.
Nếu đặt vé thành công, hệ thống sẽ gửi thông báo xác nhận vé đã đặt đến email của khách hàng

## 2. 🧩 Service-Oriented Analysis

[Chi tiết 14 bước phân tích thiết kế](14buoc.md)

Phân tích quy trình kinh doanh để xác định các chức năng chính và các microservices tiềm năng.

- **Các bước chính trong quy trình**
    1. Khách hàng truy cập hệ thống và khởi tạo quy trình đặt vé.
    2. Khách hàng chọn phim, suất chiếu và rạp phim.
    3. Khách hàng chọn ghế ngồi từ danh sách ghế trống click tiếp tục.
    4. Khách hàng nhập thông tin cá nhân (họ tên, số điện thoại, email).
    5. Hệ thống xác minh thông tin vé (phim, suất chiếu, ghế, rạp).
    6. Hệ thống kiểm tra tình trạng ghế ngồi (trống/đã đặt).
    7. Nếu ghế không còn trống, thông báo và kết thúc quy trình.
    8. Khách hàng thực hiện thanh toán qua cổng thanh toán trực tuyến.
    9. Nếu thanh toán thành công, hệ thống gửi email xác nhận vé.
    10. Hệ thống cập nhật tình trạng ghế ngồi thành “đã đặt”.
    11. Hệ thống lưu thông tin vé và khách hàng vào cơ sở dữ liệu.
- **Các thực thể liên quan**
    - Rạp phim ( Cinema): Thông tin về rạp (tên, địa chỉ)
    - Phim (Movie): Thông tin về phim (tên, thể loại, thời lượng).
    - Suất chiếu (Showtime): Lịch chiếu cụ thể (thời gian, rạp).
    - Phòng chiếu phim (Theater): Thông tin về phòng được chiếu phim (tên, ) 
    - Ghế ngồi (Chair): Ghế trong rạp (mã ghế, trạng thái, vị trí).
    - Chỗ ngồi (ShowtimeSeat): Thông tin chỗ ngồi (mã chỗ ngồi, phim, suất chiếu, ghế, giá).
    - Khách hàng (Customer): Thông tin khách hàng (họ tên, số điện thoại, email).
    - Vé (Ticket): chứa thông tin vé của khách hàng đặt (id, totalprice)

- **Thách thức và yêu cầu thúc đẩy microservices**

    - Hiệu suất: Kiểm tra tình trạng ghế và xử lý thanh toán cần phản hồi nhanh để tránh xung đột đặt vé.
    - Khả năng mở rộng: Hệ thống phải hỗ trợ nhiều khách hàng truy cập đồng thời, đặc biệt trong giờ cao điểm.
    - Tính tự trị: Các chức năng như thanh toán và gửi thông báo cần hoạt động độc lập để giảm phụ thuộc.
    - Độ tin cậy: Xử lý lỗi từ cổng thanh toán bên thứ ba và đảm bảo gửi xác nhận đúng.
    - Tái sử dụng: Các chức năng như quản lý phim, suất chiếu, khách hàng cần được tái sử dụng trong các quy trình khác (ví dụ: tra cứu lịch chiếu).

---

## 3. 🔄 Service-Oriented Design

Thiết kế các dịch vụ để hỗ trợ quy trình đặt vé xem phim.

- **Service Candidates**

    | Service | Responsibilities |
    |----------|-----------------|
    | Entity Service |
    | MovieService |  - Quản lý thông tin phim, rạp phim và suất chiếu. <br> - Cung cấp danh sách phim, danh sách rạp chiếu và lịch chiếu. |
    | ShowtimeSeatService | - Quản lý thông tin ghế ngồi và trạng thái (trống/đã đặt). <br> - Kiểm tra và cập nhật trạng thái ghế. |
    | TicketService | - Xác minh thông tin vé. <br> - Lưu trữ thông tin vé. |
    | CustomerService | - Quản lý thông tin khách hàng (họ tên, số điện thoại, email). |
    | Task Service |
    | BookingService | - Điều phối quy trình đặt vé, từ chọn phim đến xác nhận. <br> - Tương tác với các dịch vụ khác để hoàn thành quy trình. |
    | Utility Service|
    | NotificationService | - Gửi email xác nhận vé đến khách hàng. |
    | PaymentService |  - Kết nối với cổng thanh toán để xử lý và xác minh giao dịch. |


- **Service Capabilities**: Define the core functions each service provides.
    - Dịch vụ Phim:
        - Lấy danh sách phim (GET /movie/).  
        - Lấy danh sách suất chiếu theo phim hoặc rạp (GET /showtime?movieId={movieId}&theaterId={theaterId}).
        - Lấy danh sách rạp phim (GET /theater/).
        - Lấy thông tin suất chiếu (GET /showtime/{showtimeId}).
    - Dịch vụ Ghế ngồi:
        - Lấy danh sách ghế theo suất chiếu (GET /seat/{showtimeId}).
        - Kiểm tra trạng thái ghế (GET /seat/{seatId}/status).
        - Cập nhật trạng thái ghế  (PATCH /seat/{seatId}).
    - Dịch vụ Vé :
        - Xác minh thông tin vé (POST /ticket/validate).
        - Lưu thông tin vé (POST /ticket/).
    - Dịch vụ Khách hàng:
        - Lưu thông tin khách hàng (POST /customer/).
    - Dịch vụ Đặt vé:
        - Khởi tạo quy trình đặt vé (POST /booking/).
        - Chọn phim, suất chiếu, ghế (POST /booking/{bookingId}/select).
        - Khởi tạo thanh toán (POST /booking/{bookingId}/payment).
        - Gửi xác nhận đặt vé (POST /booking/{bookingId}/confirm).
    - Dịch vụ Thông báo:
        - Gửi email xác nhận (POST /notification/email).
    - Dịch vụ Thanh toán:
        - Xác minh trạng thái thanh toán (POST /payment/verify).

- **Interactions**: Describe how services collaborate to complete the process.
    Quy trình đặt vé được thực hiện thông qua sự phối hợp giữa các dịch vụ:
    1. Khởi tạo đặt vé:
        - Dịch vụ Đặt vé tạo một giao dịch đặt vé (POST /Booking/).
        - Gọi Dịch vụ Phim để lấy danh sách phim và suất chiếu (GET /Movie/, GET /Showtime/, GET /Theater).
    2. Chọn ghế ngồi:
        - Dịch vụ Đặt vé gọi Dịch vụ Ghế ngồi để lấy danh sách ghế (GET /Seat/{showtimeId}) 
        - Nếu ghế không còn trống, Dịch vụ Đặt vé thông báo và dừng.
    3. Xác minh vé:
        - Dịch vụ Đặt vé kiểm tra trạng thái ghế (GET /Seat/{seatId}/status).
        - Dịch vụ Đặt vé gọi Dịch vụ Vé để xác minh thông tin vé (POST /Ticket/validate).
    4. Lưu thông tin khách hàng:
        - Dịch vụ Đặt vé gọi Dịch vụ Khách hàng để lưu thông tin (POST /Customer/).
    5. Thanh toán:
        - Dịch vụ Đặt vé gọi Microservice Xác minh Thanh toán để xử lý giao dịch (POST /Payment/verify).
        - Nếu thanh toán thành công, tiếp tục; nếu không, thông báo lỗi.
    6. Xác nhận và cập nhật:
        - Dịch vụ Đặt vé gọi Dịch vụ Ghế ngồi để cập nhật trạng thái ghế (PATCH /Seat/{seatId}).
        - Gọi Dịch vụ Vé để lưu thông tin vé (POST /Ticket/).
        - Gọi Microservice Gửi Thông báo để gửi email xác nhận (POST /Notification/email).

- **Data Ownership**: Specify which service owns what data.
    - MovieService: Sở hữu dữ liệu Phim, Rạp phim và Suất chiếu.
    - SeatService: Sở hữu dữ liệu Ghế ngồi.
    - TicketService: Sở hữu dữ liệu Vé.
    - CustomerService: Sở hữu dữ liệu Khách hàng.
    - BookingService: Sở hữu dữ liệu Đặt vé (tạm thời, trong quá trình xử lý giao dịch).
    - NotificationService: Không sở hữu dữ liệu, chỉ xử lý thông báo dựa trên dữ liệu từ Vé và Khách hàng.
    - PaymentService: Không sở hữu dữ liệu, chỉ xử lý giao dịch dựa trên dữ liệu từ Đặt vé.
    - Microservice Xác minh Thanh toán: Không sở hữu dữ liệu, xử lý trạng thái thanh toán.
    - Microservice Gửi Thông báo: Không sở hữu dữ liệu, xử lý gửi email.

## 4. API Specs: 
- **Complete API definitions** in `docs/api-specs/`.

```
