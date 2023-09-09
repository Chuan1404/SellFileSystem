package com.server.backend.services;

import com.server.backend.enums.AccountState;
import com.server.backend.models.RefreshToken;
import com.server.backend.models.User;
import com.server.backend.models.VerificationCode;
import com.server.backend.repositories.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class VerificationCodeService {
    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Autowired
    private UserService userService;


    public VerificationCode createCode(User user) {
        String randomCode = UUID.randomUUID().toString();

        VerificationCode verificationCode = VerificationCode.builder()
                .value(randomCode)
                .user(user)
                .build();
        return verificationCodeRepository.save(verificationCode);
    }

    public boolean verify(String code) {
        VerificationCode verificationCode = verificationCodeRepository.findByValue(code).orElse(null);

        if(verificationCode != null) {
            User user = verificationCode.getUser();
            user.setState(AccountState.VERIFIED);

            verificationCodeRepository.delete(verificationCode);
            userService.saveOrUpdateUser(user);
            return true;
        }
        return false;
    }
}
