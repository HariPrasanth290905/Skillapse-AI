//package com.irah.skillsservice.redis;
//
//import com.irah.skillsservice.repository.InputRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class LoadRedis implements ApplicationRunner {
//
//    @Autowired
//    private RedisTemplate<String, Object> redisTemplate;
//
//    @Autowired
//    private InputRepository inputRepository;
//
//    @Override
//    public void run(ApplicationArguments args) {
//        redisTemplate.opsForValue().set("skills", inputRepository.findAll());
//    }
//}
