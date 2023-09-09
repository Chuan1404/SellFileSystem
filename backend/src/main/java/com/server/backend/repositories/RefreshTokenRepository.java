/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.server.backend.repositories;

import com.server.backend.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;  
import org.springframework.stereotype.Repository;

/**
 *
 * @author AnChuPC
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer>{
    public Optional<RefreshToken> findByToken(String token);
    public Optional<RefreshToken> findByUserId(String userId);
}
