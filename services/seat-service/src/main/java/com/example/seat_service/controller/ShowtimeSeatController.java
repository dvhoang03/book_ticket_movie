package com.example.seat_service.controller;

import com.example.seat_service.dto.SeatLockMessage;
import com.example.seat_service.dto.SeatLockResponse;
import com.example.seat_service.dto.TicketEvent;
import com.example.seat_service.model.ShowtimeSeat;
import com.example.seat_service.dto.AddShowtimeSeatRequest;
import com.example.seat_service.producer.SeatLockProducer;
import com.example.seat_service.service.ShowtimeSeatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seats")
@Tag(name = "Seat Controller")
public class ShowtimeSeatController {

    @Autowired
    private ShowtimeSeatService showtimeSeatService;
    @Autowired
    private SeatLockProducer seatLockProducer;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Operation(summary = "Add seat", description = "Them cho ngoi")
    @PostMapping("/seat/add")
    public ResponseEntity<ShowtimeSeat> addShowtimeSeat(@RequestBody AddShowtimeSeatRequest request){
        ShowtimeSeat showtimeSeat = showtimeSeatService.addShowtimeSeat(request);
        return new ResponseEntity<>(showtimeSeat, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all seats by showtimeId", description = "Lay tat ca cho ngoi theo showtimeId")
    @GetMapping("/seat/{showtimeId}")
    public ResponseEntity<List<ShowtimeSeat>> getSeatsByShowtimeId(@PathVariable String showtimeId){
        List<ShowtimeSeat> seatList = showtimeSeatService.getSeatsByShowtimeId(showtimeId);
        return new ResponseEntity<>(seatList, HttpStatus.OK);
    }

    @Operation(summary = "Update seat's status", description = "Cap nhat trang thai cho ngoi")
    @PutMapping("/seat/{seatId}")
    public ResponseEntity<ShowtimeSeat> updateStatus(@PathVariable Integer seatId,
                                                     @RequestParam String status){
        ShowtimeSeat showtimeSeat = showtimeSeatService.updateStatus(seatId, status);
        return new ResponseEntity<>(showtimeSeat, HttpStatus.OK);
    }

    @Operation(summary = "Get seat's status", description = "Lay trang thai cho ngoi")
    @GetMapping("/seat/{seatId}/status")
    public ResponseEntity<ShowtimeSeat> getStatus(@PathVariable Integer seatId){
        ShowtimeSeat seat = showtimeSeatService.getShowtimeSeatById(seatId);
        return new ResponseEntity<>(seat, HttpStatus.OK);
    }

    @PostMapping("/test-send")
    public ResponseEntity<SeatLockResponse> testSend(@RequestBody SeatLockMessage message) {
        SeatLockResponse response = seatLockProducer.sendLockSeatMessage(message);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/test-ticket")
    public ResponseEntity<String> testSendTicket(@RequestBody TicketEvent event) {
        seatLockProducer.sendTicketEvent(event);
        return ResponseEntity.ok("ok");
    }
}
