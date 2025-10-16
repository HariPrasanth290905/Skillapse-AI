package com.bei.user_service.controller;

import com.bei.user_service.dto.UpdateDTO;
import com.bei.user_service.dto.UserDto;

import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    ResponseEntity<?> updateUser(@RequestBody UpdateDTO users){
        System.out.println("users: " + users);
        return new ResponseEntity<>(userService.updateUser(users), HttpStatus.OK);

    }

    @PreAuthorize( "hasRole('ADMIN')")
    @DeleteMapping("/deleteAll")
    ResponseEntity<?> deleteAllUser() {
        userService.deleteAllUsers();
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @GetMapping("/getUser/{uuid}")
    ResponseEntity<?> getUserById(@PathVariable("uuid") UUID uuid) {
        UserDto user = userService.getUser(uuid);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{uuid}")
    ResponseEntity<?> deleteUserById(@PathVariable("uuid") UUID uuid) {
        userService.deleteUser(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
