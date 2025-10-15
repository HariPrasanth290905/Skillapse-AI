package com.irah.skillsservice.service;

import com.irah.skillsservice.model.Skills;

import java.util.List;

public interface SkillService {
    Skills addSkill(String username, String skill);

    void removeSkill(String username, String skillName);

    List<Skills> getSkillsByUserName(String username);

    List<String> getMatchedUsers(String username);

}
