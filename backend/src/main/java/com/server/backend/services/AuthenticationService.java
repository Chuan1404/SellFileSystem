package com.server.backend.services;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.*;

import com.server.backend.enums.AccountState;
import com.server.backend.models.VerificationCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.backend.dto.request.RefreshTokenRequest;
import com.server.backend.dto.request.RegisterRequest;
import com.server.backend.dto.request.SignInRequest;
import com.server.backend.dto.request.GoogleRequest;
import com.server.backend.dto.response.AuthenticationResponse;
import com.server.backend.enums.UserRole;
import com.server.backend.models.RefreshToken;
import com.server.backend.models.User;

@Service
public class AuthenticationService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private VerificationCodeService verificationCodeService;

    public boolean register(RegisterRequest request) throws MessagingException, UnsupportedEncodingException {
        User userExist = userService.findByEmail(request.getEmail()).orElse(null);
        if (userExist != null)
            return false;

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRoles(Set.of(roleService.getRoleByName(UserRole.ROLE_CUSTOMER)))
                .state(AccountState.UNVERIFIED)
                .createdDate(LocalDateTime.now())
                .build();


        userService.saveOrUpdateUser(user);
        this.sendVerificationEmail(user);
        return true;
    }

    public AuthenticationResponse signIn(SignInRequest request, boolean acceptUser) {
        User user = userService.findByEmail(request.getEmail()).orElse(null);
        var authenticationResponse = AuthenticationResponse.builder();
        if (user == null)
            return null;

        if (user.getState() != AccountState.VERIFIED)
            return authenticationResponse.state(user.getState()).build();


        if (!acceptUser && user.getUserRoles().contains(roleService.getRoleByName(UserRole.ROLE_CUSTOMER)))
            return null;

        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var jwtToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return authenticationResponse
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .state(user.getState())
                .build();

    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenService.findByToken(request.getToken()).orElse(null);
        if (refreshToken == null)
            return null;
        refreshToken = refreshTokenService.verifyExpiration(refreshToken);
        if (refreshToken == null)
            return null;

        String accessToken = jwtService.generateToken(refreshToken.getUser());
        return AuthenticationResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }

    public AuthenticationResponse google(GoogleRequest request) {
        User user = userService.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password("")
                    .avatar(request.getPicture())
                    .userRoles(Set.of(roleService.getRoleByName(UserRole.ROLE_CUSTOMER)))
                    .state(AccountState.VERIFIED)
                    .createdDate(LocalDateTime.now())
                    .build();
            userService.saveOrUpdateUser(user);
        }

        var jwtToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .state(user.getState())
                .build();
    }

    public void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        VerificationCode verificationCode = verificationCodeService.createCode(user);

        String toAddress = user.getEmail();
        String fromAddress = "7vnrong@gmail.com";
        String senderName = "DevChu Company";
        String subject = "Verify your account";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        String verifyURL = "http://localhost:8080/api/auth/verify?code=" + verificationCode.getValue();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verifyUser(String code) {
        return verificationCodeService.verify(code);
    }
}
