package com.bei.user_service.model;


import java.util.UUID;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.io.Serializable;

@Entity
@Table(name = "bei_users", indexes = {
        @Index(name = "idx_beiusers_username", columnList = "username"),
        @Index(name = "idx_beiusers_email", columnList = "email")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class BeiUsers implements Serializable {

    private static final long serialVersionUID = 1L;

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;   // Generate Unique user ID

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    // User Details
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    @ToString.Exclude
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column
    private String role;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(length = 500)
    private String aboutMe;

    //Contact Details
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id" , referencedColumnName = "id")
    private Contact contact;

    @Column
    private String profilePicUrl;

    // Security Details
    @Column(nullable = false)
    private boolean emailVerified = false;

    @Column(nullable = false)
    private Integer experience = 0;

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