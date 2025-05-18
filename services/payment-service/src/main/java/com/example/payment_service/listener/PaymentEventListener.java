package com.example.payment_service.listener;

import com.example.payment_service.config.RabbitMQConfig;
import com.example.payment_service.dto.PaymentEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class PaymentEventListener {

    @RabbitListener(queues = RabbitMQConfig.PAYMENT_QUEUE)
    public void handlePaymentEvent(PaymentEvent event) {
        System.out.println("Nhận sự kiện thanh toán: " + event.getBookingId());
    }
}
