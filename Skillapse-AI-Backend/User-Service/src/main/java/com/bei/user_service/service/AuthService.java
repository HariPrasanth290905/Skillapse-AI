package com.bei.user_service.service;

import com.bei.user_service.dto.LoginRequest;
import com.bei.user_service.dto.UserDto;

public interface AuthService {
    UserDto addUser(UserDto beiUsers);
    String verifyEmail(String email);
    String login(LoginRequest loginRequest);
    boolean verifyOTP(String OTP,String email);
}
