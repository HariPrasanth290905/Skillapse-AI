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
public class ContactDTO {
    private UUID id;
    private String phone;
    private String email;
    private String address;
}
