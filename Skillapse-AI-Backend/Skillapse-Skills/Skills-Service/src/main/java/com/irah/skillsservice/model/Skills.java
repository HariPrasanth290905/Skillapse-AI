package com.irah.skillsservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String skillName;

    @Column(length = 50, nullable = false)
    private String userName;


}

