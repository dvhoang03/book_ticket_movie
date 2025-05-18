package com.example.seat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatLockMessage implements Serializable {
    private String bookingId;
    private List<Integer> seatIds;
    private Integer expiresAt;
}
