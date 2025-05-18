package com.example.notification_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketInfo implements Serializable {
    private String ticketId;         // Mã vé
    private String movieTitle;       // Tên phim
    private String cinemaName;       // Tên rạp
    private String roomName;         // Tên phòng chiếu
    private String seatNumber;       // Ghế
    private LocalDateTime showTime;  // Thời gian chiếu

    private String customerName;     // Tên khách hàng
    private String customerEmail;    // Email khách hàng
    private String customerPhone;    // Số điện thoại khách hàng

    private double price;            // Giá vé
    private LocalDateTime bookingTime; // Thời gian đặt vé
}
