package com.example.seat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatLockMessageWrapper {
    private String id;
    private SeatLockMessage data;
    private Pattern pattern;
}
