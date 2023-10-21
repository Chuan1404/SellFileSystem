package com.server.backend.services;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.server.backend.dto.request.*;
import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.dto.response.Message;
import com.server.backend.enums.AccountState;
import com.server.backend.enums.FileQuality;
import com.server.backend.models.VerificationCode;
import com.server.backend.utils.FileHandler;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Autowired
    private AmazonS3Service amazonS3Service;

    public boolean register(RegisterRequest request) throws MessagingException, UnsupportedEncodingException {
        User userExist = userService.getUserByEmail(request.getEmail()).orElse(null);
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
        User user = userService.getUserByEmail(request.getEmail()).orElse(null);
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

    public AuthenticationResponse google(GoogleRequest request, boolean isAllowCustomer) {
        User user = userService.getUserByEmail(request.getEmail()).orElse(null);

        if (!isAllowCustomer && user.getUserRoles().contains(roleService.getRoleByName(UserRole.ROLE_CUSTOMER)))
            return null;

        if (user == null && isAllowCustomer) {
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

        if (user != null) {
            var jwtToken = jwtService.generateToken(user);
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken.getToken())
                    .state(user.getState())
                    .build();
        } else return null;

    }

    public ResponseEntity addEmployee(AddEmployeeRequest request) throws MessagingException, UnsupportedEncodingException {
        User user = userService.getUserByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            var builder = User
                    .builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .state(AccountState.UNVERIFIED)
                    .password(passwordEncoder.encode(request.getPassword()))
                    .userRoles(request.getUserRoles().stream().map(role -> roleService.getRoleByName(UserRole.valueOf(role))).collect(Collectors.toSet()))
                    .createdDate(LocalDateTime.now());
            if (request.getAvatar() != null) {
                File avatar = FileHandler.multipartToFile(request.getAvatar());
                String url = amazonS3Service.uploadFile(avatar, FileQuality.AVATAR);
                builder.avatar(url);
            }
            user = builder.build();
            userService.saveOrUpdateUser(user);
        }
        else return ResponseEntity.badRequest().body(new ErrorResponse("Account existed"));
        this.sendVerificationEmail(user);


        return ResponseEntity.ok(new Message("Create success "));
    }

    public void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        VerificationCode verificationCode = verificationCodeService.createCode(user);

        String toAddress = user.getEmail();
        String fromAddress = "7vnrong@gmail.com";
        String senderName = "DevChu Company";
        String subject = "Xác thực tài khoản của bạn";
        String content = "Kính gửi [[name]],<br><br>"
                + "Cảm ơn bạn vì đã dành sự quan tâm và tin tưởng tới dịch vụ của chúng tôi.<br>"
                + "Trải nghiệm của khách hàng chính là động lực to lớn nhất của chùng tôi và nhất định chúng tôi sẽ mang đến cho bạn trải nghiệm tốt nhất. "
                + "Chúng tôi luôn nỗ lực không ngừng, hướng tới mục tiêu phát triển bền vững, chú trọng xây dựng các chính sách chăm sóc khách hàng, mang lại những giá trị thiết thực để luôn làm hài lòng khách hàng ở mức cao nhất nhằm đáp lại tình cảm và sự tin yêu của bạn.<br>"
                + "Một lần nữa cảm ởn bạn và đừng quên xác nhận tài khoản của bạn bằng link bên dưới để trải nghiệm dịch vụ:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">Trải nghiệm dịch vụ tại đây</a></h3>"
                + "Thân ái,<br>"
                + "DevChu Company.";
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
