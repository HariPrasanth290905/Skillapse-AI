package com.bei.user_service.impl;

import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements com.bei.user_service.service.UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public BeiUsers addUser(BeiUsers beiUsers) {
        if (beiUsers == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        return userRepo.save(beiUsers);
    }

    @Override
    public BeiUsers getUserById(UUID id) {
        Optional<BeiUsers> byId = userRepo.findById(id);
        return byId.orElse(null);
    }

    @Override
    public BeiUsers updateUser(UUID id, BeiUsers updatedUser) {
        return userRepo.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(updatedUser.getUsername());
                    existingUser.setFullName(updatedUser.getFullName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setBio(updatedUser.getBio());
                    existingUser.setProfilePicUrl(updatedUser.getProfilePicUrl());
                    existingUser.setPassword(updatedUser.getPassword());
                    existingUser.setActive(updatedUser.isActive());
                    return userRepo.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public void deleteUser(UUID id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepo.deleteById(id);
    }


}
