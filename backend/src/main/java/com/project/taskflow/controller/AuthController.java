package com.project.taskflow.controller;

import com.project.taskflow.dto.AuthResponse;
import com.project.taskflow.dto.LoginRequest;
import com.project.taskflow.entity.User;
import com.project.taskflow.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}