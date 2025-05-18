package com.example.seat_service.service;

import com.example.seat_service.dto.SeatLockMessage;
import com.example.seat_service.dto.TicketEvent;
import com.example.seat_service.model.ShowtimeSeat;
import com.example.seat_service.repository.ShowtimeSeatRepo;
import com.example.seat_service.dto.AddShowtimeSeatRequest;
import com.example.seat_service.util.SeatStatus;
import jakarta.transaction.Transactional;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShowtimeSeatService {

    @Autowired
    private ShowtimeSeatRepo showtimeSeatRepo;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public ShowtimeSeat addShowtimeSeat(AddShowtimeSeatRequest request){

        ShowtimeSeat showtimeSeat = new ShowtimeSeat();

        showtimeSeat.setPrice(request.getPrice());
        showtimeSeat.setStatus(request.getStatus());
        showtimeSeat.setChairId(request.getChairId());
        showtimeSeat.setShowtimeId(request.getShowtimeId());

        return showtimeSeatRepo.save(showtimeSeat);
    }

    public List<ShowtimeSeat> getSeatsByShowtimeId(String showtimeId){
        return showtimeSeatRepo.findByShowtimeId(showtimeId);
    }

    public ShowtimeSeat getShowtimeSeatById(Integer showtimeSeatId){
        return showtimeSeatRepo.findById(showtimeSeatId)
                .orElseThrow(() -> new RuntimeException("Seat not exist!"));
    }


    public ShowtimeSeat updateStatus(Integer showtimeSeatId,String status){
        ShowtimeSeat showtimeSeat = getShowtimeSeatById(showtimeSeatId);
        showtimeSeat.setStatus(SeatStatus.valueOf(status));
        return showtimeSeatRepo.save(showtimeSeat);
    }

    public String getStatus(Integer showtimeSeatId){
        ShowtimeSeat showtimeSeat = getShowtimeSeatById(showtimeSeatId);
        return showtimeSeat.getStatus().toString();
    }

    @Scheduled(fixedRate = 60000)
    public void unlockExpiredSeat(){
        LocalDateTime now = LocalDateTime.now();
        List<ShowtimeSeat> lockedSeats = showtimeSeatRepo.findSeatsLockedExpired(now);

        for (ShowtimeSeat seat : lockedSeats){
            seat.setStatus(SeatStatus.AVAILABLE);
            seat.setBookingId(null);
            seat.setLockExpiredAt(null);

            showtimeSeatRepo.save(seat);
        }
    }

    @Transactional
    public boolean lockSeats(SeatLockMessage message) {
        List<Integer> seatIds = message.getSeatIds();
        List<ShowtimeSeat> seats = showtimeSeatRepo.findAllById(seatIds);

        List<ShowtimeSeat> lockedSeats = new ArrayList<>();

        for (ShowtimeSeat seat : seats) {
            if (seat.getStatus() == SeatStatus.AVAILABLE) {
                seat.setStatus(SeatStatus.RESERVED);
                seat.setBookingId(message.getBookingId());
                seat.setLockExpiredAt(LocalDateTime.now().plusMinutes(message.getExpiresAt()));
                lockedSeats.add(seat);
            } else {
                rollbackLockedSeats(lockedSeats);
                System.out.println("\n\n" + message.getBookingId() + " failed to lock seat " + seat.getId() + "\n\n");
                return false;
            }
        }

        showtimeSeatRepo.saveAll(lockedSeats);
        System.out.println("\n\n" + message.getBookingId() + " success to lock seat\n\n");
        return true;
    }

    @Transactional
    public void bookedSeats(TicketEvent event) {
        List<Integer> seatIds = event.getSeatIds();
        List<ShowtimeSeat> seats = showtimeSeatRepo.findAllById(seatIds);

        List<ShowtimeSeat> bookedSeats = new ArrayList<>();

        for (ShowtimeSeat seat : seats) {
            if (seat.getStatus() == SeatStatus.RESERVED) {
                seat.setStatus(SeatStatus.BOOKED);
                seat.setLockExpiredAt(null);
                bookedSeats.add(seat);
            }
        }
        showtimeSeatRepo.saveAll(bookedSeats);
    }

    private void rollbackLockedSeats(List<ShowtimeSeat> lockedSeats) {
        for (ShowtimeSeat seat : lockedSeats) {
            seat.setStatus(SeatStatus.AVAILABLE);
            seat.setBookingId(null);
            seat.setLockExpiredAt(null);
        }
        showtimeSeatRepo.saveAll(lockedSeats);
    }


}
