package com.server.backend.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.dto.response.UserInfoResponse;
import com.server.backend.enums.PaymentMethod;
import com.server.backend.enums.UserRole;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.server.backend.models.Receipt;
import com.server.backend.repositories.ReceiptRepository;


@Service
public class ReceiptService {
    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaidService paidService;

    // get
    public Page<Receipt> getByUserId(Map<String, String> params) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pageable pageable = null;
        Page<Receipt> receipts = null;
        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }

        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            receipts = receiptRepository.findByUserId(user.getId(), pageable);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return receipts;
    }

    // save
    @Transactional
    public Receipt saveOrderByMomo(Map params, Map extraData) {
        User user = userService.getUserById((String) extraData.get("userId")).orElse(null);
        ArrayList<Integer> idList = (ArrayList) extraData.get("idList");
        // create order
        var order = Receipt.builder();

        if (user != null) {
            order = Receipt.builder()
                    .user(user)
                    .totalPrice(Double.valueOf(String.valueOf(params.get("amount"))))
                    .method(PaymentMethod.MOMO)
                    .files(idList.stream().map(id -> fileService.getFileById(id)).collect(Collectors.toSet()))
                    .createdDate(LocalDateTime.now());
        }

        return receiptRepository.save(order.build());
    }


}
