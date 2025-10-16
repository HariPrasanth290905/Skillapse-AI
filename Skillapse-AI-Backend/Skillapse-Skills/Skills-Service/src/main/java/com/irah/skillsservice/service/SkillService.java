package com.irah.skillsservice.service;

import com.irah.skillsservice.model.Skills;

import java.util.List;
import java.util.UUID;

public interface SkillService {
    Skills addSkill(UUID userid, String skill);

    void removeSkill(UUID userid, String skillName);

    List<Skills> getSkillsByUserName(UUID userid);

//    List<String> getMatchedUsers(UUID userid);

}
