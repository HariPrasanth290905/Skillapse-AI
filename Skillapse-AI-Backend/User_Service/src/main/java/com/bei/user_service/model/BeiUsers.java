package com.bei.user_service.model;


import java.util.UUID;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeiUsers {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;   // Generate Unique user ID


    // User Details
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false)
    private String password;

   /* @Column(nullable = false)
    private String role;*/


    @Column(length = 100)
    private String fullName;

    @Column(length = 500)
    private String bio;

    @Column
    private String profilePicUrl;

    // Security Details
    @Column(nullable = false)
    private boolean emailVerified = false;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private int failedLoginAttempts = 0;

    @Column
    private boolean accountLocked = false;

    @Column
    private LocalDateTime lastLoginAt;

    @Column
    private String lastLoginIp;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
