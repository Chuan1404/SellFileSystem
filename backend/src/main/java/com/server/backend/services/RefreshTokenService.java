/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.server.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.backend.models.RefreshToken;
import com.server.backend.repositories.RefreshTokenRepository;

import java.util.Optional;
import java.util.UUID;
import java.time.Instant;
import java.time.ZoneId;
import org.springframework.beans.factory.annotation.Value;
import java.time.LocalDateTime;

/**
 *
 * @author AnChuPC
 */
@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserService userService;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Value("${com.server.backend.jwtRefreshExpiration}")
    private Integer jwtRefreshExpirationMs;

    public RefreshToken createRefreshToken(String userId) {

        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId).orElse(null);
        if (refreshToken == null) {
            Instant instant = Instant.now().plusSeconds(jwtRefreshExpirationMs * 60);
            ZoneId zoneId = ZoneId.systemDefault();

            LocalDateTime dateTime = LocalDateTime.ofInstant(instant, zoneId);
            refreshToken = RefreshToken.builder()
                    .user(userService.getUserById(userId).get())
                    .expireDate(dateTime)
                    .token(UUID.randomUUID().toString())
                    .build();

            refreshTokenRepository.save(refreshToken);
        }

        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpireDate().compareTo(LocalDateTime.now()) < 0) {
            refreshTokenRepository.delete(token);
            return null;
        } else {
            return token;
        }
    }
}
