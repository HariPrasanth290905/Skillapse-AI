package com.bei.user_service.service;

import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

@Service
public class UsersDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        BeiUsers user = userRepo.findByUsernameCaseSensitive(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        System.out.println("found");

        return BeiUserDetails.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .enabled(!user.isActive())
                .accountNonLocked(!user.isAccountLocked())
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .authorities(Collections.singleton(new SimpleGrantedAuthority(user.getRole())))
                .build();

    }
    public UserDetails loadUserById(UUID id) throws UsernameNotFoundException {
        BeiUsers user = userRepo.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        System.out.println("found");
        return BeiUserDetails.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .enabled(!user.isActive())
                .accountNonLocked(!user.isAccountLocked())
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .authorities(Collections.singleton(new SimpleGrantedAuthority(user.getRole())))
                .build();
    }
}
