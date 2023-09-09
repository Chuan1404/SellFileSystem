package com.server.backend.repositories;

import com.server.backend.dto.response.UserInfoResponse;
import com.server.backend.enums.UserRole;
import com.server.backend.models.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.server.backend.models.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.userRoles ur WHERE ur.name = :role")
    Page<UserInfoResponse> findByRoles(UserRole role, Pageable pageable);
}
