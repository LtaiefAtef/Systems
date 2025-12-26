package com.univ.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // disable CSRF for simplicity (for APIs)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()  // allow all requests to /auth/**
                .anyRequest().authenticated()             // everything else must be authenticated
            );

        return http.build();
    }
}