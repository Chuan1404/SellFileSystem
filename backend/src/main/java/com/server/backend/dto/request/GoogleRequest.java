package com.server.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleRequest {
    private String aud;
    private String azp;
    private String email;
    private String emailVerified;
    private Long exp;
    private String familyName;
    private String givenName;
    private Long iat;
    private String picture;
    private String iss;
    private String jti;
    private String name;
    private Long nbf;
    private String sub;
}
