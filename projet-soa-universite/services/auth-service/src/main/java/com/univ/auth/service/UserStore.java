package com.univ.auth.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class UserStore {

    private final Map<String, String> users = new HashMap<>();

    @PostConstruct
    public void loadUsers() {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        new ClassPathResource("users.csv").getInputStream(),
                        StandardCharsets.UTF_8
                )
        )) {
            br.lines()
              .skip(1) // skip header
              .filter(line -> !line.isBlank())
              .forEach(line -> {
                  String[] parts = line.split(",", -1);
                  if (parts.length != 2) {
                      throw new RuntimeException("Invalid CSV row: " + line);
                  }
                  users.put(parts[0].trim(), parts[1].trim());
              });

        } catch (Exception e) {
            throw new RuntimeException("Failed to load users.csv", e);
        }
    }

    public boolean isValid(String username, String password) {
        return password.equals(users.get(username));
    }
}