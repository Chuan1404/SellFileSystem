package com.server.backend.dto.response;

import com.server.backend.enums.AccountState;
import com.server.backend.models.Role;
import com.server.backend.models.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {

    public UserInfoResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.avatar = user.getAvatar();
        this.state = user.getState();
        this.createdDate = user.getCreatedDate();
        this.userRoles = user.getUserRoles();
    }
    private String id;
    private String email;
    private String name;
    private String avatar;
    @Enumerated(EnumType.STRING)
    private AccountState state;
    private LocalDateTime createdDate;
    private Set<Role> userRoles = new HashSet<>();


}
