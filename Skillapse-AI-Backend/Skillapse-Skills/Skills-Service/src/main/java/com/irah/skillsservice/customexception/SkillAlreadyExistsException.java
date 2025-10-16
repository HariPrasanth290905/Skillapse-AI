package com.irah.skillsservice.customexception;

public class SkillAlreadyExistsException extends RuntimeException {
    public SkillAlreadyExistsException(String message) {
        super(message);
    }
}
