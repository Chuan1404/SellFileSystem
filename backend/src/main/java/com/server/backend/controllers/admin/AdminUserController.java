package com.server.backend.controllers.admin;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import com.server.backend.dto.request.AddEmployeeRequest;
import com.server.backend.dto.request.UpdateUserRequest;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.dto.response.Message;
import com.server.backend.dto.UserDTO;
import com.server.backend.services.AuthenticationService;
import jakarta.mail.MessagingException;
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

    @Autowired
    private AuthenticationService authenticationService;
    
    @GetMapping("/")
    public ResponseEntity<?> getAllUser(@RequestParam Map<String, String> params) {

        Page<UserDTO> pages = userService.getAllUser(params);
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
        return ResponseEntity.ok(new UserDTO(user));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(AddEmployeeRequest request) throws MessagingException, UnsupportedEncodingException {
        ResponseEntity response = authenticationService.addEmployee(request);
        return response;
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, UpdateUserRequest request) {
        User user = userService.updateByRequest(id, request);

        return ResponseEntity.ok(new UserDTO(user));
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        ErrorResponse response = userService.deleteUser(id);
        if(response == null) return ResponseEntity.ok(new Message("Delete Success"));
        else return ResponseEntity.ok(response);
    }

}
