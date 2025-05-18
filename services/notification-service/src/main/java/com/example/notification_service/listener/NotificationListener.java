package com.example.notification_service.listener;

import com.example.notification_service.config.RabbitMQConfig;
import com.example.notification_service.dto.NotificationWrapper;
import com.example.notification_service.service.NotificationService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificationListener {

    @Autowired
    private NotificationService notificationService;

    @RabbitListener(queues = RabbitMQConfig.TICKET_QUEUE)
    public void processMessage(NotificationWrapper wrapper) {
        String reply = notificationService.sendEmail(wrapper.getData());
        System.out.println("Received <" + reply + ">");
    }
}
