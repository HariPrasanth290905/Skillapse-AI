package com.bei.user_service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
@Builder
public class UserDto {
    private UUID id;              // always needed to identify the user

    private String createdAt;
    // Header fields
    private String fullName;
    private String position;
    private Integer experience;

    // Contact fields
    private ContactDTO contact;

    // About section
    private String aboutMe;

    // Profile pic etc.
    // private String profilePicUrl;
}
