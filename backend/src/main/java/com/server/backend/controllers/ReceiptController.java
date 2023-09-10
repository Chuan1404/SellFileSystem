package com.server.backend.controllers;

import com.server.backend.services.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/receipt")
@CrossOrigin
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    public ResponseEntity<?> getAllReceipts() {
        return null;
    }
}
