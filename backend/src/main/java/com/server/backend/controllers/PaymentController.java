package com.server.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.models.Receipt;
import com.server.backend.services.MomoService;
import com.server.backend.services.UsageRightService;
import com.server.backend.services.ReceiptService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {
    @Autowired
    private MomoService momoService;

    @Autowired
    private ReceiptService receiptService;

    @Autowired
    private UsageRightService usageRightService;



    @PostMapping("/momo")
    public ResponseEntity<?> momoMethod(@RequestBody Map params) {
        return ResponseEntity.ok(momoService.createQR(params));
    }

    @Transactional
    @GetMapping("/momo/check")
    public ResponseEntity<?> momoCheck(@RequestParam Map params) {
        Map response = momoService.checkOrder(params);
        Receipt receipt = receiptService.getByMomoId(response.get("orderId").toString());
        if((int)response.get("resultCode") == 0 && receipt == null) {
            System.out.println("tinh tien");
            String decodedString = new String(Base64.getDecoder().decode(String.valueOf(params.get("extraData"))));
            Map<String, Object> content = null;
            try {
                ObjectMapper mapper = new ObjectMapper();
                content = mapper.readValue(decodedString, Map.class);
            } catch (IOException error) {

            }
            usageRightService.createOrExtend(content);
            return ResponseEntity.ok(receiptService.saveOrderByMomo(params, content));
        }
        return ResponseEntity.ok(response);
    }


}
