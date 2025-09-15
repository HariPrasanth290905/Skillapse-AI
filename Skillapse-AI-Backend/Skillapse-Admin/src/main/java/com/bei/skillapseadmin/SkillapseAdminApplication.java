package com.bei.skillapseadmin;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.ConfigurableEnvironment;

/**
 * Entry point for the Skillapse Admin server, powered by Spring Boot Admin.
 * <p>
 * Responsibilities:
 * - Bootstraps the Spring application context.
 * - Enables the Spring Boot Admin Server to monitor registered services.
 * - Logs startup details such as active profiles and application URL when available.
 */
@SpringBootApplication
@EnableAdminServer
public class SkillapseAdminApplication {

    private static final Logger log = LoggerFactory.getLogger(SkillapseAdminApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SkillapseAdminApplication.class);
        ConfigurableEnvironment env = app.run(args).getEnvironment();

        String appName = env.getProperty("spring.application.name", "skillapse-admin");
        String port = env.getProperty("server.port", "8080");
        String contextPath = env.getProperty("server.servlet.context-path", "");
        String profiles = String.join(", ", env.getActiveProfiles().length > 0 ? env.getActiveProfiles() : new String[]{"default"});

        log.info("Application '{}' started with profiles [{}]", appName, profiles);
        log.info("Admin UI available at http://localhost:{}{}", port, contextPath);
    }
}
