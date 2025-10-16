package com.bei.user_service.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
public class Otp {
    private String email;
    private String otp;
    private UUID id;
}
