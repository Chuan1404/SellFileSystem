package com.server.backend.controllers;

import com.server.backend.dto.UserDTO;
import com.server.backend.models.User;
import com.server.backend.services.FileService;
import com.server.backend.services.UsageRightService;
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
    private FileService fileService;

    @Autowired
    private ReceiptService receiptService;

    @Autowired
    private UsageRightService usageRightService;
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
            return ResponseEntity.ok(new UserDTO((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @GetMapping("/receipt")
    public ResponseEntity<?> getUserReceipts(@RequestParam Map params) {
        return ResponseEntity.ok(receiptService.getByUserId(params));
    }

    @GetMapping("/paid")
    public ResponseEntity<?> getUserFilePaid(@RequestParam Map params) {
        return ResponseEntity.ok(usageRightService.getUserRightsByUserId(params));
    }

    @GetMapping("/file")
    public ResponseEntity<?> getUserFileUploaded(@RequestParam Map params) {
        return ResponseEntity.ok(fileService.getFileByUserId(params));
    }
}