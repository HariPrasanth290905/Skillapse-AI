package com.bei.user_service.service;

import com.bei.user_service.dto.UpdateDTO;
import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;

import java.util.UUID;

public interface UserService {
    UpdateDTO updateUser(UpdateDTO payload);
    UserDto getUser(UUID userid);
    void deleteUser(UUID id);
    void deleteAllUsers();

}
