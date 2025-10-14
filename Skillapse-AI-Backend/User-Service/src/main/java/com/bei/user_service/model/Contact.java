package com.bei.user_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/*
A Contact entity that holds the contact information for
each user with a one-to-one relationship
*/

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    private UUID id;
    @Column(nullable = false, unique = true, length = 15)
    private String phone;

    @Column(nullable = false, length = 100)
    private String address;

    //To make contact id same as user id
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private BeiUsers user;

}
