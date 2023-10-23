package com.server.backend.services;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.server.backend.enums.PaymentMethod;
import com.server.backend.models.FileUploaded;
import com.server.backend.models.User;
import com.server.backend.utils.Pagination;
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
    private Pagination pagination;
    // get
    public Page<Receipt> getByUserId(Map<String, String> params) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Pageable pageable = pagination.page(params.get("page"), params.get("limit"));
        Page<Receipt>  receipts = receiptRepository.findByUserId(user.getId(), pageable);

        return receipts;
    }

    public Receipt getByMomoId(String id) {
        Receipt receipt = receiptRepository.findByMomoId(id).orElse(null);
        return receipt;
    }

    public List<Receipt> getReceiptsContainFile(FileUploaded fileUploaded) {
        return receiptRepository.findByFileId(fileUploaded.getId());
    }

    public List<Integer> getListYearAvailable() {
        return receiptRepository.getYearAvailable();
    }
    // statistic
    public List<Double> statisticsByYear(Map<String, String> params) {
        int year = Integer.parseInt(params.get("year"));
        List<Map> statisted = receiptRepository.statisticByYear(year);
        List<Double> result = new ArrayList<>(Collections.nCopies(12, 0.0));

        for (Map item : statisted) {
            result.remove((Integer) item.get("month") - 1);
            result.add((Integer) item.get("month") - 1, (Double) item.get("revenue"));
        }

        return result;
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
                    .momoId(params.get("orderId").toString())
                    .files(idList.stream().map(id -> fileService.getFileById(id)).collect(Collectors.toSet()))
                    .createdDate(LocalDateTime.now());
        }
        return receiptRepository.save(order.build());
    }

    // saveOrUpdate
    public Receipt saveOrUpdate(Receipt receipt) {
        if(receipt.getId() > 0) {

        }
        return receiptRepository.save(receipt);
    }
}
