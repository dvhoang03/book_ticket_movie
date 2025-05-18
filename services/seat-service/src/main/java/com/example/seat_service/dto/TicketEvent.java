package com.example.seat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketEvent implements Serializable {

    private List<Integer> seatIds;
    private String customerId;
    private String name;
    private String email;
    private Long totalPrice;

}
