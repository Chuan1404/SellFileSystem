package com.server.backend.services;

import com.server.backend.models.FileUploaded;
import com.server.backend.models.UsageRight;
import com.server.backend.models.User;
import com.server.backend.repositories.UsageRightRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UsageRightService {
    @Autowired
    private UsageRightRepository usageRightRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    public Page<UsageRight> getUserRightsByUserId(Map<String, String> params) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pageable pageable = null;
        Page<UsageRight> userRights = null;
        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            userRights = usageRightRepository.findByUserId(user.getId(), pageable);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return userRights;
    }

    public UsageRight getUserRightByFileId(int id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return usageRightRepository.findByUserIdAndFileId(user.getId(), id).orElse(null);
    }
    @Transactional
    public void createOrExtend(Map params) {
        User user = userService.getUserById((String) params.get("userId")).orElse(null);
        ArrayList<Integer> idList = (ArrayList) params.get("idList");
        UsageRight usageRight = null;
        for (Integer id: idList) {
            usageRight = usageRightRepository.findByUserIdAndFileId(user.getId(), id).orElse(null);

            if(usageRight != null) {
                if(this.checkExpireDate(usageRight)) {
                    usageRight.setExpireDate(usageRight.getExpireDate().plusYears(1));
                }
                else {
                    usageRight.setExpireDate(LocalDateTime.now().plusYears(1));
                }
            } else {
                usageRight = UsageRight.builder()
                        .file(fileService.getFileById(id))
                        .expireDate(LocalDateTime.now().plusYears(1))
                        .user(user)
                        .build();
            }
            saveOrUpdate(usageRight);
        }
    }


    public boolean checkExpireDate(UsageRight usageRight) {
        if(usageRight.getExpireDate().isAfter(LocalDateTime.now()))
            return true;
        return false;
    }

    public List<UsageRight> getByFile(FileUploaded fileUploaded) {
        return  usageRightRepository.findByFileId(fileUploaded.getId());
    }

    public UsageRight saveOrUpdate(UsageRight usageRight) {
//        if(usageRight.getId() > 0) {
//
//        }
        return usageRightRepository.save(usageRight);
    }
}
