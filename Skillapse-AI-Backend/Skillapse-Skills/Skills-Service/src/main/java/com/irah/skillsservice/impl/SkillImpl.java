package com.irah.skillsservice.impl;

import com.irah.skillsservice.customexception.SkillAlreadyExistsException;
import com.irah.skillsservice.customexception.SkillNotFoundException;
import com.irah.skillsservice.service.SkillService;
import com.irah.skillsservice.model.Skills;
import com.irah.skillsservice.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SkillImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public Skills addSkill(UUID uuid, String skill) {
        Optional<Skills> existingSkill = skillRepository.findByIdAndSkillName(uuid, skill);

        if (existingSkill.isPresent()) {
            throw new SkillAlreadyExistsException("Skill already exists for user: " + uuid);
        }
        return skillRepository.save(
                Skills.builder()
                        .skillName(skill)
                        .id(uuid)
                        .build());
    }

    @Override
    public void removeSkill(UUID uuid, String skillName) {
        Skills skill = skillRepository.findByIdAndSkillName(uuid, skillName)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found or unauthorized access"));

        skillRepository.delete(skill);

    }

    @Override
    public List<Skills> getSkillsByUserName(UUID uuid) {
        List<Skills> skills = skillRepository.findSkillsById(uuid);
        return skills.isEmpty() ? List.of() : skills;
    }


//    @Override
//    public List<String> getMatchedUsers(UUID uuid) {
//
//        List<Skills> skillsByUserName = skillRepository.findSkillsById(uuid);
//
//        List<String> currentUserSkills = skillsByUserName.stream()
//                .map(Skills::getSkillName)
//                .toList();
//
//        return skillRepository.findDistinctUsersBySkillsExcept(currentUserSkills, uuid.toString());
//    }
}
