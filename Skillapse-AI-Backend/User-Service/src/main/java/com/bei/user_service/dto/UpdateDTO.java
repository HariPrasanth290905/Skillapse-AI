package com.bei.user_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
@Builder
public class UpdateDTO {
    @NotBlank(message = "userId is required")
    private UUID userId;
    private String username;
    private String fullName;
    private String position;
    private ContactDTO contact;

    private Integer experience;

    public String aboutMe;
}

