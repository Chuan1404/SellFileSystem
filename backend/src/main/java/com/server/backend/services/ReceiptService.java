package com.server.backend.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.dto.response.UserInfoResponse;
import com.server.backend.enums.PaymentMethod;
import com.server.backend.enums.UserRole;
import com.server.backend.models.User;
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
    public Receipt saveOrderByMomo(Map params) {
        String decodedString = new String(Base64.getDecoder().decode(String.valueOf(params.get("extraData"))));

        Map<String, Object> content = null;
        ArrayList<Integer> idList = new ArrayList<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            content = mapper.readValue(decodedString, Map.class);
            idList = (ArrayList) content.get("idList");

        } catch (IOException error) {

        }
        User user = userService.getUserById((String) content.get("userId")).orElse(null);
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
