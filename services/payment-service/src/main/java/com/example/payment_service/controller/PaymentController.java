package com.example.payment_service.controller;

import com.example.payment_service.dto.PaymentEvent;
import com.example.payment_service.dto.PaymentWrapper;
import com.example.payment_service.dto.VNPayResponse;
import com.example.payment_service.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    //Yeu cau so tien (amount) va ma ngan hang (bank_code)
    @GetMapping("/vn-pay")
    public ResponseEntity<VNPayResponse> pay(HttpServletRequest request,
                                                @RequestParam String bookingId,
                                                @RequestParam String amount,
                                                @RequestParam(required = false, defaultValue = "NCB") String bankCode) {
        return new ResponseEntity<>(paymentService.createVnPayPayment(request), HttpStatus.OK);
    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> payCallbackHandler(HttpServletRequest request,
                                                @RequestParam String bookingId,
                                                @RequestParam String status){
//        String status = request.getParameter("vnp_ResponseCode");
//        String bookingId = request.getParameter("vnp_TxnRef");
        PaymentEvent event = new PaymentEvent(bookingId, "Success");

        PaymentWrapper wrapper = new PaymentWrapper( UUID.randomUUID().toString(),
                "payment", event);

        paymentService.sendPaymentCallback(wrapper);
        if (status.equals("00")) {
//            PaymentEvent event = new PaymentEvent(bookingId, "Success");
//            paymentService.sendPaymentCallback(event);
            System.out.println("\n\nCall\n\n");
            return new ResponseEntity<>( new VNPayResponse("00", "Success", ""), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
