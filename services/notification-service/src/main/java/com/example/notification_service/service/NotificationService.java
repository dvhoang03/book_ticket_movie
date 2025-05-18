package com.example.notification_service.service;

import com.example.notification_service.dto.TicketEvent;
import com.example.notification_service.model.TicketInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender sender;


    public String sendPaymentSuccessEmail(String email, TicketInfo ticketInfo){
        SimpleMailMessage message = new SimpleMailMessage();

        String body = "Xin chào " + ticketInfo.getCustomerName() + ",\n\n" +
                "Bạn đã đặt vé thành công cho phim \"" + ticketInfo.getMovieTitle() + "\" tại rạp " + ticketInfo.getCinemaName() + ".\n\n" +
                "Thông tin vé: " + "\n" +
                "\t - Mã vé: " + ticketInfo.getTicketId() + "\n" +
                "\t - Phòng chiếu: " + ticketInfo.getRoomName() + "\n" +
                "\t - Ghế: " + ticketInfo.getSeatNumber() + "\n" +
                "\t - Suất chiếu: " + ticketInfo.getShowTime().toString() + "\n" +
                "\t - Giá vé: " + ticketInfo.getPrice() + "\n\n" +
                "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!";

        message.setTo(email.trim());
        message.setSubject("Xác nhận thanh toán -  Đặt vé xem phim");
        message.setText(body);

        sender.send(message);

        return body;
    }

    public String sendEmail(TicketEvent event){
        SimpleMailMessage message = new SimpleMailMessage();

        String body = "Xin chào " + event.getName() + ",\n\n" +
                "Bạn đã đặt vé thành công\n\n" +
                "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!";

        message.setTo(event.getEmail().trim());
        message.setSubject("Xác nhận thanh toán -  Đặt vé xem phim");
        message.setText(body);

        sender.send(message);

        return body;
    }

}
