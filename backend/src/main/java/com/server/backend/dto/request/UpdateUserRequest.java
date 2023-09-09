package com.server.backend.dto.request;

import com.server.backend.enums.AccountState;
import com.server.backend.enums.UserRole;
import com.server.backend.models.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
    private MultipartFile avatar = null;
    private String name;

    @Enumerated(EnumType.STRING)
    private AccountState state;

    private List<String> userRoles;
}
