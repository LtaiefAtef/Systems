package com.univ.auth.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserStore userStore;

    public AuthService(UserStore userStore) {
        this.userStore = userStore;
    }

    public boolean validateUser(String username, String password) {
        return userStore.isValid(username, password);
    }

    public String generateFakeJwt(String username) {
        return "FAKE-JWT-TOKEN-FOR-" + username;
    }
}
