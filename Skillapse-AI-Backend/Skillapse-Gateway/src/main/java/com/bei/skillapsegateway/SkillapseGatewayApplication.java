package com.bei.skillapsegateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SkillapseGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillapseGatewayApplication.class, args);
    }

}
