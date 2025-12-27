package com.univ.auth.service;

/**
 * Abstraction for user lookup/validation.
 * Implementations should verify credentials (e.g. compare password hashes).
 */
public interface UserRepository {
    boolean isValid(String username, String password);

    boolean registerUser(String name, String prename, String username, String section, String phone, String email, String password, String role, String sector);
} 
