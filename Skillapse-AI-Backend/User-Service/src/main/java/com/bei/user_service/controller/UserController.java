package com.bei.user_service.controller;

import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;

import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    String home() {
        return "Hello World!";
    }

    @GetMapping("/test")
    String test() {
        return "Successful";
    }

    @PutMapping("/update")
    ResponseEntity<?> updateUser(@RequestBody UserDto users){
        System.out.println("users: " + users);
        try {
            return new ResponseEntity<>(userService.updateUser(users), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize( "hasRole('ADMIN')")
    @DeleteMapping("/deleteAll")
    ResponseEntity<?> deleteAllUser() {
        userService.deleteAllUsers();
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @GetMapping("/getUser")
    ResponseEntity<?> getUserByUsername(Authentication authentication) {
        String username = authentication.getName();
        UserDto user = userService.getUser(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
