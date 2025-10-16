package com.irah.skillsservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sId;

    @Column(length = 16, nullable = false)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String skillName;
}

