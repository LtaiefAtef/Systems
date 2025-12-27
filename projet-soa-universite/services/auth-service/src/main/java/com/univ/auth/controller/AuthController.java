package com.univ.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.univ.auth.model.LoginRequest;
import com.univ.auth.model.SignupRequest;
import com.univ.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService as) {
        this.authService = as;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        boolean ok = authService.validateUser(
                request.getUsername(),
                request.getPassword()
        );

        if (!ok) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid Credentials"
            );
        }

        return authService.generateJwt(request.getUsername(), request.getRoles());
    }
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {

        boolean ok = authService.registerUser(
                request.getName(),
                request.getPrename(),
                request.getUsername(),
                request.getPhone(),
                request.getEmail(),
                request.getPassword(),
                request.getRole(),
                request.getSector()
        );

        if (!ok) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Registration Failed"
            );
        }

        return "User registered successfully";
    }
}