package com.bei.user_service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class UserDto {
    private String username;
    private String position;
    private String profile;
}
