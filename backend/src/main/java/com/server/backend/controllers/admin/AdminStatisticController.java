package com.server.backend.controllers.admin;

import com.server.backend.services.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("admin/api/statistic")
@CrossOrigin
public class AdminStatisticController {

    @Autowired
    private ReceiptService receiptService;
    @GetMapping("/")
    public ResponseEntity<?> statisticsByYear(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(receiptService.statisticsByYear(params));
    }

    @GetMapping("/getYear")
    public ResponseEntity<?> getYearAvailable() {
        return ResponseEntity.ok(receiptService.getListYearAvailable());
    }
}
