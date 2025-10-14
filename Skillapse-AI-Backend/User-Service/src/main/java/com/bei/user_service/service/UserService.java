package com.bei.user_service.service;

import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.dto.LoginRequest;

import java.util.UUID;

public interface UserService {
    UserDto addUser(UserDto beiUsers);
    UserDto updateUser(UserDto payload);
    UserDto getUser(String username);
    void deleteUser(UUID id);
    String login(LoginRequest loginRequest);
    void deleteAllUsers();
    String verifyEmail(String email);
    boolean verifyOTP(String OTP,String email);
}
