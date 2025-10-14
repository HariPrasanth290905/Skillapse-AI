package com.irah.skillsservice.exceptionhandler;


public class SkillNotFoundException extends RuntimeException {
    public SkillNotFoundException(String message) {
        super(message);
    }
}
