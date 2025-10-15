package com.irah.skillsservice.repository;

import com.irah.skillsservice.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skills, Integer> {
    List<Skills> findSkillsByUserName(String username);

    Optional<Skills> findByUserNameAndSkillName(String username, String skillName);

    @Query("SELECT DISTINCT s.userName FROM Skills s WHERE s.skillName IN :skills AND s.userName <> :currentUser")
    List<String> findDistinctUsersBySkillsExcept(@Param("skills") List<String> skills,
                                                 @Param("currentUser") String currentUser);

}




