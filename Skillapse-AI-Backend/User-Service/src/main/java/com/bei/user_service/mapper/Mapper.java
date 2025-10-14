package com.bei.user_service.mapper;

import com.bei.user_service.dto.ContactDTO;
import com.bei.user_service.dto.UserDto;
import com.bei.user_service.model.BeiUsers;
import com.bei.user_service.model.Contact;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Mapper {

    public static BeiUsers mapToDto(UserDto user) {
        return BeiUsers.builder()
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(new BCryptPasswordEncoder(12).encode(user.getPassword()))
                .position(user.getPosition())
                .experience(user.getExperience())
                .role("ROLE_USER")
                .contact(user.getContact()!=null?mapToContactDto(user.getContact()):null)
                .aboutMe(user.getAboutMe())
                .build();
    }

    public static Contact mapToContactDto(ContactDTO contact) {
        return Contact.builder()
                .phone(contact.getPhone())
                .address(contact.getAddress())
                .build();
    }

}
