package com.server.backend.repositories;

import com.server.backend.enums.UserRole;
import com.server.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> getRoleByName(UserRole role);
}
