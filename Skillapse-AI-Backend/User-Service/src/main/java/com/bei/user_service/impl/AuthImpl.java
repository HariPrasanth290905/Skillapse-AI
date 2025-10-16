package com.bei.user_service.impl;

import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.repo.UserRepo;
import com.bei.user_service.service.AuthService;
import com.bei.user_service.service.JwtService;
import com.bei.user_service.service.RedisService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

import static com.bei.user_service.mapper.Mapper.mapToDto;

@Service
public class AuthImpl implements AuthService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    RedisService redisService;

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private JavaMailSender mailSender;

    @Autowired
    private JwtService jwtService;

    @Override
    public UserDto addUser(UserDto user) {
        if (userRepo.findByUsernameCaseSensitive(user.getUsername()).isPresent() ||
                userRepo.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User already exists");
        }

        BeiUsers beiUser = mapToDto(user);
        beiUser.getContact().setUser(beiUser);
        userRepo.save(beiUser);
        user.setUserId(beiUser.getId());
        return user;
    }

    @Override
    public String login(LoginRequest loginRequest, HttpServletRequest request) throws LoginException {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword()
                    ));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            BeiUsers user = userRepo.findByUsernameCaseSensitive(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found with username: " + loginRequest.getUsername()));
            String token = jwtService.generateToken(user.getId());
            user.setLastLoginAt(java.time.LocalDateTime.now());

            String clientIp = request.getHeader("X-Forwarded-For");

            if (clientIp == null || clientIp.isEmpty() || "unknown".equalsIgnoreCase(clientIp)) {
                clientIp = request.getRemoteAddr();
            }
            user.setLastLoginIp(clientIp);
            userRepo.save(user);
            return token;

        } catch (Exception ex) {
            throw new LoginException(ex.getMessage());
        }
    }

    @Override
    public String verifyEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        // Generate 6-digit OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

        redisService.saveOtp(email, otp);
        // Create mail message
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Verify your email");
        mailMessage.setFrom("beiverify@gmail.com");
        mailMessage.setText("Enter this OTP to verify your email: " + otp);

        // Send mail
        mailSender.send(mailMessage);

        return email;
    }


    @Override
    public boolean verifyOTP(String OTP, String email) {
        if (email == null || email.isBlank() || OTP == null || OTP.isBlank()) {
            return false;
        }
        boolean isValid = redisService.validateOtp(email, OTP);
        if (isValid) {
            redisService.deleteOtp(email);
            // Mark email as verified for the user with this email
            BeiUsers user = userRepo.findByEmail(email);
            if (user != null) {
                user.setEmailVerified(true);
                user.setFailedLoginAttempts(0);
                user.setAccountLocked(false);
                user.setLastLoginAt(java.time.LocalDateTime.now());
                userRepo.save(user);
            }
        }
        return isValid;
    }

}
