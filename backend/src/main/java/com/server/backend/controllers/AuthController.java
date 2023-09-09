package com.server.backend.controllers;

import com.server.backend.dto.response.Message;
import com.server.backend.enums.AccountState;
import com.server.backend.models.User;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.backend.dto.request.RefreshTokenRequest;
import com.server.backend.dto.request.RegisterRequest;
import com.server.backend.dto.request.SignInRequest;
import com.server.backend.dto.request.GoogleRequest;
import com.server.backend.dto.response.AuthenticationResponse;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.services.AuthenticationService;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request)  throws MessagingException, UnsupportedEncodingException {
        boolean isSuccess = authenticationService.register(request);
        if (!isSuccess)
            return ResponseEntity.badRequest().body(ErrorResponse.builder().error("User existed").build());
        return ResponseEntity.ok(new Message("Register success. Please verify your account in email"));
    }

    @PostMapping("/sign-in")
    private ResponseEntity<?> signInUser(@RequestBody SignInRequest request) {
        AuthenticationResponse response = authenticationService.signIn(request, true);
        ErrorResponse errorResponse = checkError(response);
        if (errorResponse != null)
            return ResponseEntity.badRequest().body(errorResponse);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin")
    private ResponseEntity<?> signInAdmin(@RequestBody SignInRequest request) {
        AuthenticationResponse response = authenticationService.signIn(request, false);
        ErrorResponse errorResponse = checkError(response);
        if (errorResponse != null)
            return ResponseEntity.badRequest().body(errorResponse);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        AuthenticationResponse response = authenticationService.refreshToken(request);
        if (response == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ErrorResponse.builder().error("Unauthorize").build());
        return ResponseEntity.ok(authenticationService.refreshToken(request));
    }

    @PostMapping("/google")
    public ResponseEntity<?> google(@RequestBody GoogleRequest request) {
        AuthenticationResponse response = authenticationService.google(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String code) {
        boolean isSuccess = authenticationService.verifyUser(code);

        if(!isSuccess) return ResponseEntity.badRequest().body(new ErrorResponse("Verify account fail"));

        return ResponseEntity.ok(new Message("Verify success"));
    }

    private ErrorResponse checkError(AuthenticationResponse authenticationResponse) {
        var errorResponse = ErrorResponse.builder();

        if (authenticationResponse == null)
            return errorResponse.error("Email or password is not correct").build();

        if(authenticationResponse.getState() == AccountState.UNVERIFIED)
            return errorResponse.error("Account is not verified").build();

        if(authenticationResponse.getState() == AccountState.BANNED)
            return errorResponse.error("Account is banned").build();

        return null;
    }
}
