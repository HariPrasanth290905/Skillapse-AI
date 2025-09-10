package com.bei.user_service.service;

import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class BeiUsersDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        BeiUsers user = userRepo.findByUsername(username);
        if (user==null)
            throw new UsernameNotFoundException("User not found with username: " + username);
        System.out.println("User " + user);
        return new User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                !user.isAccountLocked(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole())));
    }
}
