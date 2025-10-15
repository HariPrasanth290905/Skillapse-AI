package com.bei.user_service.impl;

/*
Operations to manage user accounts
OPERATIONS: ADD USER, UPDATE USER, DELETE USER, GET USER
*/
import com.bei.user_service.dto.ContactDTO;
import com.bei.user_service.dto.UpdateDTO;
import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.model.Contact;
import com.bei.user_service.repo.UserRepo;
import com.bei.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static com.bei.user_service.mapper.Mapper.mapToContactDto;
import static com.bei.user_service.mapper.Mapper.mapToDto;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    //Updating the user data
    @Override
    @Transactional
    public UpdateDTO updateUser(UpdateDTO updatedUser) {
        BeiUsers dbUser = userRepo.findById(updatedUser.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update only if fields are not null
        if (updatedUser.getUsername() != null)
            dbUser.setUsername(updatedUser.getUsername());
        if (updatedUser.getFullName() != null)
            dbUser.setFullName(updatedUser.getFullName());
        if (updatedUser.getPosition() != null)
            dbUser.setPosition(updatedUser.getPosition());
        if (updatedUser.getExperience() != null)
            dbUser.setExperience(updatedUser.getExperience());
        if (updatedUser.getContact() != null) {
            Contact c = dbUser.getContact();
            c.setPhone(updatedUser.getContact().getPhone());
            c.setAddress(updatedUser.getContact().getAddress());
            dbUser.setContact(c);
        }
        if (updatedUser.getAboutMe() != null)
            dbUser.setAboutMe(updatedUser.getAboutMe());

        userRepo.save(dbUser);

        return updatedUser;
    }


    //Retrieving a single user by id
    @Override
    public UserDto getUser(UUID userid) {
        Optional<BeiUsers> user = userRepo.findById(userid);
        if (user.isPresent()) {
            BeiUsers u = user.get();
            return UserDto.builder().
                    userId(u.getId())
                    .username(u.getUsername())
                    .email(u.getEmail())
                    .position(u.getPosition())
                    .fullName(u.getFullName())
                    .contact(ContactDTO.builder()
                            .phone(u.getContact().getPhone())
                            .address(u.getContact().getAddress())
                            .build())
                    .experience(u.getExperience())
                    .aboutMe(u.getAboutMe())
                    .build();
        }
        else
            throw new RuntimeException("User not found with id: " + userid);
    }


    //Deleting a single user by id
    @Override
    public void deleteUser(UUID id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepo.deleteById(id);
    }

    //Deleting all users in the database
    @Override
    public void deleteAllUsers() {
        userRepo.deleteAll();
    }

}
