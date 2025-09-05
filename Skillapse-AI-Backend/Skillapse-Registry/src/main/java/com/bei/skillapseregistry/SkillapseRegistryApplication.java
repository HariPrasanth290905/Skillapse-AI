package com.bei.skillapseregistry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SkillapseRegistryApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillapseRegistryApplication.class, args);
    }

}
