package com.example.seat_service.producer;

import com.example.seat_service.configuration.RabbitMQConfig;
import com.example.seat_service.dto.SeatLockMessage;
import com.example.seat_service.dto.SeatLockResponse;
import com.example.seat_service.dto.TicketEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatLockProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SeatLockResponse sendLockSeatMessage(SeatLockMessage message) {

        // Gửi và đợi phản hồi
        Object response = rabbitTemplate.convertSendAndReceive(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.ROUTING_KEY,
                message
        );

        // Chuyển về đúng kiểu
        if (response instanceof SeatLockResponse seatLockResponse) {
            System.out.println("Response: " + seatLockResponse.isStatus());
            return seatLockResponse;
        }

        System.out.println("Response invalid");
        return new SeatLockResponse(false);

    }

    public void sendTicketEvent(TicketEvent event) {

        // Gửi và đợi phản hồi
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.TICKET_EXCHANGE,
                RabbitMQConfig.TICKET_ROUTING_KEY,
                event
        );

        System.out.println("Sent message: " + event.getEmail());
    }
}

