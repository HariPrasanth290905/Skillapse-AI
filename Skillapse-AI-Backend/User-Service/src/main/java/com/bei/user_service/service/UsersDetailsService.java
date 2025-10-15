package com.bei.user_service.service;

import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UsersDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        BeiUsers user = userRepo.findByUsernameCaseSensitive(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        System.out.println("found");

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .disabled(user.isActive())
                .accountLocked(user.isAccountLocked())
                .authorities(user.getRole())
                .build();

    }
}
