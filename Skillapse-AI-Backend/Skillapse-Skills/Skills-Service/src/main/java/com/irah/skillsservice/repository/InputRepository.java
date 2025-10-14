package com.irah.skillsservice.repository;

import com.irah.skillsservice.model.InputSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputRepository extends JpaRepository<InputSkills, Long> {
}
