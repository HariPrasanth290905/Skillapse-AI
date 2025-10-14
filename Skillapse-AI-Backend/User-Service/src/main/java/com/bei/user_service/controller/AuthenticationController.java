package com.bei.user_service.controller;

import com.bei.user_service.dto.Otp;
import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.service.JwtService;
import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/signUp")
    ResponseEntity<?> signup(@RequestBody UserDto users) {
        try {
            return new ResponseEntity<>(userService.addUser(users), HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/signIn")
    ResponseEntity<String> signin(@RequestBody LoginRequest loginRequest) {
        System.out.println("login request: " + loginRequest);
        try {
            return new ResponseEntity<>(userService.login(loginRequest), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/verifyOtp")
    ResponseEntity<?> verifyOTP(@RequestBody Otp otp) {
        
        try{
            boolean verified = userService.verifyOTP(otp.getOtp(), otp.getEmail());
            if (!verified) {
                return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(jwtService.generateToken(otp.getUsername()), HttpStatus.OK);
        }
        catch (Exception ex){
            System.out.println("Exception: " + ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
