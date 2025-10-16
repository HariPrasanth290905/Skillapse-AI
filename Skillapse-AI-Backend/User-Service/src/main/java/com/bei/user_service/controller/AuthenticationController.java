package com.bei.user_service.controller;

import com.bei.user_service.dto.Otp;
import com.bei.user_service.dto.UserDto;
import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.service.AuthService;
import com.bei.user_service.service.JwtService;
import com.bei.user_service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.login.LoginException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthService authService;

    @PostMapping("/signUp")
    ResponseEntity<?> signup(@Valid @RequestBody UserDto users) {
        try {
            return new ResponseEntity<>(authService.addUser(users), HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/signIn")
    ResponseEntity<String> signin(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) throws LoginException {
        System.out.println("login request: " + loginRequest);
            return new ResponseEntity<>(authService.login(loginRequest,request), HttpStatus.OK);
    }

    @PostMapping("/verifyOtp")
    ResponseEntity<?> verifyOTP(@RequestBody Otp otp) {
        
        try{
            boolean verified = authService.verifyOTP(otp.getOtp(), otp.getEmail());
            if (!verified) {
                return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(jwtService.generateToken(otp.getId()), HttpStatus.OK);
        }
        catch (Exception ex){
            System.out.println("Exception: " + ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
