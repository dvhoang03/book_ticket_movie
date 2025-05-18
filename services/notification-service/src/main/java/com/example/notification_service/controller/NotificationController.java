package com.example.notification_service.controller;

import com.example.notification_service.dto.NotificationWrapper;
import com.example.notification_service.model.TicketInfo;
import com.example.notification_service.producer.NotiProducer;
import com.example.notification_service.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private NotiProducer notiProducer;

    @PostMapping()
    private ResponseEntity<?> sendPaymentSuccessEmail(@RequestParam String email,
                                                      @RequestBody TicketInfo ticketInfo){
        String message = notificationService.sendPaymentSuccessEmail(email, ticketInfo);

        return ResponseEntity.ok(message);
    }

    @PostMapping("/rabbit")
    private ResponseEntity<?> sendEmail(@RequestBody NotificationWrapper wrapper){
        notiProducer.send(wrapper);
        return ResponseEntity.ok("Success!");
    }
}
