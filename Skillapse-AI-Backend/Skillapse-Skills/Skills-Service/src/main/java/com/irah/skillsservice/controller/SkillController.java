package com.irah.skillsservice.controller;

import com.irah.skillsservice.impl.SkillImpl;
import com.irah.skillsservice.inter.SkillService;
import com.irah.skillsservice.model.Skills;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SkillService skillService;

    @GetMapping("/test")
    String w() {
        return "Welcome to Skill Service";
    }

    @PostMapping("/add")
    public ResponseEntity<Skills> addSkill(@RequestAttribute("username") String username, @Valid @RequestBody Skills skill) {

        return ResponseEntity.ok(skillService.addSkill(username, skill));
    }


    @PutMapping("/update/{skillId}")
    public ResponseEntity<Skills> updateSkill(@RequestAttribute("userEmail") String userEmail, @PathVariable Integer skillId, @Valid @RequestBody Skills uSkill) {

        return ResponseEntity.ok(skillService.updateSkill(userEmail, skillId, uSkill));
    }


    @DeleteMapping("/remove/{skillId}")
    public ResponseEntity<String> removeSkill(@RequestAttribute("userEmail") String userEmail, @PathVariable Integer skillId) {

        skillService.removeSkill(userEmail, skillId);
        return ResponseEntity.ok("Skill removed successfully");
    }

    @SuppressWarnings(value = "unchecked")
    @GetMapping("/inputSkills")
    public List<Skills> inputSkills() {
        return (List<Skills>) redisTemplate.opsForValue().get("skills");

    }

    @GetMapping("/allSkills")
    public ResponseEntity<List<Skills>> getUserSkills(@RequestAttribute("userEmail") String userEmail) {
        System.out.println("userEmail: " + userEmail);
        return ResponseEntity.ok(skillService.getSkillsByUserName(userEmail));
    }

    @GetMapping("/getSkills")
    public ResponseEntity<List<Skills>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/match")
    public ResponseEntity<List<String>> matchSkill(@RequestParam String userEmail) {
        List<String> matchedUsers = skillService.getMatchedUsers(userEmail);
        if (matchedUsers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(matchedUsers);
    }
}

