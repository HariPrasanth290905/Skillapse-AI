package com.bei.user_service.impl;

import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
