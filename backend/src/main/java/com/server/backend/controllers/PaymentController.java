package com.server.backend.controllers;

import com.server.backend.services.MomoService;
import com.server.backend.services.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {
    @Autowired
    private MomoService momoService;

    @Autowired
    private ReceiptService orderService;

    @PostMapping("/momo")
    public ResponseEntity<?> momoMethod(@RequestBody Map params) {
        return ResponseEntity.ok(momoService.createQR(params));
    }

    @GetMapping("/momo/check")
    public ResponseEntity<?> momoCheck(@RequestParam Map params) {
        Map response = momoService.checkOrder(params);
        System.out.println(response.get("resultCode"));
        if((int)response.get("resultCode") == 0) {
            return ResponseEntity.ok(orderService.saveOrderByMomo(response));
        }
        return ResponseEntity.ok(response);
    }
}
