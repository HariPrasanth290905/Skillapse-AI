package com.irah.skillsservice.inter;

import com.irah.skillsservice.model.Skills;

import java.util.List;

public interface SkillService {
    Skills addSkill(String username, Skills skill);

    Skills updateSkill(String username, Integer skillId, Skills updatedSkill);

    void removeSkill(String username, Integer skillId);

    List<Skills> getSkillsByUserName(String username);

    List<Skills> getAllSkills();

    List<String> getMatchedUsers(String username);

}
