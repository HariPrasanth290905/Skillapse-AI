package com.bei.user_service.impl;

import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.repo.UserRepo;
import com.bei.user_service.service.RedisService;
import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private JavaMailSender mailSender;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    RedisService redisService;

    public BeiUsers addUser(BeiUsers beiUsers) {
        if (beiUsers == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        if (beiUsers.getUsername() == null || beiUsers.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (beiUsers.getEmail() == null || beiUsers.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (beiUsers.getPassword() == null || beiUsers.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
        beiUsers.setPassword(new BCryptPasswordEncoder(12).encode(beiUsers.getPassword()));
        if (beiUsers.getRole() == null || beiUsers.getRole().isBlank()) {
            beiUsers.setRole("ROLE_USER");
        }
        return userRepo.save(beiUsers);
    }

    @Override
    @Transactional
    public BeiUsers updateUser(UserDto updatedUser) {
        if (updatedUser == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        if(updatedUser.getId() == null){
            throw new IllegalArgumentException("User id cannot be null");
        }
        BeiUsers user = userRepo.findById(updatedUser.getId()).orElseThrow(() -> new RuntimeException("User not found with id: " + updatedUser.getId()));
        if (updatedUser.getFullName() != null && !updatedUser.getFullName().isBlank()) {
            user.setFullName(updatedUser.getFullName());
        }
        if (updatedUser.getPosition() != null && !updatedUser.getPosition().isBlank()) {
            user.setPosition(updatedUser.getPosition());
        }
        if(updatedUser.getContact()!=null){
            user.setContact(updatedUser.getContact());
        }
        if(updatedUser.getExperience()!=null){
            user.setExperience(updatedUser.getExperience());
        }
        if(updatedUser.getAboutMe()!=null && !updatedUser.getAboutMe().isBlank()){
            user.setAboutMe(updatedUser.getAboutMe());
        }
        return userRepo.save(user);
    }

    @Override
    public UserDto getUser(String username) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }
        BeiUsers user = userRepo.findByUsernameCaseSensitive(username).get();


        return UserDto.builder()
                .id(user.getId())
                .aboutMe(user.getAboutMe())
                .contact(user.getContact())
                .fullName(user.getFullName())
                .position(user.getPosition())
                .experience(user.getExperience())
                .createdAt(user.getCreatedAt()
                        .format(DateTimeFormatter.ofPattern("MMMM yyyy")))
//                .profilePicUrl(user.getProfilePicUrl())
                .build();
    }

    @Override
    public void deleteUser(UUID id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepo.deleteById(id);
    }

    @Override
    public String login(LoginRequest loginRequest) {
        if (loginRequest == null || loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
            throw new IllegalArgumentException("Username and password are required");
        }
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            BeiUsers user = userRepo.findByUsernameCaseSensitive(loginRequest.getUsername()).get();
            return verifyEmail(user.getEmail());

        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    @Override
    public void deleteAllUsers() {
        userRepo.deleteAll();
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
