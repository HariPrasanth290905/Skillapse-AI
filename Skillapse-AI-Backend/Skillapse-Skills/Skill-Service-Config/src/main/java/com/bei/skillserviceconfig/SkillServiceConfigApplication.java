package com.bei.skillserviceconfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.context.config.annotation.RefreshScope;

@SpringBootApplication
@RefreshScope
@EnableConfigServer
public class SkillServiceConfigApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillServiceConfigApplication.class, args);
    }

}
