package com.bei.user_service.controller;

import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Value("${spring.datasource.username}")
    String msg;

    @GetMapping("/")
    String hello() {
        return msg;
    }

    @GetMapping("/signup")
    ResponseEntity<BeiUsers> addUser(@RequestBody  BeiUsers beiUsers){
        return ResponseEntity.ok(userService.addUser(beiUsers));
    }

}
