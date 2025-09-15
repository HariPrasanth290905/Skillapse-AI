package com.bei.user_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;


@Data
@Entity
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String phone;
    private String address;

}
