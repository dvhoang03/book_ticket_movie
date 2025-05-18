package com.example.payment_service.config;

import java.util.List;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI openAPI(@Value("${open.api.title}") String title,
                           @Value("${open.api.version}") String version,
                           @Value("${open.api.description}") String description,
                           @Value("${open.api.serverUrl}") String serverUrl
                           ){
        return new OpenAPI().info(new Info().title(title).version(version)
                .description(description)
                .license(new License().name("API License").url("https://google.com")))
                .servers(List.of(new Server().url(serverUrl)));
    }

    @Bean
    public GroupedOpenApi groupedOpenApi(){
        return GroupedOpenApi.builder()
                .group("payment-service")
                .packagesToScan("com.example.payment_service.controller")
                .build();
    }

}
