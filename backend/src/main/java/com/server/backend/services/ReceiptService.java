package com.server.backend.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.enums.PaymentMethod;
import com.server.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.backend.models.Receipt;
import com.server.backend.repositories.ReceiptRepository;


@Service
public class ReceiptService {
    @Autowired
    private ReceiptRepository orderRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;


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
                    .files(null)
                    .createdDate(LocalDateTime.now());
        }
        System.out.println(idList.stream().map(id -> fileService.getFileById(id)).collect(Collectors.toSet()));

        return orderRepository.save(order.build());
    }

}
