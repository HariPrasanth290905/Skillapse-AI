package com.bei.user_service.service;

import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;

import javax.security.auth.login.LoginException;

public interface AuthService {
    UserDto addUser(UserDto beiUsers);
    String verifyEmail(String email);
    String login(LoginRequest loginRequest, HttpServletRequest request) throws LoginException;
    boolean verifyOTP(String OTP,String email);
}
