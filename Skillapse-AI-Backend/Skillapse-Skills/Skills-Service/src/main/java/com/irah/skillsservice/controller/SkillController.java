package com.irah.skillsservice.controller;

import com.irah.skillsservice.service.SkillService;
import com.irah.skillsservice.model.Skills;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

//    @Autowired
//    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SkillService skillService;

    @GetMapping("/test")
    String w() {
        return "Welcome to Skill Service";
    }

    @PostMapping("/add/{skill}")
    public ResponseEntity<Skills> addSkill(@RequestAttribute("userid") String uuid,
                                           @NotBlank(message = "Skill should not be empty")
                                           @PathVariable("skill") String skill)
    {

        return ResponseEntity.ok(skillService.addSkill(UUID.fromString(uuid), skill.trim()));
    }


    @DeleteMapping("/remove/{skill}")
    public ResponseEntity<String> removeSkill(@RequestAttribute("userid") String uuid,
                                              @PathVariable("skill") String skill) {

        skillService.removeSkill(UUID.fromString(uuid), skill.trim());
        return ResponseEntity.ok("Skill removed successfully");
    }

//    @SuppressWarnings(value = "unchecked")
//    @GetMapping("/inputSkills")
//    public List<Skills> inputSkills() {
//        return (List<Skills>) redisTemplate.opsForValue().get("skills");
//
//    }

    @GetMapping("/allSkills")
    public ResponseEntity<List<Skills>> getUserSkills(@RequestAttribute("userid") String uuid) {
        System.out.println("user id: " + uuid);
        return ResponseEntity.ok(skillService.getSkillsByUserName(UUID.fromString(uuid)));
    }

//    @GetMapping("/match")
//    public ResponseEntity<List<String>> matchSkill(@RequestParam String userEmail) {
//        List<String> matchedUsers = skillService.getMatchedUsers(userEmail);
//        if (matchedUsers.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(matchedUsers);
//    }
}

