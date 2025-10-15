package com.irah.skillsservice.impl;

import com.irah.skillsservice.exceptionhandler.SkillAlreadyExistsException;
import com.irah.skillsservice.exceptionhandler.SkillNotFoundException;
import com.irah.skillsservice.service.SkillService;
import com.irah.skillsservice.model.Skills;
import com.irah.skillsservice.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public Skills addSkill(String username, String skill) {
        Optional<Skills> existingSkill = skillRepository.findByUserNameAndSkillName(username, skill);

        if (existingSkill.isPresent()) {
            throw new SkillAlreadyExistsException("Skill already exists for user: " + username);
        }
        return skillRepository.save(
                Skills.builder()
                        .skillName(skill)
                        .userName(username)
                        .build());
    }

    @Override
    public void removeSkill(String username, String skillName) {
        Skills skill = skillRepository.findByUserNameAndSkillName(username, skillName)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found or unauthorized access"));

        skillRepository.delete(skill);

    }

    @Override
    public List<Skills> getSkillsByUserName(String username) {

        return skillRepository.findSkillsByUserName(username).isEmpty() ? List.of() : skillRepository.findSkillsByUserName(username);
    }


    @Override
    public List<String> getMatchedUsers(String username) {

        List<Skills> skillsByUserName = skillRepository.findSkillsByUserName(username);

        List<String> currentUserSkills = skillsByUserName.stream()
                .map(Skills::getSkillName)
                .toList();

        return skillRepository.findDistinctUsersBySkillsExcept(currentUserSkills, username);
    }
}
