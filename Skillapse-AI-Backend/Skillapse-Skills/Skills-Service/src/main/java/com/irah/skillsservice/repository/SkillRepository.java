package com.irah.skillsservice.repository;

import com.irah.skillsservice.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SkillRepository extends JpaRepository<Skills, Integer> {
    List<Skills> findSkillsById(UUID id);


    @Query("SELECT DISTINCT s.id FROM Skills s WHERE s.skillName IN :skills AND s.id <> :currentUser")
    List<String> findDistinctUsersBySkillsExcept(@Param("skills") List<String> skills,
                                                 @Param("currentUser") String currentUser);

    Optional<Skills> findByIdAndSkillName(UUID id, String skillName);
}




