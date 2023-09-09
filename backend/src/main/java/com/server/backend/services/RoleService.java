package com.server.backend.services;

import com.server.backend.enums.UserRole;
import com.server.backend.models.Role;
import com.server.backend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;
    public Role getRoleByName(UserRole role) {
        return roleRepository.getRoleByName(role).orElse(null);
    }
}
