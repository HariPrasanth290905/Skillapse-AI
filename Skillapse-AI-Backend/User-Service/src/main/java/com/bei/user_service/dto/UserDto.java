package com.bei.user_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    private UUID userId;
    @NotBlank(message = "Username is required")
    private String username;
    @NotBlank(message = "Password is required")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email")
    private String email;
    @NotBlank(message = "Enter your full name")
    private String fullName;
    @NotBlank(message = "Enter your position")
    private String position;
    @NotNull(message = "Contact cannot be null")
    private ContactDTO contact;

    private Integer experience;

    public String aboutMe;
}
