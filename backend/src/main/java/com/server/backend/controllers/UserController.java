package com.server.backend.controllers;

import com.server.backend.services.FileService;
import com.server.backend.services.PaidService;
import com.server.backend.services.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private ReceiptService receiptService;

    @Autowired
    private PaidService paidService;
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
            return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @GetMapping("/receipt")
    public ResponseEntity<?> getUserReceipts(@RequestParam Map params) {
        return ResponseEntity.ok(receiptService.getByUserId(params));
    }

    @GetMapping("/paid")
    public ResponseEntity<?> getUserFilePaid(@RequestParam Map params) {
        return ResponseEntity.ok(paidService.getFilePaidByUserId(params));
    }

}