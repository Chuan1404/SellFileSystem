package com.server.backend.controllers.admin;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.server.backend.dto.request.UpdateUserRequest;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.dto.response.Message;
import com.server.backend.dto.response.UserInfoResponse;
import com.server.backend.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.backend.models.User;
import com.server.backend.services.UserService;

@RestController
@RequestMapping("/admin/api/user")
@CrossOrigin
public class AdminUserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/")
    public ResponseEntity<?> getAllUser(@RequestParam Map<String, String> params) {

        Page<User> pages = (Page<User>) userService.getAllUser(params);
        if(pages == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Parameter are not valid"));
        }
        return ResponseEntity.ok(pages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        User user = userService.getUserById(id).orElse(null);

        if(user == null)
            return ResponseEntity.badRequest().body(new Error("User is not exist"));
        return ResponseEntity.ok(new UserInfoResponse(user));
    }
    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, UpdateUserRequest request) {
        User user = userService.updateByRequest(id, request);

        return ResponseEntity.ok(new UserInfoResponse(user));
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        boolean isSuccess = userService.deleteUser(id);
        if(isSuccess) return ResponseEntity.ok(new Message("Delete Success"));
        else return ResponseEntity.ok(new ErrorResponse("Delete failed"));
    }

}
