package com.server.backend.controllers;

import com.server.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.services.JwtService;
import com.server.backend.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

import java.security.Security;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
            return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }


}