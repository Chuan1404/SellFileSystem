package com.server.backend.dto.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String userRole;
    private String password;
}
