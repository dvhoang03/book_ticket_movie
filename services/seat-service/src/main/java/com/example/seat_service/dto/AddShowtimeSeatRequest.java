package com.example.seat_service.dto;

import com.example.seat_service.util.SeatStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddShowtimeSeatRequest {

    private BigDecimal price;
    private SeatStatus status;
    private String showtimeId;
    private String chairId;

}
