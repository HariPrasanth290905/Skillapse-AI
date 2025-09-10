package com.bei.user_service.impl;

import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.repo.UserRepo;
import com.bei.user_service.service.BeiUsersDetailsService;
import com.bei.user_service.service.JwtService;
import com.bei.user_service.service.RedisService;
import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    BeiUsersDetailsService userDS;

    @Autowired
    RedisService redisService;

    public BeiUsers addUser(BeiUsers beiUsers) {
        if (beiUsers == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        beiUsers.setPassword(new BCryptPasswordEncoder(12).encode(beiUsers.getPassword()));
        beiUsers.setRole("ROLE_USER");
        return userRepo.save(beiUsers);
    }

    @Override
    public BeiUsers updateUser(UUID id, BeiUsers updatedUser) {
        return userRepo.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(updatedUser.getUsername());
                    existingUser.setFullName(updatedUser.getFullName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setBio(updatedUser.getBio());
                    existingUser.setProfilePicUrl(updatedUser.getProfilePicUrl());
                    existingUser.setPassword(new BCryptPasswordEncoder(12).encode(updatedUser.getPassword()));
                    existingUser.setActive(updatedUser.isActive());
                    return userRepo.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public UserDto getUser(String username) {

        BeiUsers user = userRepo.findByUsername(username);
        return UserDto.builder()
                .username(user.getUsername())
                .position(user.getPosition())
                .profile(user.getProfilePicUrl())
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
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            BeiUsers user = userRepo.findByUsername(loginRequest.getUsername());
            System.out.println("User " + user);

            return verifyEmail(user.getEmail());

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void deleteAllUsers() {
        userRepo.deleteAll();
    }



    @Override
    public String verifyEmail(String email) {
        // Generate 6-digit OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);


        redisService.saveOtp(email, otp);
        // Create mail message
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Verify your email");
        mailMessage.setFrom("beiverify@gmail.com");
        mailMessage.setText("Enter this OTP to verify your email: " +otp);



        // Send mail
        mailSender.send(mailMessage);

        return email;
    }


    @Override
    public boolean verifyOTP(String OTP, String email) {
        boolean isValid = redisService.validateOtp(email, OTP);
        if (isValid) {
            redisService.deleteOtp(email);
        }
        return isValid;
    }



}
