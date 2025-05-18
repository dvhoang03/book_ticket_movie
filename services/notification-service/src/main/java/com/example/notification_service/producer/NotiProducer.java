package com.example.notification_service.producer;

import com.example.notification_service.config.RabbitMQConfig;
import com.example.notification_service.dto.NotificationWrapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotiProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send(NotificationWrapper wrapper) {
        // Gửi và đợi phản hồi
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.TICKET_EXCHANGE,
                RabbitMQConfig.TICKET_ROUTING_KEY,
                wrapper
        );

        System.out.println("Sent message: " + wrapper.getData().getEmail());
    }

}
