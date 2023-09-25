package com.server.backend.services;

import java.io.File;
import java.util.*;

import com.server.backend.dto.request.UpdateUserRequest;
import com.server.backend.dto.UserDTO;
import com.server.backend.enums.FileQuality;
import com.server.backend.enums.UserRole;
import com.server.backend.utils.FileHandler;
import jakarta.transaction.Transactional;
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

    // get
    public Page<?> getAllUser(Map<String, String> params) {
        Pageable pageable = null;
        Page<UserDTO> users = null;
        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }

        if (params.get("role") == null)
            params.put("role", UserRole.ROLE_CUSTOMER.name());
        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            users = userRepository.findByRoles(UserRole.valueOf(params.get("role")), pageable);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return null;
        }
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
    public boolean deleteUser(String id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception error) {
            return false;
        }
    }

    // load
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user;
    }

}
