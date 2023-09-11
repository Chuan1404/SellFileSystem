package com.server.backend.services;

import com.server.backend.models.Paid;
import com.server.backend.models.User;
import com.server.backend.repositories.PaidRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@Service
public class PaidService {
    @Autowired
    private PaidRepository paidRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    public Page<Paid> getFilePaidByUserId(Map<String, String> params) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pageable pageable = null;
        Page<Paid> paids = null;
        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }

        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            paids = paidRepository.findByUserId(user.getId(), pageable);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return paids;
    }
    @Transactional
    public void createOrExtend(Map params) {
        User user = userService.getUserById((String) params.get("userId")).orElse(null);
        ArrayList<Integer> idList = (ArrayList) params.get("idList");
        Paid paid = null;
        for (Integer id: idList) {
            paid = paidRepository.findByUserIdAndFileId(user.getId(), id).orElse(null);

            if(paid != null) {
                paid.setExpireDate(paid.getExpireDate().plusYears(1));
            } else {
                paid = Paid.builder()
                        .file(fileService.getFileById(id))
                        .expireDate(LocalDateTime.now().plusYears(1))
                        .user(user)
                        .build();
            }
            saveOrUpdate(paid);
        }
    }

    public Paid saveOrUpdate(Paid paid) {
        return paidRepository.save(paid);
    }
    public boolean checkExpireDate(Paid paid) {
        return true;
    }
}
