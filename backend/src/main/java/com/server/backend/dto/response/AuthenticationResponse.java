package com.server.backend.dto.response;

import com.server.backend.enums.AccountState;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    public String accessToken;
    public String refreshToken;
    public AccountState state;
}
