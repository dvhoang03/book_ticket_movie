package com.example.seat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatResponseMessage implements Serializable {
//    private Integer seatId;
    private boolean available;
}
