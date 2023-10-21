package com.server.backend.services;

import java.io.File;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;

import com.server.backend.dto.request.UpdateUserRequest;
import com.server.backend.dto.UserDTO;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.enums.FileQuality;
import com.server.backend.enums.UserRole;
import com.server.backend.utils.FileHandler;
import com.server.backend.utils.Pagination;
import jakarta.transaction.Transactional;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.server.backend.models.User;
import com.server.backend.repositories.UserRepository;

import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private AmazonS3Service amazonS3Service;

    @Autowired
    private Pagination pagination;
    // get
    public Page<UserDTO> getAllUser(Map<String, String> params) {

        // pagination
        Pageable pageable = pagination.page(params.get("page"), params.get("limit"));

        if (params.get("role") == null)
            params.put("role", UserRole.ROLE_CUSTOMER.name());
        Page<UserDTO> users = userRepository.findByRoles(UserRole.valueOf(params.get("role")), pageable);

        return users;
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    // save and update
    public User saveOrUpdateUser(User user) {
        if (user.getId() == null) {
            user.setId(UUID.randomUUID().toString());
        }
        return userRepository.save(user);
    }

    @Transactional
    public User updateByRequest(String id, UpdateUserRequest request) {
        User user = this.getUserById(id).orElse(null);

        if(request.getAvatar() != null) {
            File avatar = FileHandler.multipartToFile(request.getAvatar());
            String url = amazonS3Service.uploadFile(avatar, FileQuality.AVATAR);
            user.setAvatar(url);
        }
        user.setState(request.getState());
        user.setName(request.getName());
        user.setUserRoles(request.getUserRoles().stream().map(role -> roleService.getRoleByName(UserRole.valueOf(role))).collect(Collectors.toSet()));

        user = this.saveOrUpdateUser(user);
        return user;
    }

    // delete
    public ErrorResponse deleteUser(String id) {
        try {
            userRepository.deleteById(id);
            return null;
        }
        catch (Exception error) {
            return new ErrorResponse(error.getMessage());
        }
    }

    // load
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user;
    }

}
