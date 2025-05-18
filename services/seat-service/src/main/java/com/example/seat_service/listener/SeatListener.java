package com.example.seat_service.listener;

import com.example.seat_service.configuration.RabbitMQConfig;
import com.example.seat_service.dto.*;
import com.example.seat_service.service.ShowtimeSeatService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SeatListener {

    @Autowired
    private ShowtimeSeatService seatService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public SeatLockResponse lockSeat(SeatLockMessageWrapper wrapper) {

        SeatLockMessage message = wrapper.getData();

        System.out.println("Received message: " + message.getBookingId());
        System.out.println(message.getExpiresAt());
        System.out.println(message.getSeatIds().getFirst());

        System.out.println("Received message: " + message.getBookingId());
        boolean result = seatService.lockSeats(message);

        return new SeatLockResponse(result);
    }

    @RabbitListener(queues = RabbitMQConfig.TICKET_QUEUE)
    public void updateSeatStatus(SeatBookedMessage message) {
        System.out.println(message.getData().getEmail());
        seatService.bookedSeats(message.getData());
    }

//    @RabbitListener(queues = RabbitMQConfig.TICKET_QUEUE)
//    public void debugMessage(org.springframework.amqp.core.Message message) {
//        System.out.println("Raw body: " + new String(message.getBody()));
//        System.out.println("Headers: " + message.getMessageProperties().getHeaders());
//    }


}
