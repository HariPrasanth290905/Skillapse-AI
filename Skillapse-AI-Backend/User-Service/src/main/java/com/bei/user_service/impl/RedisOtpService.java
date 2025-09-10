package com.bei.user_service.impl;

import com.bei.user_service.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisOtpService implements RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final int OTP_EXPIRY_MINUTES = 10;

    @Override
    public void saveOtp(String email, String otp) {
        redisTemplate.opsForValue().set(email, otp, Duration.ofMinutes(OTP_EXPIRY_MINUTES));
    }

    @Override
    public boolean validateOtp(String email, String enteredOtp) {
        String cachedOtp = (String) redisTemplate.opsForValue().get(email);
        if (cachedOtp == null) return false;
        if (cachedOtp.equals(enteredOtp)) {
            redisTemplate.delete(email);
            return true;
        }
        return false;
    }

    @Override
    public void deleteOtp(String email) {
        redisTemplate.delete(email);
    }
}
