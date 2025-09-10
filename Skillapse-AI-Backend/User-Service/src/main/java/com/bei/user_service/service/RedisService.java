package com.bei.user_service.service;

public interface RedisService {
    void saveOtp(String email, String otp);
    boolean validateOtp(String email, String enteredOtp);
    void deleteOtp(String email);
}
